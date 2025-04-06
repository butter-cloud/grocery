import { ReactNode } from 'react'
import Providers from './Providers'
import gavency from '@/fonts/gavency'
import mori from '@/fonts/mori'
import MSWBootstrap from '@/app/MSWBootStrap'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${gavency.variable} ${mori.variable}`} lang="en">
      <body>
        <MSWBootstrap>
          <Providers>{children}</Providers>
        </MSWBootstrap>
      </body>
    </html>
  )
}
