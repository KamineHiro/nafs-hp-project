import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    
    // 環境変数からパスワードを取得
    const adminPassword = process.env.ADMIN_PASSWORD
    
    console.log('環境変数チェック:', { 
      hasAdminPassword: !!adminPassword,
      hasAdminToken: !!process.env.ADMIN_TOKEN,
      passwordMatch: password === adminPassword
    }) // デバッグ用（本番環境では削除）
    
    if (!adminPassword) {
      return NextResponse.json({ 
        success: false, 
        message: '管理者パスワードが設定されていません' 
      }, { status: 500 })
    }
    
    if (password !== adminPassword) {
      return NextResponse.json({ 
        success: false, 
        message: 'パスワードが正しくありません' 
      }, { status: 401 })
    }
    
    // 認証トークンをクッキーに設定
    const cookieStore = await cookies()
    
    if (!process.env.ADMIN_TOKEN) {
      return NextResponse.json({ 
        success: false, 
        message: '管理者トークンが設定されていません' 
      }, { status: 500 })
    }
    
    cookieStore.set('auth_token', process.env.ADMIN_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24時間
      path: '/',
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('ログインエラー:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'サーバーエラーが発生しました' 
    }, { status: 500 })
  }
} 