import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('user_token')?.value;

  // Protect /user routes, allow access to /login
  if (request.nextUrl.pathname.startsWith('/user') && request.nextUrl.pathname !== '/login') {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*'],
};
