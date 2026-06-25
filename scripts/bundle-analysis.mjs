/**
 * Parses Next.js build manifests for bundle size reporting.
 * Run after: npm run build && node scripts/bundle-analysis.mjs
 */
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const NEXT_DIR = join(process.cwd(), '.next', 'static', 'chunks');
const OUT = join(process.cwd(), 'public', 'review', 'phase21');

function walk(dir, files = []) {
  if (!statSync(dir, { throwIfNoError: false })) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (entry.endsWith('.js')) files.push(full);
  }
  return files;
}

const chunks = walk(NEXT_DIR)
  .map((file) => ({
    file: file.replace(process.cwd(), '').replace(/\\/g, '/'),
    bytes: statSync(file).size,
    kb: Math.round(statSync(file).size / 1024),
  }))
  .sort((a, b) => b.bytes - a.bytes);

mkdirSync(OUT, { recursive: true });
const report = {
  generatedAt: new Date().toISOString(),
  totalChunks: chunks.length,
  totalKb: Math.round(chunks.reduce((s, c) => s + c.bytes, 0) / 1024),
  largest20: chunks.slice(0, 20),
};

writeFileSync(join(OUT, 'bundle-analysis.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
