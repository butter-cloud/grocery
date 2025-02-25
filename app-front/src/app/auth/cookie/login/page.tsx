'use client'

import { useState } from 'react'
import api from '@/config/axiosInstance'
import { Button, Container, Input, Title, Wrapper } from '@/ui/style/authStyle'

export default function login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      loginId: username,
      password: password,
    }
    try {
      const res = await api.post('/cookie/login', data)
      if (res.status !== 200) {
        console.log('Login failed')
        alert('Login failed')
        return
      }
      console.log('Login successful')
      alert('Login successful')
      window.location.replace('/auth/cookie/home')
    } catch (error) {
      console.log('Error', error)
    }
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
