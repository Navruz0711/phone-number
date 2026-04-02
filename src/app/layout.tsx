import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VirtualSMS',
  description: 'Virtual phone numbers for SMS verification',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
