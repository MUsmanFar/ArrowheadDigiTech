const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const PAGES = [
  { name: 'home', url: 'http://localhost:3000/' },
  { name: 'services', url: 'http://localhost:3000/services' },
  { name: 'portfolio', url: 'http://localhost:3000/portfolio' },
  { name: 'case_studies', url: 'http://localhost:3000/case-studies' },
  { name: 'about', url: 'http://localhost:3000/about' },
  { name: 'contact', url: 'http://localhost:3000/contact' }
];

const TARGET_DIR = 'C:\\Users\\USMAN FAROOQRI\\.gemini\\antigravity-ide\\brain\\4511dacb-fb84-47bb-b896-d1c57657c6c8';

async function capture() {
  console.log('Starting screenshot capture...');
  const browser = await chromium.launch({ headless: true });
  
  // Create desktop context
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  // Create mobile context (mimicking iPhone 12)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  });

  for (const pageInfo of PAGES) {
    // Desktop screenshot
    try {
      const page = await desktopContext.newPage();
      console.log(`Navigating to ${pageInfo.url} (Desktop)...`);
      await page.goto(pageInfo.url, { waitUntil: 'networkidle' });
      // Wait a bit for animations
      await page.waitForTimeout(2000);
      const filePath = path.join(TARGET_DIR, `${pageInfo.name}_desktop.png`);
      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`Saved ${filePath}`);
      await page.close();
    } catch (e) {
      console.error(`Error capturing desktop for ${pageInfo.name}:`, e.message);
    }

    // Mobile screenshot
    try {
      const page = await mobileContext.newPage();
      console.log(`Navigating to ${pageInfo.url} (Mobile)...`);
      await page.goto(pageInfo.url, { waitUntil: 'networkidle' });
      // Wait a bit for animations
      await page.waitForTimeout(2000);
      const filePath = path.join(TARGET_DIR, `${pageInfo.name}_mobile.png`);
      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`Saved ${filePath}`);
      await page.close();
    } catch (e) {
      console.error(`Error capturing mobile for ${pageInfo.name}:`, e.message);
    }
  }

  await browser.close();
  console.log('Capture complete.');
}

capture().catch(console.error);
