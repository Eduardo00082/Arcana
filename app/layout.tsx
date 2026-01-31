import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ArcanaProvider } from "@/contexts/arcana-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ARCANA - Seu espaço pessoal de código",
  description: "Gerencie seus snippets e fragmentos de código de forma local e privada",
  icons: {
    icon: [
      {
        url: "/images/logo-do-app.jpg",
        type: "image/jpeg",
      },
    ],
    apple: "/images/logo-do-app.jpg",
  },
}

export const viewport: Viewport = {
  themeColor: "#050008",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        <ArcanaProvider>{children}</ArcanaProvider>
      </body>
    </html>
  )
}
