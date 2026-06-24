import { NextResponse } from 'next/server';
import { publicService } from '../services/public.service';

export class PublicController {
  async handleGet(entity: string) {
    try {
      const targetService = publicService.getServiceForEntity(entity);

      if (!targetService) {
        return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
      }

      const data = await targetService.findMany();
      return NextResponse.json(data);
    } catch (error: any) {
      console.error(`API Error (GET /api/public/${entity}):`, error);
      return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
  }
}

export const publicController = new PublicController();
