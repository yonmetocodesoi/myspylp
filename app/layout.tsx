import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/hooks/use-auth"
import AuthDebugger from "@/components/auth-debugger"
import WhatsAppButton from "@/components/whatsapp-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "🎁 Promoção Especial - Aproveite Agora!",
  description: "Oferta exclusiva por tempo limitado! Clique para ver mais detalhes.",
  openGraph: {
    title: "🎁 Promoção Especial - Aproveite Agora!",
    description: "Oferta exclusiva por tempo limitado! Clique para ver mais detalhes.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "🎁 Promoção Especial - Aproveite Agora!",
    description: "Oferta exclusiva por tempo limitado! Clique para ver mais detalhes.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>
            {children}
            <WhatsAppButton />
            <AuthDebugger />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
