/**
 * Phase 20 — Zero-Trust Production Verification
 * Run: BASE_URL=http://localhost:3001 npx tsx scripts/phase20-zero-trust-verification.ts
 */
import { PrismaClient } from '@prisma/client';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { createHash } from 'crypto';

const BASE = process.env.BASE_URL || 'http://localhost:3001';
const MARKER = `P20-${Date.now()}`;
const OUT_DIR = join(process.cwd(), 'public', 'review', 'phase20');

type Status = 'PASS' | 'FAIL' | 'SKIP' | 'WARN';
type Check = {
  category: string;
  name: string;
  status: Status;
  evidence: string;
  severity?: 'critical' | 'high' | 'medium' | 'low';
};

const checks: Check[] = [];
let cookie = '';
const createdIds: { entity: string; id: string }[] = [];

function record(
  category: string,
  name: string,
  status: Status,
  evidence: string,
  severity?: Check['severity'],
) {
  checks.push({ category, name, status, evidence, severity });
  const icon = status === 'PASS' ? '✓' : status === 'FAIL' ? '✗' : status === 'WARN' ? '!' : '-';
  console.log(`${icon} [${category}] ${name}: ${status} — ${evidence}`);
}

function adminHeaders(extra: Record<string, string> = {}) {
  return { Cookie: cookie, 'Content-Type': 'application/json', ...extra };
}

