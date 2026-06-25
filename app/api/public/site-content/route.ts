import { NextResponse } from 'next/server';
import { getSiteContent } from '@/lib/site-content-server';
import { apiError, safeErrorMessage } from '@/lib/api-response';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const content = await getSiteContent();
    const response = NextResponse.json(content);
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return response;
  } catch (error) {
    logger.error('GET /api/public/site-content failed', { error: safeErrorMessage(error) });
    return apiError('Failed to load site content', 500, { code: 'INTERNAL_ERROR' });
  }
}
