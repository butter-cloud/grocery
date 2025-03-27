'use client'

import FullPageApp from '@/ui/component/home/FullPageApp'
import MainSection from '@/ui/component/home/sections/MainSection'
import TrendingSection from '@/ui/component/home/sections/TrendingSection'
import FruitSection from '@/ui/component/home/sections/FruitSection'
import ContactSection from '@/ui/component/home/sections/ContactSection'

export default function Home() {
  /**
   * applied to full page
   */
  const sections = [
    <MainSection />,
    <FruitSection />,
    <TrendingSection />,
    <ContactSection />,
  ]
  return (
    <>
      <FullPageApp sections={sections} />
    </>
  )
}
