// run_lighthouse.js - runs Lighthouse for key routes and saves HTML/JSON results
const lighthouse = require('lighthouse').default;
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

const routes = [
  '/', '/about', '/services', '/portfolio', '/case-studies', '/pricing', '/faq', '/blog', '/contact', '/admin/dashboard'
];

const baseUrl = 'http://localhost:3002';
const outputDir = path.resolve('lighthouse_output');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

(async () => {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const opts = {port: chrome.port, output: ['html', 'json'], logLevel: 'error'};
  const summary = [];

  for (const route of routes) {
    const url = baseUrl + (route === '/' ? '' : route);
    console.log(`Running Lighthouse for ${url}`);
    
    try {
      const runnerResult = await lighthouse(url, opts);
      const reportHtml = runnerResult.report[0];
      const reportJson = runnerResult.report[1];
      const lhr = runnerResult.lhr;

      const safeName = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_');
      
      const htmlPath = path.join(outputDir, `${safeName}.html`);
      const jsonPath = path.join(outputDir, `${safeName}.json`);

      fs.writeFileSync(htmlPath, reportHtml, 'utf-8');
      fs.writeFileSync(jsonPath, reportJson, 'utf-8');

      const scores = {
        route,
        performance: lhr.categories.performance ? Math.round(lhr.categories.performance.score * 100) : null,
        accessibility: lhr.categories.accessibility ? Math.round(lhr.categories.accessibility.score * 100) : null,
        bestPractices: lhr.categories['best-practices'] ? Math.round(lhr.categories['best-practices'].score * 100) : null,
        seo: lhr.categories.seo ? Math.round(lhr.categories.seo.score * 100) : null,
      };

      summary.push(scores);
      console.log(`Saved reports for ${route} (${safeName}.html)`);
    } catch (err) {
      console.error(`Failed to audit ${url}:`, err.message);
    }
  }

  try {
    await chrome.kill();
  } catch (killErr) {
    console.warn('Chrome kill process warning (common on Windows EPERM):', killErr.message);
  }

  const summaryPath = path.join(outputDir, 'summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf-8');

  console.log('\nAudit Summary:');
  console.table(summary);
  console.log(`\nLighthouse audit completed. Results saved in ${outputDir}`);
})();
