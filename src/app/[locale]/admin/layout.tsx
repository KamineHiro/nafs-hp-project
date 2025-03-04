"use client"

import type React from "react"
import { Azeret_Mono, Noto_Sans_JP } from "next/font/google"
import "@/app/globals.css"
import { Providers } from '@/components/Providers/providers'
import Link from 'next/link'
import Image from 'next/image'
import { 
  FileText, 
  Menu,
  X,
  PlusCircle,
  ArrowLeft
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, usePathname } from 'next/navigation'

const geistSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-geist-sans',
})

const geistMono = Azeret_Mono({
  subsets: ["latin"],
  variable: '--font-geist-mono',
})

// 管理者メニューのラベル
const menuLabels = {
  backToSite: 'サイトに戻る',
  posts: '記事管理',
  newPost: '新規記事作成'
}

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname() || ''
  const params = useParams()
  const locale = params.locale as string || 'ja'

  // すべてのフックを条件分岐の外で宣言
  useEffect(() => {
    // モバイルメニューが開いているときにスクロールを無効化
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <>
      {/* モバイルメニューボタン */}
      <button
        type="button"
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-800 text-white p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* デスクトップサイドバー */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-gray-900">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center justify-center flex-shrink-0 px-4 mb-5">
              <Link href={`/${locale}`} className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="mr-3"
                />
                <span className="text-white text-xl font-bold">管理画面</span>
              </Link>
            </div>
            <nav className="mt-5 flex-1 px-4 space-y-1">
              <Link
                href={`/${locale}`}
                className="flex items-center px-4 py-3 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700"
              >
                <ArrowLeft className="mr-3 h-5 w-5" />
                {menuLabels.backToSite}
              </Link>
              
              <Link
                href={`/${locale}/admin/posts`}
                className={`flex items-center px-4 py-3 text-base font-medium rounded-md ${
                  pathname === `/${locale}/admin/posts`
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <FileText className="mr-3 h-5 w-5" />
                {menuLabels.posts}
              </Link>
              
              <Link
                href={`/${locale}/admin/posts/new`}
                className={`flex items-center px-4 py-3 text-base font-medium rounded-md ${
                  pathname === `/${locale}/admin/posts/new`
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <PlusCircle className="mr-3 h-5 w-5" />
                {menuLabels.newPost}
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* モバイルサイドバー - 常に描画するが表示/非表示を切り替える */}
      <div className={`md:hidden fixed inset-0 z-40 flex ${isOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`fixed inset-0 bg-gray-600 transition-opacity duration-300 ${
            isOpen ? 'opacity-75' : 'opacity-0'
          }`} 
          onClick={() => setIsOpen(false)}
        ></div>
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-gray-900 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center justify-center flex-shrink-0 px-4 mb-5">
              <Link href={`/${locale}`} className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="mr-3"
                />
                <span className="text-white text-xl font-bold">管理画面</span>
              </Link>
            </div>
            <nav className="mt-5 px-4 space-y-1">
              <Link
                href={`/${locale}`}
                className="flex items-center px-4 py-3 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <ArrowLeft className="mr-3 h-5 w-5" />
                {menuLabels.backToSite}
              </Link>
              
              <Link
                href={`/${locale}/admin/posts`}
                className={`flex items-center px-4 py-3 text-base font-medium rounded-md ${
                  pathname === `/${locale}/admin/posts`
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FileText className="mr-3 h-5 w-5" />
                {menuLabels.posts}
              </Link>
              
              <Link
                href={`/${locale}/admin/posts/new`}
                className={`flex items-center px-4 py-3 text-base font-medium rounded-md ${
                  pathname === `/${locale}/admin/posts/new`
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <PlusCircle className="mr-3 h-5 w-5" />
                {menuLabels.newPost}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const pathname = usePathname()
  const locale = params.locale as string || 'ja'

  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <Providers>
        <div className="flex h-screen bg-gray-100">
          {/* サイドバー */}
          <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64">
              <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
                <div className="flex flex-col flex-grow">
                  <nav className="flex-1 px-2 pb-4 space-y-1">
                    <Link
                      href={`/${locale}`}
                      className="flex items-center px-4 py-3 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700"
                    >
                      <ArrowLeft className="mr-3 h-5 w-5" />
                      {menuLabels.backToSite}
                    </Link>
                    
                    <Link
                      href={`/${locale}/admin/posts`}
                      className={`flex items-center px-4 py-3 text-base font-medium rounded-md ${
                        pathname === `/${locale}/admin/posts`
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <FileText className="mr-3 h-5 w-5" />
                      {menuLabels.posts}
                    </Link>
                    
                    <Link
                      href={`/${locale}/admin/posts/new`}
                      className={`flex items-center px-4 py-3 text-base font-medium rounded-md ${
                        pathname === `/${locale}/admin/posts/new`
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <PlusCircle className="mr-3 h-5 w-5" />
                      {menuLabels.newPost}
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* メインコンテンツエリア */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* ヘッダー */}
            <div className="fixed top-0 left-0 right-0 z-10">
              <header className="bg-white shadow-sm">
                {/* ... existing header content ... */}
              </header>
            </div>

            {/* メインコンテンツ */}
            <main className="flex-1 relative overflow-y-auto focus:outline-none pt-16">
              <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </Providers>
    </div>
  )
} 