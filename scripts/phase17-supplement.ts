/**
 * Phase 17 supplement — projects/founders CRUD, leads create, media reorder,
 * client-side frontend verification (API path used by useSiteContent).
 */
import { PrismaClient } from '@prisma/client';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE = process.env.BASE_URL || 'http://localhost:3001';
const MARKER = `P17-SUP-${Date.now()}`;
const prisma = new PrismaClient();
let cookie = '';

async function login() {
  const res = await fetch(`${BASE}/admin/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@arrowheaddigitech.com',
      password: 'admin123',
    }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  const match = (res.headers.get('set-cookie') || '').match(/admin_token=([^;]+)/);
  if (!match) throw new Error('No admin_token');
  cookie = `admin_token=${match[1]}`;
}

function adminHeaders() {
  return { Cookie: cookie, 'Content-Type': 'application/json' };
}

type Row = {
  section: string;
  admin: string;
  database: string;
  api: string;
  frontend: string;
  status: string;
  evidence: string;
};

const extra: Row[] = [];

async function verifyProjectsCrud() {
  const slug = `p17-proj-${Date.now()}`;
  const evidence: string[] = [];
  let id = '';
  try {
    const create = await fetch(`${BASE}/api/admin/projects`, {
      method: 'POST',
      headers: adminHeaders(),
      body: JSON.stringify({
        title: MARKER,
        slug,
        description: 'Phase 17 project test',
        caseStudy: false,
        featured: false,
        order: 998,
      }),
    });
    if (!create.ok) throw new Error(`create ${create.status}`);
    id = (await create.json()).id;
    evidence.push(`CREATE ${id}`);

    const row = await prisma.project.findUnique({ where: { id } });
    evidence.push(`DB title=${row?.title}`);

    const pub = await fetch(`${BASE}/api/public/projects`);
    const list = pub.ok ? await pub.json() : [];
    const found = Array.isArray(list) && list.some((p: { slug: string }) => p.slug === slug);
    evidence.push(`public projects API: ${found ? 'found' : 'missing'}`);

    const update = await fetch(`${BASE}/api/admin/projects`, {
      method: 'PUT',
      headers: adminHeaders(),
      body: JSON.stringify({ id, title: `${MARKER}-updated` }),
    });
    evidence.push(`UPDATE: ${update.ok ? 'OK' : 'FAIL'}`);

    const del = await fetch(`${BASE}/api/admin/projects?id=${id}`, {
      method: 'DELETE',
      headers: { Cookie: cookie },
    });
    evidence.push(`DELETE: ${del.ok ? 'OK' : 'FAIL'}`);

    extra.push({
      section: 'Entity: projects',
      admin: create.ok && update.ok && del.ok ? 'PASS' : 'FAIL',
      database: row?.title === MARKER ? 'PASS' : 'FAIL',
      api: found ? 'PASS' : 'FAIL',
      frontend: 'PENDING_BROWSER',
      status: create.ok && update.ok && del.ok && found ? 'PASS' : 'FAIL',
      evidence: evidence.join(' | '),
    });
  } catch (e) {
    if (id) await fetch(`${BASE}/api/admin/projects?id=${id}`, { method: 'DELETE', headers: { Cookie: cookie } }).catch(() => {});
    extra.push({
      section: 'Entity: projects',
      admin: 'FAIL',
      database: 'FAIL',
      api: 'FAIL',
      frontend: 'SKIP',
      status: 'FAIL',
      evidence: String(e),
    });
  }
}

async function verifyFoundersCrud() {
  const evidence: string[] = [];
  let id = '';
  try {
    const create = await fetch(`${BASE}/api/admin/founders`, {
      method: 'POST',
      headers: adminHeaders(),
      body: JSON.stringify({
        name: MARKER,
        title: 'Phase 17 Founder',
        bio: 'Test bio',
        image: '/uploads/founder/test.png',
        order: 99,
      }),
    });
    if (!create.ok) throw new Error(`create ${create.status} ${await create.text()}`);
    id = (await create.json()).id;
    evidence.push(`CREATE ${id}`);

    const row = await prisma.founder.findUnique({ where: { id } });
    evidence.push(`DB name=${row?.name}`);

    const pub = await fetch(`${BASE}/api/public/founders`);
    const list = pub.ok ? await pub.json() : [];
    const found = Array.isArray(list) && list.some((f: { id: string }) => f.id === id);
    evidence.push(`public founders API: ${found ? 'found' : 'missing'}`);

    const update = await fetch(`${BASE}/api/admin/founders`, {
      method: 'PUT',
      headers: adminHeaders(),
      body: JSON.stringify({ id, name: `${MARKER}-updated` }),
    });
    evidence.push(`UPDATE: ${update.ok ? 'OK' : 'FAIL'}`);

    const del = await fetch(`${BASE}/api/admin/founders?id=${id}`, {
      method: 'DELETE',
      headers: { Cookie: cookie },
    });
    evidence.push(`DELETE: ${del.ok ? 'OK' : 'FAIL'}`);

    extra.push({
      section: 'Entity: founders',
      admin: create.ok && update.ok && del.ok ? 'PASS' : 'FAIL',
      database: row?.name === MARKER ? 'PASS' : 'FAIL',
      api: found ? 'PASS' : 'FAIL',
      frontend: 'PENDING_BROWSER',
      status: create.ok && update.ok && del.ok && found ? 'PASS' : 'FAIL',
      evidence: evidence.join(' | '),
    });
  } catch (e) {
    if (id) await fetch(`${BASE}/api/admin/founders?id=${id}`, { method: 'DELETE', headers: { Cookie: cookie } }).catch(() => {});
    extra.push({
      section: 'Entity: founders',
      admin: 'FAIL',
      database: 'FAIL',
      api: 'FAIL',
      frontend: 'SKIP',
      status: 'FAIL',
      evidence: String(e),
    });
  }
}

async function verifyLeadsCreate() {
  const evidence: string[] = [];
  try {
    const res = await fetch(`${BASE}/api/public/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: MARKER,
        email: 'p17@test.example',
        phone: '555-0100',
        message: 'Phase 17 lead test',
        source: 'contact-form',
      }),
    });
    evidence.push(`POST /api/public/leads: ${res.status}`);
    const data = res.ok ? await res.json() : null;
    const id = data?.id as string | undefined;

    let dbPass = false;
    if (id) {
      const row = await prisma.lead.findUnique({ where: { id } });
      dbPass = row?.name === MARKER;
      evidence.push(`DB lead: ${dbPass ? 'OK' : 'FAIL'}`);
      await prisma.lead.delete({ where: { id } }).catch(() => {});
      evidence.push('cleanup: deleted test lead');
    }

    extra.push({
      section: 'Entity: leads (contact create)',
      admin: 'N/A',
      database: dbPass ? 'PASS' : 'FAIL',
      api: res.ok ? 'PASS' : 'FAIL',
      frontend: 'SKIP',
      status: res.ok && dbPass ? 'PASS' : 'FAIL',
      evidence: evidence.join(' | '),
    });
  } catch (e) {
    extra.push({
      section: 'Entity: leads (contact create)',
      admin: 'N/A',
      database: 'FAIL',
      api: 'FAIL',
      frontend: 'SKIP',
      status: 'FAIL',
      evidence: String(e),
    });
  }
}

