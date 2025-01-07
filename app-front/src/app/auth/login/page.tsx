'use client'

import { useState } from 'react'
import api from '@/config/axiosInstance'
import Cookies from "js-cookie";
import {setAccessToken} from "@/util/CookieHelper";

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      username: username,
      password: password,
    }
    try {
      const res = await api.post('/auth/login', data)

      if (res.status !== 200) {
        console.log('Login failed')
        alert('Login failed')
        return
      }

      console.log('Login successful')
      alert('Login successful')
      setAccessToken(res.data.accessToken)

      window.location.replace('/')

    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  )
}
