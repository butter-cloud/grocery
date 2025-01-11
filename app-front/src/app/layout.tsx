'use client'
import { StateProvider } from '@/context/context'
import { ReactNode } from 'react'
import './globals.css'
import StyledComponentsRegistry from '@/util/registry'
import NavBar from '@/ui/component/NavBar'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <StateProvider>
      <html>
        <body>
          <ThemeProvider theme={theme}>
            <StyledComponentsRegistry>
              <NavBar />
              {children}
            </StyledComponentsRegistry>
          </ThemeProvider>
        </body>
      </html>
    </StateProvider>
  )
}
