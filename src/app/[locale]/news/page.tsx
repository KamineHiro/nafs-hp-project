import { unstable_setRequestLocale } from 'next-intl/server';
import NewsClient from './news.client';

export default async function NewsPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  // サーバーコンポーネントでロケールを設定
  unstable_setRequestLocale(locale);

  return <NewsClient />;
}