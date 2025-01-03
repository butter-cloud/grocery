'use client'

import { FormEvent, useState } from 'react'
import api from '@/config/axiosInstance'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('USER')

  const handleRegister = async (e: FormEvent) => {
    console.log('Register', username, password, role)
    e.preventDefault()

    try {
      const res = await api.post('/auth/register', {
        username,
        password,
        role,
      })
      window.location.replace('/auth/login')
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
    </>
  )
}
