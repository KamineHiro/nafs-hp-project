import type React from "react"
import type { Metadata, Viewport } from "next"
import { Azeret_Mono, Noto_Sans_JP } from "next/font/google"
import "@/app/globals.css"
import { Providers } from '@/components/Providers/providers'
import Navigation from '@/components/Navigation/Navigation'
import Footer from '@/components/Footer/Footer'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, unstable_setRequestLocale as setRequestLocale } from 'next-intl/server'

const geistSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-geist-sans',
})

const geistMono = Azeret_Mono({
  subsets: ["latin"],
  variable: '--font-geist-mono',
})

// 静的なメタデータを使用
export const metadata: Metadata = {
  title: {
    template: '%s | 日琉国際言語学院',
    default: '日琉国際言語学院',
  },
  description: '沖縄県糸満市の日本語学校。充実した日本語教育と生活サポートを提供しています。',
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

// LayoutPropsの型定義を追加
type LayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

// 対応するlocaleを設定
export function generateStaticParams() {
  return [{ locale: 'ja' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps) {
  const locale = params.locale;
  setRequestLocale(locale);
  
  const messages = await getMessages();
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Navigation />
            <main>{children}</main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}