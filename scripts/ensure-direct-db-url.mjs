import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env');

if (!process.env.DIRECT_DATABASE_URL?.trim()) {
  if (process.env.DATABASE_URL?.trim()) {
    process.env.DIRECT_DATABASE_URL = process.env.DATABASE_URL;
  } else if (existsSync(envPath)) {
    const envContents = readFileSync(envPath, 'utf-8');
    const databaseUrlMatch = envContents.match(/^DATABASE_URL=(.+)$/m);
    if (databaseUrlMatch) {
      const databaseUrl = databaseUrlMatch[1].replace(/^["']|["']$/g, '');
      process.env.DIRECT_DATABASE_URL = databaseUrl;

      if (!/^DIRECT_DATABASE_URL=/m.test(envContents)) {
        const line = `DIRECT_DATABASE_URL="${databaseUrl}"`;
        writeFileSync(
          envPath,
          `${envContents.trimEnd()}\n${line}\n`,
          'utf-8',
        );
      }
    }
  }
}

if (!process.env.DIRECT_DATABASE_URL?.trim()) {
  console.error(
    'DIRECT_DATABASE_URL is required. Set it to your direct PostgreSQL URL (for local dev, it can match DATABASE_URL).',
  );
  process.exit(1);
}