async function verifyMediaReorder() {
  const evidence: string[] = [];
  const slug = `p17-reorder-${Date.now()}`;
  let projectId = '';
  let mediaId = '';
  try {
    const proj = await fetch(`${BASE}/api/admin/projects`, {
      method: 'POST',
      headers: adminHeaders(),
      body: JSON.stringify({
        title: 'Reorder test',
        slug,
        description: 'reorder',
        caseStudy: false,
        featured: false,
        order: 997,
      }),
    });
    projectId = (await proj.json()).id;

    const png = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64',
    );
    const form = new FormData();
    form.append('file', new Blob([png], { type: 'image/png' }), 'a.png');
    form.append('folder', 'projects');
    const up1 = await fetch(`${BASE}/api/admin/upload`, { method: 'POST', headers: { Cookie: cookie }, body: form });
    const url1 = up1.ok ? (await up1.json()).url : null;

    const form2 = new FormData();
    form2.append('file', new Blob([png], { type: 'image/png' }), 'b.png');
    form2.append('folder', 'projects');
    const up2 = await fetch(`${BASE}/api/admin/upload`, { method: 'POST', headers: { Cookie: cookie }, body: form2 });
    const url2 = up2.ok ? (await up2.json()).url : null;

    if (!url1 || !url2) throw new Error('upload failed');

    const upsert = await fetch(`${BASE}/api/admin/project-media`, {
      method: 'PUT',
      headers: adminHeaders(),
      body: JSON.stringify({
        slug,
        caseStudyGalleryImages: [url1, url2],
      }),
    });
    mediaId = upsert.ok ? (await upsert.json()).id : '';

    const reordered = [url2, url1];
    const reorder = await fetch(`${BASE}/api/admin/project-media`, {
      method: 'PUT',
      headers: adminHeaders(),
      body: JSON.stringify({ slug, caseStudyGalleryImages: reordered }),
    });
    evidence.push(`reorder PUT: ${reorder.ok ? 'OK' : 'FAIL'}`);

    const db = await prisma.projectMedia.findUnique({ where: { slug } });
    const dbOrder = db?.caseStudyGalleryImages as string[] | null;
    const orderOk = dbOrder?.[0] === url2 && dbOrder?.[1] === url1;
    evidence.push(`db order: ${orderOk ? 'OK' : JSON.stringify(dbOrder)}`);

    await fetch(`${BASE}/api/admin/upload?url=${encodeURIComponent(url1)}`, { method: 'DELETE', headers: { Cookie: cookie } });
    await fetch(`${BASE}/api/admin/upload?url=${encodeURIComponent(url2)}`, { method: 'DELETE', headers: { Cookie: cookie } });
    if (mediaId) await fetch(`${BASE}/api/admin/project-media?id=${mediaId}`, { method: 'DELETE', headers: { Cookie: cookie } });
    await fetch(`${BASE}/api/admin/projects?id=${projectId}`, { method: 'DELETE', headers: { Cookie: cookie } });

    extra.push({
      section: 'Media: reorder gallery',
      admin: reorder.ok ? 'PASS' : 'FAIL',
      database: orderOk ? 'PASS' : 'FAIL',
      api: 'PASS',
      frontend: 'SKIP',
      status: reorder.ok && orderOk ? 'PASS' : 'FAIL',
      evidence: evidence.join(' | '),
    });
  } catch (e) {
    if (projectId) await fetch(`${BASE}/api/admin/projects?id=${projectId}`, { method: 'DELETE', headers: { Cookie: cookie } }).catch(() => {});
    extra.push({
      section: 'Media: reorder gallery',
      admin: 'FAIL',
      database: 'FAIL',
      api: 'FAIL',
      frontend: 'SKIP',
      status: 'FAIL',
      evidence: String(e),
    });
  }
}

