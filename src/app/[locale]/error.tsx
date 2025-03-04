'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const locale = useLocale()
  const t = useTranslations('error')
  
  useEffect(() => {
    // エラーをログに記録
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">{t('title')}</h1>
        <p className="text-gray-600 mb-6">{t('message')}</p>
        
        <div className="flex flex-col space-y-4">
          <button
            onClick={reset}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {t('tryAgain')}
          </button>
          
          <Link
            href={`/${locale}`}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            {t('backToHome')}
          </Link>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 rounded-md text-left">
            <p className="font-mono text-sm text-red-500">{error.message}</p>
            {error.stack && (
              <pre className="mt-2 text-xs text-gray-600 overflow-auto">
                {error.stack}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 