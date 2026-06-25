import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { getJwtSecret } from '@/lib/env';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Exclude public admin routes (login, API auth routes)
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/admin/api/auth')
  ) {
    return NextResponse.next();
  }

  // 2. Check for cookie
  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // 3. Verify JWT
  let decoded = null;
  try {
    decoded = await verifyJwt(token, getJwtSecret());
  } catch {
    decoded = null;
  }

  if (!decoded || decoded.role !== 'admin') {
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.delete('admin_token');
    return response;
  }
  const response = NextResponse.next();
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

// Config to specify matching paths
export const config = {
  matcher: ['/admin/:path*'],
};
