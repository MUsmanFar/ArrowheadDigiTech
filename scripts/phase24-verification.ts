/**
 * Phase 24 — Production readiness verification
 * Run: BASE_URL=http://localhost:3002 npx tsx scripts/phase24-verification.ts
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import nodemailer from 'nodemailer';

const BASE = process.env.BASE_URL || 'http://localhost:3002';
const OUT = join(process.cwd(), 'public', 'review', 'phase24');
const MARKER = `P24-${Date.now()}`;

type Status = 'PASS' | 'FAIL' | 'WARN';
type Check = { category: string; name: string; status: Status; evidence: string };
const checks: Check[] = [];

function record(category: string, name: string, status: Status, evidence: string) {
  checks.push({ category, name, status, evidence });
  console.log(`${status === 'PASS' ? '✓' : status === 'FAIL' ? '✗' : '!'} [${category}] ${name}: ${evidence}`);
}

function readEnv(): Record<string, string> {
  const envPath = join(process.cwd(), '.env');
  if (!existsSync(envPath)) return {};
  const out: Record<string, string> = {};
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)="?([^"]*)"?\s*$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

function fileContains(path: string, needle: string): boolean {
  if (!existsSync(path)) return false;
  return readFileSync(path, 'utf8').includes(needle);
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const env = readEnv();

  // --- SMTP ---
  const smtpVars = ['EMAIL_HOST', 'EMAIL_USER', 'EMAIL_PASSWORD', 'EMAIL_FROM'];
  const smtpSet = smtpVars.every((k) => Boolean(env[k]?.trim()));
  record('smtp', 'SMTP env vars present', smtpSet ? 'PASS' : 'FAIL', smtpSet ? 'all set' : 'missing vars');

  const placeholder =
    env.EMAIL_USER?.includes('your-email') || env.EMAIL_PASSWORD?.includes('your-app-password');
  record(
    'smtp',
    'SMTP credentials not placeholder',
    placeholder ? 'FAIL' : 'PASS',
    placeholder ? 'placeholder Gmail creds in .env' : 'non-placeholder values',
  );

  if (smtpSet && !placeholder) {
    try {
      const transporter = nodemailer.createTransport({
        host: env.EMAIL_HOST,
        port: parseInt(env.EMAIL_PORT || '587', 10),
        secure: false,
        auth: { user: env.EMAIL_USER, pass: env.EMAIL_PASSWORD },
      });
      await transporter.verify();
      record('smtp', 'SMTP transporter verify()', 'PASS', 'connection accepted');
    } catch (e) {
      record('smtp', 'SMTP transporter verify()', 'FAIL', String(e));
    }
  } else {
    record('smtp', 'SMTP transporter verify()', 'FAIL', 'skipped — placeholder or missing creds');
  }

  const contactMarker = `P24-contact-${Date.now()}@example.com`;
  const contactRes = await fetch(`${BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Phase24 Verify',
      email: contactMarker,
      message: `Phase 24 SMTP verification ${MARKER}`,
    }),
  });
  record(
    'smtp',
    'Contact API accepts submission',
    contactRes.ok ? 'PASS' : 'FAIL',
    `HTTP ${contactRes.status}`,
  );
  record(
    'smtp',
    'Real email delivery',
    placeholder ? 'FAIL' : 'WARN',
    placeholder
      ? 'cannot verify delivery with placeholder SMTP creds'
      : 'verify manually in inbox — automated delivery not confirmed',
  );

  // --- SEO ---
  for (const [name, path] of [
    ['opengraph-image route', '/opengraph-image'],
    ['twitter-image route', '/twitter-image'],
  ] as const) {
    const res = await fetch(`${BASE}${path}`);
    record('seo', name, res.ok ? 'PASS' : 'FAIL', `HTTP ${res.status}`);
  }

  record(
    'seo',
    'opengraph-image.tsx exists',
    existsSync(join(process.cwd(), 'app/opengraph-image.tsx')) ? 'PASS' : 'FAIL',
    'app/opengraph-image.tsx',
  );
  record(
    'seo',
    'page-metadata OG URLs',
    fileContains(join(process.cwd(), 'lib/page-metadata.ts'), 'opengraph-image') ? 'PASS' : 'FAIL',
    'lib/page-metadata.ts',
  );

  const faqHtml = await (await fetch(`${BASE}/faq`)).text();
  record('seo', 'FAQPage schema on /faq', faqHtml.includes('FAQPage') ? 'PASS' : 'FAIL', faqHtml.includes('FAQPage') ? 'found' : 'missing');

  const blogRes = await fetch(`${BASE}/api/public/blog`);
  if (blogRes.ok) {
    const posts = await blogRes.json();
    const slug = Array.isArray(posts) && posts[0]?.slug;
    if (slug) {
      const postHtml = await (await fetch(`${BASE}/blog/${slug}`)).text();
      record(
        'seo',
        'BlogPosting schema',
        postHtml.includes('BlogPosting') ? 'PASS' : 'FAIL',
        postHtml.includes('BlogPosting') ? `/${slug}` : 'missing',
      );
    } else {
      record('seo', 'BlogPosting schema', 'WARN', 'no blog posts to test');
    }
  }

  const svcRes = await fetch(`${BASE}/api/public/services`);
  if (svcRes.ok) {
    const services = await svcRes.json();
    const slug = Array.isArray(services) && services[0]?.slug;
    if (slug) {
      const svcHtml = await (await fetch(`${BASE}/services/${slug}`)).text();
      record('seo', 'Service schema', svcHtml.includes('"@type":"Service"') || svcHtml.includes('@type":"Service') ? 'PASS' : 'FAIL', `/${slug}`);
      record('seo', 'BreadcrumbList on service', svcHtml.includes('BreadcrumbList') ? 'PASS' : 'FAIL', svcHtml.includes('BreadcrumbList') ? 'found' : 'missing');
    }
  }

  // --- Performance / dead code ---
  const deadFiles = [
    'components/home/HeroSection.tsx',
    'components/portfolio/FeaturedProjects.tsx',
    'components/3d/Hero3D.tsx',
    'components/ui/textarea.tsx',
  ];
  for (const f of deadFiles) {
    record('performance', `removed ${f}`, !existsSync(join(process.cwd(), f)) ? 'PASS' : 'FAIL', existsSync(join(process.cwd(), f)) ? 'still exists' : 'deleted');
  }

  const mediaSrc = readFileSync(join(process.cwd(), 'lib/media.ts'), 'utf8');
  record(
    'performance',
    'lib/media.ts types-only',
    !mediaSrc.includes('export async function') ? 'PASS' : 'FAIL',
    mediaSrc.includes('export async function') ? 'fetch helpers remain' : 'types only',
  );

  // --- Security ---
  record(
    'security',
    'CSP header in next.config',
    fileContains(join(process.cwd(), 'next.config.js'), 'Content-Security-Policy') ? 'PASS' : 'FAIL',
    'next.config.js',
  );
  for (const path of ['/api/services', '/api/projects', '/api/testimonials']) {
    const res = await fetch(`${BASE}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
    record('security', `POST ${path} deprecated`, res.status === 410 ? 'PASS' : 'FAIL', `HTTP ${res.status}`);
  }
  const unauth = await fetch(`${BASE}/api/admin/services`);
  record('security', 'admin API without cookie', unauth.status === 401 ? 'PASS' : 'FAIL', `HTTP ${unauth.status}`);

  // --- CMS keys ---
  const cmsKeys = [
    'home.featured-work',
    'home.metrics-labels',
    'portfolio.showcase',
    'services.list-intro',
    'services.detail-labels',
    'about.section-labels',
    'contact.form',
  ];
  const defaults = readFileSync(join(process.cwd(), 'lib/site-content-defaults.ts'), 'utf8');
  for (const key of cmsKeys) {
    record('cms', `CMS key ${key}`, defaults.includes(`'${key}'`) ? 'PASS' : 'FAIL', key);
  }

  // --- Deployment ---
  for (const k of ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET', 'R2_PUBLIC_URL', 'DATABASE_URL']) {
    record('deployment', k, env[k]?.trim() ? 'PASS' : 'FAIL', env[k]?.trim() ? 'SET' : 'MISSING');
  }
  if (env.R2_ACCESS_KEY_ID) {
    record('deployment', 'R2_ACCESS_KEY_ID length', env.R2_ACCESS_KEY_ID.length === 32 ? 'PASS' : 'FAIL', `${env.R2_ACCESS_KEY_ID.length} chars`);
  }

  // --- Public pages ---
  const pages = ['/', '/about', '/services', '/portfolio', '/contact', '/faq'];
  for (const p of pages) {
    const res = await fetch(`${BASE}${p}`);
    record('frontend', p, res.ok ? 'PASS' : 'FAIL', `HTTP ${res.status}`);
  }

  const summary = {
    marker: MARKER,
    timestamp: new Date().toISOString(),
    baseUrl: BASE,
    totals: {
      pass: checks.filter((c) => c.status === 'PASS').length,
      fail: checks.filter((c) => c.status === 'FAIL').length,
      warn: checks.filter((c) => c.status === 'WARN').length,
    },
    checks,
  };

  writeFileSync(join(OUT, 'verification-report.json'), JSON.stringify(summary, null, 2));
  console.log(`\nReport: public/review/phase24/verification-report.json`);
  console.log(`PASS ${summary.totals.pass} | FAIL ${summary.totals.fail} | WARN ${summary.totals.warn}`);
  if (summary.totals.fail > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
