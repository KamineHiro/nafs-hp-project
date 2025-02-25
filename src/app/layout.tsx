import type React from "react"
import type { Metadata, Viewport } from "next"
import { Azeret_Mono, Noto_Sans_JP } from "next/font/google"
import "@/app/globals.css"
import { Providers } from './providers'

const geistSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-geist-sans',
})

const geistMono = Azeret_Mono({
  subsets: ["latin"],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: "NAFS | 日琉国際言語学院",
  description: "沖縄県糸満市の日本語学校。充実した日本語教育と生活サポートを提供しています。",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
