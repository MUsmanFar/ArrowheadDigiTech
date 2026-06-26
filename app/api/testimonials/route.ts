import { testimonialController } from '@/backend/controllers/testimonial.controller';
import { apiError } from '@/lib/api-response';

export async function GET() {
  return testimonialController.getTestimonials();
}

export async function POST() {
  return apiError(
    'This endpoint is deprecated. Use POST /api/admin/testimonials with admin authentication.',
    410,
    { code: 'DEPRECATED' },
  );
}