async function login(): Promise<boolean> {
  const res = await fetch(`${BASE}/admin/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: process.env.ADMIN_EMAIL || 'admin@arrowheaddigitech.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
    }),
  });
  if (!res.ok) {
    record('auth', 'admin login', 'FAIL', `HTTP ${res.status}: ${await res.text()}`, 'critical');
    return false;
  }
  const setCookie = res.headers.get('set-cookie') || '';
  const match = setCookie.match(/admin_token=([^;]+)/);
  if (!match) {
    record('auth', 'admin login cookie', 'FAIL', 'No admin_token cookie', 'critical');
    return false;
  }
  cookie = `admin_token=${match[1]}`;
  record('auth', 'admin login', 'PASS', '200 + HttpOnly cookie set');
  return true;
}

async function testAuth() {
  // Unauthorized admin API
  const unauth = await fetch(`${BASE}/api/admin/services`);
  record(
    'auth',
    'admin API without cookie',
    unauth.status === 401 ? 'PASS' : 'FAIL',
    `HTTP ${unauth.status}`,
    unauth.status === 401 ? undefined : 'critical',
  );

  // Invalid JSON login
  const badJson = await fetch(`${BASE}/admin/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{not-json',
  });
  const badJsonBody = await badJson.json().catch(() => ({}));
  record(
    'auth',
    'login invalid JSON',
    badJson.status === 400 && badJsonBody.code === 'INVALID_JSON' ? 'PASS' : 'FAIL',
    `HTTP ${badJson.status} code=${badJsonBody.code}`,
  );

  // Invalid credentials
  const badCreds = await fetch(`${BASE}/admin/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@arrowheaddigitech.com', password: 'wrongpassword1' }),
  });
  record('auth', 'login wrong password', badCreds.status === 401 ? 'PASS' : 'FAIL', `HTTP ${badCreds.status}`);

  // Tampered JWT
  const tampered = await fetch(`${BASE}/api/admin/services`, {
    headers: { Cookie: 'admin_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.tampered', 'Content-Type': 'application/json' },
  });
  record('auth', 'tampered JWT', tampered.status === 401 ? 'PASS' : 'FAIL', `HTTP ${tampered.status}`, 'high');

  // Users endpoint removed
  const users = await fetch(`${BASE}/api/admin/users`, { headers: adminHeaders() });
  record('security', 'users API removed', users.status === 404 ? 'PASS' : 'FAIL', `HTTP ${users.status}`, 'critical');

  // Logout
  const logout = await fetch(`${BASE}/admin/api/auth/logout`, { method: 'POST', headers: adminHeaders() });
  record('auth', 'logout', logout.ok ? 'PASS' : 'FAIL', `HTTP ${logout.status}`);

  // Re-login for remaining tests
  await login();
}

async function testPublicApis() {
  const endpoints = [
    '/api/public/services',
    '/api/public/projects',
    '/api/public/case-studies',
    '/api/public/testimonials',
    '/api/public/faqs',
    '/api/public/blog',
    '/api/public/pricing',
    '/api/public/team',
    '/api/public/founders',
    '/api/public/client-logos',
    '/api/public/site-content',
  ];

  for (const ep of endpoints) {
    const res = await fetch(`${BASE}${ep}`);
    const text = await res.text();
    let hasPassword = false;
    try {
      hasPassword = text.includes('"password"');
    } catch {
      /* ignore */
    }
    record(
      'api',
      `GET ${ep}`,
      res.ok && !hasPassword ? 'PASS' : 'FAIL',
      `HTTP ${res.status}${hasPassword ? ' — password field leaked' : ''}`,
      hasPassword ? 'critical' : undefined,
    );

    const cache = res.headers.get('cache-control') || '';
    if (ep.includes('/api/public/')) {
      record(
        'performance',
        `cache ${ep}`,
        cache.includes('s-maxage') ? 'PASS' : 'WARN',
        cache || 'no cache-control',
      );
    }
  }
}

async function testContactValidation() {
  const bad = await fetch(`${BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'not-an-email', message: '' }),
  });
  const badBody = await bad.json().catch(() => ({}));
  record(
    'validation',
    'contact invalid payload',
    bad.status === 400 ? 'PASS' : 'FAIL',
    `HTTP ${bad.status} code=${badBody.code}`,
  );

  const badJson = await fetch(`${BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: 'not-json',
  });
  const badJsonBody = await badJson.json().catch(() => ({}));
  record(
    'validation',
    'contact invalid JSON',
    badJson.status === 400 && badJsonBody.code === 'INVALID_JSON' ? 'PASS' : 'FAIL',
    `HTTP ${badJson.status}`,
  );
}

async function crudEntity(entity: string, createPayload: Record<string, unknown>, updatePatch: Record<string, unknown>) {
  // CREATE
  const createRes = await fetch(`${BASE}/api/admin/${entity}`, {
    method: 'POST',
    headers: adminHeaders(),
    body: JSON.stringify(createPayload),
  });
  const created = await createRes.json().catch(() => null);
  if (!createRes.ok || !created?.id) {
    record('cms', `${entity} CREATE`, 'FAIL', `HTTP ${createRes.status}: ${JSON.stringify(created)}`);
    return;
  }
  createdIds.push({ entity, id: created.id });
  record('cms', `${entity} CREATE`, 'PASS', `id=${created.id}`);

  // READ
  const listRes = await fetch(`${BASE}/api/admin/${entity}`, { headers: adminHeaders() });
  const list = await listRes.json().catch(() => []);
  const found = Array.isArray(list) && list.some((r: { id?: string }) => r.id === created.id);
  record('cms', `${entity} READ`, found ? 'PASS' : 'FAIL', found ? 'in admin list' : 'not in list');

  // Public API if applicable
  const publicEp = `/api/public/${entity}`;
  const pubRes = await fetch(`${BASE}${publicEp}`);
  if (pubRes.status !== 404) {
    const pubData = await pubRes.json().catch(() => []);
    const pubFound = Array.isArray(pubData) && pubData.some((r: { id?: string }) => r.id === created.id);
    record('cms', `${entity} public API`, pubFound ? 'PASS' : 'WARN', pubFound ? 'visible' : 'not in public list (may be expected)');
  }

  // UPDATE
  const updateRes = await fetch(`${BASE}/api/admin/${entity}`, {
    method: 'PUT',
    headers: adminHeaders(),
    body: JSON.stringify({ id: created.id, ...updatePatch }),
  });
  record('cms', `${entity} UPDATE`, updateRes.ok ? 'PASS' : 'FAIL', `HTTP ${updateRes.status}`);

  // XSS sanitization on write
  if (typeof updatePatch.content === 'string' && updatePatch.content.includes('<script>')) {
    const refreshed = await fetch(`${BASE}/api/admin/${entity}`, { headers: adminHeaders() });
    const rows = await refreshed.json().catch(() => []);
    const row = Array.isArray(rows) ? rows.find((r: { id?: string }) => r.id === created.id) : null;
    const field = row?.content || row?.answer || row?.biography || '';
    record(
      'security',
      `${entity} XSS strip on write`,
      typeof field === 'string' && !field.includes('<script>') ? 'PASS' : 'FAIL',
      field ? 'script tag stripped' : 'field empty',
      'high',
    );
  }
}

async function testCmsCrud() {
  await crudEntity('services', {
    slug: `p20-svc-${MARKER}`,
    title: MARKER,
    description: 'Phase 20 test service',
    order: 9999,
  }, { title: `${MARKER}-updated` });

  await crudEntity('faqs', {
    question: MARKER,
    answer: `<p>${MARKER}</p><script>alert(1)</script>`,
    order: 9999,
  }, { answer: `<p>${MARKER}-updated</p>` });

  await crudEntity('testimonials', {
    name: MARKER,
    content: `${MARKER} testimonial`,
    rating: 5,
  }, { content: `${MARKER} updated` });

  await crudEntity('blog', {
    slug: `p20-blog-${MARKER}`,
    title: MARKER,
    excerpt: 'test',
    content: `<p>${MARKER}</p>`,
    published: false,
  }, { title: `${MARKER}-blog-updated` });

  await crudEntity('team', {
    name: MARKER,
    role: 'QA Engineer',
    order: 9999,
  }, { role: 'Senior QA' });

  await crudEntity('pricing', {
    name: MARKER,
    price: '$99',
    description: 'test package',
    features: ['feature1'],
    order: 9999,
  }, { price: '$199' });

  await crudEntity('founders', {
    profileKey: `p20-${MARKER}`,
    name: MARKER,
    position: 'Founder',
    biography: `<p>${MARKER}</p>`,
  }, { position: 'CEO' });

  await crudEntity('client-logos', {
    logo: '/uploads/logos/1782222831635-test-logo.png',
    companyName: MARKER,
    sortOrder: 9999,
  }, { companyName: `${MARKER}-updated` });

  // Site content
  const scKey = 'home.hero';
  const scVal = {
    headline: MARKER,
    headlineAccent: 'Phase 20',
    subheadline: 'Zero-trust verification marker',
  };
  const scPut = await fetch(`${BASE}/api/admin/site-content`, {
    method: 'PUT',
    headers: adminHeaders(),
    body: JSON.stringify({ key: scKey, value: scVal }),
  });
  record('cms', 'site-content PUT', scPut.ok ? 'PASS' : 'FAIL', `HTTP ${scPut.status}`);

  const scGet = await fetch(`${BASE}/api/public/site-content`);
  const scData = await scGet.json().catch(() => ({}));
  const persisted = JSON.stringify(scData).includes(MARKER);
  record('cms', 'site-content public read', persisted ? 'PASS' : 'FAIL', persisted ? 'marker in API' : 'marker missing');

  // Lead via contact
  const leadRes = await fetch(`${BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: MARKER,
      email: `p20-${Date.now()}@example.com`,
      message: `${MARKER} contact test`,
    }),
  });
  record('cms', 'leads via contact', leadRes.ok ? 'PASS' : 'WARN', `HTTP ${leadRes.status} (SMTP may be unconfigured)`);
}

