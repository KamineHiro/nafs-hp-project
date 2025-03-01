import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { cookies } from 'next/headers'

// 記事を取得
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // paramsをawaitする
    const { id } = await Promise.resolve(params)
    console.log("API: Fetching post with ID:", id); // デバッグ用
    
    const dataDirectory = path.join(process.cwd(), 'src/data/posts')
    
    // 直接ファイル名を指定する方法を試す
    let filePath = path.join(dataDirectory, `${id}.json`)
    
    // ファイルが見つからない場合、post_プレフィックスを追加して試す
    if (!fs.existsSync(filePath)) {
      filePath = path.join(dataDirectory, `post_${id}.json`)
    }
    
    console.log("Looking for file at:", filePath); // デバッグ用

    if (!fs.existsSync(filePath)) {
      console.error("File not found:", filePath); // デバッグ用
      
      // ディレクトリ内のファイルを一覧表示（デバッグ用）
      if (fs.existsSync(dataDirectory)) {
        const files = fs.readdirSync(dataDirectory);
        console.log("Available files:", files);
        
        // IDを含むファイルを探す
        const matchingFile = files.find(file => file.includes(id));
        if (matchingFile) {
          console.log("Found matching file:", matchingFile);
          filePath = path.join(dataDirectory, matchingFile);
        } else {
          return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 })
        }
      } else {
        return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 })
      }
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const post = JSON.parse(fileContents)
    
    console.log("Post data loaded:", post.id, post.title); // デバッグ用

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// 記事を更新
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 認証チェック
    const cookieStore = await cookies()
    const authToken = cookieStore.get('auth_token')
    
    if (!authToken || authToken.value !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: '認証に失敗しました' }, { status: 401 })
    }

    // paramsをawaitする
    const { id } = await Promise.resolve(params)
    
    const dataDirectory = path.join(process.cwd(), 'src/data/posts')
    
    // 直接ファイル名を指定する方法を試す
    let filePath = path.join(dataDirectory, `${id}.json`)
    
    // ファイルが見つからない場合、post_プレフィックスを追加して試す
    if (!fs.existsSync(filePath)) {
      filePath = path.join(dataDirectory, `post_${id}.json`)
    }
    
    // それでも見つからない場合、IDを含むファイルを探す
    if (!fs.existsSync(filePath)) {
      if (fs.existsSync(dataDirectory)) {
        const files = fs.readdirSync(dataDirectory);
        const matchingFile = files.find(file => file.includes(id));
        if (matchingFile) {
          filePath = path.join(dataDirectory, matchingFile);
        } else {
          return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 })
        }
      } else {
        return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 })
      }
    }

    const data = await request.json()
    const post = {
      id,
      title: data.title,
      content: data.content,
      date: data.date,
    }

    fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf8')

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// 記事を削除
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 認証チェック
    const cookieStore = await cookies()
    const authToken = cookieStore.get('auth_token')
    
    if (!authToken || authToken.value !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: '認証に失敗しました' }, { status: 401 })
    }

    // paramsをawaitする
    const { id } = await Promise.resolve(params)
    
    const dataDirectory = path.join(process.cwd(), 'src/data/posts')
    
    // 直接ファイル名を指定する方法を試す
    let filePath = path.join(dataDirectory, `${id}.json`)
    
    // ファイルが見つからない場合、post_プレフィックスを追加して試す
    if (!fs.existsSync(filePath)) {
      filePath = path.join(dataDirectory, `post_${id}.json`)
    }
    
    // それでも見つからない場合、IDを含むファイルを探す
    if (!fs.existsSync(filePath)) {
      if (fs.existsSync(dataDirectory)) {
        const files = fs.readdirSync(dataDirectory);
        const matchingFile = files.find(file => file.includes(id));
        if (matchingFile) {
          filePath = path.join(dataDirectory, matchingFile);
        } else {
          return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 })
        }
      } else {
        return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 })
      }
    }

    fs.unlinkSync(filePath)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
} 