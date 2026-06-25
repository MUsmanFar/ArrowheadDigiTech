import { NextResponse } from 'next/server';
import { publicService } from '../services/public.service';
import { apiError, safeErrorMessage } from '@/lib/api-response';
import { logger } from '@/lib/logger';

export class PublicController {
  async handleGet(entity: string) {
    try {
      const targetService = publicService.getServiceForEntity(entity);

      if (!targetService) {
        return apiError('Entity not found', 404, { code: 'NOT_FOUND' });
      }

      const data = await targetService.findMany();
      const response = NextResponse.json(data);
      response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
      return response;
    } catch (error) {
      logger.error('Public GET failed', { entity, error: safeErrorMessage(error) });
      return apiError(safeErrorMessage(error), 500, { code: 'INTERNAL_ERROR' });
    }
  }
}

export const publicController = new PublicController();
