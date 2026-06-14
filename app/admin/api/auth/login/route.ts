import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';
import { signJwt } from '@/lib/jwt';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Fetch user from dbService (handles mock mode and database mode)
    let user = await dbService.users.findUnique(email);

    // If mock mode is active and user is not found, check default env credentials
    if (!user && process.env.DB_MOCK === 'true') {
      const defaultEmail = process.env.ADMIN_EMAIL || 'admin@arrowheaddigitech.com';
      const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
      
      if (email === defaultEmail) {
        user = {
          id: 'usr_1',
          email: defaultEmail,
          password: bcrypt.hashSync(defaultPassword, 10),
          name: 'Super Admin',
          role: 'admin'
        };
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // 2. Sign JWT Token
    const jwtSecret = process.env.JWT_SECRET || 'arrowhead-digitech-premium-secret-key-2026-secure-token-generation-key';
    const token = await signJwt(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
      },
      jwtSecret
    );

    // 3. Set HttpOnly Cookie
    const response = NextResponse.json({ success: true, user: { email: user.email, name: user.name, role: user.role } });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}
