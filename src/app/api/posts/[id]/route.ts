import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// データファイルのパス
const dataFilePath = path.join(process.cwd(), 'data', 'posts.json')

// 記事データを読み込む関数
const getPosts = () => {
  try {
    // ファイルが存在するか確認
    if (!fs.existsSync(dataFilePath)) {
      // ファイルが存在しない場合は空の配列を持つJSONファイルを作成
      fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2), 'utf8')
      return []
    }

    const fileData = fs.readFileSync(dataFilePath, 'utf8')
    try {
      const parsedData = JSON.parse(fileData)
      // データ形式をチェック
      if (parsedData.posts && Array.isArray(parsedData.posts)) {
        return parsedData.posts
      } else if (Array.isArray(parsedData)) {
        return parsedData
      } else {
        console.error('Invalid posts data format:', parsedData)
        return []
      }
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError)
      return []
    }
  } catch (error) {
    console.error('Error reading posts data:', error)
    return []
  }
}

// パラメータの型定義
type RouteParams = Promise<{ id: string }>;

// 特定の記事を取得
export async function GET(
  request: Request,
  { params }: { params: RouteParams }
): Promise<Response> {
  try {
    // paramsをawaitする
    const { id } = await params;
    
    const posts = getPosts()
    const post = posts.find((p: { id: string }) => p.id === id)
    
    if (!post) {
      return NextResponse.json(
        { message: '記事が見つかりません' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { message: '記事の取得中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

// 記事を更新
export async function PUT(
  request: Request,
  { params }: { params: RouteParams }
): Promise<Response> {
  try {
    // paramsをawaitする
    const { id } = await params;
    
    const posts = getPosts()
    const postIndex = posts.findIndex((p: { id: string }) => p.id === id)
    
    if (postIndex === -1) {
      return NextResponse.json(
        { message: '記事が見つかりません' },
        { status: 404 }
      )
    }
    
    const updatedData = await request.json()
    // 必須フィールドの検証
    if (!updatedData.title || !updatedData.content) {
      return NextResponse.json(
        { message: 'タイトルと内容は必須です' },
        { status: 400 }
      )
    }
    
    // 既存の記事を更新
    posts[postIndex] = {
      ...posts[postIndex],
      ...updatedData,
      updatedAt: new Date().toISOString()
    }
    
    // ファイルに書き込み - 配列形式で保存
    fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2))
    
    return NextResponse.json(posts[postIndex])
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { message: '記事の更新中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

// 記事を削除
export async function DELETE(
  request: Request,
  { params }: { params: RouteParams }
): Promise<Response> {
  try {
    // paramsをawaitする
    const { id } = await params;
    
    const posts = getPosts()
    const updatedPosts = posts.filter((p: { id: string }) => p.id !== id)
    
    if (posts.length === updatedPosts.length) {
      return NextResponse.json(
        { message: '記事が見つかりません' },
        { status: 404 }
      )
    }
    
    // ファイルに書き込み - 配列形式で保存
    fs.writeFileSync(dataFilePath, JSON.stringify(updatedPosts, null, 2))
    
    return NextResponse.json({ message: '記事が削除されました' })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { message: '記事の削除中にエラーが発生しました' },
      { status: 500 }
    )
  }
}