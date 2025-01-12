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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html>
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <StyledComponentsRegistry>
              <NavBar />
              <Modal />
              {children}
            </StyledComponentsRegistry>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}
