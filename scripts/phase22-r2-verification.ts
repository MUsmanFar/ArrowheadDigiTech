/**
 * Phase 22 — Cloudflare R2 media storage verification
 * Run: BASE_URL=http://localhost:3001 npx tsx scripts/phase22-r2-verification.ts
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import {
  buildObjectKey,
  isLocalMediaUrl,
  isManagedMediaUrl,
  isR2MediaUrl,
  objectKeyFromMediaUrl,
  publicUrlForObjectKey,
} from '../lib/media-url';
import { getR2Config, isR2Configured, shouldUseR2Storage } from '../lib/r2-config';

const BASE = process.env.BASE_URL || 'http://localhost:3001';
const OUT_DIR = join(process.cwd(), 'public', 'review', 'phase22');
const MARKER = `P22-${Date.now()}`;

type Status = 'PASS' | 'FAIL' | 'SKIP' | 'WARN';
type Check = {
  category: string;
  name: string;
  status: Status;
  evidence: string;
};

const checks: Check[] = [];
let cookie = '';
const uploadedUrls: string[] = [];

function record(category: string, name: string, status: Status, evidence: string) {
  checks.push({ category, name, status, evidence });
  const icon = status === 'PASS' ? '✓' : status === 'FAIL' ? '✗' : status === 'WARN' ? '!' : '-';
  console.log(`${icon} [${category}] ${name}: ${status} — ${evidence}`);
}

function adminHeaders(extra: Record<string, string> = {}) {
  return { Cookie: cookie, ...extra };
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
    record('auth', 'admin login', 'FAIL', `HTTP ${res.status}`);
    return false;
  }
  const setCookie = res.headers.get('set-cookie') || '';
  const match = setCookie.match(/admin_token=([^;]+)/);
  if (!match) {
    record('auth', 'admin cookie', 'FAIL', 'No admin_token');
    return false;
  }
  cookie = `admin_token=${match[1]}`;
  record('auth', 'admin login', 'PASS', '200');
  return true;
}

function testMediaUrlHelpers() {
  const local = '/uploads/logos/test.png';
  record('helpers', 'isLocalMediaUrl', isLocalMediaUrl(local) ? 'PASS' : 'FAIL', local);

  const key = buildObjectKey('logos', 'test.png');
  record('helpers', 'buildObjectKey', key === 'uploads/logos/test.png' ? 'PASS' : 'FAIL', key);

  const fromLocal = objectKeyFromMediaUrl(local);
  record(
    'helpers',
    'objectKeyFromLocal',
    fromLocal === 'uploads/logos/test.png' ? 'PASS' : 'FAIL',
    String(fromLocal),
  );

  if (isR2Configured()) {
    const config = getR2Config()!;
    const r2Url = `${config.publicUrl}/uploads/founder/test.jpg`;
    record('helpers', 'isR2MediaUrl', isR2MediaUrl(r2Url) ? 'PASS' : 'FAIL', r2Url);
    const r2Key = objectKeyFromMediaUrl(r2Url);
    record(
      'helpers',
      'objectKeyFromR2',
      r2Key === 'uploads/founder/test.jpg' ? 'PASS' : 'FAIL',
      String(r2Key),
    );
    try {
      const pub = publicUrlForObjectKey('uploads/projects/x.png');
      record('helpers', 'publicUrlForObjectKey', pub.startsWith(config.publicUrl) ? 'PASS' : 'FAIL', pub);
    } catch (e) {
      record('helpers', 'publicUrlForObjectKey', 'FAIL', String(e));
    }
  } else {
    record('helpers', 'R2 URL helpers', 'SKIP', 'R2 not configured in env');
  }

  record(
    'helpers',
    'isManagedMediaUrl local',
    isManagedMediaUrl('/uploads/a.png') ? 'PASS' : 'FAIL',
    'local path',
  );
}

function minimalPngBuffer(): Buffer {
  // 1x1 PNG
  return Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64',
  );
}

async function testUploadFlow(subdir: string, label: string) {
  const png = minimalPngBuffer();
  const form = new FormData();
  form.append('file', new Blob([png], { type: 'image/png' }), `${MARKER}-${label}.png`);
  form.append('subdir', subdir);

  const res = await fetch(`${BASE}/api/admin/upload`, {
    method: 'POST',
    headers: adminHeaders(),
    body: form,
  });

  if (!res.ok) {
    record('upload', label, 'FAIL', `POST HTTP ${res.status}: ${await res.text()}`);
    return null;
  }

  const data = (await res.json()) as { url: string; storage?: string; mime?: string };
  uploadedUrls.push(data.url);

  const storageOk = shouldUseR2Storage()
    ? data.storage === 'r2' && isR2MediaUrl(data.url)
    : data.storage === 'local' && isLocalMediaUrl(data.url);

  record(
    'upload',
    label,
    storageOk ? 'PASS' : 'FAIL',
    `${data.url} (storage=${data.storage || 'unknown'})`,
  );
  return data.url;
}

async function testDelete(url: string, label: string) {
  const res = await fetch(`${BASE}/api/admin/upload?url=${encodeURIComponent(url)}`, {
    method: 'DELETE',
    headers: adminHeaders(),
  });
  record(
    'delete',
    label,
    res.ok ? 'PASS' : 'FAIL',
    res.ok ? `removed ${url}` : `HTTP ${res.status}: ${await res.text()}`,
  );
}

async function testReplace(subdir: string) {
  const first = await testUploadFlow(subdir, `replace-first-${subdir}`);
  if (!first) return;

  const png = minimalPngBuffer();
  const form = new FormData();
  form.append('file', new Blob([png], { type: 'image/png' }), `${MARKER}-replace.png`);
  form.append('subdir', subdir);

  await fetch(`${BASE}/api/admin/upload?url=${encodeURIComponent(first)}`, {
    method: 'DELETE',
    headers: adminHeaders(),
  });

  const res = await fetch(`${BASE}/api/admin/upload`, {
    method: 'POST',
    headers: adminHeaders(),
    body: form,
  });
  if (!res.ok) {
    record('replace', subdir, 'FAIL', `HTTP ${res.status}`);
    return;
  }
  const data = (await res.json()) as { url: string };
  uploadedUrls.push(data.url);
  record('replace', subdir, data.url !== first ? 'PASS' : 'FAIL', `${first} -> ${data.url}`);
}

async function testValidation() {
  const big = new Blob([new Uint8Array(6 * 1024 * 1024)], { type: 'image/png' });
  const form = new FormData();
  form.append('file', big, 'big.png');
  const res = await fetch(`${BASE}/api/admin/upload`, {
    method: 'POST',
    headers: adminHeaders(),
    body: form,
  });
  record('security', 'file too large', res.status === 400 ? 'PASS' : 'FAIL', `HTTP ${res.status}`);

  const svg = new Blob(['<svg xmlns="http://www.w3.org/2000/svg"></svg>'], { type: 'image/svg+xml' });
  const form2 = new FormData();
  form2.append('file', svg, 'evil.svg');
  const res2 = await fetch(`${BASE}/api/admin/upload`, {
    method: 'POST',
    headers: adminHeaders(),
    body: form2,
  });
  record('security', 'SVG rejected', res2.status === 400 ? 'PASS' : 'FAIL', `HTTP ${res2.status}`);

  const unauth = await fetch(`${BASE}/api/admin/upload`, { method: 'POST', body: form });
  record('security', 'unauthorized upload', unauth.status === 401 ? 'PASS' : 'FAIL', `HTTP ${unauth.status}`);
}

async function testBackwardCompat() {
  const uploadsDir = join(process.cwd(), 'public', 'uploads');
  if (!existsSync(uploadsDir)) {
    record('compat', 'legacy local files', 'SKIP', 'no public/uploads');
    return;
  }
  const res = await fetch(`${BASE}/`);
  record('compat', 'homepage renders', res.ok ? 'PASS' : 'FAIL', `HTTP ${res.status}`);

  const localSample = '/uploads/logos/1782222831635-test-logo.png';
  const localPath = join(process.cwd(), 'public', localSample.slice(1));
  if (existsSync(localPath)) {
    const img = await fetch(`${BASE}${localSample}`);
    record('compat', 'legacy /uploads/ URL', img.ok ? 'PASS' : 'FAIL', `${BASE}${localSample} HTTP ${img.status}`);
  } else {
    record('compat', 'legacy /uploads/ URL', 'SKIP', 'sample file not present');
  }
}

async function testFrontendPages() {
  const pages = ['/', '/portfolio', '/about', '/services', '/case-studies', '/blog', '/pricing', '/contact'];
  for (const path of pages) {
    const res = await fetch(`${BASE}${path}`);
    record('frontend', path, res.ok ? 'PASS' : 'FAIL', `HTTP ${res.status}`);
  }
}

async function cleanup() {
  for (const url of uploadedUrls) {
    try {
      await fetch(`${BASE}/api/admin/upload?url=${encodeURIComponent(url)}`, {
        method: 'DELETE',
        headers: adminHeaders(),
      });
    } catch {
      // best effort
    }
  }
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  record('config', 'R2 configured', isR2Configured() ? 'PASS' : 'WARN', isR2Configured() ? 'yes' : 'local fallback');
  record(
    'config',
    'storage backend',
    'PASS',
    shouldUseR2Storage() ? 'R2' : 'local (dev)',
  );

  testMediaUrlHelpers();

  const alive = await fetch(`${BASE}/`).catch(() => null);
  if (!alive?.ok) {
    record('server', 'BASE_URL reachable', 'FAIL', `${BASE} not responding — start dev server`);
  } else {
    record('server', 'BASE_URL reachable', 'PASS', BASE);
    if (await login()) {
      await testValidation();
      const subdirs = ['founder', 'logos', 'projects/yalaride', 'services'];
      for (const sub of subdirs) {
        const url = await testUploadFlow(sub, `upload-${sub}`);
        if (url) await testDelete(url, `delete-${sub}`);
      }
      await testReplace('logos');
      await testBackwardCompat();
      await testFrontendPages();
      await cleanup();
    }
  }

  const pass = checks.filter((c) => c.status === 'PASS').length;
  const fail = checks.filter((c) => c.status === 'FAIL').length;
  const skip = checks.filter((c) => c.status === 'SKIP').length;
  const warn = checks.filter((c) => c.status === 'WARN').length;

  const summary = {
    marker: MARKER,
    timestamp: new Date().toISOString(),
    baseUrl: BASE,
    r2Configured: isR2Configured(),
    storageBackend: shouldUseR2Storage() ? 'r2' : 'local',
    totals: { pass, fail, skip, warn, total: checks.length },
    checks,
  };

  writeFileSync(join(OUT_DIR, 'verification-report.json'), JSON.stringify(summary, null, 2));

  const md = `# Phase 22 — R2 Migration Verification

**Marker:** ${MARKER}  
**Date:** ${summary.timestamp}  
**Base URL:** ${BASE}  
**Storage:** ${summary.storageBackend}  
**R2 configured:** ${summary.r2Configured}

## Summary

| Status | Count |
|--------|-------|
| PASS | ${pass} |
| FAIL | ${fail} |
| WARN | ${warn} |
| SKIP | ${skip} |

## Checks

${checks.map((c) => `- **${c.status}** [${c.category}] ${c.name}: ${c.evidence}`).join('\n')}
`;

  writeFileSync(join(OUT_DIR, 'VERIFICATION.md'), md);
  console.log(`\nReport: public/review/phase22/VERIFICATION.md`);
  if (fail > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
