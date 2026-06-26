/**
 * Phase 25 — Database cleanup & media integrity
 * Run: npx tsx scripts/phase25-database-cleanup.ts
 * Apply safe fixes: npx tsx scripts/phase25-database-cleanup.ts --execute
 */
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { prisma } from '../lib/prisma';
import { getR2Config } from '../lib/r2-config';
import {
  isLocalMediaUrl,
  isR2MediaUrl,
  objectKeyFromMediaUrl,
  publicUrlForObjectKey,
} from '../lib/media-url';
import { existsInR2, uploadToR2 } from '../lib/r2-storage';
import { SITE_CONTENT_KEYS } from '../lib/site-content';

const EXECUTE = process.argv.includes('--execute');
const OUT_DIR = join(process.cwd(), 'public', 'review', 'phase25');
const MARKER = `P25-${Date.now()}`;

type IssueSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';
type Issue = {
  id: string;
  category: string;
  severity: IssueSeverity;
  table: string;
  recordId: string;
  field: string;
  message: string;
  url?: string;
  fixable: boolean;
  fixed?: boolean;
};

const issues: Issue[] = [];
const fixes: { table: string; id: string; field: string; from: string; to: string }[] = [];
let issueCounter = 0;

function issue(
  category: string,
  severity: IssueSeverity,
  table: string,
  recordId: string,
  field: string,
  message: string,
  opts?: { url?: string; fixable?: boolean },
) {
  issues.push({
    id: `I${++issueCounter}`,
    category,
    severity,
    table,
    recordId,
    field,
    message,
    url: opts?.url,
    fixable: opts?.fixable ?? false,
  });
}

async function listR2Keys(): Promise<Set<string>> {
  const config = getR2Config();
  if (!config) return new Set();

  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });

  const keys = new Set<string>();
  let token: string | undefined;

  do {
    const res = await client.send(
      new ListObjectsV2Command({
        Bucket: config.bucket,
        Prefix: 'uploads/',
        ContinuationToken: token,
      }),
    );
    for (const obj of res.Contents ?? []) {
      if (obj.Key) keys.add(obj.Key);
    }
    token = res.IsTruncated ? res.NextContinuationToken : undefined;
  } while (token);

  return keys;
}

function localFileExists(url: string): boolean {
  if (!isLocalMediaUrl(url)) return false;
  const path = join(process.cwd(), 'public', url.replace(/^\//, ''));
  return existsSync(path);
}

async function httpOk(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(15000) });
    if (res.ok) return true;
    const getRes = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(15000) });
    return getRes.ok;
  } catch {
    return false;
  }
}

type MediaRef = {
  table: string;
  recordId: string;
  field: string;
  url: string;
  arrayIndex?: number;
};

function collectUrl(
  refs: MediaRef[],
  table: string,
  recordId: string,
  field: string,
  value: string | null | undefined,
  arrayIndex?: number,
) {
  if (value === undefined) return;
  if (value === null || value.trim() === '') {
    return;
  }
  refs.push({ table, recordId, field, url: value.trim(), arrayIndex });
}

function scanJsonForUrls(
  refs: MediaRef[],
  table: string,
  recordId: string,
  field: string,
  obj: unknown,
  path = '',
): void {
  if (typeof obj === 'string') {
    const s = obj.trim();
    const r2 = getR2Config();
    if (s.startsWith('/uploads/') || (r2 && s.startsWith(r2.publicUrl))) {
      collectUrl(refs, table, recordId, `${field}${path}`, s);
    }
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => scanJsonForUrls(refs, table, recordId, field, item, `${path}[${i}]`));
    return;
  }
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      scanJsonForUrls(refs, table, recordId, field, v, path ? `${path}.${k}` : `.${k}`);
    }
  }
}

