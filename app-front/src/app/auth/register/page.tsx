'use client'

import { FormEvent, useEffect, useState } from 'react'
import api from '@/config/axiosInstance'
import {
  Button,
  Container,
  Input,
  Link,
  Title,
  Wrapper,
} from '@/ui/style/authStyle'
import { isLogin } from '@/util/CommonUtil'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isLogin()) {
      alert('Already logged in!')
      window.location.replace('/')
    }
  }, [])

  const handleRegister = async (e: FormEvent) => {
    console.log('Register', username, password)
    e.preventDefault()
    const data = {
      username: username,
      password: password,
    }
    try {
      const res = await api.post('/auth/register', data)
      window.location.replace('/auth/login')
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <>
      <Container>
        <form onSubmit={handleRegister}>
          <Wrapper>
            <Title>Sign Up</Title>
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
            <Button type="submit">Register</Button>
            <span>
              Do you already have an account?{' '}
              <Link href="/auth/login">Log in!</Link>
            </span>
          </Wrapper>
        </form>
      </Container>
    </>
  )
}
