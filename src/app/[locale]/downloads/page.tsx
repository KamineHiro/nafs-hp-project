import { unstable_setRequestLocale } from 'next-intl/server';
import DownloadsClient from './downloads.client';

export default async function DownloadsPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  // サーバーコンポーネントでロケールを設定
  unstable_setRequestLocale(locale);

  return <DownloadsClient />;
}