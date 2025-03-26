'use client'

import { useEffect } from 'react'
import useCartProps from '@/hook/useCartProps'
import authApi from '@/api/auth/authApi'

export default function LoadingPage() {
  const { mergeCart } = useCartProps()

  useEffect(() => {
    if (typeof window !== undefined) {
      handleSocialLogin()
    }
  }, [])

  const handleSocialLogin = () => {
    const params = new URLSearchParams(window.location.search)
    const redirectedFromSocialLogin = params.get('redirectedFromSocialLogin')
    console.log('redirectedFromSocialLogin: ', redirectedFromSocialLogin)
    if (redirectedFromSocialLogin) {
      console.log('Try to get access token by refresh token')
      authApi
        .refresh()
        .then((res) => {
          // accessToken이 있으면 저장
          if (res.data.accessToken) {
            localStorage.setItem('accessToken', res.data.accessToken)
            mergeCart()
            window.location.href = '/'
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  return <>Loading</>
}
