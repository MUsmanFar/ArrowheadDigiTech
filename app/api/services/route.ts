import { publicController } from '@/backend/controllers/public.controller';
import { apiError } from '@/lib/api-response';

export async function GET() {
  return publicController.handleGet('services');
}

export async function POST() {
  return apiError(
    'This endpoint is deprecated. Use POST /api/admin/services with admin authentication.',
    410,
    { code: 'DEPRECATED' },
  );
}
