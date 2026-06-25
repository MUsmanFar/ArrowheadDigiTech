import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { requireAdmin } from '@/backend/middleware/auth.middleware';
import { apiError, safeErrorMessage } from '@/lib/api-response';
import { logger } from '@/lib/logger';
import { enforceRateLimit, rateLimitResponse } from '@/lib/rate-limit';
import {
  ALLOWED_UPLOAD_MIMES,
  MAX_UPLOAD_BYTES,
  detectImageMime,
  sanitizeUploadFilename,
  sanitizeUploadSubdir,
} from '@/lib/upload-security';

function uploadsRoot(): string {
  return path.join(process.cwd(), 'public', 'uploads');
}

function resolveUploadFile(input: string): string | null {
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

export async function POST(request: Request) {
  const rl = enforceRateLimit(request, 'upload', 20, 60 * 60 * 1000);
  if (!rl.allowed) return rateLimitResponse(rl.retryAfterSec);

  try {
    if (!(await requireAdmin(request))) {
      return apiError('Unauthorized', 401, { code: 'UNAUTHORIZED' });
    }

    const formData = await request.formData();
    const file = formData.get('file') as Blob | null;
    const subdirRaw = formData.get('subdir') as string | null;

    if (!file) return apiError('No file uploaded', 400, { code: 'VALIDATION_ERROR' });
    if (file.size > MAX_UPLOAD_BYTES) {
      return apiError('File size exceeds 5MB limit', 400, { code: 'VALIDATION_ERROR' });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const detectedMime = detectImageMime(buffer);

    if (!detectedMime || !ALLOWED_UPLOAD_MIMES.includes(detectedMime)) {
      return apiError('Only JPEG, PNG, WEBP, and GIF images are allowed', 400, {
        code: 'VALIDATION_ERROR',
      });
    }

    const subdir = sanitizeUploadSubdir(subdirRaw || undefined);
    const uploadDir = subdir ? path.join(uploadsRoot(), subdir) : uploadsRoot();
    if (!path.normalize(uploadDir).startsWith(uploadsRoot())) {
      return apiError('Invalid upload directory', 400, { code: 'VALIDATION_ERROR' });
    }

    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const originalName = (file as File).name || 'upload.bin';
    const sanitizedName = sanitizeUploadFilename(originalName);
    const ext = detectedMime.split('/')[1] === 'jpeg' ? 'jpg' : detectedMime.split('/')[1];
    const filename = `${Date.now()}-${sanitizedName.replace(/\.[^.]+$/, '')}.${ext}`;
    const filepath = path.join(uploadDir, filename);

    fs.writeFileSync(filepath, buffer);

    const url = subdir ? `/uploads/${subdir}/${filename}` : `/uploads/${filename}`;
    logger.info('Upload saved', { url, mime: detectedMime, bytes: buffer.length });

    return NextResponse.json({ url, secure_url: url, public_id: filename, mime: detectedMime });
  } catch (error) {
    logger.error('Upload failed', { error: safeErrorMessage(error) });
    return apiError(safeErrorMessage(error), 500, { code: 'INTERNAL_ERROR' });
  }
}

export async function DELETE(request: Request) {
  const rl = enforceRateLimit(request, 'upload-delete', 30, 60 * 60 * 1000);
  if (!rl.allowed) return rateLimitResponse(rl.retryAfterSec);

  try {
    if (!(await requireAdmin(request))) {
      return apiError('Unauthorized', 401, { code: 'UNAUTHORIZED' });
    }

    const { searchParams } = new URL(request.url);
    const urlParam = searchParams.get('url') || searchParams.get('filename') || '';
    if (!urlParam) return apiError('No filename provided', 400, { code: 'VALIDATION_ERROR' });

    const filepath = resolveUploadFile(urlParam);
    if (filepath) {
      fs.unlinkSync(filepath);
      logger.info('Upload deleted', { url: urlParam });
      return NextResponse.json({ success: true, message: 'File deleted successfully' });
    }
    return apiError('File not found', 404, { code: 'NOT_FOUND' });
  } catch (error) {
    logger.error('Upload delete failed', { error: safeErrorMessage(error) });
    return apiError(safeErrorMessage(error), 500, { code: 'INTERNAL_ERROR' });
  }
}
