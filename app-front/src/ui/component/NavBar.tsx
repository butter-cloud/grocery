'use client'
import { useMediaQuery } from 'react-responsive'
import { useEffect, useState } from 'react'

export default function NavBar() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const isDesktop = useMediaQuery({ minWidth: 1200 })
  const isMobile = useMediaQuery({ maxWidth: 1200 })

  if (!hasMounted) {
    return null
  }

  return (
    <>
      {isDesktop && <h1>Desktop nav bar</h1>}
      {isMobile && <h1>Mobile nav bar</h1>}
    </>
  )
}
