import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    // 認証チェック
    const cookieStore = await cookies()
    const authToken = cookieStore.get('auth_token')
    
    if (!authToken || authToken.value !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: '認証に失敗しました' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'ファイルが見つかりません' }, { status: 400 })
    }

    // ファイルタイプをチェック
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: '無効なファイル形式です' }, { status: 400 })
    }

    // ファイル名を生成
    const buffer = await file.arrayBuffer()
    const uniqueId = uuidv4()
    const extension = file.name.split('.').pop()
    const fileName = `${uniqueId}.${extension}`
    
    // アップロードディレクトリを作成
    const uploadDir = join(process.cwd(), 'public/uploads')
    
    // ファイルを保存
    await writeFile(
      join(uploadDir, fileName),
      Buffer.from(buffer)
    )

    // 保存したファイルのURLを返す
    return NextResponse.json({ 
      url: `/uploads/${fileName}`,
      success: true 
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'ファイルのアップロードに失敗しました' }, { status: 500 })
  }
} 