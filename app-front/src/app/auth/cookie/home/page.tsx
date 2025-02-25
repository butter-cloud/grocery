'use client'

import { useEffect, useState } from 'react'
import MenuTitle from '@/ui/component/common/MenuTitle'
import api from '@/config/axiosInstance'

export default function cookieHome() {
  const [data, setData] = useState<string|null>(null)

  useEffect(() => {
    api
      .get('/cookie/home')
      .then((res) => {
        if (res.status === 401) {
          console.log('Unauthorized')
        } else if (res.status !== 200) {
          console.log('Error status code: ', res.status)
        } else {
          setData(res.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      {/*<MenuTitle title={'Cookie Home!'} />*/}
      <h3>{data ?? 'no data'}</h3>
    </>
  )
}
