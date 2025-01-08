import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  console.log('@ middleware working!')

  if (req.nextUrl.pathname === '/') {
    return NextResponse.next()
  }

  const accessToken = req.cookies.get('accessToken')?.value

  if (!accessToken) {
    console.log("[middleware] accessToken not found - redirect to /auth/login")
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  NextResponse.next()
}

export const config = {
  matcher: [
    // Exclude paths starting with /auth, _next/static, _next/image, image files, favicon.ico
    '/((?!auth|_next/static|_next/image|.*\\.png$|favicon.ico).*)',
  ],
}
