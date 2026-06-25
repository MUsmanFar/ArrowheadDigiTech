import { verifyJwt } from '@/lib/jwt';
import { getJwtSecret } from '@/lib/env';

export type AdminJwtPayload = {
  id: string;
  email: string;
  role: string;
  exp?: number;
};

function parseCookieHeader(header: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    cookies[part.slice(0, idx).trim()] = part.slice(idx + 1).trim();
  }
  return cookies;
}

export async function authenticateAdmin(request: Request): Promise<AdminJwtPayload | null> {
  const cookieHeader = request.headers.get('cookie') || '';
  const token = parseCookieHeader(cookieHeader)['admin_token'];

  if (!token) return null;

  try {
    const decoded = await verifyJwt(token, getJwtSecret());
    if (!decoded?.email || !decoded?.id) return null;
    return decoded as AdminJwtPayload;
  } catch {
    return null;
  }
}

export async function requireAdmin(request: Request): Promise<AdminJwtPayload | null> {
  const user = await authenticateAdmin(request);
  if (!user) return null;
  if (user.role !== 'admin') return null;
  return user;
}
