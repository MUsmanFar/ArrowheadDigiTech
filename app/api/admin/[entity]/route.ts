import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';
import { verifyJwt } from '@/lib/jwt';

// Entity Map to match API URLs to our dbService objects
const entityMap: Record<string, any> = {
  services: dbService.services,
  projects: dbService.projects,
  testimonials: dbService.testimonials,
  faqs: dbService.faqs,
  blog: dbService.blogPosts,
  pricing: dbService.pricingPackages,
  team: dbService.teamMembers,
  leads: dbService.leads,
};

async function authenticate(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((c) => c.trim().split('='))
  );
  const token = cookies['admin_token'];

  if (!token) return null;

  const jwtSecret = process.env.JWT_SECRET || 'arrowhead-digitech-premium-secret-key-2026-secure-token-generation-key';
  return await verifyJwt(token, jwtSecret);
}

export async function GET(request: Request, { params }: { params: Promise<{ entity: string }> }) {
  try {
    const { entity } = await params;
    const targetService = entityMap[entity];

    if (!targetService) {
      return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
    }

    // Enforce authentication only for sensitive entities
    if (['leads', 'users', 'settings'].includes(entity)) {
      const isAuthed = await authenticate(request);
      if (!isAuthed) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const data = await targetService.findMany();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`API Error (GET /api/admin/entity):`, error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ entity: string }> }) {
  try {
    const isAuthed = await authenticate(request);
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { entity } = await params;
    const targetService = entityMap[entity];

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

export async function PUT(request: Request, { params }: { params: Promise<{ entity: string }> }) {
  try {
    const isAuthed = await authenticate(request);
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { entity } = await params;
    const targetService = entityMap[entity];

    if (!targetService) {
      return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
    }

    const body = await request.json();
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

export async function DELETE(request: Request, { params }: { params: Promise<{ entity: string }> }) {
  try {
    const isAuthed = await authenticate(request);
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { entity } = await params;
    const targetService = entityMap[entity];

    if (!targetService) {
      return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
    }

    // Get id from search params or body
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
