import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from "next-auth/middleware"

// Basic認証の関数
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

// サイト全体を保護
export function middleware(req: NextRequest) {
  // 本番環境でのみBasic認証を有効にする
  if (process.env.NODE_ENV === 'production') {
    return basicAuth(req) || NextResponse.next()
  }
  return NextResponse.next()
}

// すべてのパスに適用
export const config = {
  matcher: '/(.*)'  // すべてのルートを保護
} 