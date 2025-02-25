import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, excerpt, content, categories, coverImage, date } = body

    // Markdownファイルの内容を生成
    const frontMatter = {
      title,
      excerpt,
      coverImage,
      date: date || new Date().toISOString().split('T')[0],
      categories
    }

    const markdown = matter.stringify(content, frontMatter)

    // タイムスタンプのみをファイル名として使用
    const timestamp = Date.now()
    const filename = `${timestamp}.md`

    // _postsディレクトリのパスを設定
    const postsDirectory = path.join(process.cwd(), '_posts')

    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
    }

    // ファイルを保存
    fs.writeFileSync(path.join(postsDirectory, filename), markdown)

    return NextResponse.json({ success: true, slug: timestamp.toString() })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// カテゴリー一覧を取得するエンドポイント
export async function GET() {
  try {
    const categoriesPath = path.join(process.cwd(), 'src/data/categories.json')
    let categories = []
    
    if (fs.existsSync(categoriesPath)) {
      const data = fs.readFileSync(categoriesPath, 'utf8')
      categories = JSON.parse(data)
    }

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 