const SIGNATURES: Array<{ mime: string; check: (buf: Buffer) => boolean }> = [
  {
    mime: 'image/jpeg',
    check: (buf) => buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff,
  },
  {
    mime: 'image/png',
    check: (buf) =>
      buf.length >= 8 &&
      buf[0] === 0x89 &&
      buf[1] === 0x50 &&
      buf[2] === 0x4e &&
      buf[3] === 0x47,
  },
  {
    mime: 'image/gif',
    check: (buf) =>
      buf.length >= 6 &&
      buf.toString('ascii', 0, 3) === 'GIF',
  },
  {
    mime: 'image/webp',
    check: (buf) =>
      buf.length >= 12 &&
      buf.toString('ascii', 0, 4) === 'RIFF' &&
      buf.toString('ascii', 8, 12) === 'WEBP',
  },
];

export const ALLOWED_UPLOAD_MIMES = SIGNATURES.map((s) => s.mime);

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export function detectImageMime(buffer: Buffer): string | null {
  for (const sig of SIGNATURES) {
    if (sig.check(buffer)) return sig.mime;
  }
  return null;
}

export function sanitizeUploadFilename(originalName: string): string {
  const base = originalName.replace(/\\/g, '/').split('/').pop() || 'upload';
  const noDoubleExt = base.replace(/(\.[a-z0-9]{2,4})+\./gi, '.');
  const cleaned = noDoubleExt.replace(/[^a-zA-Z0-9.-]/g, '_').replace(/\.+/g, '.');
  const blocked = /\.(exe|sh|bat|cmd|php|js|mjs|cjs|html|htm|svg)$/i;
  if (blocked.test(cleaned)) {
    return `${Date.now()}-upload.bin`;
  }
  return cleaned || `${Date.now()}-upload.bin`;
}

export function sanitizeUploadSubdir(subdir: string | null | undefined): string | undefined {
  if (!subdir) return undefined;
  const safe = subdir.replace(/[^a-zA-Z0-9_/-]/g, '').replace(/\\/g, '/').replace(/\.\./g, '');
  return safe.replace(/^\/+|\/+$/g, '') || undefined;
}
