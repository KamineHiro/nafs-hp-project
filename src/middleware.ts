import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from '@/lib/i18n';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Basic認証の関数（現在は使用していないが、将来的に必要になる可能性があるため残しておく）
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function basicAuth(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const password = process.env.VERCEL_PROTECT_PASSWORD

  if (!auth || auth !== `Basic ${Buffer.from(`admin:${password}`).toString('base64')}`) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    })
  }

  return null
}

// 管理者認証ミドルウェア
function authMiddleware(request: NextRequest) {
  // 管理者ページへのアクセスをチェック
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.includes('/login')) {
    
    const authToken = request.cookies.get('auth_token')?.value
    
    // トークンがない、または無効な場合はログインページにリダイレクト
    if (!authToken || authToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  
  return null
}

// 国際化ミドルウェア
const intlMiddleware = createMiddleware({
  locales: ['ja', 'en'],
  defaultLocale: 'ja',
  localePrefix: 'always'
});

// 統合ミドルウェア
export function middleware(request: NextRequest) {
  // 管理者認証を先に実行
  const authResponse = authMiddleware(request)
  if (authResponse) return authResponse
  
  // 管理者ページは国際化ミドルウェアをスキップ
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }
  
  // 国際化ミドルウェアを実行
  return intlMiddleware(request)
}

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 