import { PrismaClient } from '@prisma/client';

const BASE = process.env.TEST_BASE || 'http://localhost:3000';
const TS = Date.now();
const SUFFIX = `p15final-${TS}`;
const prisma = new PrismaClient();

const report = { testedAt: new Date().toISOString(), base: BASE, suffix: SUFFIX, entities: {}, auth: {}, uploads: {}, leads: {}, failures: [] };

function fail(section, op, evidence) {
  report.failures.push({ section, op, evidence });
}

function ent(name) {
  if (!report.entities[name]) report.entities[name] = {};
  return report.entities[name];
}

let cookie = '';

async function login() {
  const res = await fetch(`${BASE}/admin/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@arrowheaddigitech.com', password: 'admin123' }),
  });
  const cookies = res.headers.getSetCookie?.() || [];
  cookie = cookies.map((c) => c.split(';')[0]).find((c) => c.startsWith('admin_token=')) || '';
  return res.ok && !!cookie;
}

async function admin(entity, method, body) {
  const res = await fetch(`${BASE}/api/admin/${entity}`, {
    method,
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

async function pub(entity) {
  const res = await fetch(`${BASE}/api/public/${entity}`);
  const data = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data };
}

const dbMap = {
  services: (id) => prisma.service.findUnique({ where: { id } }),
  projects: (id) => prisma.project.findUnique({ where: { id } }),
  'project-media': (id) => prisma.projectMedia.findUnique({ where: { id } }),
  founders: (id) => prisma.founder.findUnique({ where: { id } }),
  'client-logos': (id) => prisma.clientLogo.findUnique({ where: { id } }),
  testimonials: (id) => prisma.testimonial.findUnique({ where: { id } }),
  faqs: (id) => prisma.fAQ.findUnique({ where: { id } }),
  blog: (id) => prisma.blogPost.findUnique({ where: { id } }),
  pricing: (id) => prisma.pricingPackage.findUnique({ where: { id } }),
  team: (id) => prisma.teamMember.findUnique({ where: { id } }),
  leads: (id) => prisma.lead.findUnique({ where: { id } }),
};

const publicEntities = new Set(['services', 'projects', 'testimonials', 'faqs', 'project-media', 'founders', 'client-logos']);

async function testCrud(key, createBody, updateBody, verify, createViaPut = false) {
  const e = ent(key);

  const list0 = await admin(key, 'GET');
  if (!list0.ok) { e.READ = 'FAIL'; fail(key, 'READ-list', `status=${list0.status}`); }

  const created = createViaPut
    ? await admin(key, 'PUT', createBody)
    : await admin(key, 'POST', createBody);
  const id = created.data?.id;
  const dbCreate = id ? await dbMap[key](id) : null;
  e.CREATE = created.ok && dbCreate ? 'PASS' : 'FAIL';
  if (e.CREATE === 'FAIL') fail(key, 'CREATE', `status=${created.status} ${JSON.stringify(created.data)}`);

  if (!id) { e.READ = e.UPDATE = e.DELETE = 'FAIL'; return null; }

  const list1 = await admin(key, 'GET');
  let inAdmin = list1.ok && Array.isArray(list1.data) && list1.data.some((r) => r.id === id);
  let inPublic = true;
  if (publicEntities.has(key)) {
    const p = await pub(key);
    inPublic = p.ok && Array.isArray(p.data) && p.data.some((r) => r.id === id);
  }
  e.READ = inAdmin && inPublic ? 'PASS' : 'FAIL';
  if (e.READ === 'FAIL') fail(key, 'READ', `admin=${inAdmin} public=${inPublic} id=${id}`);

  const upd = await admin(key, 'PUT', { id, ...updateBody });
  const dbUpd = await dbMap[key](id);
  let verifyOk = true;
  for (const [k, v] of Object.entries(verify)) {
    if (upd.data?.[k] !== v || dbUpd?.[k] !== v) verifyOk = false;
  }
  e.UPDATE = upd.ok && verifyOk ? 'PASS' : 'FAIL';
  if (e.UPDATE === 'FAIL') fail(key, 'UPDATE', `status=${upd.status} verify=${JSON.stringify(verify)}`);

  const del = await admin(key, 'DELETE', { id });
  const gone = !(await dbMap[key](id));
  const list2 = await admin(key, 'GET');
  const still = list2.ok && Array.isArray(list2.data) && list2.data.some((r) => r.id === id);
  e.DELETE = del.ok && gone && !still ? 'PASS' : 'FAIL';
  if (e.DELETE === 'FAIL') fail(key, 'DELETE', `del=${del.status} gone=${gone} still=${still}`);

  return id;
}

async function testAuth() {
  const a = report.auth;
  a.Login = (await login()) ? 'PASS' : 'FAIL';

  const noAuth = await fetch(`${BASE}/api/admin/services`);
  a.UnauthenticatedBlocked = noAuth.status === 401 ? 'PASS' : 'FAIL';

  const withAuth = await admin('services', 'GET');
  a.AuthenticatedAccess = withAuth.ok ? 'PASS' : 'FAIL';

  const page = await fetch(`${BASE}/admin/dashboard`, { redirect: 'manual' });
  a.ProtectedRoutes = [302, 307, 401].includes(page.status) ? 'PASS' : 'FAIL';

  const logout = await fetch(`${BASE}/admin/api/auth/logout`, { method: 'POST', headers: { Cookie: cookie } });
  a.Logout = logout.ok ? 'PASS' : 'FAIL';

  const afterNoCookie = await fetch(`${BASE}/api/admin/services`);
  a.PostLogoutNoCookie = afterNoCookie.status === 401 ? 'PASS' : 'FAIL';

  const afterStaleJwt = await fetch(`${BASE}/api/admin/services`, { headers: { Cookie: cookie } });
  a.StaleJwtAfterLogout = afterStaleJwt.status === 200 ? 'STILL_VALID' : 'REVOKED';

  await login();
}

const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');

async function testUpload(label, subdir) {
  const form = new FormData();
  form.append('file', new Blob([PNG], { type: 'image/png' }), `${SUFFIX}.png`);
  if (subdir) form.append('subdir', subdir);
  const up = await fetch(`${BASE}/api/admin/upload`, { method: 'POST', headers: { Cookie: cookie }, body: form });
  const upData = await up.json().catch(() => ({}));
  const img = upData.url ? await fetch(`${BASE}${upData.url}`) : { ok: false };
  const fn = upData.url?.split('/').pop();
  const del = fn ? await fetch(`${BASE}/api/admin/upload?filename=${fn}`, { method: 'DELETE', headers: { Cookie: cookie } }) : { ok: false, status: 0 };
  const pass = up.ok && img.ok && del.ok;
  report.uploads[label] = { result: pass ? 'PASS' : 'FAIL', uploadStatus: up.status, url: upData.url, imageOk: img.ok, deleteStatus: del.status };
  if (!pass) fail('Uploads', label, JSON.stringify(report.uploads[label]));
}

async function testLeadsExtra() {
  const email = `${SUFFIX}@contact.test`;
  const res = await fetch(`${BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Contact Test', email, message: 'hello', intent: 'web', budget: '5k' }),
  });
  const body = await res.json().catch(() => ({}));
  const db = await prisma.lead.findFirst({ where: { email }, orderBy: { createdAt: 'desc' } });
  report.leads.ContactForm = res.ok && db ? 'PASS' : 'FAIL';
  report.leads.ContactDbInsert = db ? 'PASS' : 'FAIL';
  report.leads.ContactApiBody = body;
  if (!db) fail('Leads', 'ContactForm', JSON.stringify(body));

  const vis = await admin('leads', 'GET');
  report.leads.AdminVisibility = vis.ok && vis.data?.some((l) => l.id === db?.id) ? 'PASS' : 'FAIL';

  if (db) {
    const st = await admin('leads', 'PUT', { id: db.id, status: 'contacted' });
    const db2 = await prisma.lead.findUnique({ where: { id: db.id } });
    report.leads.StatusUpdate = st.ok && db2?.status === 'contacted' ? 'PASS' : 'FAIL';
    await admin('leads', 'DELETE', { id: db.id });
  }
}

