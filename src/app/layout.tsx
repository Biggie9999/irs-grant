import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { GovBanner } from "@/components/gov-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "IRS Federal Grant Program | Financial Assistance for Seniors & Disabled",
  description:
    "The IRS Federal Grant Program provides financial assistance to eligible senior citizens and disabled individuals. Check your eligibility today.",
  keywords: "IRS, grant, federal, seniors, disabled, financial assistance",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <GovBanner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
