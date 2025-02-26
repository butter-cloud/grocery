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

export default function securityHome() {
  const [data, setData] = useState<string | null>(null)

  useEffect(() => {
    api
      .get('/security/home')
      .then((res) => {
        console.log(res)
        if (res.status !== 200) {
          alert('Login Required')
          window.location.replace('/auth/login')
        }
        setData(res.data)
      })
      .catch((error) => {
        console.log(error)
        alert('Login Required')
        window.location.replace('/auth/login')
      })
  }, [])

  const handleLogout = () => {
    api.get('/security/logout').then((res) => {
      if (res.status === 200) {
        window.location.replace('/auth/login')
      } else {
        console.log('Logout failed')
      }
    })
  }
  return (
    <>
      {data ? (
        <>
          <h3>{data ?? ''}</h3>
          <Button onClick={handleLogout}>logout</Button>
        </>
      ) : (
        <></>
      )}
    </>
  )
}
