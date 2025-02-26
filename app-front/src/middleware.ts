import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  console.log('@ middleware working!')

  const headers = new Headers(req.headers)
  headers.set('x-current-path', req.nextUrl.pathname)

  // if (req.nextUrl.pathname === '/') {
  //   return NextResponse.next({ headers })
  // }
  //
  // const accessToken = req.cookies.get('accessToken')?.value
  //
  // if (!accessToken) {
  //   console.log('[middleware] accessToken not found - redirect to /auth/login')
  //   return NextResponse.redirect(new URL('/auth/login', req.url))
  // }

  return NextResponse.next({ headers })
}

export const config = {
  matcher: [
    '/admin/:path*',
    // Exclude paths starting with /auth, _next/static, _next/image, image files, favicon.ico
    // '/((?!auth|_next/static|_next/image|.*\\.png$|favicon.ico).*)',
  ],
}
