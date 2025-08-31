import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import { AuthProvider } from "@/context/AuthContext"
import { Toaster } from "@workspace/ui/components/sonner"
import { CurrencyContextProvider } from "@/context/CurrencyContext"
import { CartContextProvider } from "@/context/CartContext"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${fontSans.variable} ${fontMono.variable} font-mono antialiased `}
      >
        <AuthProvider>
          <CurrencyContextProvider>
            <CartContextProvider>
              {children}
              </CartContextProvider>
            </CurrencyContextProvider>
          </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}