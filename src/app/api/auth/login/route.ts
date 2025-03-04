import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// 環境変数からパスワードを取得（デフォルト値としてフォールバック）
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (password === ADMIN_PASSWORD) {
      // 認証成功
      const token = Math.random().toString(36).substring(2, 15)
      
      // クッキーにセッショントークンを保存
      const cookieStore = await cookies()
      cookieStore.set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1週間
        path: '/',
      })
      
      return NextResponse.json({ success: true })
    } else {
      // 認証失敗
      return NextResponse.json(
        { message: 'パスワードが正しくありません' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'ログイン処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
} 