async function verifyMediaRef(
  ref: MediaRef,
  r2Keys: Set<string>,
): Promise<{
  resolvedUrl: string | null;
  shouldUpdate: boolean;
  shouldUpload?: boolean;
  shouldClear?: boolean;
}> {
  const { table, recordId, field, url } = ref;

  if (isLocalMediaUrl(url)) {
    const key = objectKeyFromMediaUrl(url);
    const localOk = localFileExists(url);
    const r2Ok = key ? r2Keys.has(key) : false;

    if (r2Ok && key) {
      const r2Url = publicUrlForObjectKey(key);
      if (!localOk) {
        issue(
          'legacy-local-path',
          'high',
          table,
          recordId,
          field,
          'Local /uploads/ path in DB; file missing locally but exists in R2',
          { url, fixable: true },
        );
      } else {
        issue(
          'legacy-local-path',
          'medium',
          table,
          recordId,
          field,
          'Local /uploads/ path — R2 object exists; can migrate URL',
          { url, fixable: true },
        );
      }
      return { resolvedUrl: r2Url, shouldUpdate: true };
    }

    if (localOk) {
      issue(
        'legacy-local-path',
        'high',
        table,
        recordId,
        field,
        'Local /uploads/ path — file exists locally but NOT in R2 (can upload)',
        { url, fixable: true },
      );
      return { resolvedUrl: url, shouldUpdate: false, shouldUpload: true };
    }

    issue(
      'broken-url',
      'critical',
      table,
      recordId,
      field,
      'Local /uploads/ path — missing locally and in R2',
      { url, fixable: true },
    );
    return { resolvedUrl: null, shouldUpdate: false, shouldClear: true };
  }

  if (isR2MediaUrl(url)) {
    const key = objectKeyFromMediaUrl(url);
    const inR2 = key ? r2Keys.has(key) || (await existsInR2(url)) : false;
    if (!inR2) {
      issue('broken-url', 'critical', table, recordId, field, 'R2 URL not found in bucket', {
        url,
        fixable: true,
      });
      return { resolvedUrl: null, shouldUpdate: false, shouldClear: true };
    }
    const http = await httpOk(url);
    if (!http) {
      issue('broken-url', 'critical', table, recordId, field, 'R2 object exists but HTTP not 200', {
        url,
        fixable: false,
      });
    }
    return { resolvedUrl: url, shouldUpdate: false };
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    const http = await httpOk(url);
    if (!http) {
      issue('broken-url', 'high', table, recordId, field, 'External URL not reachable (HTTP)', {
        url,
        fixable: false,
      });
    }
    return { resolvedUrl: url, shouldUpdate: false };
  }

  issue('broken-url', 'high', table, recordId, field, 'Unmanaged media URL format', {
    url,
    fixable: false,
  });
  return { resolvedUrl: null, shouldUpdate: false };
}

function findDuplicates<T extends { id: string }>(
  items: T[],
  keyFn: (item: T) => string,
  label: string,
  table: string,
) {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = keyFn(item);
    if (!key) continue;
    const group = map.get(key) ?? [];
    group.push(item);
    map.set(key, group);
  }
  for (const [key, group] of map) {
    if (group.length > 1) {
      for (const item of group) {
        issue(
          'duplicate',
          'medium',
          table,
          item.id,
          label,
          `Duplicate ${label} "${key}" (${group.length} records: ${group.map((g) => g.id).join(', ')})`,
          { fixable: false },
        );
      }
    }
  }
}

