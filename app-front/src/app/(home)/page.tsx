'use client'

import FullPageApp from '@/ui/component/home/FullPageApp'
import FruitSection from '@/ui/component/home/sections/FruitSection'
import ContactSection from '@/ui/component/home/sections/ContactSection'
import CarouselSection from '@/ui/component/home/sections/CarouselSection'
import BannerSection from '@/ui/component/home/sections/BannerSection'
import { useEffect } from 'react'
import authApi from '@/api/auth/authApi'
import axios from 'axios'

export default function Home() {
  /**
   * applied to full page
   */
  const sections = [
    <BannerSection />,
    <FruitSection />,
    <CarouselSection />,
    <ContactSection />,
  ]

  useEffect(() => {
    authApi
      .hello()
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      {/*<button*/}
      {/*  onClick={async () => {*/}
      {/*    const res = await axios.post(*/}
      {/*      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,*/}
      {/*      null,*/}
      {/*      {*/}
      {/*        withCredentials: true,*/}
      {/*      },*/}
      {/*    )*/}
      {/*    console.log('res: ', res)*/}
      {/*  }}*/}
      {/*>refresh test</button>*/}
      <FullPageApp sections={sections} />
    </>
  )
}
