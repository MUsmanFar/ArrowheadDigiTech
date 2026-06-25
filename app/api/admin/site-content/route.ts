import { NextResponse } from 'next/server';
import { requireAdmin } from '@/backend/middleware/auth.middleware';
import {
  SITE_CONTENT_KEYS,
  type SiteContentKey,
} from '@/lib/site-content';
import { getSiteContent, upsertSiteSection } from '@/lib/site-content-server';
import { apiError, safeErrorMessage } from '@/lib/api-response';
import { logger } from '@/lib/logger';
import { enforceRateLimit, rateLimitResponse } from '@/lib/rate-limit';
import { sanitizeSiteContentSection } from '@/lib/sanitize';
import { parseJsonBody, siteContentPutSchema, readJsonBody } from '@/lib/validation/schemas';

export async function GET(request: Request) {
  const rl = enforceRateLimit(request, 'admin-site-content', 60, 60_000);
  if (!rl.allowed) return rateLimitResponse(rl.retryAfterSec);

  if (!(await requireAdmin(request))) {
    return apiError('Unauthorized', 401, { code: 'UNAUTHORIZED' });
  }
  try {
    const content = await getSiteContent();
    return NextResponse.json({ keys: SITE_CONTENT_KEYS, content });
  } catch (error) {
    logger.error('GET /api/admin/site-content failed', { error: safeErrorMessage(error) });
    return apiError('Failed to load site content', 500, { code: 'INTERNAL_ERROR' });
  }
}

export async function PUT(request: Request) {
  const rl = enforceRateLimit(request, 'admin-site-content', 60, 60_000);
  if (!rl.allowed) return rateLimitResponse(rl.retryAfterSec);

  if (!(await requireAdmin(request))) {
    return apiError('Unauthorized', 401, { code: 'UNAUTHORIZED' });
  }
  try {
    const bodyResult = await readJsonBody(request);
    if (!bodyResult.ok) return apiError(bodyResult.error, 400, { code: 'INVALID_JSON' });

    const parsed = parseJsonBody(siteContentPutSchema, bodyResult.data);
    if (!parsed.success) return apiError(parsed.error, 400, { code: 'VALIDATION_ERROR' });

    const { key, value } = parsed.data;
    if (!SITE_CONTENT_KEYS.includes(key as SiteContentKey)) {
      return apiError('Invalid site content key', 400, { code: 'VALIDATION_ERROR' });
    }
    if (value == null || typeof value !== 'object') {
      return apiError('Invalid site content value', 400, { code: 'VALIDATION_ERROR' });
    }
    const sanitized = sanitizeSiteContentSection(value) as SiteContentMapValue;
    await upsertSiteSection(key as SiteContentKey, sanitized);
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('PUT /api/admin/site-content failed', { error: safeErrorMessage(error) });
    return apiError('Failed to save site content', 500, { code: 'INTERNAL_ERROR' });
  }
}

type SiteContentMapValue = import('@/lib/site-content').SiteContentMap[SiteContentKey];
