// 環境設定を一元管理
export const config = {
  app: {
    name: '日琉国際言語学院',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  api: {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:3000/api',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'default-secret-key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en', 'zh'],
  },
} 