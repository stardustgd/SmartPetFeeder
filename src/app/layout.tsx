import type { Metadata, Viewport } from 'next'
import './globals.css'

import { Toaster } from '@/components/ui/toaster'
import Footer from '@/components/Footer'
import { UserProvider } from '../components/UserProvider'

export const metadata: Metadata = {
  title: 'Smart Pet Feeder',
  description: 'Smart Pet Feeder',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F7BE7A]">
        <UserProvider>{children}</UserProvider>
        <Toaster />
        <Footer />
      </body>
    </html>
  )
}