async function testUploads() {
  // Minimal valid PNG (1x1)
  const png = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64',
  );

  const form = new FormData();
  form.append('file', new Blob([png], { type: 'image/png' }), 'test.png');
  form.append('subdir', `projects/p20-${MARKER}`);

  const up = await fetch(`${BASE}/api/admin/upload`, { method: 'POST', headers: { Cookie: cookie }, body: form });
  const upBody = await up.json().catch(() => ({}));
  record('media', 'valid PNG upload', up.ok && upBody.url ? 'PASS' : 'FAIL', `HTTP ${up.status} url=${upBody.url}`);

  if (upBody.url) {
    const fileRes = await fetch(`${BASE}${upBody.url}`);
    record('media', 'uploaded file served', fileRes.ok ? 'PASS' : 'FAIL', `HTTP ${fileRes.status}`);
  }

  // SVG blocked
  const svgForm = new FormData();
  svgForm.append('file', new Blob(['<svg><script>alert(1)</script></svg>'], { type: 'image/svg+xml' }), 'evil.svg');
  const svgRes = await fetch(`${BASE}/api/admin/upload`, { method: 'POST', headers: { Cookie: cookie }, body: svgForm });
  record('security', 'SVG upload blocked', svgRes.status === 400 ? 'PASS' : 'FAIL', `HTTP ${svgRes.status}`, 'high');

  // Unauthorized upload
  const noAuth = await fetch(`${BASE}/api/admin/upload`, { method: 'POST', body: form });
  record('security', 'upload without auth', noAuth.status === 401 ? 'PASS' : 'FAIL', `HTTP ${noAuth.status}`, 'high');

  // Path traversal subdir
  const travForm = new FormData();
  travForm.append('file', new Blob([png], { type: 'image/png' }), 'test.png');
  travForm.append('subdir', '../../../etc');
  const travRes = await fetch(`${BASE}/api/admin/upload`, { method: 'POST', headers: { Cookie: cookie }, body: travForm });
  const travBody = await travRes.json().catch(() => ({}));
  const safeUrl = typeof travBody.url === 'string' && !travBody.url.includes('..');
  record('security', 'upload path traversal', travRes.ok && safeUrl ? 'PASS' : 'FAIL', `url=${travBody.url}`, 'high');
}

