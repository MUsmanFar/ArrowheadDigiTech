/**
 * Media URL helpers — backward compatible local paths and Cloudflare R2 public URLs.
 */

import { getR2Config } from './r2-config';

export function isLocalMediaUrl(url: string): boolean {
  const normalized = url.replace(/\\/g, '/');
  return normalized.startsWith('/uploads/');
}

export function isR2MediaUrl(url: string): boolean {
  const config = getR2Config();
  if (!config) return false;
  const normalized = url.replace(/\\/g, '/');
  if (normalized.startsWith(config.publicUrl)) return true;
  try {
    const parsed = new URL(normalized);
    const publicHost = new URL(config.publicUrl).host;
    return parsed.host === publicHost && parsed.pathname.startsWith('/uploads/');
  } catch {
    return false;
  }
}

export function isManagedMediaUrl(url: string): boolean {
  return isLocalMediaUrl(url) || isR2MediaUrl(url);
}

/** Object key inside the R2 bucket (always starts with uploads/). */
export function objectKeyFromMediaUrl(url: string): string | null {
  const normalized = url.replace(/\\/g, '/');

  if (normalized.startsWith('/uploads/')) {
    return normalized.slice(1);
  }

  const config = getR2Config();
  if (!config) return null;

  if (normalized.startsWith(config.publicUrl)) {
    const path = normalized.slice(config.publicUrl.length);
    return path.replace(/^\//, '');
  }

  try {
    const parsed = new URL(normalized);
    const publicHost = new URL(config.publicUrl).host;
    if (parsed.host === publicHost) {
      return parsed.pathname.replace(/^\//, '');
    }
  } catch {
    return null;
  }

  return null;
}

export function buildObjectKey(subdir: string | undefined, filename: string): string {
  const safeSubdir = subdir?.replace(/^\/+|\/+$/g, '');
  if (safeSubdir) return `uploads/${safeSubdir}/${filename}`.replace(/\/+/g, '/');
  return `uploads/${filename}`;
}

export function publicUrlForObjectKey(key: string): string {
  const config = getR2Config();
  if (!config) throw new Error('R2 is not configured');
  const normalizedKey = key.replace(/^\/+/, '');
  return `${config.publicUrl}/${normalizedKey}`;
}

/** Hostname for next/image remotePatterns (from R2_PUBLIC_URL). */
export function r2ImageRemotePattern(): { protocol: 'https' | 'http'; hostname: string } | null {
  const config = getR2Config();
  if (!config) return null;
  try {
    const u = new URL(config.publicUrl);
    return {
      protocol: u.protocol === 'http:' ? 'http' : 'https',
      hostname: u.hostname,
    };
  } catch {
    return null;
  }
}
