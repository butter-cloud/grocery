'use client'
import { ReactNode } from 'react'

export default function HomeLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <>
      <div>Home Layout</div>
      {children}
    </>
  )
}
