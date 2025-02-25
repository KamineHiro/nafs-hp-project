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

// /admin/login 以外の /admin/* パスを保護
export default withAuth(
  function middleware(req) {
    // 本番環境でのみBasic認証を有効にする
    if (process.env.NODE_ENV === 'production') {
      const basicAuthResult = basicAuth(req)
      if (basicAuthResult) return basicAuthResult
    }
    return
  },
  {
    pages: {
      signIn: "/admin/login",
    },
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname === "/admin/login") {
          return true
        }
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/admin',
    '/admin/((?!login).)*'
  ]
} 