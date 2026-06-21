import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VirtualNet – AI-Powered Meeting & Networking Platform',
  description:
    'Meet the right people before the event begins. AI-powered networking for founders, investors, recruiters, and professionals.',
  openGraph: {
    title: 'VirtualNet – AI-Powered Networking',
    description: 'AI-powered networking that helps you build meaningful connections at any event.',
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}