import type { Metadata } from "next";
import { Outfit, Fraunces } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

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

// export const metadata: Metadata = {
//   title: {
//     default: `${siteConfig.name} - ${siteConfig.tagline}`,
//     template: `%s | ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   keywords: [
//     "home care London",
//     "supported living Haringey",
//     "companionship care",
//     "elderly care London",
//     "person-centered care UK",
//     "TimeWell Care Services",
//   ],
//   openGraph: {
//     title: siteConfig.name,
//     description: siteConfig.description,
//     siteName: siteConfig.name,
//     locale: "en_GB",
//     type: "website",
//   },
//   robots: { index: true, follow: true },
// };

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
        {children}
      </body>
    </html>
  );
}
