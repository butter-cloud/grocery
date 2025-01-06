import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  console.log("middleware working!");

  const token = req.cookies.get('token');

  if (!token && !req.url.includes('/auth/login')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!auth|_next/static|_next/image|.*\\.png$).*)'], // '/auth'로 시작하는 경로 제외
};
