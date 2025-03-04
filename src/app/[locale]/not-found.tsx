import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'

export default async function NotFound() {
  // サーバーコンポーネントでの翻訳取得
  const t = await getTranslations('notFound')
  const locale = await getLocale()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{t('title')}</h2>
        <p className="text-gray-600 mb-8">{t('message')}</p>
        
        <Link
          href={`/${locale}`}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {t('backToHome')}
        </Link>
      </div>
    </div>
  )
} 