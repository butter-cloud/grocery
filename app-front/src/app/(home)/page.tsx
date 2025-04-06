'use client'

import FullPageApp from '@/ui/component/home/FullPageApp'
import FruitSection from '@/ui/component/home/sections/FruitSection'
import ContactSection from '@/ui/component/home/sections/ContactSection'
import CarouselSection from '@/ui/component/home/sections/CarouselSection'
import BannerSection from '@/ui/component/home/sections/BannerSection'
import { useEffect } from 'react'
import authApi from '@/api/auth/authApi'

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
      <FullPageApp sections={sections} />
    </>
  )
}
