const { chromium } = require('playwright');
const path = require('path');

const TARGET_DIR = 'C:\\Users\\USMAN FAROOQRI\\.gemini\\antigravity-ide\\brain\\4511dacb-fb84-47bb-b896-d1c57657c6c8';

async function capture() {
  console.log('Recapturing case-studies desktop...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  const page = await context.newPage();
  try {
    await page.goto('http://localhost:3000/case-studies', { waitUntil: 'load', timeout: 15000 });
    await page.waitForTimeout(3000); // Allow react animations to render
    const filePath = path.join(TARGET_DIR, 'case_studies_desktop.png');
    await page.screenshot({ path: filePath });
    console.log(`Saved ${filePath}`);
  } catch (e) {
    console.error('Failed to capture case-studies desktop:', e.message);
  }
  
  await browser.close();
  console.log('Capture complete.');
}

capture().catch(console.error);
