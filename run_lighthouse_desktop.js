const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PAGES = [
  { name: 'Home', url: 'http://localhost:3000/' },
  { name: 'Portfolio', url: 'http://localhost:3000/portfolio' },
  { name: 'Case Studies', url: 'http://localhost:3000/case-studies' }
];

console.log('Starting multi-page Desktop Lighthouse audit...');

console.log('\n================ DESKTOP LIGHTHOUSE REPORT ================');

for (const page of PAGES) {
  const outputJsonPath = path.join(__dirname, `lighthouse_desktop_${page.name.toLowerCase().replace(' ', '_')}.json`);
  const cmd = `npx lighthouse ${page.url} --preset=desktop --output=json --output-path="${outputJsonPath}" --chrome-flags="--headless --no-sandbox"`;
  
  console.log(`Auditing ${page.name} (${page.url}) on Desktop...`);
  try {
    execSync(cmd, { stdio: 'ignore' });
  } catch (err) {
    // Catching command errors to read report directly
  }

  if (fs.existsSync(outputJsonPath)) {
    try {
      const rawData = fs.readFileSync(outputJsonPath);
      const report = JSON.parse(rawData);
      
      const scores = {
        performance: report.categories.performance.score * 100,
        accessibility: report.categories.accessibility.score * 100,
        bestPractices: report.categories['best-practices'].score * 100,
        seo: report.categories.seo.score * 100
      };
      
      console.log(`\nResults for ${page.name} (Desktop):`);
      console.log(`  Performance:    ${scores.performance.toFixed(0)}/100`);
      console.log(`  Accessibility:  ${scores.accessibility.toFixed(0)}/100`);
      console.log(`  Best Practices: ${scores.bestPractices.toFixed(0)}/100`);
      console.log(`  SEO:            ${scores.seo.toFixed(0)}/100`);
    } catch (e) {
      console.error(`  Error parsing ${page.name}:`, e.message);
    }
  } else {
    console.log(`  Error: Report file not found for ${page.name}`);
  }
}

console.log('\n===========================================================\n');
