'use client'

import FullPageApp from '@/ui/component/home/FullPageApp'
import FruitSection from '@/ui/component/home/sections/FruitSection'
import ContactSection from '@/ui/component/home/sections/ContactSection'
import CarouselSection from '@/ui/component/home/sections/CarouselSection'

export default function Home() {
  /**
   * applied to full page
   */
  const sections = [<FruitSection />, <CarouselSection />, <ContactSection />]
  return (
    <>
      <FullPageApp sections={sections} />
    </>
  )
}
