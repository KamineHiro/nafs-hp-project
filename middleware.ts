import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/lib/i18n';

export default createMiddleware({
  // 利用可能なロケールを指定
  locales: locales,
  
  // デフォルトのロケールを指定
  defaultLocale: defaultLocale,
  
  // メッセージファイルのパスを指定
  localePrefix: 'as-needed',
  
  // メッセージファイルのパスを指定
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/courses': '/courses',
    '/contact': '/contact',
    '/admin': '/admin',
    '/admin/login': '/admin/login',
  }
});

export const config = {
  // ミドルウェアを適用するパスを指定
  matcher: ['/((?!api|_next|.*\\..*).*)']
};