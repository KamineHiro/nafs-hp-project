import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'

// 仮のデータストア（実際の実装ではデータベースを使用）
const DATA_FILE = path.join(process.cwd(), 'data', 'posts.json')

// データディレクトリが存在しない場合は作成
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'))
}

// データファイルが存在しない場合は作成
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ posts: [] }))
}

// 認証チェック
const checkAuth = async () => {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin_auth')
  return authCookie && authCookie.value === 'authenticated'
}

// 記事一覧の取得
export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    
    // データファイルから記事を読み込む
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    let posts = Array.isArray(data) ? data : (data.posts || [])
    
    // 検索フィルタリング
    if (search) {
      const searchLower = search.toLowerCase()
      posts = posts.filter((post: { 
        title: string; 
        content: string; 
        tags?: string[] 
      }) => 
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        (post.tags && post.tags.some((tag: string) => tag.toLowerCase().includes(searchLower)))
      )
    }
    
    // 日付でソート（新しい順）
    posts.sort((a: { date: string }, b: { date: string }) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    
    // 総数
    const total = posts.length
    
    // ページネーション
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedPosts = posts.slice(startIndex, endIndex)
    
    return NextResponse.json({
      posts: paginatedPosts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { message: '記事の取得中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

// 記事の作成
export async function POST(request: Request): Promise<Response> {
  try {
    // 認証チェック
    if (!(await checkAuth())) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    
    // 必須フィールドの検証
    if (!body.title || !body.content) {
      return NextResponse.json(
        { message: 'タイトルと内容は必須です' },
        { status: 400 }
      )
    }
    
    // 新しい記事を作成
    const newPost = {
      id: uuidv4(),
      title: body.title,
      content: body.content,
      date: body.date || new Date().toISOString(),
      tags: body.tags || [],
      thumbnail: body.thumbnail || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // データファイルから既存の記事を読み込む
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    const posts = data.posts || []
    
    // 新しい記事を追加
    const updatedPosts = [...posts, newPost]
    
    // データファイルに保存
    fs.writeFileSync(DATA_FILE, JSON.stringify(updatedPosts))
    
    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { message: '記事の作成中にエラーが発生しました' },
      { status: 500 }
    )
  }
} 