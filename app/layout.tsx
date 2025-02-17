import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'

import { Toaster } from '@/components/ui/toaster'
import Footer from '@/components/Footer'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F7BE7A]`}
      >
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  )
}
