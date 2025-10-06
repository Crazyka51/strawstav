import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/app/components/theme-provider"
import MessengerChat from "@/app/components/messenger-chat"

// Optimalizované načítání fontu
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
})

// Metadata pro SEO
export const metadata: Metadata = {
  title: {
    template: "%s | STRAWSTAV S.R.O.",
    default: "STRAWSTAV S.R.O. | Veškerá stavební činnost",
  },
  description: "Stavební činnost, úklid bytových domů, správa nemovitostí, údržba zeleně, zemní práce",
  keywords: ["stavební firma", "rekonstrukce", "STRAWSTAV", "fasáda", "zemní práce", "správa nemovitostí"],
  authors: [{ name: "STRAWSTAV S.R.O." }],
  creator: "STRAWSTAV S.R.O.",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
}

// Viewport nastavení pro mobilní zařízení
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#a0001c"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${poppins.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <MessengerChat />
      </body>
    </html>
  )
}
