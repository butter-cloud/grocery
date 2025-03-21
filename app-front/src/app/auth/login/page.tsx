'use client'

import { useEffect, useState } from 'react'
import api from '@/config/axiosInstance'
import {
  Button,
  Container,
  Input,
  Title,
  Wrapper,
  Link,
} from '@/ui/style/authStyle'
import { isLogin } from '@/util/CommonUtil'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import GoogleSignInButton from '@/ui/component/common/GoogleSignInButton'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      const res = await api.post('/auth/login', { username, password })

      if (res.status !== 200) {
        console.log('Login failed')
        alert('Login failed')
        return
      }
      console.log('Login successful')
      localStorage.setItem('accessToken', res.data.accessToken)
      localStorage.setItem('refreshToken', res.data.refreshToken)

      const params = new URLSearchParams(window.location.search)
      const redirectUrl = params.get('redirect') || '/' // redirect 값이 없으면 기본값으로 '/' 사용
      window.location.replace(redirectUrl)
    } catch (error) {
      console.log('Error', error)
    }
  }

  const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
    console.log('google login success!')
    console.log('credentialResponse: ', credentialResponse)
  }

  return (
    <>
      <Container>
        <form onSubmit={handleLogin}>
          <Wrapper>
            <Title>Log In</Title>
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
            <Button type="submit">Login</Button>
            <span>
              Are you new here? <Link href="/auth/register">Join us!</Link>
            </span>
            <GoogleSignInButton
              onClick={(e) => {
                e.preventDefault()
                window.location.href =
                  'http://localhost:8080/oauth2/authorization/google'
              }}
            />
          </Wrapper>
        </form>
      </Container>
    </>
  )
}
