import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AYUV Health - Privacy Native Health OS",
  description:
    "Securely unify your medical records, wearable data, and checkups - all in one place. Experience the future of healthcare with blockchain-secured consent and AI-driven insights.",
  keywords:
    "health records, medical data, blockchain, consent management, wearable integration, preventive care, global healthcare",
  authors: [{ name: "AYUV Health" }],
  openGraph: {
    title: "AYUV Health - Privacy Native Health OS",
    description: "Securely unify your medical records, wearable data, and checkups - all in one place.",
    url: "https://ayuv.health",
    siteName: "AYUV Health",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AYUV Health - Privacy Native Health OS",
    description: "Securely unify your medical records, wearable data, and checkups - all in one place.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
