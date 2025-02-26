'use client'

import { useEffect, useState } from 'react'
import api from '@/config/axiosInstance'
import styled from 'styled-components'

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: white;
  color: black;
  border: 1px solid grey;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #bcbbbb;
  }
`

export default function cookieHome() {
  const [data, setData] = useState<string | null>(null)

  useEffect(() => {
    api
      .get('/cookie/home')
      .then((res) => {
        if (res.status !== 200) {
          alert('Login Required')
          window.location.replace('/auth/cookie/login')
        }
        setData(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleLogout = () => {
    api.get('/cookie/logout').then((res) => {
      if (res.status === 200) {
        window.location.replace('/auth/cookie/login')
      } else {
        console.log('Logout failed')
      }
    })
  }

  return (
    <>
      <h3>{data ?? ''}</h3>
      <Button onClick={handleLogout}>logout</Button>
    </>
  )
}
