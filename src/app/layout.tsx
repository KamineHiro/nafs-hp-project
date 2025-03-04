import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '日琉国際言語学院 - 沖縄県糸満市の日本語学校',
  description: '日琉国際言語学院は沖縄県糸満市にある日本語学校です。世界各国からの留学生に質の高い日本語教育と充実した学生生活を提供しています。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 