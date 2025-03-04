import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { writeFile } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'

// 認証チェック
const checkAuth = async () => {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin_auth')
  return authCookie && authCookie.value === 'authenticated'
}

export async function POST(request: Request) {
  try {
    // 認証チェック
    if (!(await checkAuth())) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'ファイルが見つかりません' },
        { status: 400 }
      )
    }
    
    // ファイルタイプの確認
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: '画像ファイルのみアップロードできます' },
        { status: 400 }
      )
    }
    
    // アップロードディレクトリの作成
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    
    // ファイル名の生成
    const fileExtension = path.extname(file.name)
    const fileName = `${uuidv4()}${fileExtension}`
    const filePath = path.join(uploadDir, fileName)
    
    // ファイルの保存
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filePath, buffer)
    
    // URLの生成
    const fileUrl = `/uploads/${fileName}`
    
    return NextResponse.json({ url: fileUrl })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'ファイルのアップロード中にエラーが発生しました' },
      { status: 500 }
    )
  }
} 