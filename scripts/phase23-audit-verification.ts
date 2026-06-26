/**
 * Phase 23 — Automated production readiness checks
 * Run: BASE_URL=http://localhost:3001 npx tsx scripts/phase23-audit-verification.ts
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const BASE = process.env.BASE_URL || 'http://localhost:3001';
const OUT = join(process.cwd(), 'public', 'review', 'phase23');
const MARKER = `P23-${Date.now()}`;

type Check = { category: string; name: string; status: 'PASS' | 'FAIL' | 'WARN'; evidence: string };
const checks: Check[] = [];

function record(category: string, name: string, status: Check['status'], evidence: string) {
  checks.push({ category, name, status, evidence });
  console.log(`${status === 'PASS' ? '✓' : status === 'FAIL' ? '✗' : '!'} [${category}] ${name}: ${evidence}`);
}

async function main() {
  mkdirSync(OUT, { recursive: true });

  // Security: legacy POST deprecated
  for (const path of ['/api/services', '/api/projects', '/api/testimonials']) {
    const res = await fetch(`${BASE}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
    record('security', `POST ${path} deprecated`, res.status === 410 ? 'PASS' : 'FAIL', `HTTP ${res.status}`);
  }

  // Admin unauth
  const unauth = await fetch(`${BASE}/api/admin/services`);
  record('security', 'admin API without cookie', unauth.status === 401 ? 'PASS' : 'FAIL', `HTTP ${unauth.status}`);

  // Public pages
  const pages = ['/', '/about', '/services', '/portfolio', '/case-studies', '/pricing', '/contact', '/faq', '/blog', '/careers', '/testimonials', '/privacy-policy', '/terms-and-conditions'];
  for (const p of pages) {
    const res = await fetch(`${BASE}${p}`);
    record('frontend', p, res.ok ? 'PASS' : 'FAIL', `HTTP ${res.status}`);
  }

  // Admin redirect
  const adminRoot = await fetch(`${BASE}/admin`, { redirect: 'manual' });
  record('architecture', '/admin redirect', adminRoot.status === 307 || adminRoot.status === 308 ? 'PASS' : 'WARN', `HTTP ${adminRoot.status}`);

  // SEO files
  const sitemap = await fetch(`${BASE}/sitemap.xml`);
  const sitemapText = await sitemap.text();
  record('seo', 'sitemap.xml', sitemap.ok ? 'PASS' : 'FAIL', `HTTP ${sitemap.status}`);
  record('seo', 'sitemap includes /services/', sitemapText.includes('/services/') ? 'PASS' : 'WARN', sitemapText.includes('/services/') ? 'found' : 'missing');

  const robots = await fetch(`${BASE}/robots.txt`);
  record('seo', 'robots.txt', robots.ok ? 'PASS' : 'FAIL', `HTTP ${robots.status}`);

  // R2 env (length only)
  const envPath = join(process.cwd(), '.env');
  if (existsSync(envPath)) {
    const env = readFileSync(envPath, 'utf8');
    for (const k of ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET', 'R2_PUBLIC_URL']) {
      const line = env.split(/\r?\n/).find((l) => l.startsWith(`${k}=`));
      record('deployment', k, line && line.length > k.length + 1 ? 'PASS' : 'WARN', line ? 'SET' : 'MISSING');
    }
  }

  // Source checks
  record('security', 'page-metadata helper', existsSync(join(process.cwd(), 'lib/page-metadata.ts')) ? 'PASS' : 'FAIL', 'lib/page-metadata.ts');
  record('architecture', 'admin page redirect', existsSync(join(process.cwd(), 'app/admin/page.tsx')) ? 'PASS' : 'FAIL', 'app/admin/page.tsx');

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
  console.log(`\nReport: public/review/phase23/verification-report.json`);
  if (summary.totals.fail > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
