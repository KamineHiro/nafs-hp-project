import { unstable_setRequestLocale } from 'next-intl/server';
import AdmissionClient from './admission.client';

export default async function AdmissionPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  // サーバーコンポーネントでロケールを設定
  unstable_setRequestLocale(locale);

  return <AdmissionClient />;
} 