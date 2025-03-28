'use client'

import FullPageApp from '@/ui/component/home/FullPageApp'
import FruitSection from '@/ui/component/home/sections/FruitSection'
import ContactSection from '@/ui/component/home/sections/ContactSection'

export default function Home() {
  /**
   * applied to full page
   */
  const sections = [<FruitSection />, <ContactSection />]
  return (
    <>
      <FullPageApp sections={sections} />
    </>
  )
}
