import { getRequestConfig } from 'next-intl/server';

// 対応言語の設定
export const locales = ['ja', 'en', 'zh'] as const;
export type Locale = (typeof locales)[number];

// デフォルト言語
export const defaultLocale: Locale = 'ja';

// 言語名の表示
export const localeNames: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
  zh: '中文',
};

// メッセージの設定
export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../../../messages/${locale}.json`)).default
})); 