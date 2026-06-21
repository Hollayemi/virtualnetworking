import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nexus — AI-Powered Event Networking',
  description: 'Connect with the right people at every conference, summit, and professional event. AI matchmaking that turns chance encounters into meaningful relationships.',
  keywords: 'event networking, AI matchmaking, conference networking, professional networking, event app',
  openGraph: {
    title: 'Nexus — AI-Powered Event Networking',
    description: 'Meet the right people before the event begins.',
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