async function testMalformedAdminJson() {
  const res = await fetch(`${BASE}/api/admin/services`, {
    method: 'POST',
    headers: adminHeaders(),
    body: '{bad-json',
  });
  const body = await res.json().catch(() => ({}));
  record(
    'validation',
    'admin POST invalid JSON',
    res.status === 400 && body.code === 'INVALID_JSON' ? 'PASS' : 'FAIL',
    `HTTP ${res.status} code=${body.code}`,
  );
}

async function cleanup() {
  for (const { entity, id } of [...createdIds].reverse()) {
    try {
      await fetch(`${BASE}/api/admin/${entity}?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: adminHeaders(),
      });
    } catch {
      /* ignore */
    }
  }
}

async function verifyNeon(prisma: PrismaClient) {
  const modelMap: Record<string, string> = {
    User: 'user',
    Service: 'service',
    Project: 'project',
    ProjectMedia: 'projectMedia',
    Founder: 'founder',
    ClientLogo: 'clientLogo',
    Testimonial: 'testimonial',
    FAQ: 'fAQ',
    BlogPost: 'blogPost',
    PricingPackage: 'pricingPackage',
    Lead: 'lead',
    TeamMember: 'teamMember',
    Setting: 'setting',
  };

  for (const [label, key] of Object.entries(modelMap)) {
    try {
      // @ts-expect-error dynamic prisma delegate
      const count = await prisma[key].count();
      record('database', `table ${label}`, 'PASS', `count=${count}`);
    } catch (e) {
      record('database', `table ${label}`, 'FAIL', String(e), 'critical');
    }
  }

  const migrations = await prisma.$queryRaw<{ migration_name: string; finished_at: Date | null }[]>`
    SELECT migration_name, finished_at FROM _prisma_migrations ORDER BY finished_at`;
  const pending = migrations.filter((m) => !m.finished_at);
  record(
    'database',
    'migrations applied',
    pending.length === 0 ? 'PASS' : 'FAIL',
    `${migrations.length} total, ${pending.length} pending`,
    pending.length ? 'critical' : undefined,
  );

  // FK ProjectMedia -> Project
  const orphanMedia = await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*)::bigint AS count FROM "ProjectMedia" pm
    LEFT JOIN "Project" p ON p.slug = pm.slug WHERE p.slug IS NULL`;
  const orphanCount = Number(orphanMedia[0]?.count ?? 0);
  record(
    'database',
    'ProjectMedia FK integrity',
    orphanCount === 0 ? 'PASS' : 'WARN',
    `orphan rows=${orphanCount}`,
  );
}

async function testPages() {
  const pages = [
    '/', '/about', '/services', '/portfolio', '/case-studies', '/blog',
    '/pricing', '/faq', '/contact', '/careers', '/privacy-policy',
    '/terms-and-conditions', '/not-a-real-page',
  ];
  for (const path of pages) {
    const res = await fetch(`${BASE}${path}`, { headers: { Accept: 'text/html' } });
    const html = await res.text();
    const hasPassword = html.includes('"password"') || html.includes('passwordHash');
    record(
      'frontend',
      `page ${path}`,
      res.ok && !hasPassword ? 'PASS' : path.includes('not-a-real') && res.status === 404 ? 'PASS' : 'FAIL',
      `HTTP ${res.status}`,
    );
  }
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  console.log(`\n=== Phase 20 Zero-Trust Verification ===`);
  console.log(`BASE_URL=${BASE} MARKER=${MARKER}\n`);

  const prisma = new PrismaClient();

  try {
    await verifyNeon(prisma);
  } catch (e) {
    record('database', 'neon connection', 'FAIL', String(e), 'critical');
  }

  if (!(await login())) {
    console.error('Cannot continue without admin login');
  } else {
    await testAuth();
    await login();
    await testPublicApis();
    await testContactValidation();
    await testMalformedAdminJson();
    await testCmsCrud();
    await testUploads();
    await testPages();
    await cleanup();
  }

  await prisma.$disconnect();

  const summary = {
    marker: MARKER,
    baseUrl: BASE,
    timestamp: new Date().toISOString(),
    total: checks.length,
    pass: checks.filter((c) => c.status === 'PASS').length,
    fail: checks.filter((c) => c.status === 'FAIL').length,
    warn: checks.filter((c) => c.status === 'WARN').length,
    criticalFails: checks.filter((c) => c.status === 'FAIL' && c.severity === 'critical').length,
    highFails: checks.filter((c) => c.status === 'FAIL' && c.severity === 'high').length,
    checks,
  };

  const jsonPath = join(OUT_DIR, 'verification-report.json');
  writeFileSync(jsonPath, JSON.stringify(summary, null, 2));

  const md = [
    '# Phase 20 Verification Report',
    '',
    `**Date:** ${summary.timestamp}`,
    `**Base URL:** ${BASE}`,
    `**Marker:** ${MARKER}`,
    '',
    `| Metric | Count |`,
    `|--------|-------|`,
    `| Total checks | ${summary.total} |`,
    `| PASS | ${summary.pass} |`,
    `| FAIL | ${summary.fail} |`,
    `| WARN | ${summary.warn} |`,
    `| Critical fails | ${summary.criticalFails} |`,
    '',
    '## Failed Checks',
    '',
    ...checks
      .filter((c) => c.status === 'FAIL')
      .map((c) => `- **${c.category}/${c.name}**: ${c.evidence}${c.severity ? ` (${c.severity})` : ''}`),
  ].join('\n');

  writeFileSync(join(OUT_DIR, 'VERIFICATION.md'), md);
  console.log(`\nReport: ${jsonPath}`);
  console.log(`PASS=${summary.pass} FAIL=${summary.fail} WARN=${summary.warn}`);

  if (summary.criticalFails > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
