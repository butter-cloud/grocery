'use client'
import { StateProvider } from '@/context/context'
import { ReactNode } from 'react'
import './globals.css'
import StyledComponentsRegistry from '@/util/registry'
import NavBar from '@/ui/component/NavBar'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <StateProvider>
      <html>
        <body>
          <StyledComponentsRegistry>
            <NavBar />
            {children}
          </StyledComponentsRegistry>
        </body>
      </html>
    </StateProvider>
  )
}
