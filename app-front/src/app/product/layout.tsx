'use client'

import { ReactNode } from 'react'

const Padding = ({ children }: Readonly<{ children: ReactNode }>) => (
  <div style={{ padding: '2rem' }}>{children}</div>
)

export default function ProductLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <>
      <Padding>{children}</Padding>
    </>
  )
}
