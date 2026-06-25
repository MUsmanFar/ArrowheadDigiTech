import { verifyJwt } from '@/lib/jwt';
import { getJwtSecret } from '@/lib/env';

export type AdminJwtPayload = {
  id: string;
  email: string;
  role: string;
  exp?: number;
};

export async function authenticateAdmin(request: Request): Promise<AdminJwtPayload | null> {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((c) => c.trim().split('=')),
  );
  const token = cookies['admin_token'];

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
