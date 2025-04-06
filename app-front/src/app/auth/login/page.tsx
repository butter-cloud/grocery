'use client'

import { useEffect, useState } from 'react'
import {
  Container,
  Input,
  Wrapper,
  Link,
  LoginTitle,
} from '@/ui/style/authStyle'
import { isLogin } from '@/util/CommonUtil'
import GoogleSignInButton from '@/ui/component/common/GoogleSignInButton'
import useCartProps from '@/hook/useCartProps'
import { GOOGLE_AUTH_LOGIN_URL } from '@/constants/apiUrls'
import authApi from '@/api/auth/authApi'
import { PAGE_URLS } from '@/constants/pageUrls'
import { Button } from '@/ui/component/common/Button'
import { useMediaQuery } from '@mui/material'
import { loadingQuery } from '@/constants/mediaConstants'
import { LoadingSpinner } from '@/ui/component/common/LoadingSpinner'

export default function Login() {
  const isMediaQueryLoaded = useMediaQuery(loadingQuery)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { mergeCart } = useCartProps()

  useEffect(() => {
    console.log('clientId: ', process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID)
    if (isLogin()) {
      alert('Already logged in!')
      window.location.replace('/')
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await authApi.login(username, password)
      console.log("login response: ", res)
      console.log("accessToken: ", res.data.accessToken)
      if (res.status !== 200) {
        console.log('Login failed')
        alert('Login failed')
        return
      }
      console.log('Login successful')
      localStorage.setItem('accessToken', res.data.accessToken)
      // mergeCart()

      const params = new URLSearchParams(window.location.search)
      const redirectUrl = params.get('redirect') || '/' // redirect 값이 없으면 기본값으로 '/' 사용
      window.location.replace(redirectUrl)
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <>
      {isMediaQueryLoaded ? (
        <Container>
          <form onSubmit={handleLogin}>
            <Wrapper>
              <LoginTitle>Login</LoginTitle>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" variant={'primary'}>
                Login
              </Button>

              <GoogleSignInButton
                onClick={(e) => {
                  e.preventDefault()
                  window.location.href = GOOGLE_AUTH_LOGIN_URL
                }}
              />
              <span>
                Are you new here?{' '}
                <Link href={PAGE_URLS.REGISTER}>Join us!</Link>
              </span>
            </Wrapper>
          </form>
        </Container>
      ) : (
        <LoadingSpinner />
      )}
    </>
  )
}
