import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { cookies } from 'next/headers'

// 記事一覧を取得
export async function GET() {
  try {
    const dataDirectory = path.join(process.cwd(), 'src/data/posts')
    
    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(dataDirectory)) {
      fs.mkdirSync(dataDirectory, { recursive: true })
      return NextResponse.json([])
    }
    
    const files = fs.readdirSync(dataDirectory)
    const posts = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const fileContents = fs.readFileSync(path.join(dataDirectory, file), 'utf8')
        const post = JSON.parse(fileContents)
        return post
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// 新規記事を作成
export async function POST(request: Request) {
  try {
    // 認証チェック
    const cookieStore = await cookies()
    const authToken = cookieStore.get('auth_token')
    
    if (!authToken || authToken.value !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: '認証に失敗しました' }, { status: 401 })
    }

    const data = await request.json()
    const id = `post_${Date.now()}`
    const post = {
      id,
      title: data.title,
      content: data.content,
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      thumbnail: data.thumbnail || "",
    }

    const dataDirectory = path.join(process.cwd(), 'src/data/posts')
    
    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(dataDirectory)) {
      fs.mkdirSync(dataDirectory, { recursive: true })
    }
    
    const filePath = path.join(dataDirectory, `${id}.json`)
    fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf8')

    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 