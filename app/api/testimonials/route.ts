import { testimonialController } from '@/backend/controllers/testimonial.controller';

export async function GET() {
  return testimonialController.getTestimonials();
}

export async function POST(request: Request) {
  return testimonialController.createTestimonial(request);
}
