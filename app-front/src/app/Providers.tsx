'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { GoogleOAuthProvider } from '@react-oauth/google'
import StyledComponentsRegistry from '@/util/registry'
import Modal from '@/ui/modals/Modal'
import NavBar from '@/ui/component/common/NavBar'
import store from '@/util/redux/store'
import { theme } from '@/util/style/theme'
import '@/app/globals.css'

export default function Providers({ children }: { children: ReactNode }) {
  return (
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
  )
}
