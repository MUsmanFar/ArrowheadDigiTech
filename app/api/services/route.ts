import { publicController } from '@/backend/controllers/public.controller';
import { serviceController } from '@/backend/controllers/service.controller';

export async function GET() {
  return publicController.handleGet('services');
}

export async function POST(request: Request) {
  return serviceController.createService(request);
}
