'use client'

import { useState } from 'react'
import api from '@/config/axiosInstance'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('USER')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      username: username,
      password: password,
      role: role,
    }
    try {
      const res = await api.post('/auth/login', data)
      console.log('Login successful')
      console.log('data', res.data)
      // Redirect or handle successful login
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </>
  )
}
