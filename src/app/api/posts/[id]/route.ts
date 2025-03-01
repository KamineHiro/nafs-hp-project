import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { cookies } from 'next/headers'

// ヘルパー関数
const getDataDirectory = () => path.join(process.cwd(), 'src/data/posts')
const getFilePath = (id: string) => path.join(getDataDirectory(), `${id}.json`)

// 認証チェック
const isAuthenticated = async () => {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')
  return authToken && authToken.value === process.env.ADMIN_TOKEN
}

// URLからIDを抽出するヘルパー関数
const extractIdFromUrl = (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const segments = pathname.split('/')
  return segments[segments.length - 1] // 最後のセグメントがID
}

// 特定の記事を取得
export async function GET(request: NextRequest) {
  try {
    // URLからIDを抽出
    const paramId = extractIdFromUrl(request)
    const id = `post_${paramId}`
    const filePath = getFilePath(id)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 })
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const post = JSON.parse(fileContents)
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// 記事を更新
export async function PUT(request: NextRequest) {
  try {
    // 認証チェック
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: '認証に失敗しました' }, { status: 401 })
    }
    
    // URLからIDを抽出
    const paramId = extractIdFromUrl(request)
    const id = `post_${paramId}`
    const filePath = getFilePath(id)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 })
    }
    
    const data = await request.json()
    const post = {
      id,
      title: data.title,
      content: data.content,
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      thumbnail: data.thumbnail || ''
    }
    
    fs.writeFileSync(filePath, JSON.stringify(post, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// 記事を削除
export async function DELETE(request: NextRequest) {
  try {
    // 認証チェック
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: '認証に失敗しました' }, { status: 401 })
    }
    
    // URLからIDを抽出
    const paramId = extractIdFromUrl(request)
    let id = paramId
    if (!id.startsWith('post_')) {
      id = `post_${id}`
    }
    
    const filePath = getFilePath(id)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 })
    }
    
    fs.unlinkSync(filePath)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}