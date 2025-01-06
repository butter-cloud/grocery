import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import api from '@/config/axiosInstance'

export async function middleware(req: NextRequest) {
  console.log('@ middleware working!')

  const accessToken = req.cookies.get('accessToken')
  const refreshToken = req.cookies.get('refreshToken')

  console.log("accessToken: ", accessToken)
  console.log("refreshToken: ", refreshToken)

  if ((!accessToken || typeof accessToken == "undefined") && !req.url.includes('/auth/login')) {
    console.log("access token 없음")
    // 1. access token, refresh token 둘 다 없는 경우
    if (!refreshToken) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    // 2. refresh token 있는 경우
    try {
      const res = await api.post('/auth/refresh', null, {
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
        },
      })

      console.log(res.status)

      if (res.status !== 200) {
        return NextResponse.redirect(new URL('/auth/login', req.url))
      }

      NextResponse.next()

    } catch (error) {
      console.error('Error refreshing token: ', error)
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
  }
}

export const config = {
  matcher: ['/((?!auth|_next/static|_next/image|.*\\.png$).*)'], // '/auth'로 시작하는 경로 제외
}
