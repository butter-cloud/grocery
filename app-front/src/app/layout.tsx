'use client'
import { StateProvider } from '@/context/context'
import { ReactNode } from 'react'
import NavBar from '@/ui/component/NavBar'
import './globals.css'
import StyledComponentsRegistry from '@/util/registry'

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
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
      </html>
    </StateProvider>
  )
}
