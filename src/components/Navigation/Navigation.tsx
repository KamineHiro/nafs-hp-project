"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { scrollY } = useScroll()
  const [backgroundColor, setBackgroundColor] = useState("transparent")
  const pathname = usePathname()

  // スクロールに応じて背景色を変更
  const backgroundColorTransform = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
  )

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { href: "/", label: "ホーム" },
    { href: "/courses", label: "コース" },
    { href: "/about", label: "学校について" },
    { href: "/news", label: "最新記事" },
    { href: "/downloads", label: "書類ダウンロード" },
    { href: "/contact", label: "お問い合わせ" },
  ]

  return (
    <motion.nav
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled ? "shadow-md backdrop-blur-md" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-14 h-14">
              <Image
                src="/images/logo.png"
                alt="NAFS Logo"
                fill
                sizes="(max-width: 768px) 56px, 56px"
                className="object-contain"
              />
            </div>
            <span className={`text-2xl font-bold ${
              hasScrolled ? "text-gray-800" : "text-white"
            }`}>
              NAFS
            </span>
          </Link>

          {/* デスクトップメニュー */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative group py-2 text-lg ${
                  hasScrolled ? "text-gray-800" : "text-white"
                } hover:text-[#FFD700] transition-colors ${
                  pathname === item.href ? "text-[#FFD700]" : ""
                }`}
              >
                {item.label}
                <span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#FFD700] transform origin-left transition-transform duration-300 ${
                    pathname === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} 
                />
              </Link>
            ))}
          </div>

          {/* ハンバーガーメニューボタン */}
          <button
            className={`lg:hidden p-2 focus:outline-none ${
              hasScrolled ? "text-gray-800" : "text-white"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="メニュー"
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden absolute top-20 inset-x-0 bg-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-4">
            {menuItems.map((item) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: item.href === pathname ? 0.1 : item.href === "/courses" ? 0.2 : item.href === "/about" ? 0.3 : item.href === "/news" ? 0.4 : item.href === "/downloads" ? 0.5 : 0.6 }}
              >
                <Link
                  href={item.href}
                  className={`block py-3 text-gray-700 hover:text-primary-color hover:bg-gray-50 px-4 rounded-lg transition-colors ${
                    pathname === item.href ? "bg-[#FFD700] text-black" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}