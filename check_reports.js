const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname);
const reportFiles = files.filter(f => f.startsWith('lighthouse_') && f.endsWith('.json'));

console.log('Found reports:', reportFiles);

reportFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  try {
    const rawData = fs.readFileSync(filePath);
    const report = JSON.parse(rawData);
    
    const scores = {
      performance: report.categories.performance.score * 100,
      accessibility: report.categories.accessibility.score * 100,
      bestPractices: report.categories['best-practices'].score * 100,
      seo: report.categories.seo.score * 100
    };
    
    console.log(`\nScores for ${file}:`);
    console.log(`  Performance:    ${scores.performance.toFixed(0)}/100`);
    console.log(`  Accessibility:  ${scores.accessibility.toFixed(0)}/100`);
    console.log(`  Best Practices: ${scores.bestPractices.toFixed(0)}/100`);
    console.log(`  SEO:            ${scores.seo.toFixed(0)}/100`);
  } catch (e) {
    console.error(`Error reading ${file}:`, e.message);
  }
});
