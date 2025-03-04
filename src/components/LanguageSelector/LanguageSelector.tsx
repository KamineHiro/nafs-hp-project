"use client"

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LanguageSelectorProps {
  isMobile?: boolean
}

export default function LanguageSelector({ isMobile = false }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('nav')
  
  const languages = [
    { code: 'ja', name: '日本語' },
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' }
  ]

  const handleLanguageChange = useCallback((languageCode: string) => {
    // 現在のパスを取得して言語部分を置き換える
    const currentPath = window.location.pathname
    const newPath = currentPath.replace(/^\/(ja|en|zh)/, `/${languageCode}`)
    
    // 新しいパスに遷移
    router.push(newPath)
    setIsOpen(false)
  }, [router])

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  return (
    <div className={cn(
      "relative",
      isMobile ? "w-full px-4" : "inline-block"
    )}>
      <button
        onClick={toggleDropdown}
        className={cn(
          "flex items-center space-x-1",
          isMobile
            ? "w-full p-3 justify-between bg-gray-50 rounded-lg"
            : "text-sm"
        )}
      >
        <span>{languages.find(lang => lang.code === locale)?.name}</span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className={cn(
          "bg-white rounded-md shadow-lg z-50",
          isMobile
            ? "w-full mt-2"
            : "absolute right-0 mt-2 w-40"
        )}>
          <ul className="py-1">
            {languages.map((language) => (
              <li key={language.code}>
                <button
                  onClick={() => handleLanguageChange(language.code)}
                  className={cn(
                    "block w-full text-left px-4 py-2 text-sm",
                    locale === language.code
                      ? "font-bold bg-gray-50"
                      : "hover:bg-gray-100"
                  )}
                >
                  {language.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
} 