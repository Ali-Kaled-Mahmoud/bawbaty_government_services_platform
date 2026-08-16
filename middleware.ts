import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  // المسارات التي تتطلب تسجيل الدخول
  // const protectedPaths = ['/requests', '/appointments', '/profile'];
  const protectedPaths = ['/profile'];

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ['/requests/:path*', '/appointments/:path*', '/profile/:path*'],
  matcher: ['/profile/:path*'],
};