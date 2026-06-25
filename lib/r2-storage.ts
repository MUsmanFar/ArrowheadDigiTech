import {
  DeleteObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getR2Config } from './r2-config';
import { buildObjectKey, objectKeyFromMediaUrl, publicUrlForObjectKey } from './media-url';
import { logger } from './logger';

const UPLOAD_RETRY_ATTEMPTS = 3;
const UPLOAD_RETRY_DELAY_MS = 400;

let client: S3Client | null = null;

function getClient(): S3Client {
  if (client) return client;
  const config = getR2Config();
  if (!config) throw new Error('R2 is not configured');

  client = new S3Client({
    region: 'auto',
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
    maxAttempts: UPLOAD_RETRY_ATTEMPTS,
  });

  return client;
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry<T>(label: string, fn: () => Promise<T>): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= UPLOAD_RETRY_ATTEMPTS; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      logger.warn(`${label} attempt ${attempt} failed`, {
        error: error instanceof Error ? error.message : String(error),
      });
      if (attempt < UPLOAD_RETRY_ATTEMPTS) {
        await sleep(UPLOAD_RETRY_DELAY_MS * attempt);
      }
    }
  }
  throw lastError;
}

export type R2UploadResult = {
  url: string;
  key: string;
  mime: string;
  bytes: number;
  storage: 'r2';
};

export async function uploadToR2(
  buffer: Buffer,
  subdir: string | undefined,
  filename: string,
  mime: string,
): Promise<R2UploadResult> {
  const config = getR2Config();
  if (!config) throw new Error('R2 is not configured');

  const key = buildObjectKey(subdir, filename);

  await withRetry('R2 upload', async () => {
    await getClient().send(
      new PutObjectCommand({
        Bucket: config.bucket,
        Key: key,
        Body: buffer,
        ContentType: mime,
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    );
  });

  const url = publicUrlForObjectKey(key);
  return { url, key, mime, bytes: buffer.length, storage: 'r2' };
}

export async function deleteFromR2(mediaUrl: string): Promise<boolean> {
  const config = getR2Config();
  if (!config) throw new Error('R2 is not configured');

  const key = objectKeyFromMediaUrl(mediaUrl);
  if (!key) return false;

  await withRetry('R2 delete', async () => {
    await getClient().send(
      new DeleteObjectCommand({
        Bucket: config.bucket,
        Key: key,
      }),
    );
  });

  return true;
}

export async function existsInR2(mediaUrl: string): Promise<boolean> {
  const config = getR2Config();
  if (!config) return false;

  const key = objectKeyFromMediaUrl(mediaUrl);
  if (!key) return false;

  try {
    await getClient().send(
      new HeadObjectCommand({
        Bucket: config.bucket,
        Key: key,
      }),
    );
    return true;
  } catch {
    return false;
  }
}