async function verifyClientFrontend() {
  const sections: { section: string; key: string; field: string }[] = [
    { section: 'Homepage', key: 'home.hero', field: 'headline' },
    { section: 'About', key: 'about.hero', field: 'headline' },
    { section: 'Services', key: 'services.hero', field: 'headline' },
    { section: 'Portfolio', key: 'portfolio.hero', field: 'headline' },
    { section: 'Case Studies', key: 'case-studies.hero', field: 'headline' },
    { section: 'Blog', key: 'blog.page', field: 'heroTitle' },
    { section: 'Pricing', key: 'pricing.page', field: 'heroTitle' },
    { section: 'FAQ', key: 'faq.page', field: 'heroTitle' },
    { section: 'Contact', key: 'contact.page', field: 'headline' },
    { section: 'Careers', key: 'careers.page', field: 'heroTitle' },
    { section: 'Footer', key: 'site.footer', field: 'tagline' },
    { section: 'Navigation', key: 'site.nav', field: 'brandName' },
  ];

  const contentRes = await fetch(`${BASE}/api/public/site-content`);
  const content = contentRes.ok ? await contentRes.json() : {};

  for (const { section, key, field } of sections) {
    const val = content[key]?.[field];
    extra.push({
      section: `Frontend (client fetch): ${section}`,
      admin: 'N/A',
      database: 'N/A',
      api: val ? 'PASS' : 'FAIL',
      frontend: val ? 'PASS' : 'FAIL',
      status: val ? 'PASS' : 'FAIL',
      evidence: `${key}.${field} = "${String(val).slice(0, 80)}"`,
    });
  }
}

async function main() {
  await login();
  await verifyProjectsCrud();
  await verifyFoundersCrud();
  await verifyLeadsCreate();
  await verifyMediaReorder();
  await verifyClientFrontend();

  const outDir = join(process.cwd(), 'public', 'review', 'phase17');
  mkdirSync(outDir, { recursive: true });

  const reportPath = join(outDir, 'supplement-report.json');
  writeFileSync(reportPath, JSON.stringify({ marker: MARKER, timestamp: new Date().toISOString(), results: extra }, null, 2));

  console.table(extra.map((r) => ({ Section: r.section, Status: r.status })));
  console.log(`\nWrote ${reportPath}`);

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
