import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Default Credentials
    const defaultUser = process.env.ADMIN_USER || 'admin';
    const defaultPass = process.env.ADMIN_PASS || 'rahul1234';

    if (username === defaultUser && password === defaultPass) {
      const response = NextResponse.json({ message: 'Authorized' }, { status: 200 });
      
      // Set secure HTTP-only cookie
      response.cookies.set('admin_token', 'authorized', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400, // 24 hours
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
