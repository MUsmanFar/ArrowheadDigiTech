const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const screenshotsDir = path.resolve('screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const routes = [
    { url: 'http://localhost:3000/', name: 'Home' },
    { url: 'http://localhost:3000/services', name: 'Services' },
    { url: 'http://localhost:3000/portfolio', name: 'Portfolio' },
    { url: 'http://localhost:3000/case-studies', name: 'Case_Studies' }
  ];

  for (const route of routes) {
    try {
      await page.goto(route.url, { waitUntil: 'networkidle' });
      const filePath = path.join(screenshotsDir, `${route.name}.png`);
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`Saved screenshot: ${filePath}`);
    } catch (e) {
      console.error(`Failed to screenshot ${route.name}:`, e);
    }
  }

  await browser.close();
})();
