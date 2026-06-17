import { adminController } from '@/backend/controllers/admin.controller';

export async function GET(request: Request, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  return adminController.handleGet(request, entity);
}

export async function POST(request: Request, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  return adminController.handlePost(request, entity);
}

export async function PUT(request: Request, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  return adminController.handlePut(request, entity);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  return adminController.handleDelete(request, entity);
}
