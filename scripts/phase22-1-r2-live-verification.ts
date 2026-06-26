/**
 * Phase 22.1 — Live R2 integration verification (upload, DB, delete, replace)
 * Run: npx tsx scripts/phase22-1-r2-live-verification.ts
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';

function loadDotEnv() {
  const envPath = join(process.cwd(), '.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    if (!line || line.trim().startsWith('#') || !line.includes('=')) continue;
    const i = line.indexOf('=');
    const k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!process.env[k]) process.env[k] = v;
  }
}

loadDotEnv();

import { existsInR2 } from '../lib/r2-storage';
import { getR2Config, isR2Configured, shouldUseR2Storage } from '../lib/r2-config';
import { isR2MediaUrl } from '../lib/media-url';

const BASE = process.env.BASE_URL || 'http://localhost:3001';
const MARKER = `P221-${Date.now()}`;
const OUT_DIR = join(process.cwd(), 'public', 'review', 'phase22');
const prisma = new PrismaClient();

type Result = { name: string; ok: boolean; evidence: string };
const results: Result[] = [];
let cookie = '';
const cleanupUrls: string[] = [];

function log(name: string, ok: boolean, evidence: string) {
  results.push({ name, ok, evidence });
  console.log(`${ok ? 'PASS' : 'FAIL'} | ${name} | ${evidence}`);
}

function pngBlob(): Blob {
  const buf = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64',
  );
  return new Blob([buf], { type: 'image/png' });
}

async function login() {
  const res = await fetch(`${BASE}/admin/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: process.env.ADMIN_EMAIL || 'admin@arrowheaddigitech.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
    }),
  });
  const setCookie = res.headers.get('set-cookie') || '';
  const m = setCookie.match(/admin_token=([^;]+)/);
  if (!res.ok || !m) throw new Error(`Login failed HTTP ${res.status}`);
  cookie = `admin_token=${m[1]}`;
}

async function upload(subdir: string, label: string) {
  const form = new FormData();
  form.append('file', pngBlob(), `${MARKER}-${label}.png`);
  form.append('subdir', subdir);
  const res = await fetch(`${BASE}/api/admin/upload`, {
    method: 'POST',
    headers: { Cookie: cookie },
    body: form,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${label} upload HTTP ${res.status}: ${text}`);
  const data = JSON.parse(text) as { url: string; storage?: string };
  cleanupUrls.push(data.url);
  return data;
}

async function del(url: string) {
  const res = await fetch(`${BASE}/api/admin/upload?url=${encodeURIComponent(url)}`, {
    method: 'DELETE',
    headers: { Cookie: cookie },
  });
  return res.ok;
}

async function verifyUpload(subdir: string, label: string) {
  const config = getR2Config()!;
  const data = await upload(subdir, label);
  const okStorage = data.storage === 'r2';
  const okPrefix = data.url.startsWith(config.publicUrl);
  const okR2Url = isR2MediaUrl(data.url);
  const okExists = await existsInR2(data.url);
  const imgRes = await fetch(data.url);
  log(
    `upload:${label}`,
    okStorage && okPrefix && okR2Url && okExists && imgRes.ok,
    `url=${data.url} storage=${data.storage} bucket_exists=${okExists} http=${imgRes.status}`,
  );
  return data.url;
}

async function verifyReplace(subdir: string) {
  const first = (await upload(subdir, 'replace-a')).url;
  await del(first);
  const second = (await upload(subdir, 'replace-b')).url;
  log('replace', first !== second && isR2MediaUrl(second), `${first} -> ${second}`);
  await del(second);
  cleanupUrls.pop();
}

async function verifyDelete(subdir: string) {
  const url = (await upload(subdir, 'delete-test')).url;
  const removed = await del(url);
  const stillExists = await existsInR2(url);
  log('delete', removed && !stillExists, `removed=${removed} exists_after=${stillExists}`);
  const idx = cleanupUrls.indexOf(url);
  if (idx >= 0) cleanupUrls.splice(idx, 1);
}

async function saveFounder(url: string) {
  const rows = await prisma.founder.findMany({ take: 1 });
  if (rows[0]) {
    await prisma.founder.update({ where: { id: rows[0].id }, data: { photo: url } });
    const row = await prisma.founder.findUnique({ where: { id: rows[0].id } });
    log('db:founder', !!row?.photo?.startsWith(getR2Config()!.publicUrl), `photo=${row?.photo}`);
    return rows[0].id;
  }
  const created = await prisma.founder.create({
    data: { name: 'R2 Test', position: 'CEO', biography: MARKER, photo: url, profileKey: `r2-${MARKER}` },
  });
  log('db:founder', created.photo?.startsWith(getR2Config()!.publicUrl) ?? false, `photo=${created.photo}`);
  return created.id;
}

async function saveClientLogo(url: string) {
  const created = await prisma.clientLogo.create({
    data: { logo: url, companyName: `R2 Test ${MARKER}`, sortOrder: 9999 },
  });
  log('db:client-logo', created.logo.startsWith(getR2Config()!.publicUrl), `logo=${created.logo}`);
  return created.id;
}

async function saveService(url: string) {
  const svc = await prisma.service.findFirst({ orderBy: { order: 'asc' } });
  if (!svc) throw new Error('No service row');
  await prisma.service.update({ where: { id: svc.id }, data: { thumbnail: url } });
  const row = await prisma.service.findUnique({ where: { id: svc.id } });
  log('db:service', !!row?.thumbnail?.startsWith(getR2Config()!.publicUrl), `thumbnail=${row?.thumbnail}`);
  return svc.id;
}

async function saveProjectMedia(url: string) {
  const project = await prisma.project.findFirst({ orderBy: { order: 'asc' } });
  if (!project) throw new Error('No project row in database');
  const slug = project.slug;
  let pm = await prisma.projectMedia.findUnique({ where: { slug } });
  if (!pm) {
    pm = await prisma.projectMedia.create({
      data: {
        slug,
        homepageFeaturedImage: url,
        portfolioFeaturedImage: '',
        portfolioGridImage: '',
        caseStudyHeroImage: '',
        caseStudyGalleryImages: [],
        mobileScreenshots: [],
      },
    });
  } else {
    pm = await prisma.projectMedia.update({
      where: { id: pm.id },
      data: { homepageFeaturedImage: url },
    });
  }
  log(
    'db:project-media',
    !!pm.homepageFeaturedImage?.startsWith(getR2Config()!.publicUrl),
    `homepageFeaturedImage=${pm.homepageFeaturedImage}`,
  );
  return pm.id;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const keys = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET', 'R2_PUBLIC_URL'];
  for (const k of keys) {
    log(`env:${k}`, !!process.env[k]?.trim(), process.env[k]?.trim() ? 'SET' : 'MISSING');
  }
  log('config:r2', isR2Configured(), String(shouldUseR2Storage()));

  await login();
  log('auth', true, 'admin login OK');

  const paths = [
    { subdir: 'founder', label: 'founder' },
    { subdir: 'logos', label: 'client-logos' },
    { subdir: 'services', label: 'services' },
    { subdir: 'projects/yalaride', label: 'project-media' },
  ] as const;

  const urls: Record<string, string> = {};
  for (const p of paths) {
    urls[p.label] = await verifyUpload(p.subdir, p.label);
  }

  await verifyDelete('logos');
  await verifyReplace('founder');

  const founderId = await saveFounder(urls.founder);
  const logoId = await saveClientLogo(urls['client-logos']);
  const serviceId = await saveService(urls.services);
  const pmId = await saveProjectMedia(urls['project-media']);

  // Restore service/founder to avoid leaving test data — keep evidence URLs in report
  const founderBefore = await prisma.founder.findUnique({ where: { id: founderId } });
  const serviceBefore = await prisma.service.findUnique({ where: { id: serviceId } });

  const report = {
    marker: MARKER,
    timestamp: new Date().toISOString(),
    baseUrl: BASE,
    r2PublicUrl: getR2Config()?.publicUrl,
    storageBackend: 'r2',
    uploadUrls: urls,
    results,
    dbEvidence: {
      founderPhoto: founderBefore?.photo,
      clientLogo: (await prisma.clientLogo.findUnique({ where: { id: logoId } }))?.logo,
      serviceThumbnail: serviceBefore?.thumbnail,
      projectMediaHomepage: (await prisma.projectMedia.findUnique({ where: { id: pmId } }))?.homepageFeaturedImage,
    },
  };

  writeFileSync(join(OUT_DIR, 'phase22-1-live-report.json'), JSON.stringify(report, null, 2));

  // Cleanup test logo row and uploaded objects
  await prisma.clientLogo.delete({ where: { id: logoId } }).catch(() => undefined);
  for (const url of cleanupUrls) {
    await del(url).catch(() => undefined);
  }
  await prisma.$disconnect();

  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.error('\nFAILED:', failed.map((f) => f.name).join(', '));
    process.exit(1);
  }
  console.log('\nALL PASS — report:', join(OUT_DIR, 'phase22-1-live-report.json'));
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
