import type { Metadata } from "next";
import { Outfit, Fraunces } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import ProviderWrapper from "@/redux/provider";
import { Toaster } from "./components/ui/sonner";
import { UserDataProvider } from "@/context/userContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "event networking",
    "conference networking platform",
    "VIP access networking",
    "professional networking",
    "event attendee connection",
    "networking credits",
    "event organizer dashboard",
    "structured networking",
    "summit networking tool",
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/images/logo/logo.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/images/logo/logo.png"],
  },
  icons: {
    icon: "/images/logo/logo.png",
    apple: "/images/logo/logo.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${outfit.variable} ${fraunces.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <ProviderWrapper>
          <UserDataProvider>
              <Toaster
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
              />
              {children}
          </UserDataProvider>
        </ProviderWrapper>
      </body>
    </html>
  );
}