'use client'
import { StateProvider } from '@/context/context'
import { ReactNode } from 'react'
import NavBar from '@/ui/component/NavBar'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <StateProvider>
      <html>
        <body>
          <NavBar />
          {children}
        </body>
      </html>
    </StateProvider>
  )
}
