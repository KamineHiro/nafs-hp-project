import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    // 環境変数のチェック
    const adminToken = process.env.ADMIN_TOKEN
    if (!adminToken) {
      console.error('ADMIN_TOKEN環境変数が設定されていません')
      return NextResponse.json(
        { error: '管理者トークンが設定されていません' }, 
        { status: 500 }
      )
    }
    
    // パスワードの検証
    if (password === process.env.ADMIN_PASSWORD) {
      // 認証成功
      const cookieStore = await cookies()
      cookieStore.set('auth_token', adminToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24時間
        path: '/',
      })
      
      return NextResponse.json({ success: true })
    }
    
    // 認証失敗
    return NextResponse.json(
      { error: 'パスワードが正しくありません' }, 
      { status: 401 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' }, 
      { status: 500 }
    )
  }
} 