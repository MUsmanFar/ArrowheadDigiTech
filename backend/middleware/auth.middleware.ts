import { verifyJwt } from '@/lib/jwt';

export async function authenticateAdmin(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((c) => c.trim().split('='))
  );
  const token = cookies['admin_token'];

  if (!token) return null;

  const jwtSecret = process.env.JWT_SECRET || 'arrowhead-digitech-premium-secret-key-2026-secure-token-generation-key';
  return await verifyJwt(token, jwtSecret);
}
