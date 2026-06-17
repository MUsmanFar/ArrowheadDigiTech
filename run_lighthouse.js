const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Lighthouse audit for http://localhost:3000/ ...');

const outputJsonPath = path.join(__dirname, 'lighthouse_report.json');

// Run Lighthouse CLI in headless mode
const cmd = `npx lighthouse http://localhost:3000/ --output=json --output-path="${outputJsonPath}" --chrome-flags="--headless --no-sandbox"`;

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing Lighthouse: ${error.message}`);
    return;
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
      
      console.log('\n================ LIGHTHOUSE AUDIT SCORES ================');
      console.log(`Performance:    ${scores.performance.toFixed(0)}/100`);
      console.log(`Accessibility:  ${scores.accessibility.toFixed(0)}/100`);
      console.log(`Best Practices: ${scores.bestPractices.toFixed(0)}/100`);
      console.log(`SEO:            ${scores.seo.toFixed(0)}/100`);
      console.log('=========================================================\n');
      
      // Keep report.json but clean up if needed.
    } catch (e) {
      console.error('Failed to parse Lighthouse JSON:', e.message);
    }
  } else {
    console.error('Lighthouse report was not created.');
    console.log('Stdout:', stdout);
    console.log('Stderr:', stderr);
  }
});
