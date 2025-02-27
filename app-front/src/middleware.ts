import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios'
import api from '@/config/axiosInstance'

export async function middleware(req: NextRequest) {
  console.log('@ middleware working!')
  return NextResponse.next()
  //
  // try {
  //   const res = await api.get('/security/admin')
  //   if (res.status === 200) {
  //     console.log(res)
  //     return NextResponse.next()
  //   }
  // } catch (error) {
  //   console.error(error)
  //   if (axios.isAxiosError(error) && error.response) {
  //     if (error.status === 403) {
  //       console.log('admin 권한이 없습니다.')
  //       return NextResponse.redirect(new URL('/auth/home', req.url))
  //     } else if (error.status === 401) {
  //       console.log('Login Required')
  //       console.log(new URL('/auth/login', req.url))
  //       return NextResponse.redirect(new URL('/auth/login', req.url))
  //     }
  //   }
  // }

  // return NextResponse.redirect(new URL('/auth/login', req.url))

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
}

export const config = {
  matcher: [
    '/admin/:path*',
    // Exclude paths starting with /auth, _next/static, _next/image, image files, favicon.ico
    // '/((?!auth|_next/static|_next/image|.*\\.png$|favicon.ico).*)',
  ],
}
