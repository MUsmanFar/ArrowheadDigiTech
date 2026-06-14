const fs = require('fs');
const path = require('path');

const dir = path.resolve('lighthouse_output');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'summary.json');

const scores = {};

files.forEach(f => {
  const p = path.join(dir, f);
  const data = JSON.parse(fs.readFileSync(p, 'utf-8'));
  const cats = data.categories;
  scores[f] = {
    performance: cats.performance ? Math.round(cats.performance.score * 100) : null,
    accessibility: cats.accessibility ? Math.round(cats.accessibility.score * 100) : null,
    bestPractices: cats['best-practices'] ? Math.round(cats['best-practices'].score * 100) : null,
    seo: cats.seo ? Math.round(cats.seo.score * 100) : null,
  };
});

console.table(scores);
