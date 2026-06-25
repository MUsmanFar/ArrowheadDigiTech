import { NextResponse } from 'next/server';
import { adminService } from '../services/admin.service';
import { requireAdmin } from '../middleware/auth.middleware';
import { apiError, safeErrorMessage } from '@/lib/api-response';
import { logger } from '@/lib/logger';
import { enforceRateLimit, rateLimitResponse } from '@/lib/rate-limit';
import { sanitizeEntityPayload } from '@/lib/sanitize';
import { stripSensitive, stripSensitiveList } from '@/lib/serialize';
import { parseJsonBody, projectMediaPutSchema, readJsonBody } from '@/lib/validation/schemas';

const ADMIN_RATE = { limit: 120, windowMs: 60_000 };

function checkAdminRateLimit(request: Request): NextResponse | null {
  const rl = enforceRateLimit(request, 'admin-api', ADMIN_RATE.limit, ADMIN_RATE.windowMs);
  if (!rl.allowed) return rateLimitResponse(rl.retryAfterSec) as NextResponse;
  return null;
}

export class AdminController {
  async handleGet(request: Request, entity: string) {
    const limited = checkAdminRateLimit(request);
    if (limited) return limited;

    try {
      if (!adminService.isAllowedEntity(entity)) {
        return apiError('Entity not found', 404, { code: 'NOT_FOUND' });
      }

      const admin = await requireAdmin(request);
      if (!admin) return apiError('Unauthorized', 401, { code: 'UNAUTHORIZED' });

      const targetService = adminService.getServiceForEntity(entity)!;
      const data = await targetService.findMany();
      const safe = Array.isArray(data) ? stripSensitiveList(data) : stripSensitive(data);
      return NextResponse.json(safe);
    } catch (error) {
      logger.error('Admin GET failed', { entity, error: safeErrorMessage(error) });
      return apiError(safeErrorMessage(error), 500, { code: 'INTERNAL_ERROR' });
    }
  }

  async handlePost(request: Request, entity: string) {
    const limited = checkAdminRateLimit(request);
    if (limited) return limited;

    try {
      const admin = await requireAdmin(request);
      if (!admin) return apiError('Unauthorized', 401, { code: 'UNAUTHORIZED' });

      if (!adminService.isAllowedEntity(entity)) {
        return apiError('Entity not found', 404, { code: 'NOT_FOUND' });
      }

      const bodyResult = await readJsonBody(request);
      if (!bodyResult.ok) return apiError(bodyResult.error, 400, { code: 'INVALID_JSON' });

      const payload = sanitizeEntityPayload(entity, bodyResult.data as Record<string, unknown>);
      const targetService = adminService.getServiceForEntity(entity)!;
      const data = await targetService.create(payload);
      return NextResponse.json(stripSensitive(data));
    } catch (error) {
      logger.error('Admin POST failed', { entity, error: safeErrorMessage(error) });
      return apiError(safeErrorMessage(error), 500, { code: 'INTERNAL_ERROR' });
    }
  }

  async handlePut(request: Request, entity: string) {
    const limited = checkAdminRateLimit(request);
    if (limited) return limited;

    try {
      const admin = await requireAdmin(request);
      if (!admin) return apiError('Unauthorized', 401, { code: 'UNAUTHORIZED' });

      if (!adminService.isAllowedEntity(entity)) {
        return apiError('Entity not found', 404, { code: 'NOT_FOUND' });
      }

      const bodyResult = await readJsonBody(request);
      if (!bodyResult.ok) return apiError(bodyResult.error, 400, { code: 'INVALID_JSON' });

      const body = bodyResult.data;
      const targetService = adminService.getServiceForEntity(entity)!;

      if (entity === 'project-media') {
        const parsed = parseJsonBody(projectMediaPutSchema, body);
        if (!parsed.success) return apiError(parsed.error, 400, { code: 'VALIDATION_ERROR' });
        const { id, slug, ...data } = parsed.data as Record<string, unknown>;
        const sanitized = sanitizeEntityPayload(entity, data as Record<string, unknown>);
        if (id) {
          const updated = await targetService.update(id, { slug, ...sanitized });
          return NextResponse.json(stripSensitive(updated));
        }
        const created = await targetService.upsert(slug, sanitized);
        return NextResponse.json(stripSensitive(created));
      }

      const { id, ...updateData } = body as { id?: string };
      if (!id) return apiError('Missing ID for update', 400, { code: 'VALIDATION_ERROR' });

      const payload = sanitizeEntityPayload(entity, updateData as Record<string, unknown>);
      const data = await targetService.update(id, payload);
      return NextResponse.json(stripSensitive(data));
    } catch (error) {
      logger.error('Admin PUT failed', { entity, error: safeErrorMessage(error) });
      return apiError(safeErrorMessage(error), 500, { code: 'INTERNAL_ERROR' });
    }
  }

  async handleDelete(request: Request, entity: string) {
    const limited = checkAdminRateLimit(request);
    if (limited) return limited;

    try {
      const admin = await requireAdmin(request);
      if (!admin) return apiError('Unauthorized', 401, { code: 'UNAUTHORIZED' });

      if (!adminService.isAllowedEntity(entity)) {
        return apiError('Entity not found', 404, { code: 'NOT_FOUND' });
      }

      const targetService = adminService.getServiceForEntity(entity)!;
      const url = new URL(request.url);
      let id = url.searchParams.get('id');

      if (!id) {
        const body = await request.json().catch(() => ({}));
        id = (body as { id?: string }).id ?? null;
      }

      if (!id) return apiError('Missing ID for deletion', 400, { code: 'VALIDATION_ERROR' });

      const data = await targetService.delete(id);
      return NextResponse.json({ success: true, deleted: stripSensitive(data) });
    } catch (error) {
      logger.error('Admin DELETE failed', { entity, error: safeErrorMessage(error) });
      return apiError(safeErrorMessage(error), 500, { code: 'INTERNAL_ERROR' });
    }
  }
}

export const adminController = new AdminController();
