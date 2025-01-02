'use client'
import { StateProvider } from '@/context/context'
import { ReactNode } from 'react'

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <StateProvider>
      <html>
        <body>
          <div>Root Layout</div>
          {children}
        </body>
      </html>
    </StateProvider>
  )
}
