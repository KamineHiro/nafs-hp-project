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
      date,
      categories
    }

    const markdown = matter.stringify(content, frontMatter)

    // ファイル名を生成（タイトルをスラッグ化）
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // ファイルを保存
    const postsDirectory = path.join(process.cwd(), '_posts')
    fs.writeFileSync(path.join(postsDirectory, `${slug}.md`), markdown)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 