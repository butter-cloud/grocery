'use client'

import { useEffect } from 'react'
import axios from 'axios'

export default function LoadingPage() {
  const params = new URLSearchParams(window.location.search)
  const redirectedFromSocialLogin = params.get('redirectedFromSocialLogin')

  useEffect(() => {
    console.log('redirectedFromSocialLogin: ', redirectedFromSocialLogin)
    if (redirectedFromSocialLogin) {
      console.log('Try to get access token by refresh token')
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, null, {
          withCredentials: true,
        })
        .then((res) => {
          // accessToken이 있으면 저장
          if (res.data.accessToken) {
            localStorage.setItem('accessToken', res.data.accessToken)
            window.location.href = '/'
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [redirectedFromSocialLogin])

  return <>Loading</>
}
