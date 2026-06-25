import { NextResponse } from 'next/server';
import { publicController } from '@/backend/controllers/public.controller';

export async function GET(_request: Request, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  return publicController.handleGet(entity);
}
