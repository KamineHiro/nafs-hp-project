import { getTranslations } from 'next-intl/server'
import LoginClient from '@/components/Auth/LoginClient'

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  const t = await getTranslations('admin');
  
  // 必要な翻訳データを抽出
  const translations = {
    login: {
      title: t('login.title'),
      username: t('login.username'),
      password: t('login.password'),
      submit: t('login.submit'),
      loggingIn: t('login.loggingIn'),
      errorEmptyFields: t('login.errorEmptyFields'),
      errorDefault: t('login.errorDefault')
    }
  };
  
  // クライアントコンポーネントに翻訳データを渡す
  return <LoginClient translations={translations} />;
} 