async function uploadLocalToR2(url: string): Promise<string | null> {
  if (!isLocalMediaUrl(url)) return null;
  const key = objectKeyFromMediaUrl(url);
  if (!key || !localFileExists(url)) return null;

  const filePath = join(process.cwd(), 'public', url.replace(/^\//, ''));
  const buffer = readFileSync(filePath);
  const ext = filePath.split('.').pop()?.toLowerCase() || 'jpg';
  const mime: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
  };
  const parts = key.split('/');
  const filename = parts.pop()!;
  const subdir = parts.slice(1).join('/') || undefined;
  const result = await uploadToR2(buffer, subdir, filename, mime[ext] || 'image/jpeg');
  return result.url;
}

async function clearMediaField(
  table: string,
  recordId: string,
  field: string,
  arrayIndex?: number,
) {
  switch (table) {
    case 'Service':
      await prisma.service.update({ where: { id: recordId }, data: { thumbnail: null } });
      break;
    case 'Project': {
      if (field === 'thumbnail') {
        await prisma.project.update({ where: { id: recordId }, data: { thumbnail: null } });
      } else if (field === 'images' && arrayIndex !== undefined) {
        const project = await prisma.project.findUnique({ where: { id: recordId } });
        if (!project) return;
        const images = project.images.filter((_, i) => i !== arrayIndex);
        await prisma.project.update({ where: { id: recordId }, data: { images } });
      }
      break;
    }
    case 'ProjectMedia': {
      const pm = await prisma.projectMedia.findUnique({ where: { id: recordId } });
      if (!pm) return;
      if (field === 'caseStudyGalleryImages' && arrayIndex !== undefined) {
        const arr = pm.caseStudyGalleryImages.filter((_, i) => i !== arrayIndex);
        await prisma.projectMedia.update({ where: { id: recordId }, data: { caseStudyGalleryImages: arr } });
      } else if (field === 'mobileScreenshots' && arrayIndex !== undefined) {
        const arr = pm.mobileScreenshots.filter((_, i) => i !== arrayIndex);
        await prisma.projectMedia.update({ where: { id: recordId }, data: { mobileScreenshots: arr } });
      } else {
        await prisma.projectMedia.update({ where: { id: recordId }, data: { [field]: null } });
      }
      break;
    }
    case 'Founder':
      await prisma.founder.update({ where: { id: recordId }, data: { photo: null } });
      break;
    case 'ClientLogo':
      await prisma.clientLogo.update({ where: { id: recordId }, data: { logo: '' } });
      break;
    case 'Testimonial':
      await prisma.testimonial.update({ where: { id: recordId }, data: { image: null } });
      break;
    case 'BlogPost':
      await prisma.blogPost.update({ where: { id: recordId }, data: { coverImage: null } });
      break;
    case 'TeamMember':
      await prisma.teamMember.update({ where: { id: recordId }, data: { image: null } });
      break;
    default:
      break;
  }
}

async function applyFieldUpdate(
  table: string,
  recordId: string,
  field: string,
  newUrl: string,
  arrayIndex?: number,
) {
  switch (table) {
    case 'Service':
      await prisma.service.update({ where: { id: recordId }, data: { thumbnail: newUrl } });
      break;
    case 'Project': {
      if (field === 'thumbnail') {
        await prisma.project.update({ where: { id: recordId }, data: { thumbnail: newUrl } });
      } else if (field === 'images' && arrayIndex !== undefined) {
        const project = await prisma.project.findUnique({ where: { id: recordId } });
        if (!project) return;
        const images = [...project.images];
        images[arrayIndex] = newUrl;
        await prisma.project.update({ where: { id: recordId }, data: { images } });
      }
      break;
    }
    case 'ProjectMedia': {
      const pm = await prisma.projectMedia.findUnique({ where: { id: recordId } });
      if (!pm) return;
      if (field === 'caseStudyGalleryImages' && arrayIndex !== undefined) {
        const arr = [...pm.caseStudyGalleryImages];
        arr[arrayIndex] = newUrl;
        await prisma.projectMedia.update({ where: { id: recordId }, data: { caseStudyGalleryImages: arr } });
      } else if (field === 'mobileScreenshots' && arrayIndex !== undefined) {
        const arr = [...pm.mobileScreenshots];
        arr[arrayIndex] = newUrl;
        await prisma.projectMedia.update({ where: { id: recordId }, data: { mobileScreenshots: arr } });
      } else {
        await prisma.projectMedia.update({
          where: { id: recordId },
          data: { [field]: newUrl },
        });
      }
      break;
    }
    case 'Founder':
      await prisma.founder.update({ where: { id: recordId }, data: { photo: newUrl } });
      break;
    case 'ClientLogo':
      await prisma.clientLogo.update({ where: { id: recordId }, data: { logo: newUrl } });
      break;
    case 'Testimonial':
      await prisma.testimonial.update({ where: { id: recordId }, data: { image: newUrl } });
      break;
    case 'BlogPost':
      await prisma.blogPost.update({ where: { id: recordId }, data: { coverImage: newUrl } });
      break;
    case 'TeamMember':
      await prisma.teamMember.update({ where: { id: recordId }, data: { image: newUrl } });
      break;
    default:
      break;
  }
}

async function applyFkFix(table: string, recordId: string, field: string) {
  if (table === 'Project' && field === 'testimonialId') {
    await prisma.project.update({ where: { id: recordId }, data: { testimonialId: null } });
  }
  if (table === 'PricingPackage' && field === 'serviceId') {
    await prisma.pricingPackage.update({ where: { id: recordId }, data: { serviceId: null } });
  }
}

function integrityScore(initial: Issue[], remaining: Issue[]): number {
  const weights: Record<IssueSeverity, number> = {
    critical: 10,
    high: 5,
    medium: 2,
    low: 1,
    info: 0,
  };
  const scoreable = initial.filter((i) => i.severity !== 'info');
  const maxPenalty = scoreable.reduce((sum, i) => sum + weights[i.severity], 0) || 1;
  const remainingPenalty = remaining
    .filter((i) => i.severity !== 'info')
    .reduce((sum, i) => sum + weights[i.severity], 0);
  return Math.round(((maxPenalty - remainingPenalty) / maxPenalty) * 100);
}

async function recoverFromEntityFolders() {
  const { readdirSync } = await import('fs');

  const founderDir = join(process.cwd(), 'public', 'uploads', 'founder');
  if (existsSync(founderDir)) {
    const founders = await prisma.founder.findMany();
    const files = readdirSync(founderDir).filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f));
    for (const f of founders) {
      if (f.photo) continue;
      const candidate = files.find((file) => file.includes('founder')) || (files.length === 1 ? files[0] : null);
      if (!candidate) continue;
      const localUrl = `/uploads/founder/${candidate}`;
      const r2Url = await uploadLocalToR2(localUrl);
      if (r2Url) {
        await prisma.founder.update({ where: { id: f.id }, data: { photo: r2Url } });
        fixes.push({ table: 'Founder', id: f.id, field: 'photo', from: 'recovered-local', to: r2Url });
        console.log(`RECOVER Founder.photo from ${localUrl}`);
      }
    }
  }

  const projectMediaRows = await prisma.projectMedia.findMany();
  for (const pm of projectMediaRows) {
    const dir = join(process.cwd(), 'public', 'uploads', 'projects', pm.slug);
    if (!existsSync(dir)) continue;
    const { readdirSync: readDir } = await import('fs');
    const files = readDir(dir).filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f));
    if (!pm.homepageFeaturedImage && files.length > 0) {
      const candidate = files.sort().at(-1)!;
      const localUrl = `/uploads/projects/${pm.slug}/${candidate}`;
      const r2Url = await uploadLocalToR2(localUrl);
      if (r2Url) {
        await prisma.projectMedia.update({
          where: { id: pm.id },
          data: { homepageFeaturedImage: r2Url },
        });
        fixes.push({
          table: 'ProjectMedia',
          id: pm.id,
          field: 'homepageFeaturedImage',
          from: 'recovered-local',
          to: r2Url,
        });
        console.log(`RECOVER ProjectMedia.homepageFeaturedImage from ${localUrl}`);
      }
    }
  }
}

