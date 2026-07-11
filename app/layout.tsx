import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VirtualNet — Structured Networking for Events',
  description: 'Skip the badge-scan small talk. Send structured connection requests, unlock verified VIPs, and earn cashback credits every time someone books time with you.',
  keywords: 'event networking, structured networking, VIP access, event platform, Web3 events, conference networking',
  openGraph: {
    title: 'VirtualNet — Structured Networking for Events',
    description: 'Every connection here is worth something.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}