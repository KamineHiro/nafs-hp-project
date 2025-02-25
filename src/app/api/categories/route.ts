import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const categoriesDir = path.join(process.cwd(), 'src/data')
const categoriesPath = path.join(categoriesDir, 'categories.json')

// カテゴリーを追加
export async function POST(request: Request) {
  try {
    const { category } = await request.json()
    let categories = []
    
    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(categoriesDir)) {
      fs.mkdirSync(categoriesDir, { recursive: true })
    }
    
    // 既存のカテゴリーを読み込む
    if (fs.existsSync(categoriesPath)) {
      const data = fs.readFileSync(categoriesPath, 'utf8')
      categories = JSON.parse(data)
    }

    // 新しいカテゴリーを追加（重複チェック）
    if (!categories.includes(category)) {
      categories.push(category)
      // カテゴリーを保存
      fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2))
    }

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 