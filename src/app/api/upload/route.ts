import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 保存するパスを設定
    const uploadDir = path.join(process.cwd(), 'public/images/news')
    const filename = `${Date.now()}-${file.name}`
    const filepath = path.join(uploadDir, filename)

    // ファイルを保存
    await writeFile(filepath, buffer)

    return NextResponse.json({ 
      success: true,
      url: `/images/news/${filename}`
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
} 