async function deleteOrphanSettings() {
  const settings = await prisma.setting.findMany();
  const validKeys = new Set<string>(SITE_CONTENT_KEYS);
  for (const s of settings) {
    if (!validKeys.has(s.key)) {
      await prisma.setting.delete({ where: { id: s.id } });
      fixes.push({ table: 'Setting', id: s.id, field: s.key, from: s.key, to: 'deleted' });
      console.log(`DELETE orphan Setting key: ${s.key}`);
    }
  }
}

async function deleteOrphanR2Objects(r2Keys: Set<string>, referencedKeys: Set<string>) {
  const { deleteFromR2 } = await import('../lib/r2-storage');
  for (const key of r2Keys) {
    if (referencedKeys.has(key)) continue;
    const url = publicUrlForObjectKey(key);
    try {
      await deleteFromR2(url);
      fixes.push({ table: 'R2', id: key, field: 'object', from: url, to: 'deleted' });
      console.log(`DELETE orphan R2: ${key}`);
    } catch (e) {
      console.warn(`Failed to delete R2 ${key}:`, e);
    }
  }
}

async function createMissingProjectMediaShells() {
  const projects = await prisma.project.findMany({ where: { caseStudy: true } });
  const existing = new Set((await prisma.projectMedia.findMany()).map((pm) => pm.slug));
  for (const project of projects) {
    if (existing.has(project.slug)) continue;
    await prisma.projectMedia.create({ data: { slug: project.slug } });
    fixes.push({
      table: 'ProjectMedia',
      id: project.slug,
      field: 'create',
      from: 'missing',
      to: `shell for ${project.slug}`,
    });
    console.log(`CREATE ProjectMedia shell for ${project.slug}`);
  }
}

