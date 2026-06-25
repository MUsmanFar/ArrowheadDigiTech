import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';
import { signJwt } from '@/lib/jwt';
import bcrypt from 'bcryptjs';
import { getJwtSecret } from '@/lib/env';
import { apiError, safeErrorMessage } from '@/lib/api-response';
import { logger } from '@/lib/logger';
import { enforceRateLimit, rateLimitResponse } from '@/lib/rate-limit';
import { parseJsonBody, loginSchema, readJsonBody } from '@/lib/validation/schemas';

export async function POST(request: Request) {
  const rl = enforceRateLimit(request, 'admin-login', 10, 15 * 60 * 1000);
  if (!rl.allowed) return rateLimitResponse(rl.retryAfterSec);

  try {
    const bodyResult = await readJsonBody(request);
    if (!bodyResult.ok) return apiError(bodyResult.error, 400, { code: 'INVALID_JSON' });

    const parsed = parseJsonBody(loginSchema, bodyResult.data);
    if (!parsed.success) return apiError(parsed.error, 400, { code: 'VALIDATION_ERROR' });

    const { email, password } = parsed.data;

    let user = await dbService.users.findUnique(email);

    if (!user && process.env.DB_MOCK === 'true') {
      const defaultEmail = process.env.ADMIN_EMAIL || 'admin@arrowheaddigitech.com';
      const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';

      if (email === defaultEmail) {
        user = {
          id: 'usr_1',
          email: defaultEmail,
          password: bcrypt.hashSync(defaultPassword, 10),
          name: 'Super Admin',
          role: 'admin',
        };
      }
    }

    if (!user) {
      return apiError('Invalid credentials', 401, { code: 'INVALID_CREDENTIALS' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.warn('Failed admin login attempt', { email });
      return apiError('Invalid credentials', 401, { code: 'INVALID_CREDENTIALS' });
    }

    if (user.role !== 'admin') {
      return apiError('Unauthorized', 403, { code: 'FORBIDDEN' });
    }

    const token = await signJwt(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      },
      getJwtSecret(),
    );

    const response = NextResponse.json({
      success: true,
      user: { email: user.email, name: user.name, role: user.role },
    });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    logger.info('Admin login success', { email: user.email });
    return response;
  } catch (error) {
    logger.error('Login error', { error: safeErrorMessage(error) });
    return apiError('An error occurred', 500, { code: 'INTERNAL_ERROR' });
  }
}
