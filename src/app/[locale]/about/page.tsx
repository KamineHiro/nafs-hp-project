import { unstable_setRequestLocale } from 'next-intl/server';
import AboutClient from './about.client';

export default async function AboutPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  // サーバーコンポーネントでロケールを設定
  unstable_setRequestLocale(locale);

  return <AboutClient />;
}