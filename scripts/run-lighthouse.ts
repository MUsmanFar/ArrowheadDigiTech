/**
 * Lighthouse audit on production build (local)
 * Run: BASE_URL=http://localhost:3002 npx tsx scripts/run-lighthouse.ts
 */
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE = process.env.BASE_URL || 'http://localhost:3002';
const OUT = join(process.cwd(), 'public', 'review', 'phase24');

async function runAudit(url: string, formFactor: 'mobile' | 'desktop') {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--no-sandbox'] });
  const options = {
    logLevel: 'error' as const,
    output: 'json' as const,
    port: chrome.port,
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor,
    screenEmulation:
      formFactor === 'mobile'
        ? { mobile: true, width: 375, height: 667, deviceScaleFactor: 2, disabled: false }
        : { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false },
  };
  const runner = await lighthouse(url, options);
  await chrome.kill();
  return runner?.lhr;
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const pages = ['/', '/services', '/contact', '/faq'];
  const results: Record<string, unknown> = { baseUrl: BASE, timestamp: new Date().toISOString(), audits: {} };

  for (const page of pages) {
    const url = `${BASE}${page}`;
    for (const formFactor of ['desktop', 'mobile'] as const) {
      console.log(`Lighthouse ${formFactor} → ${url}`);
      const lhr = await runAudit(url, formFactor);
      if (!lhr) continue;
      const scores = {
        performance: Math.round((lhr.categories.performance?.score ?? 0) * 100),
        accessibility: Math.round((lhr.categories.accessibility?.score ?? 0) * 100),
        bestPractices: Math.round((lhr.categories['best-practices']?.score ?? 0) * 100),
        seo: Math.round((lhr.categories.seo?.score ?? 0) * 100),
      };
      const key = `${page || 'home'}-${formFactor}`;
      (results.audits as Record<string, unknown>)[key] = scores;
      console.log(`  perf=${scores.performance} a11y=${scores.accessibility} bp=${scores.bestPractices} seo=${scores.seo}`);
    }
  }

  writeFileSync(join(OUT, 'lighthouse-report.json'), JSON.stringify(results, null, 2));
  console.log(`\nReport: public/review/phase24/lighthouse-report.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
