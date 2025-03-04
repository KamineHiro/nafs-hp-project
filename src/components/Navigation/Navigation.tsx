"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useCallback } from "react"
import { usePathname } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { cn } from "@/lib/utils"
import LanguageSelector from "../LanguageSelector/LanguageSelector"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('nav')
  
  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/courses`, label: t('courses') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/news`, label: t('news') },
    { href: `/${locale}/downloads`, label: t('downloads') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  // isActiveLinkをuseCallbackでメモ化
  const isActiveLink = useCallback((href: string) => {
    if (pathname === href) return true
    if (href !== `/${locale}` && pathname?.startsWith(href)) return true
    return false
  }, [pathname, locale])

  // メニューの開閉をハンドル
  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  // メニューを閉じる
  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* ロゴ */}
          <Link href={`/${locale}`} className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="NAFS Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
              priority // 優先的に読み込み
            />
          </Link>
          
          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActiveLink(link.href)
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                )}
              >
                {link.label}
              </Link>
            ))}
            
            {/* 言語選択 */}
            <LanguageSelector />
            
            {/* 管理者ページへのリンク */}
            <Link
              href={`/${locale}/admin`}
              className="text-sm font-medium px-4 py-2 rounded-md transition-colors bg-blue-600 text-white hover:bg-blue-700"
            >
              {t('adminLogin')}
            </Link>
          </nav>
          
          {/* モバイルメニューボタン */}
          <div className="md:hidden flex items-center">
            <button
              className="p-2 rounded-md text-gray-800 hover:bg-gray-100 transition-colors"
              onClick={handleMenuToggle}
              aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-20 inset-x-0 bg-white shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto px-4 py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 rounded-lg transition-colors",
                      isActiveLink(link.href) ? "bg-blue-50 text-blue-600" : ""
                    )}
                    onClick={handleCloseMenu}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              {/* 言語選択（モバイル） */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-4 border-t pt-4"
              >
                <div className="px-4 py-2 text-sm text-gray-500">
                  {t('selectLanguage')}
                </div>
                <LanguageSelector isMobile />
              </motion.div>
              
              {/* 管理者ログイン（モバイル） */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.1 }}
                className="mt-4"
              >
                <Link
                  href={`/${locale}/admin`}
                  className="block py-3 text-white bg-blue-600 hover:bg-blue-700 px-4 rounded-lg transition-colors text-center"
                  onClick={handleCloseMenu}
                >
                  {t('adminLogin')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}