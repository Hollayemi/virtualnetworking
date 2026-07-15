import type { Metadata } from 'next'
import './globals.css'
import ProviderWrapper from '@/redux/provider'
import { Toaster } from './components/ui/sonner'
import { UserDataProvider } from '@/context/userContext'

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
      <ProviderWrapper>
        <UserDataProvider>
          {/* <Toaster
            toastOptions={
              {
                position: "top-right",
                error: {
                  classNames: {
                    toast: "border border-red-500 bg-red-50 text-red-700 font-medium",
                    title: "text-red-700",
                    description: "text-red-600",
                    actionButton: "bg-red-100 text-red-800 hover:bg-red-200",
                    cancelButton: "text-red-500",
                  },
                },
                success: {
                  classNames: {
                    toast: "border border-green-500 bg-green-50 text-green-700 font-medium",
                    title: "text-green-700",
                    description: "text-green-600",
                    actionButton: "bg-green-100 text-green-800 hover:bg-green-200",
                    cancelButton: "text-green-500",
                  },
                },
              } as any
            }
          /> */}
          <body>{children}</body>
        </UserDataProvider>
      </ProviderWrapper>
    </html>
  )
}