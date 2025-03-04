import { unstable_setRequestLocale } from 'next-intl/server';
import CoursesClient from './courses.client';

export default async function CoursesPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  // サーバーコンポーネントでロケールを設定
  unstable_setRequestLocale(locale);

  return <CoursesClient />;
} 