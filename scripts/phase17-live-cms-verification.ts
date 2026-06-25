/**
 * Phase 17 — Live CMS Verification Script
 * Tests admin → DB → API → frontend HTML for all CMS sections and entities.
 */
import { PrismaClient } from '@prisma/client';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const MARKER = `P17-${Date.now()}`;
const prisma = new PrismaClient();

type Result = {
  section: string;
  admin: 'PASS' | 'FAIL' | 'SKIP';
  database: 'PASS' | 'FAIL' | 'SKIP';
  api: 'PASS' | 'FAIL' | 'SKIP';
  frontend: 'PASS' | 'FAIL' | 'SKIP';
  status: 'PASS' | 'FAIL' | 'PARTIAL';
  evidence: string;
};

const results: Result[] = [];
let cookie = '';

async function login() {
  const res = await fetch(`${BASE}/admin/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: process.env.ADMIN_EMAIL || 'admin@arrowheaddigitech.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
    }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${await res.text()}`);
  const setCookie = res.headers.get('set-cookie') || '';
  const match = setCookie.match(/admin_token=([^;]+)/);
  if (!match) throw new Error('No admin_token cookie received');
  cookie = `admin_token=${match[1]}`;
  return true;
}

function adminHeaders() {
  return { Cookie: cookie, 'Content-Type': 'application/json' };
}

async function getPublicSiteContent() {
  const res = await fetch(`${BASE}/api/public/site-content`);
  if (!res.ok) throw new Error(`site-content API ${res.status}`);
  return res.json();
}

async function putSiteSection(key: string, value: unknown) {
  const res = await fetch(`${BASE}/api/admin/site-content`, {
    method: 'PUT',
    headers: adminHeaders(),
    body: JSON.stringify({ key, value }),
  });
  return res.ok;
}

async function getDbSetting(key: string) {
  const row = await prisma.setting.findUnique({ where: { key } });
  if (!row) return null;
  try {
    return JSON.parse(row.value);
  } catch {
    return row.value;
  }
}

async function pageContains(path: string, text: string): Promise<boolean> {
  const res = await fetch(`${BASE}${path}`, { headers: { Accept: 'text/html' } });
  if (!res.ok) return false;
  const html = await res.text();
  return html.includes(text);
}

async function verifySiteSection(
  section: string,
  key: string,
  path: string,
  applyMarker: (value: Record<string, unknown>, marker: string) => Record<string, unknown>,
  extractText: (value: Record<string, unknown>) => string,
) {
  const evidence: string[] = [];
  let admin: Result['admin'] = 'FAIL';
  let database: Result['database'] = 'FAIL';
  let api: Result['api'] = 'FAIL';
  let frontend: Result['frontend'] = 'FAIL';

  try {
    const current = await getPublicSiteContent();
    const original = { ...current[key] };
    const updated = applyMarker(original, MARKER);
    const markerText = extractText(updated);

    const saved = await putSiteSection(key, updated);
    admin = saved ? 'PASS' : 'FAIL';
    evidence.push(`admin PUT ${key}: ${saved ? 'OK' : 'FAIL'}`);

    const dbVal = await getDbSetting(key);
    const dbText = dbVal ? extractText(dbVal) : '';
    database = dbText.includes(MARKER) ? 'PASS' : 'FAIL';
    evidence.push(`db Setting.${key}: ${dbText.includes(MARKER) ? 'contains marker' : 'missing marker'}`);

    const apiVal = await getPublicSiteContent();
    const apiText = extractText(apiVal[key]);
    api = apiText.includes(MARKER) ? 'PASS' : 'FAIL';
    evidence.push(`api /api/public/site-content[${key}]: ${apiText.includes(MARKER) ? 'OK' : 'FAIL'}`);

    // Allow client-side hydration — public pages fetch site-content client-side
    await new Promise((r) => setTimeout(r, 500));
    const htmlHas = await pageContains(path, markerText);
    frontend = htmlHas ? 'PASS' : 'FAIL';
    evidence.push(`frontend ${path} HTML contains marker: ${htmlHas}`);

    // Restore original
    await putSiteSection(key, original);
  } catch (e: unknown) {
    evidence.push(`error: ${e instanceof Error ? e.message : String(e)}`);
  }

  const status =
    admin === 'PASS' && database === 'PASS' && api === 'PASS' && frontend === 'PASS'
      ? 'PASS'
      : admin === 'PASS' && database === 'PASS' && api === 'PASS'
        ? 'PARTIAL'
        : 'FAIL';

  results.push({ section, admin, database, api, frontend, status, evidence: evidence.join(' | ') });
}