async function main() {
  await testAuth();

  await testCrud('services', { slug: `svc-${SUFFIX}`, title: 'S', description: 'd', order: 999 }, { title: 'S2' }, { title: 'S2' });
  await testCrud('testimonials', { name: 'T', content: 'c', rating: 5 }, { content: 'c2' }, { content: 'c2' });

  const slug = `proj-${SUFFIX}`;
  const pid = (await admin('projects', 'POST', { slug, title: 'P', description: 'd', order: 999 })).data?.id;
  const ep = ent('projects');
  const dbP = pid ? await dbMap.projects(pid) : null;
  ep.CREATE = pid && dbP && Array.isArray(dbP.images) ? 'PASS' : 'FAIL';
  ep.READ = 'FAIL'; ep.UPDATE = 'FAIL'; ep.DELETE = 'FAIL';
  if (pid) {
    const l = await admin('projects', 'GET');
    ep.READ = l.ok && l.data.some((r) => r.id === pid) && (await pub('projects')).data?.some((r) => r.id === pid) ? 'PASS' : 'FAIL';
    const u = await admin('projects', 'PUT', { id: pid, title: 'P2' });
    ep.UPDATE = u.ok && (await dbMap.projects(pid))?.title === 'P2' ? 'PASS' : 'FAIL';
    await testCrud('project-media', { slug, homepageFeaturedImage: '/uploads/a.png' }, { slug, homepageFeaturedImage: '/uploads/b.png' }, { homepageFeaturedImage: '/uploads/b.png' }, true);
    const d = await admin('projects', 'DELETE', { id: pid });
    ep.DELETE = d.ok && !(await dbMap.projects(pid)) ? 'PASS' : 'FAIL';
  }

  await testCrud('founders', { name: 'F', position: 'CEO', biography: 'b' }, { biography: 'b2' }, { biography: 'b2' });
  await testCrud('client-logos', { logo: '/uploads/l.png', companyName: 'C', sortOrder: 99 }, { companyName: 'C2' }, { companyName: 'C2' });
  await testCrud('faqs', { question: 'Q?', answer: 'A', order: 99 }, { answer: 'A2' }, { answer: 'A2' });
  await testCrud('blog', { slug: `blog-${SUFFIX}`, title: 'B', excerpt: 'e', content: '<p>c</p>' }, { title: 'B2' }, { title: 'B2' });
  await testCrud('pricing', { name: 'Pkg', price: '$1', description: 'd', features: ['f'], order: 99 }, { price: '$2' }, { price: '$2' });
  await testCrud('team', { name: 'M', role: 'Dev', order: 99 }, { role: 'Lead' }, { role: 'Lead' });
  await testCrud('leads', { name: 'L', email: `lead-${SUFFIX}@t.com`, message: 'm', status: 'new' }, { status: 'closed' }, { status: 'closed' });

  await testLeadsExtra();
  await testUpload('Founder Upload', 'founder');
  await testUpload('Client Logo Upload', 'logos');
  await testUpload('Service Thumbnail Upload', 'services');
  await testUpload('Project Media Upload', 'projects/yalaride');

  report.summary = {
    failureCount: report.failures.length,
    verdict: report.failures.length === 0 ? 'ALL_PASS' : 'HAS_FAILURES',
  };
  console.log(JSON.stringify(report, null, 2));
}

main().finally(() => prisma.$disconnect());
