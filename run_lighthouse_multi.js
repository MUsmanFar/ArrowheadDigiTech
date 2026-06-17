const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PAGES = [
  { name: 'Home', url: 'http://localhost:3000/' },
  { name: 'Portfolio', url: 'http://localhost:3000/portfolio' },
  { name: 'Case Studies', url: 'http://localhost:3000/case-studies' }
];

console.log('Starting multi-page Lighthouse audit...');

console.log('\n================ LIGHTHOUSE AUDIT REPORT ================');

for (const page of PAGES) {
  const outputJsonPath = path.join(__dirname, `lighthouse_${page.name.toLowerCase().replace(' ', '_')}.json`);
  const cmd = `npx lighthouse ${page.url} --output=json --output-path="${outputJsonPath}" --chrome-flags="--headless --no-sandbox"`;
  
  console.log(`Auditing ${page.name} (${page.url})...`);
  try {
    execSync(cmd, { stdio: 'ignore' });
    if (fs.existsSync(outputJsonPath)) {
      const rawData = fs.readFileSync(outputJsonPath);
      const report = JSON.parse(rawData);
      
      const scores = {
        performance: report.categories.performance.score * 100,
        accessibility: report.categories.accessibility.score * 100,
        bestPractices: report.categories['best-practices'].score * 100,
        seo: report.categories.seo.score * 100
      };
      
      console.log(`\nResults for ${page.name}:`);
      console.log(`  Performance:    ${scores.performance.toFixed(0)}/100`);
      console.log(`  Accessibility:  ${scores.accessibility.toFixed(0)}/100`);
      console.log(`  Best Practices: ${scores.bestPractices.toFixed(0)}/100`);
      console.log(`  SEO:            ${scores.seo.toFixed(0)}/100`);
    } else {
      console.log(`  Error: Report file not found for ${page.name}`);
    }
  } catch (err) {
    console.error(`  Failed to audit ${page.name}:`, err.message);
  }
}

console.log('\n=========================================================\n');
