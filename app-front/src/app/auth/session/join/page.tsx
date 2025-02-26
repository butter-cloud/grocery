'use client'

import { FormEvent, useState } from 'react'
import api from '@/config/axiosInstance'
import { Button, Container, Input, Title, Wrapper } from '@/ui/style/authStyle'

export default function join() {
  const [loginId, setLoginId] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const handleJoin = async (e: FormEvent) => {
    e.preventDefault()
    const data = {
      loginId: loginId,
      nickname: nickname,
      password: password,
      passwordCheck: passwordCheck,
    }
    console.log(data)

    api
      .post('/session/join', data)
      .then((res) => {
        if (res.status === 200) {
          alert('회원가입이 완료되었습니다.')
          window.location.replace('/auth/session/login')
        }
      })
      .catch((err) => {
        alert('회원가입에 실패했습니다.')
        setLoginId('')
        setNickname('')
        setPassword('')
        setPasswordCheck('')
        console.log('Error', err)
      })
  }

  return (
    <>
      <Container>
        <form onSubmit={handleJoin}>
          <Wrapper>
            <Title>Sign Up</Title>
            <Input
              type="text"
              placeholder="login id"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <Input
              type="text"
              placeholder="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="confirm your password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <Button type="submit">Register</Button>
          </Wrapper>
        </form>
      </Container>
    </>
  )
}
