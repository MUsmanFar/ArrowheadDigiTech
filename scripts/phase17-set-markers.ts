const BASE = process.env.BASE_URL || 'http://localhost:3001';
export const MARKER = 'LIVE-CMS-VERIFY-1782342000';

async function main() {
  const lr = await fetch(`${BASE}/admin/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@arrowheaddigitech.com', password: 'admin123' }),
  });
  const token = (lr.headers.get('set-cookie') || '').match(/admin_token=([^;]+)/)?.[1];
  if (!token) throw new Error('login failed');
  const cookie = `admin_token=${token}`;
  const pub = await (await fetch(`${BASE}/api/public/site-content`)).json();
  const origNav = { ...pub['site.nav'] };
  const origHero = { ...pub['home.hero'] };
  await fetch(`${BASE}/api/admin/site-content`, {
    method: 'PUT',
    headers: { Cookie: cookie, 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: 'site.nav', value: { ...origNav, brandName: MARKER } }),
  });
  await fetch(`${BASE}/api/admin/site-content`, {
    method: 'PUT',
    headers: { Cookie: cookie, 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: 'home.hero', value: { ...origHero, headline: MARKER } }),
  });
  const api = await (await fetch(`${BASE}/api/public/site-content`)).json();
  console.log('API nav.brandName:', api['site.nav'].brandName);
  console.log('API home.hero.headline:', api['home.hero'].headline);
  const { PrismaClient } = await import('@prisma/client');
  const p = new PrismaClient();
  const row = await p.setting.findUnique({ where: { key: 'site.nav' } });
  console.log('DB site.nav brandName:', row ? JSON.parse(row.value).brandName : 'missing');
  await p.$disconnect();
}

main();
