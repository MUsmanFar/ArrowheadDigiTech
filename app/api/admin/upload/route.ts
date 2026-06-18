import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { authenticateAdmin } from '@/backend/middleware/auth.middleware';

export async function POST(request: Request) {
  try {
    const isAuthed = await authenticateAdmin(request);
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as Blob | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Server-side size validation: Max 5MB
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
    }

    // Server-side mime-type validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Only JPEG, PNG, WEBP, GIF, and SVG images are allowed' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save locally to public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Sanitize filename
    const originalName = (file as any).name || 'upload.png';
    const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${sanitizedName}`;
    const filepath = path.join(uploadDir, filename);

    fs.writeFileSync(filepath, buffer);

    // Return format mimicking Cloudinary response structure
    return NextResponse.json({
      url: `/uploads/${filename}`,
      secure_url: `/uploads/${filename}`,
      public_id: filename,
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: error.message || 'File upload failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const isAuthed = await authenticateAdmin(request);
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename') || searchParams.get('url')?.split('/').pop();

    if (!filename) {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
    }

    // Protect against directory traversal
    const safeFilename = path.basename(filename);
    const filepath = path.join(process.cwd(), 'public', 'uploads', safeFilename);

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      return NextResponse.json({ success: true, message: 'File deleted successfully' });
    } else {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  } catch (error: any) {
    console.error('File deletion error:', error);
    return NextResponse.json(
      { error: error.message || 'File deletion failed' },
      { status: 500 }
    );
  }
}
