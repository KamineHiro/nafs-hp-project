'use client';

import {NextIntlClientProvider, AbstractIntlMessages} from 'next-intl';
import {useEffect, useState} from 'react';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import '@/app/globals.css';

export default function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const [messages, setMessages] = useState<AbstractIntlMessages>({});
  
  useEffect(() => {
    // クライアントサイドで言語ファイルを動的にインポート
    const loadMessages = async () => {
      try {
        const messages = (await import(`@/locales/${locale}.json`)).default;
        setMessages(messages);
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };
    
    loadMessages();
  }, [locale]);
  
  if (!messages) {
    return <div>Loading...</div>;
  }
  
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navigation />
      <main className="pt-5">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
} 