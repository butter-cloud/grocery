import { http, HttpResponse } from 'msw'
import { API_BASE_URL } from '@/constants/apiUrls'
import { AuthResponse } from '@/type/AuthResponse'
import { AuthRequest } from '@/type/AuthRequest'
import {
  MOCK_USERS,
  MOCK_ACCESS_TOKEN,
  MOCK_REFRESH_TOKEN,
} from '@/constants/mockAuth'

export const authHandlers = [
  // register api
  http.post(`${API_BASE_URL}/auth/register`, async ({ request }) => {
    console.log('[msw] /auth/register handler')
    return HttpResponse.text('User registered successfully', { status: 200 })
  }),

  // login api
  http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
    console.log('[msw] /auth/login handler')
    const { username, password } = (await request.json()) as AuthRequest

    const foundUser = MOCK_USERS.find(
      (user) => user.username === username && user.password === password,
    )

    if (foundUser) {
      console.log('[msw] login success')
      const refreshTokenCookie = `refreshToken=${MOCK_REFRESH_TOKEN}; HttpOnly; Path=/; Max-Age=604800`
      return HttpResponse.json<AuthResponse>(
        {
          accessToken: MOCK_ACCESS_TOKEN,
          refreshToken: null,
          error: null,
        },
        {
          status: 200,
          headers: {
            'Set-Cookie': refreshTokenCookie,
          },
        },
      )
    } else {
      return HttpResponse.json(
        {
          accessToken: null,
          refreshToken: null,
          error: 'Invalid credentials',
        },
        { status: 401 },
      )
    }
  }),

  // refresh api
  http.post(`${API_BASE_URL}/auth/refresh`, async ({ request }) => {
    console.log('[msw] /auth/refresh handler - auto success')
    return HttpResponse.json<AuthResponse>(
      {
        accessToken: 'new-mock-access-token-456',
        refreshToken: null,
        error: null,
      },
      { status: 200 },
    )
  }),

  // logout api
  http.post(`${API_BASE_URL}/auth/logout`, async ({ request }) => {
    console.log('[msw] /auth/logout handler')
    return HttpResponse.text('Logged out successfully', { status: 200 })
  }),
]
