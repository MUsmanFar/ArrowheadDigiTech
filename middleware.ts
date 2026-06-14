import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from '@/lib/jwt';

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
  const jwtSecret = process.env.JWT_SECRET || 'arrowhead-digitech-premium-secret-key-2026-secure-token-generation-key';
  const decoded = await verifyJwt(token, jwtSecret);

  if (!decoded) {
    // If token invalid, redirect to login and clear invalid cookie
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.delete('admin_token');
    return response;
  }

  // User is authenticated — add noindex header for all admin pages
  const response = NextResponse.next();
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

// Config to specify matching paths
export const config = {
  matcher: ['/admin/:path*'],
};