async function scanDatabase(pass: 'before' | 'after') {
  issues.length = 0;
  issueCounter = 0;

  console.log(`\n=== Phase 25 scan (${pass}) ===`);
  console.log(`Mode: ${EXECUTE ? 'EXECUTE' : 'DRY-RUN'}\n`);

  const r2Keys = await listR2Keys();
  console.log(`R2 objects under uploads/: ${r2Keys.size}`);

  const [
    services,
    projects,
    projectMedia,
    founders,
    clientLogos,
    testimonials,
    blogPosts,
    teamMembers,
    pricingPackages,
    settings,
    faqs,
    leads,
    users,
  ] = await Promise.all([
    prisma.service.findMany(),
    prisma.project.findMany(),
    prisma.projectMedia.findMany(),
    prisma.founder.findMany(),
    prisma.clientLogo.findMany(),
    prisma.testimonial.findMany(),
    prisma.blogPost.findMany(),
    prisma.teamMember.findMany(),
    prisma.pricingPackage.findMany(),
    prisma.setting.findMany(),
    prisma.fAQ.findMany(),
    prisma.lead.findMany(),
    prisma.user.findMany(),
  ]);

  const serviceSlugs = new Set(services.map((s) => s.slug));
  const serviceIds = new Set(services.map((s) => s.id));
  const testimonialIds = new Set(testimonials.map((t) => t.id));
  const projectSlugs = new Set(projects.map((p) => p.slug));

  console.log('Tables scanned:', {
    User: users.length,
    Service: services.length,
    Project: projects.length,
    ProjectMedia: projectMedia.length,
    Founder: founders.length,
    ClientLogo: clientLogos.length,
    Testimonial: testimonials.length,
    BlogPost: blogPosts.length,
    TeamMember: teamMembers.length,
    PricingPackage: pricingPackages.length,
    FAQ: faqs.length,
    Lead: leads.length,
    Setting: settings.length,
  });

  const mediaRefs: MediaRef[] = [];

  for (const s of services) collectUrl(mediaRefs, 'Service', s.id, 'thumbnail', s.thumbnail);
  for (const p of projects) {
    collectUrl(mediaRefs, 'Project', p.id, 'thumbnail', p.thumbnail);
    p.images.forEach((img, i) => collectUrl(mediaRefs, 'Project', p.id, 'images', img, i));
  }
  for (const pm of projectMedia) {
    collectUrl(mediaRefs, 'ProjectMedia', pm.id, 'homepageFeaturedImage', pm.homepageFeaturedImage);
    collectUrl(mediaRefs, 'ProjectMedia', pm.id, 'portfolioFeaturedImage', pm.portfolioFeaturedImage);
    collectUrl(mediaRefs, 'ProjectMedia', pm.id, 'portfolioGridImage', pm.portfolioGridImage);
    collectUrl(mediaRefs, 'ProjectMedia', pm.id, 'caseStudyHeroImage', pm.caseStudyHeroImage);
    pm.caseStudyGalleryImages.forEach((img, i) =>
      collectUrl(mediaRefs, 'ProjectMedia', pm.id, 'caseStudyGalleryImages', img, i),
    );
    pm.mobileScreenshots.forEach((img, i) =>
      collectUrl(mediaRefs, 'ProjectMedia', pm.id, 'mobileScreenshots', img, i),
    );
    if (!projectSlugs.has(pm.slug)) {
      issue('broken-reference', 'critical', 'ProjectMedia', pm.id, 'slug', `Slug "${pm.slug}" has no matching Project`, {
        fixable: false,
      });
    }
  }
  for (const f of founders) collectUrl(mediaRefs, 'Founder', f.id, 'photo', f.photo);
  for (const c of clientLogos) collectUrl(mediaRefs, 'ClientLogo', c.id, 'logo', c.logo);
  for (const t of testimonials) collectUrl(mediaRefs, 'Testimonial', t.id, 'image', t.image);
  for (const b of blogPosts) collectUrl(mediaRefs, 'BlogPost', b.id, 'coverImage', b.coverImage);
  for (const tm of teamMembers) collectUrl(mediaRefs, 'TeamMember', tm.id, 'image', tm.image);

  for (const setting of settings) {
    if (SITE_CONTENT_KEYS.includes(setting.key as (typeof SITE_CONTENT_KEYS)[number])) {
      try {
        const parsed = JSON.parse(setting.value);
        scanJsonForUrls(mediaRefs, 'Setting', setting.id, setting.key, parsed);
      } catch {
        issue('cms', 'medium', 'Setting', setting.id, setting.key, 'Invalid JSON in CMS setting', { fixable: false });
      }
    } else {
      issue('cms', 'low', 'Setting', setting.id, setting.key, 'Unused/unknown CMS setting key', { fixable: false });
    }
  }

  const knownCmsKeys = new Set(settings.map((s) => s.key));
  for (const key of SITE_CONTENT_KEYS) {
    if (!knownCmsKeys.has(key)) {
      // Defaults apply — not an integrity defect
    }
  }

  const urlIndex = new Map<string, MediaRef[]>();
  for (const ref of mediaRefs) {
    const group = urlIndex.get(ref.url) ?? [];
    group.push(ref);
    urlIndex.set(ref.url, group);
  }
  for (const [, refs] of urlIndex) {
    if (refs.length > 1) {
      for (const ref of refs) {
        issue(
          'duplicate-url',
          'low',
          ref.table,
          ref.recordId,
          ref.field,
          `URL shared across ${refs.length} fields`,
          { url: ref.url, fixable: false },
        );
      }
    }
  }

  const referencedKeys = new Set<string>();
  for (const ref of mediaRefs) {
    const key = objectKeyFromMediaUrl(ref.url);
    if (key) referencedKeys.add(key);
  }
  for (const key of r2Keys) {
    if (!referencedKeys.has(key)) {
      issue('orphaned-r2', 'info', 'R2', key, 'object', 'R2 object not referenced in database (test artifact or stale upload)', {
        url: getR2Config() ? publicUrlForObjectKey(key) : key,
        fixable: false,
      });
    }
  }

  for (const p of projects) {
    if (p.testimonialId && !testimonialIds.has(p.testimonialId)) {
      issue('invalid-fk', 'critical', 'Project', p.id, 'testimonialId', `References missing Testimonial ${p.testimonialId}`, {
        fixable: true,
      });
    }
    for (const slug of p.serviceSlugs) {
      if (!serviceSlugs.has(slug)) {
        issue('broken-reference', 'medium', 'Project', p.id, 'serviceSlugs', `Unknown service slug "${slug}"`, {
          fixable: false,
        });
      }
    }
    if (p.caseStudy && !projectMedia.some((pm) => pm.slug === p.slug)) {
      issue('missing-media', 'high', 'Project', p.id, 'projectMedia', `Case study missing ProjectMedia (slug: ${p.slug})`, {
        fixable: false,
      });
    }
  }

  for (const pkg of pricingPackages) {
    if (pkg.serviceId && !serviceIds.has(pkg.serviceId)) {
      issue('invalid-fk', 'critical', 'PricingPackage', pkg.id, 'serviceId', `References missing Service ${pkg.serviceId}`, {
        fixable: true,
      });
    }
  }

  const linkedTestimonialIds = new Set(
    projects.filter((p) => p.testimonialId).map((p) => p.testimonialId as string),
  );
  for (const t of testimonials) {
    if (!linkedTestimonialIds.has(t.id) && !t.featured) {
      issue('unused-record', 'info', 'Testimonial', t.id, 'usage', 'Not linked to project and not featured', {
        fixable: false,
      });
    }
  }

  findDuplicates(
    projects,
    (p) => `${p.title.trim().toLowerCase()}|${(p.clientName || '').trim().toLowerCase()}`,
    'title+client',
    'Project',
  );
  findDuplicates(services, (s) => s.slug, 'slug', 'Service');
  findDuplicates(services, (s) => s.title.trim().toLowerCase(), 'title', 'Service');
  findDuplicates(
    testimonials,
    (t) => `${t.name.trim().toLowerCase()}|${t.content.trim().toLowerCase().slice(0, 120)}`,
    'name+content',
    'Testimonial',
  );
  findDuplicates(
    pricingPackages,
    (p) => `${p.name.trim().toLowerCase()}|${p.price}|${p.serviceId || 'global'}`,
    'name+price+service',
    'PricingPackage',
  );

  const pendingUpdates: { ref: MediaRef; to: string }[] = [];
  const pendingUploads: MediaRef[] = [];
  const pendingClears: MediaRef[] = [];
  for (const ref of mediaRefs) {
    const result = await verifyMediaRef(ref, r2Keys);
    if (result.shouldUpdate && result.resolvedUrl) {
      pendingUpdates.push({ ref, to: result.resolvedUrl });
    }
    if (result.shouldUpload) pendingUploads.push(ref);
    if (result.shouldClear) pendingClears.push(ref);
  }

  if (EXECUTE && pass === 'before') {
    for (const ref of pendingUploads) {
      const r2Url = await uploadLocalToR2(ref.url);
      if (r2Url) {
        await applyFieldUpdate(ref.table, ref.recordId, ref.field, r2Url, ref.arrayIndex);
        fixes.push({ table: ref.table, id: ref.recordId, field: ref.field, from: ref.url, to: r2Url });
        console.log(`UPLOAD+FIX: ${ref.table}.${ref.field} [${ref.recordId}]`);
      }
    }
    for (const { ref, to } of pendingUpdates) {
      await applyFieldUpdate(ref.table, ref.recordId, ref.field, to, ref.arrayIndex);
      fixes.push({ table: ref.table, id: ref.recordId, field: ref.field, from: ref.url, to });
      console.log(`FIX URL: ${ref.table}.${ref.field} [${ref.recordId}]`);
    }
    for (const ref of pendingClears) {
      await clearMediaField(ref.table, ref.recordId, ref.field, ref.arrayIndex);
      fixes.push({ table: ref.table, id: ref.recordId, field: ref.field, from: ref.url, to: 'null' });
      console.log(`CLEAR: ${ref.table}.${ref.field} [${ref.recordId}]`);
    }
    for (const i of [...issues].filter((x) => x.category === 'invalid-fk' && x.fixable)) {
      await applyFkFix(i.table, i.recordId, i.field);
      fixes.push({ table: i.table, id: i.recordId, field: i.field, from: i.message, to: 'null' });
      console.log(`FIX FK: ${i.table}.${i.field} [${i.recordId}]`);
    }
    await createMissingProjectMediaShells();
    await recoverFromEntityFolders();
    await deleteOrphanSettings();
  }

  if (EXECUTE && pass === 'after') {
    const referencedKeys = new Set<string>();
    for (const ref of mediaRefs) {
      const key = objectKeyFromMediaUrl(ref.url);
      if (key) referencedKeys.add(key);
    }
    await deleteOrphanR2Objects(r2Keys, referencedKeys);
  }

  return {
    tables: {
      User: users.length,
      Service: services.length,
      Project: projects.length,
      ProjectMedia: projectMedia.length,
      Founder: founders.length,
      ClientLogo: clientLogos.length,
      Testimonial: testimonials.length,
      BlogPost: blogPosts.length,
      TeamMember: teamMembers.length,
      PricingPackage: pricingPackages.length,
      FAQ: faqs.length,
      Lead: leads.length,
      Setting: settings.length,
    },
    mediaRefCount: mediaRefs.length,
    r2ObjectCount: r2Keys.size,
    issues: [...issues],
    fixesApplied: [...fixes],
  };
}

