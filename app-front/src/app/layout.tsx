'use client'

import { ReactNode } from 'react'
import '@/app/globals.css'
import StyledComponentsRegistry from '@/util/registry'
import NavBar from '@/ui/component/common/NavBar'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/util/style/theme'
import { Provider } from 'react-redux'
import store from '@/util/redux/store'
import Modal from '@/ui/modals/Modal'
import { GoogleOAuthProvider } from '@react-oauth/google'
import gavency from '@/fonts/gavency'
import mori from '@/fonts/mori'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html className={`${gavency.variable} ${mori.variable}`}>
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID!!}
            >
              <StyledComponentsRegistry>
                <NavBar />
                <Modal />
                {children}
              </StyledComponentsRegistry>
            </GoogleOAuthProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}