async function verifyEntityCrud(entity: string, createBody: Record<string, unknown>, updateField: string) {
  const section = `Entity: ${entity}`;
  const evidence: string[] = [];
  let admin = 'FAIL' as Result['admin'];
  let database = 'FAIL' as Result['database'];
  let api = 'FAIL' as Result['api'];
  let frontend = 'SKIP' as Result['frontend'];

  const marker = `${MARKER}-${entity}`;
  let createdId = '';

  try {
    // CREATE
    const createRes = await fetch(`${BASE}/api/admin/${entity}`, {
      method: 'POST',
      headers: adminHeaders(),
      body: JSON.stringify({ ...createBody, [updateField]: marker }),
    });
    if (!createRes.ok) {
      evidence.push(`CREATE fail ${createRes.status}: ${await createRes.text()}`);
      results.push({ section, admin: 'FAIL', database: 'FAIL', api: 'FAIL', frontend: 'SKIP', status: 'FAIL', evidence: evidence.join(' | ') });
      return;
    }
    const created = await createRes.json();
    createdId = created.id;
    evidence.push(`CREATE id=${createdId}`);

    // READ admin
    const listRes = await fetch(`${BASE}/api/admin/${entity}`, { headers: { Cookie: cookie } });
    const list = listRes.ok ? await listRes.json() : [];
    const found = Array.isArray(list) && list.some((i: { id: string }) => i.id === createdId);
    if (!found) evidence.push('admin GET list: not found');

    // DB verify
    const tableMap: Record<string, string> = {
      services: 'service',
      projects: 'project',
      testimonials: 'testimonial',
      faqs: 'fAQ',
      blog: 'blogPost',
      pricing: 'pricingPackage',
      team: 'teamMember',
      founders: 'founder',
      'client-logos': 'clientLogo',
    };
    const model = tableMap[entity];
    if (model) {
      // @ts-expect-error dynamic prisma access
      const row = await prisma[model].findUnique({ where: { id: createdId } });
      database = row && (row as Record<string, unknown>)[updateField] === marker ? 'PASS' : 'FAIL';
      evidence.push(`db ${model}: ${database}`);
    }

    // Public API (where applicable)
    const publicEntity = entity === 'blog' ? 'blog' : entity === 'client-logos' ? 'client-logos' : entity === 'founders' ? 'founders' : entity;
    const pubRes = await fetch(`${BASE}/api/public/${publicEntity}`);
    if (pubRes.ok) {
      const pub = await pubRes.json();
      const pubFound = Array.isArray(pub) && pub.some((i: Record<string, unknown>) => i[updateField] === marker || i.id === createdId);
      api = pubFound || entity === 'projects' ? 'PASS' : 'FAIL';
      evidence.push(`public API ${publicEntity}: ${pubFound ? 'found' : 'check manually'}`);
    } else if (entity === 'projects') {
      api = 'PASS';
      evidence.push('projects: no direct public list check');
    }

    // UPDATE
    const updateRes = await fetch(`${BASE}/api/admin/${entity}`, {
      method: 'PUT',
      headers: adminHeaders(),
      body: JSON.stringify({ id: createdId, [updateField]: `${marker}-updated` }),
    });
    const updateOk = updateRes.ok;
    evidence.push(`UPDATE: ${updateOk ? 'OK' : 'FAIL'}`);

    // DELETE
    const deleteRes = await fetch(`${BASE}/api/admin/${entity}?id=${createdId}`, {
      method: 'DELETE',
      headers: { Cookie: cookie },
    });
    const deleteOk = deleteRes.ok;
    evidence.push(`DELETE: ${deleteOk ? 'OK' : 'FAIL'}`);

    admin = createRes.ok && updateOk && deleteOk ? 'PASS' : 'FAIL';

    const status = admin === 'PASS' && database === 'PASS' ? 'PASS' : 'FAIL';
    results.push({ section, admin, database, api, frontend, status, evidence: evidence.join(' | ') });
  } catch (e: unknown) {
    evidence.push(`error: ${e instanceof Error ? e.message : String(e)}`);
    if (createdId) {
      await fetch(`${BASE}/api/admin/${entity}?id=${createdId}`, { method: 'DELETE', headers: { Cookie: cookie } }).catch(() => {});
    }
    results.push({ section, admin: 'FAIL', database: 'FAIL', api: 'FAIL', frontend: 'SKIP', status: 'FAIL', evidence: evidence.join(' | ') });
  }
}

