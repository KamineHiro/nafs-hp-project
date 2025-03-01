import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  
  // 認証トークンを削除
  cookieStore.delete('auth_token')
  
  return NextResponse.redirect(new URL('/admin/login', request.url))
} 