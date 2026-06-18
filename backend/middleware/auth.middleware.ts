import { verifyJwt } from '@/lib/jwt';
import { getJwtSecret } from '@/lib/env';

export async function authenticateAdmin(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((c) => c.trim().split('='))
  );
  const token = cookies['admin_token'];

  if (!token) return null;

  try {
    return await verifyJwt(token, getJwtSecret());
  } catch (error) {
    console.error('Admin authentication is unavailable:', error);
    return null;
  }
}
