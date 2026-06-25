#!/usr/bin/env node
/**
 * Migrate existing local public/uploads assets to Cloudflare R2.
 *
 * Usage:
 *   node scripts/migrate-local-uploads-to-r2.mjs           # dry-run (default)
 *   node scripts/migrate-local-uploads-to-r2.mjs --execute   # upload to R2
 *
 * Does NOT delete local files or update database URLs — run a separate DB update after verifying uploads.
 */
import { createReadStream, existsSync, readdirSync, statSync } from 'fs';
import { join, relative, extname } from 'path';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

const ROOT = join(process.cwd(), 'public', 'uploads');
const EXECUTE = process.argv.includes('--execute');

function env(name) {
  const v = process.env[name]?.trim();
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

function getClient() {
  const accountId = env('R2_ACCOUNT_ID');
  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: env('R2_ACCESS_KEY_ID'),
      secretAccessKey: env('R2_SECRET_ACCESS_KEY'),
    },
  });
}

function walk(dir) {
  const files = [];
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

async function objectExists(client, bucket, key) {
  try {
    await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!existsSync(ROOT)) {
    console.log('No public/uploads directory — nothing to migrate.');
    return;
  }

  const bucket = env('R2_BUCKET');
  const publicUrl = env('R2_PUBLIC_URL').replace(/\/$/, '');
  const client = getClient();
  const files = walk(ROOT);

  console.log(`Mode: ${EXECUTE ? 'EXECUTE' : 'DRY-RUN'}`);
  console.log(`Found ${files.length} local file(s) under public/uploads/`);

  let uploaded = 0;
  let skipped = 0;
  let errors = 0;

  for (const filepath of files) {
    const rel = relative(join(process.cwd(), 'public'), filepath).replace(/\\/g, '/');
    const key = rel;
    const mime = MIME[extname(filepath).toLowerCase()] || 'application/octet-stream';
    const targetUrl = `${publicUrl}/${key}`;

    try {
      const exists = await objectExists(client, bucket, key);
      if (exists) {
        console.log(`SKIP (exists): ${key} -> ${targetUrl}`);
        skipped++;
        continue;
      }

      if (!EXECUTE) {
        console.log(`DRY-RUN: would upload ${key} (${statSync(filepath).size} bytes) -> ${targetUrl}`);
        uploaded++;
        continue;
      }

      const body = createReadStream(filepath);
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: body,
          ContentType: String(mime),
          CacheControl: 'public, max-age=31536000, immutable',
        }),
      );
      console.log(`UPLOADED: ${key} -> ${targetUrl}`);
      uploaded++;
    } catch (err) {
      console.error(`ERROR: ${key}`, err.message || err);
      errors++;
    }
  }

  console.log('\nSummary:', { uploaded, skipped, errors, execute: EXECUTE });
  if (!EXECUTE) {
    console.log('Re-run with --execute to perform uploads. Local files are preserved.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
