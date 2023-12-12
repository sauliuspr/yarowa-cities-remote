import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ProvidersWrapper from './ProvidersWrapper';
import Nav from './Nav';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'City Status App',
  description: 'Display City Status',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ProvidersWrapper>
          <Nav />
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  )
}
