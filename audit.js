// audit.js - Playwright automated audit for Arrowhead DigiTech
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const routes = [
  '/',
  '/about',
  '/services',
  '/services/web-development',
  '/portfolio',
  '/case-studies',
  '/case-studies/yalaride',
  '/pricing',
  '/faq',
  '/blog',
  '/contact',
  '/admin/login',
  '/admin/dashboard',
  '/admin/services',
  '/admin/projects',
  '/admin/testimonials',
  '/admin/faqs',
  '/admin/pricing',
  '/admin/team',
  '/admin/blog',
  '/admin/leads'
];

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1024, height: 768 },
  { name: 'desktop', width: 1440, height: 900 }
];

const baseUrl = 'http://localhost:3002';
const outputDir = path.resolve('audit_output');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

(async () => {
  const browser = await chromium.launch();
  const report = { pages: [], errors: [] };
  for (const route of routes) {
    const pageReport = { route, screenshots: [], navigationErrors: [] };
    for (const vp of viewports) {
      const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const page = await context.newPage();
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error' || msg.type() === 'warning') {
          consoleErrors.push({ type: msg.type(), text: msg.text() });
        }
      });
      const url = baseUrl + route;
      try {
        const response = await page.goto(url, { waitUntil: 'load', timeout: 30000 });
        if (!response || !response.ok()) {
          pageReport.navigationErrors.push({ viewport: vp.name, status: response ? response.status() : 'no response' });
        }
        const safeRoute = route.replace(/\//g, '_').replace(/^_/, 'home');
        const screenshotPath = path.join(outputDir, `${safeRoute}_${vp.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        pageReport.screenshots.push({ viewport: vp.name, file: screenshotPath });
        if (consoleErrors.length) {
          report.errors.push({ route, viewport: vp.name, console: consoleErrors });
        }
      } catch (e) {
        pageReport.navigationErrors.push({ viewport: vp.name, error: e.message });
      } finally {
        await context.close();
      }
    }
    report.pages.push(pageReport);
  }
  await browser.close();
  const reportPath = path.join(outputDir, 'audit_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log('Audit completed. Report saved to', reportPath);
})();
