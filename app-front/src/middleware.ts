import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  console.log('@ middleware working!')

  const accessToken = req.cookies.get('accessToken')?.value

  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  NextResponse.next()
}

export const config = {
  matcher: ['/((?!auth|_next/static|_next/image|.*\\.png$).*)'], // '/auth'로 시작하는 경로 제외
}
