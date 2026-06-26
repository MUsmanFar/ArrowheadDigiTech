import { NextResponse } from 'next/server';
import { requireAdmin } from '@/backend/middleware/auth.middleware';
import { apiError, safeErrorMessage } from '@/lib/api-response';
import { deleteFromLocal, uploadToLocal } from '@/lib/local-storage';
import { logger } from '@/lib/logger';
import { isManagedMediaUrl, isR2MediaUrl } from '@/lib/media-url';
import { enforceRateLimit, rateLimitResponse } from '@/lib/rate-limit';
import {
  requiresR2InProduction,
  r2NotConfiguredError,
  shouldUseR2Storage,
  getR2Config,
  validateR2CredentialLengths,
} from '@/lib/r2-config';
import { deleteFromR2, uploadToR2 } from '@/lib/r2-storage';
import {
  ALLOWED_UPLOAD_MIMES,
  MAX_UPLOAD_BYTES,
  detectImageMime,
  sanitizeUploadFilename,
  sanitizeUploadSubdir,
} from '@/lib/upload-security';

export async function POST(request: Request) {
  const rl = enforceRateLimit(request, 'upload', 20, 60 * 60 * 1000);
  if (!rl.allowed) return rateLimitResponse(rl.retryAfterSec);

  try {
    if (!(await requireAdmin(request))) {
      return apiError('Unauthorized', 401, { code: 'UNAUTHORIZED' });
    }

    if (requiresR2InProduction() && !shouldUseR2Storage()) {
      return apiError(r2NotConfiguredError(), 503, { code: 'STORAGE_UNAVAILABLE' });
    }

    if (shouldUseR2Storage()) {
      const r2Config = getR2Config();
      const credErr = r2Config ? validateR2CredentialLengths(r2Config) : null;
      if (credErr) {
        return apiError(credErr, 503, { code: 'STORAGE_UNAVAILABLE' });
      }
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
    const originalName = (file as File).name || 'upload.bin';
    const sanitizedName = sanitizeUploadFilename(originalName);
    const ext = detectedMime.split('/')[1] === 'jpeg' ? 'jpg' : detectedMime.split('/')[1];
    const filename = `${Date.now()}-${sanitizedName.replace(/\.[^.]+$/, '')}.${ext}`;

    const result = shouldUseR2Storage()
      ? await uploadToR2(buffer, subdir, filename, detectedMime)
      : uploadToLocal(buffer, subdir, filename, detectedMime);

    logger.info('Upload saved', {
      url: result.url,
      storage: result.storage,
      mime: result.mime,
      bytes: result.bytes,
    });

    return NextResponse.json({
      url: result.url,
      secure_url: result.url,
      public_id: filename,
      mime: result.mime,
      storage: result.storage,
    });
  } catch (error) {
    const message = safeErrorMessage(error);
    const isNetwork =
      message.includes('ECONNREFUSED') ||
      message.includes('ETIMEDOUT') ||
      message.includes('ENOTFOUND') ||
      message.includes('timeout');

    logger.error('Upload failed', { error: message });
    if (isNetwork) {
      return apiError('Storage service unavailable. Please retry.', 503, {
        code: 'STORAGE_UNAVAILABLE',
      });
    }
    return apiError(message, 500, { code: 'INTERNAL_ERROR' });
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

    if (!isManagedMediaUrl(urlParam)) {
      return apiError('URL is not a managed upload', 400, { code: 'VALIDATION_ERROR' });
    }

    let deleted = false;
    if (isR2MediaUrl(urlParam)) {
      deleted = await deleteFromR2(urlParam);
    } else {
      deleted = deleteFromLocal(urlParam);
    }

    if (deleted) {
      logger.info('Upload deleted', { url: urlParam });
      return NextResponse.json({ success: true, message: 'File deleted successfully' });
    }

    return apiError('File not found', 404, { code: 'NOT_FOUND' });
  } catch (error) {
    const message = safeErrorMessage(error);
    logger.error('Upload delete failed', { error: message });
    return apiError(message, 500, { code: 'INTERNAL_ERROR' });
  }
}
