import { serviceController } from '@/backend/controllers/service.controller';

export async function GET() {
  return serviceController.getServices();
}

export async function POST(request: Request) {
  return serviceController.createService(request);
}
