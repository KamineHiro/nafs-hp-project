import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('auth_token')
    
    if (!authToken || authToken.value !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ 
        authenticated: false,
        message: '認証に失敗しました'
      }, { status: 401 })
    }
    
    return NextResponse.json({ authenticated: true })
  } catch (error) {
    console.error('認証チェックエラー:', error)
    return NextResponse.json({ 
      authenticated: false,
      message: 'サーバーエラーが発生しました'
    }, { status: 500 })
  }
} 