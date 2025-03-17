'use client'

export const isLogin = () => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('accessToken') !== null
}
