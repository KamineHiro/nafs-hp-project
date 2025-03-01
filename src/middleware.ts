import { NextRequest, NextResponse } from 'next/server'

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
export function middleware(request: NextRequest) {
  // 管理者ページへのアクセスをチェック
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.includes('/login')) {
    
    const authToken = request.cookies.get('auth_token')?.value
    
    // トークンがない、または無効な場合はログインページにリダイレクト
    if (!authToken || authToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  
  return NextResponse.next()
}

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: ['/admin/:path*'],
} 