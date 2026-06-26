import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const envPath = join(process.cwd(), '.env');
const keys = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET', 'R2_PUBLIC_URL'];

if (!existsSync(envPath)) {
  console.log('.env: NOT FOUND');
  process.exit(1);
}

const lines = readFileSync(envPath, 'utf8').split(/\r?\n/);
const map = Object.fromEntries(
  lines
    .filter((l) => l && !l.trim().startsWith('#') && l.includes('='))
    .map((l) => {
      const i = l.indexOf('=');
      const k = l.slice(0, i).trim();
      let v = l.slice(i + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      return [k, v];
    }),
);

for (const k of keys) {
  const v = map[k]?.trim();
  console.log(`${k}: ${v ? `SET (${v.length} chars)` : 'MISSING'}`);
}
