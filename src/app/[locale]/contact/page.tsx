import { unstable_setRequestLocale } from 'next-intl/server';
import ContactClient from './contact.client';

export default async function ContactPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  // サーバーコンポーネントでロケールを設定
  unstable_setRequestLocale(locale);

  return <ContactClient />;
} 