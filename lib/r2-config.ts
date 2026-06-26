/**
 * Cloudflare R2 configuration (S3-compatible API).
 * When configured, new uploads use R2; local /uploads/ URLs remain supported for legacy assets.
 */

export type R2Config = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  publicUrl: string;
};

function trim(v: string | undefined): string {
  return v?.trim() || '';
}

export function validateR2CredentialLengths(config: R2Config): string | null {
  if (config.accessKeyId.length !== 32) {
    return `R2_ACCESS_KEY_ID must be 32 characters (currently ${config.accessKeyId.length}). Regenerate credentials in Cloudflare R2 → Manage API Tokens and copy the full Access Key ID.`;
  }
  if (config.secretAccessKey.length !== 64) {
    return `R2_SECRET_ACCESS_KEY must be 64 characters (currently ${config.secretAccessKey.length}). Regenerate credentials in Cloudflare R2 → Manage API Tokens.`;
  }
  return null;
}

export function getR2Config(): R2Config | null {
  const accountId = trim(process.env.R2_ACCOUNT_ID);
  const accessKeyId = trim(process.env.R2_ACCESS_KEY_ID);
  const secretAccessKey = trim(process.env.R2_SECRET_ACCESS_KEY);
  const bucket = trim(process.env.R2_BUCKET);
  const publicUrl = trim(process.env.R2_PUBLIC_URL).replace(/\/$/, '');

  if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicUrl) {
    return null;
  }

  return { accountId, accessKeyId, secretAccessKey, bucket, publicUrl };
}

export function isR2Configured(): boolean {
  return getR2Config() !== null;
}

/** Production Hostinger deploys must use R2 — local disk is ephemeral. */
export function requiresR2InProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/** Use R2 when configured; in production R2 is mandatory for new uploads. */
export function shouldUseR2Storage(): boolean {
  const configured = isR2Configured();
  if (requiresR2InProduction()) return configured;
  if (process.env.USE_R2_UPLOADS === 'false') return false;
  return configured;
}

export function r2NotConfiguredError(): string {
  return 'Cloudflare R2 is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, and R2_PUBLIC_URL.';
}