function renderMarkdown(before: Awaited<ReturnType<typeof scanDatabase>>, after: Awaited<ReturnType<typeof scanDatabase>> | null) {
  const finalIssues = after?.issues ?? before.issues;
  const remaining = finalIssues;
  const criticalRemaining = remaining.filter((i) => i.severity === 'critical' || i.severity === 'high');
  const score = integrityScore(before.issues, remaining);

  let md = `# Phase 25 — Database Cleanup & Media Integrity Report

**Date:** ${new Date().toISOString()}  
**Marker:** ${MARKER}  
**Mode:** ${EXECUTE ? 'EXECUTE' : 'DRY-RUN'}

## Summary

| Metric | Value |
|--------|-------|
| Total issues found (initial) | ${before.issues.length} |
| Issues fixed automatically | ${before.fixesApplied.length} |
| Remaining issues | ${remaining.length} |
| Critical/high remaining | ${criticalRemaining.length} |
| **Database integrity score** | **${score}%** |
| R2 objects | ${before.r2ObjectCount} |
| Media URLs scanned | ${before.mediaRefCount} |

## Tables Scanned

${Object.entries(before.tables).map(([k, v]) => `- **${k}:** ${v}`).join('\n')}

## Fixes Applied

${before.fixesApplied.length === 0 ? '_None._' : before.fixesApplied.map((f) => `- ${f.table} \`${f.id}\` ${f.field}: \`${f.from}\` → \`${f.to}\``).join('\n')}

