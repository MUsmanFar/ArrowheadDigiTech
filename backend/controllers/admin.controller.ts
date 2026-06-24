import { NextResponse } from 'next/server';
import { adminService } from '../services/admin.service';
import { authenticateAdmin } from '../middleware/auth.middleware';

export class AdminController {
  async handleGet(request: Request, entity: string) {
    try {
      const targetService = adminService.getServiceForEntity(entity);

      if (!targetService) {
        return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
      }

      const isAuthed = await authenticateAdmin(request);
      if (!isAuthed) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const data = await targetService.findMany();
      return NextResponse.json(data);
    } catch (error: any) {
      console.error(`API Error (GET /api/admin/entity):`, error);
      return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
  }

  async handlePost(request: Request, entity: string) {
    try {
      const isAuthed = await authenticateAdmin(request);
      if (!isAuthed) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const targetService = adminService.getServiceForEntity(entity);

      if (!targetService) {
        return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
      }

      const body = await request.json();
      const data = await targetService.create(body);
      return NextResponse.json(data);
    } catch (error: any) {
      console.error(`API Error (POST /api/admin/entity):`, error);
      return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
  }

  async handlePut(request: Request, entity: string) {
    try {
      const isAuthed = await authenticateAdmin(request);
      if (!isAuthed) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const targetService = adminService.getServiceForEntity(entity);

      if (!targetService) {
        return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
      }

      const body = await request.json();

      if (entity === 'project-media') {
        const { id, slug, ...data } = body;
        if (!slug) {
          return NextResponse.json({ error: 'Missing slug for project media' }, { status: 400 });
        }
        if (id) {
          const updated = await targetService.update(id, { slug, ...data });
          return NextResponse.json(updated);
        }
        const created = await targetService.upsert(slug, data);
        return NextResponse.json(created);
      }

      const { id, ...updateData } = body;

      if (!id) {
        return NextResponse.json({ error: 'Missing ID for update' }, { status: 400 });
      }

      const data = await targetService.update(id, updateData);
      return NextResponse.json(data);
    } catch (error: any) {
      console.error(`API Error (PUT /api/admin/entity):`, error);
      return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
  }

  async handleDelete(request: Request, entity: string) {
    try {
      const isAuthed = await authenticateAdmin(request);
      if (!isAuthed) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const targetService = adminService.getServiceForEntity(entity);

      if (!targetService) {
        return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
      }

      const url = new URL(request.url);
      let id = url.searchParams.get('id');

      if (!id) {
        const body = await request.json().catch(() => ({}));
        id = body.id;
      }

      if (!id) {
        return NextResponse.json({ error: 'Missing ID for deletion' }, { status: 400 });
      }

      const data = await targetService.delete(id);
      return NextResponse.json({ success: true, deleted: data });
    } catch (error: any) {
      console.error(`API Error (DELETE /api/admin/entity):`, error);
      return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
  }
}

export const adminController = new AdminController();
