const fs = require('fs');
const path = require('path');

const reportPath = path.join(__dirname, 'lighthouse_report.json');

if (fs.existsSync(reportPath)) {
  try {
    const rawData = fs.readFileSync(reportPath);
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
  } catch (e) {
    console.error('Error parsing Lighthouse JSON:', e.message);
  }
} else {
  console.error('Lighthouse report file not found at:', reportPath);
}