## Remaining Issues (${remaining.length})

${remaining.slice(0, 100).map((i) => `- [${i.severity}] ${i.table}/${i.field} (${i.recordId}): ${i.message}${i.url ? ` \`${i.url}\`` : ''}`).join('\n')}

## Manual Work

${criticalRemaining.length === 0 ? '_No critical/high manual work._' : criticalRemaining.map((i) => `- ${i.message}${i.url ? ` (\`${i.url}\`)` : ''}`).join('\n')}

**Integrity:** ${score === 100 && criticalRemaining.length === 0 ? '100%' : 'NOT 100%'}
`;

  return {
    md,
    score,
    remaining,
    criticalRemaining,
    totalFound: before.issues.length,
    fixed: before.fixesApplied.length,
  };
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const before = await scanDatabase('before');
  let after: Awaited<ReturnType<typeof scanDatabase>> | null = null;
  if (EXECUTE && before.fixesApplied.length > 0) after = await scanDatabase('after');
  const report = renderMarkdown(before, after);
  writeFileSync(join(OUT_DIR, 'database-cleanup-report.md'), report.md);
  writeFileSync(
    join(OUT_DIR, 'database-cleanup-report.json'),
    JSON.stringify(
      {
        marker: MARKER,
        totalIssuesFound: report.totalFound,
        issuesFixed: report.fixed,
        remainingIssues: report.remaining.length,
        integrityScore: report.score,
        fixes: before.fixesApplied,
        remaining: report.remaining,
      },
      null,
      2,
    ),
  );
  console.log(`\nReport: public/review/phase25/database-cleanup-report.md`);
  console.log(`Found: ${report.totalFound} | Fixed: ${report.fixed} | Remaining: ${report.remaining.length} | Score: ${report.score}%`);
  process.exit(
    report.score === 100 && report.criticalRemaining.length === 0 ? 0 : 1,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
