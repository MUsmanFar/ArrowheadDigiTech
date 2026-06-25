import fs from 'fs';
import path from 'path';
import { buildObjectKey } from './media-url';

export type LocalUploadResult = {
  url: string;
  key: string;
  mime: string;
  bytes: number;
  storage: 'local';
};

export function uploadsRoot(): string {
  return path.join(process.cwd(), 'public', 'uploads');
}

export function resolveLocalUploadFile(input: string): string | null {
  const root = uploadsRoot();
  const normalized = input.replace(/\\/g, '/');
  if (normalized.startsWith('/uploads/')) {
    const relative = normalized.slice('/uploads/'.length);
    const candidate = path.normalize(path.join(root, relative));
    if (candidate.startsWith(root) && fs.existsSync(candidate)) return candidate;
  }

  const safeFilename = path.basename(normalized);
  const walk = (dir: string): string | null => {
    if (!fs.existsSync(dir)) return null;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const nested = walk(fullPath);
        if (nested) return nested;
      } else if (entry.name === safeFilename) {
        return fullPath;
      }
    }
    return null;
  };
  return walk(root);
}

export function uploadToLocal(
  buffer: Buffer,
  subdir: string | undefined,
  filename: string,
  mime: string,
): LocalUploadResult {
  const root = uploadsRoot();
  const uploadDir = subdir ? path.join(root, subdir) : root;
  if (!path.normalize(uploadDir).startsWith(root)) {
    throw new Error('Invalid upload directory');
  }

  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const filepath = path.join(uploadDir, filename);
  fs.writeFileSync(filepath, buffer);

  const url = subdir ? `/uploads/${subdir}/${filename}` : `/uploads/${filename}`;
  const key = buildObjectKey(subdir, filename);
  return { url, key, mime, bytes: buffer.length, storage: 'local' };
}

export function deleteFromLocal(mediaUrl: string): boolean {
  const filepath = resolveLocalUploadFile(mediaUrl);
  if (!filepath) return false;
  fs.unlinkSync(filepath);
  return true;
}
