'use client'

import { useEffect, useState } from 'react'

export const useLogin = (): { isLogin: null | boolean } => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setIsLogin(token !== null)
  }, [])

  return {
    isLogin,
  }
}
