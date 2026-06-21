const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const PAGES = [
  { name: 'Homepage', url: 'http://localhost:3000/' },
  { name: 'Services', url: 'http://localhost:3000/services' },
  { name: 'Portfolio', url: 'http://localhost:3000/portfolio' },
  { name: 'Case_Studies_Listing', url: 'http://localhost:3000/case-studies' },
  { name: 'Case_Study_YalaRide', url: 'http://localhost:3000/case-studies/yalaride' },
];

const OUT_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function capture() {
  const browser = await chromium.launch({ headless: true });

  const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15',
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  for (const pageInfo of PAGES) {
    // Desktop — full page
    try {
      const page = await desktopCtx.newPage();
      await page.goto(pageInfo.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      const fp = path.join(OUT_DIR, `${pageInfo.name}_desktop_full.png`);
      await page.screenshot({ path: fp, fullPage: true });
      console.log(`✓ Desktop full-page: ${pageInfo.name}`);
      await page.close();
    } catch (e) {
      console.error(`✗ Desktop ${pageInfo.name}: ${e.message}`);
    }

    // Mobile — viewport only
    try {
      const page = await mobileCtx.newPage();
      await page.goto(pageInfo.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      const fp = path.join(OUT_DIR, `${pageInfo.name}_mobile.png`);
      await page.screenshot({ path: fp, fullPage: false });
      console.log(`✓ Mobile viewport: ${pageInfo.name}`);
      await page.close();
    } catch (e) {
      console.error(`✗ Mobile ${pageInfo.name}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('\nDone. Screenshots saved to:', OUT_DIR);
}

capture().catch(console.error);