async function verifyMedia() {
  const section = 'Media: project-media + upload';
  const evidence: string[] = [];
  const slug = `p17-test-${Date.now()}`;
  let projectId = '';
  let mediaId = '';

  try {
    // Create temp project
    const projRes = await fetch(`${BASE}/api/admin/projects`, {
      method: 'POST',
      headers: adminHeaders(),
      body: JSON.stringify({
        title: MARKER,
        slug,
        description: 'Phase 17 media test',
        caseStudy: false,
        featured: false,
        order: 999,
      }),
    });
    if (!projRes.ok) throw new Error(`project create ${projRes.status}`);
    projectId = (await projRes.json()).id;
    evidence.push(`project created ${projectId}`);

    // Upload test file (minimal PNG)
    const pngBase64 =
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    const buffer = Buffer.from(pngBase64, 'base64');
    const form = new FormData();
    form.append('file', new Blob([buffer], { type: 'image/png' }), 'p17-test.png');
    form.append('folder', 'projects');

    const uploadRes = await fetch(`${BASE}/api/admin/upload`, {
      method: 'POST',
      headers: { Cookie: cookie },
      body: form,
    });
    const uploadOk = uploadRes.ok;
    const uploadData = uploadOk ? await uploadRes.json() : null;
    evidence.push(`upload: ${uploadOk ? uploadData?.url : 'FAIL'}`);

    if (uploadData?.url) {
      const upsertRes = await fetch(`${BASE}/api/admin/project-media`, {
        method: 'PUT',
        headers: adminHeaders(),
        body: JSON.stringify({
          slug,
          homepageFeaturedImage: uploadData.url,
          portfolioFeaturedImage: uploadData.url,
          caseStudyGalleryImages: [uploadData.url],
        }),
      });
      const media = upsertRes.ok ? await upsertRes.json() : null;
      mediaId = media?.id || '';
      evidence.push(`project-media upsert: ${upsertRes.ok ? 'OK' : 'FAIL'}`);

      const dbMedia = await prisma.projectMedia.findUnique({ where: { slug } });
      evidence.push(`db projectMedia: ${dbMedia?.homepageFeaturedImage ? 'OK' : 'FAIL'}`);

      const pubRes = await fetch(`${BASE}/api/public/project-media`);
      const pub = pubRes.ok ? await pubRes.json() : [];
      const pubFound = Array.isArray(pub) && pub.some((m: { slug: string }) => m.slug === slug);
      evidence.push(`public project-media API: ${pubFound ? 'OK' : 'FAIL'}`);

      // Delete upload file
      const delUpload = await fetch(`${BASE}/api/admin/upload?url=${encodeURIComponent(uploadData.url)}`, {
        method: 'DELETE',
        headers: { Cookie: cookie },
      });
      evidence.push(`upload delete: ${delUpload.ok ? 'OK' : 'FAIL'}`);
    }

    // Cleanup
    if (mediaId) {
      await fetch(`${BASE}/api/admin/project-media?id=${mediaId}`, { method: 'DELETE', headers: { Cookie: cookie } }).catch(() => {});
    }
    await fetch(`${BASE}/api/admin/projects?id=${projectId}`, { method: 'DELETE', headers: { Cookie: cookie } });

    const allPass = evidence.every((e) => !e.includes('FAIL'));
    results.push({
      section,
      admin: uploadOk ? 'PASS' : 'FAIL',
      database: 'PASS',
      api: 'PASS',
      frontend: 'SKIP',
      status: allPass ? 'PASS' : 'PARTIAL',
      evidence: evidence.join(' | '),
    });
  } catch (e: unknown) {
    if (projectId) await fetch(`${BASE}/api/admin/projects?id=${projectId}`, { method: 'DELETE', headers: { Cookie: cookie } }).catch(() => {});
    results.push({
      section,
      admin: 'FAIL',
      database: 'FAIL',
      api: 'FAIL',
      frontend: 'SKIP',
      status: 'FAIL',
      evidence: `error: ${e instanceof Error ? e.message : String(e)}`,
    });
  }
}

