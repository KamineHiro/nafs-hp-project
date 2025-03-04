import { unstable_setRequestLocale } from 'next-intl/server'
import HomeClient from '@/app/[locale]/home.client' 

export default async function HomePage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  // 必要に応じてサーバーサイドでデータを取得
  
  // 静的レンダリングを有効にする
  unstable_setRequestLocale(locale);

  return (
    <HomeClient locale={locale} />
  )
}
