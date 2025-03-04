import { NextRequest, NextResponse } from 'next/server'
import { checkAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const result = await checkAuth(request)
    
    if (result.isAuthenticated) {
      return NextResponse.json({ isAuthenticated: true })
    } else {
      return NextResponse.json(
        { message: '認証されていません' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { message: '認証チェック中にエラーが発生しました' },
      { status: 500 }
    )
  }
} 