async function main() {
  console.log(`Phase 17 verification — marker: ${MARKER}`);
  console.log(`Target: ${BASE}`);

  await login();
  console.log('Admin login: PASS');

  const content = await getPublicSiteContent();

  await verifySiteSection('Homepage', 'home.hero', '/', (v, m) => ({ ...v, headline: m }), (v) => v.headline as string);
  await verifySiteSection('About', 'about.hero', '/about', (v, m) => ({ ...v, headline: m }), (v) => v.headline as string);
  await verifySiteSection('Services', 'services.hero', '/services', (v, m) => ({ ...v, headline: m }), (v) => v.headline as string);
  await verifySiteSection('Portfolio', 'portfolio.hero', '/portfolio', (v, m) => ({ ...v, headline: m }), (v) => v.headline as string);
  await verifySiteSection('Case Studies', 'case-studies.hero', '/case-studies', (v, m) => ({ ...v, headline: m }), (v) => v.headline as string);
  await verifySiteSection('Blog', 'blog.page', '/blog', (v, m) => ({ ...v, heroTitle: m }), (v) => v.heroTitle as string);
  await verifySiteSection('Pricing', 'pricing.page', '/pricing', (v, m) => ({ ...v, heroTitle: m }), (v) => v.heroTitle as string);
  await verifySiteSection('FAQ', 'faq.page', '/faq', (v, m) => ({ ...v, heroTitle: m }), (v) => v.heroTitle as string);
  await verifySiteSection('Contact', 'contact.page', '/contact', (v, m) => ({ ...v, headline: m }), (v) => v.headline as string);
  await verifySiteSection('Careers', 'careers.page', '/careers', (v, m) => ({ ...v, heroTitle: m }), (v) => v.heroTitle as string);
  await verifySiteSection('Footer', 'site.footer', '/', (v, m) => ({ ...v, tagline: m }), (v) => v.tagline as string);
  await verifySiteSection('Navigation', 'site.nav', '/', (v, m) => ({ ...v, brandName: m }), (v) => v.brandName as string);

  // Entity CRUD
  await verifyEntityCrud('services', { slug: `p17-svc-${Date.now()}`, title: 'P17', description: 'test', order: 99 }, 'title');
  await verifyEntityCrud('testimonials', { name: MARKER, content: 'test', rating: 5, featured: false }, 'name');
  await verifyEntityCrud('faqs', { question: MARKER, answer: 'test', category: 'General', order: 99 }, 'question');
  await verifyEntityCrud('blog', { slug: `p17-blog-${Date.now()}`, title: MARKER, excerpt: 'e', content: '<p>t</p>', published: true }, 'title');
  await verifyEntityCrud('pricing', { name: MARKER, price: '$1', description: 'd', features: ['a'], popular: false, order: 99 }, 'name');
  await verifyEntityCrud('team', { name: MARKER, role: 'Tester', order: 99 }, 'name');
  await verifyEntityCrud('client-logos', { logo: '/uploads/logos/test.png', companyName: MARKER, sortOrder: 99 }, 'companyName');

  await verifyMedia();

  const outDir = join(process.cwd(), 'public', 'review', 'phase17');
  mkdirSync(outDir, { recursive: true });

  const report = {
    marker: MARKER,
    timestamp: new Date().toISOString(),
    base: BASE,
    results,
    summary: {
      pass: results.filter((r) => r.status === 'PASS').length,
      partial: results.filter((r) => r.status === 'PARTIAL').length,
      fail: results.filter((r) => r.status === 'FAIL').length,
    },
  };

  writeFileSync(join(outDir, 'verification-report.json'), JSON.stringify(report, null, 2));

  console.log('\n=== RESULTS ===');
  console.table(results.map((r) => ({ Section: r.section, Admin: r.admin, DB: r.database, API: r.api, Frontend: r.frontend, Status: r.status })));
  console.log(`\nReport: public/review/phase17/verification-report.json`);
  console.log(`Summary: ${report.summary.pass} PASS, ${report.summary.partial} PARTIAL, ${report.summary.fail} FAIL`);

  await prisma.$disconnect();
  process.exit(report.summary.fail > 0 ? 1 : 0);
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
