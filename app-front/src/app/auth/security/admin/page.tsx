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

export default function securityAdmin() {
  const [data, setData] = useState<string | null>(null)

  useEffect(() => {
    api
      .get('/security/admin')
      .then((res) => {
        if (res.status === 200) {
          setData(res.data)
        }
      })
      .catch((error) => {
        if (error.status === 403) {
          alert('admin 권한이 없습니다.')
          window.location.replace('/auth/security/home')
        }
        if (error.status === 401) {
          alert('Login Required')
          window.location.replace('/auth/security/login')
        }
        console.log(error)
      })
  }, [])

  const handleLogout = () => {
    api.get('/security/logout').then((res) => {
      if (res.status === 200) {
        window.location.replace('/auth/security/login')
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
