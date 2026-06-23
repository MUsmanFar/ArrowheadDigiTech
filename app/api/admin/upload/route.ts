import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { authenticateAdmin } from '@/backend/middleware/auth.middleware';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
const MAX_SIZE = 5 * 1024 * 1024;

function getUploadDir(subdir?: string): string {
  if (subdir) {
    const safe = subdir.replace(/[^a-zA-Z0-9_\/-]/g, '').replace(/\\/g, '/');
    return path.join(process.cwd(), 'public', 'uploads', safe);
  }
  return path.join(process.cwd(), 'public', 'uploads');
}

export async function POST(request: Request) {
  try {
    const isAuthed = await authenticateAdmin(request);
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as Blob | null;
    const subdir = formData.get('subdir') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Only JPEG, PNG, WEBP, GIF, and SVG images are allowed' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadDir = getUploadDir(subdir || undefined);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const originalName = (file as any).name || 'upload.png';
    const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${sanitizedName}`;
    const filepath = path.join(uploadDir, filename);

    fs.writeFileSync(filepath, buffer);

    const url = subdir ? `/uploads/${subdir}/${filename}` : `/uploads/${filename}`;

    return NextResponse.json({
      url,
      secure_url: url,
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
    const url = searchParams.get('url') || searchParams.get('filename') || '';
    const filename = url.split('/').pop();

    if (!filename) {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
    }

    const safeFilename = path.basename(filename);
    // Try all possible subdirectories
    const dirsToSearch = ['', 'projects', 'founder', 'logos', 'services'];
    let deleted = false;

    for (const subdir of dirsToSearch) {
      const filepath = subdir
        ? path.join(process.cwd(), 'public', 'uploads', subdir, safeFilename)
        : path.join(process.cwd(), 'public', 'uploads', safeFilename);

      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        deleted = true;
        break;
      }
    }

    if (deleted) {
      return NextResponse.json({ success: true, message: 'File deleted successfully' });
    }
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  } catch (error: any) {
    console.error('File deletion error:', error);
    return NextResponse.json(
      { error: error.message || 'File deletion failed' },
      { status: 500 }
    );
  }
}
