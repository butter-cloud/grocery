'use client'

import { useEffect, useState } from 'react'
import api, { securityApi } from '@/config/axiosInstance'
import { Button, Container, Input, Title, Wrapper } from '@/ui/style/authStyle'

export default function login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // 이미 로그인 된 상태이면 home으로 redirect
  useEffect(() => {
    api.get('/security/check-login').then((res) => {
      console.log('isLoggedIn? ', res.data.data.loggedIn)
      if (res.data.data.loggedIn) {
        alert('이미 로그인된 상태입니다.')
        window.location.replace('/auth/security/home')
      }
    })
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = new URLSearchParams()
    data.append('loginId', username)
    data.append('password', password)
    console.log(data)

    securityApi
      .post('/security/login', data)
      .then((res) => {
        if (res.status !== 200) {
          console.log('Login failed')
          alert('Login failed')
          return
        }
        console.log('Login successful')
        alert('Login successful')
        window.location.replace('/auth/security/home')
      })
      .catch((err) => {
        if (err.status === 401) {
          alert("아이디나 비밀번호가 틀렸습니다.")
          setUsername('')
          setPassword('')
        }
        console.log('Error', err)
      })
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
          </Wrapper>
        </form>
      </Container>
    </>
  )
}
