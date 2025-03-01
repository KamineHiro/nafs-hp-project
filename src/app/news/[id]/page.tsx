"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import Link from "next/link"

export default function NewsDetail() {
  const [post, setPost] = useState<{ title: string; content: string; date: string; tags?: string[]; thumbnail?: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("Fetching post with ID:", id); // デバッグ用
        const res = await fetch(`/api/posts/${id}`)
        
        if (!res.ok) {
          console.error("API response not OK:", res.status, res.statusText);
          throw new Error("記事の取得に失敗しました")
        }
        
        const data = await res.json()
        console.log("Received data:", data); // デバッグ用
        setPost(data)
      } catch (err) {
        console.error("Error fetching post:", err)
        setError("記事の取得中にエラーが発生しました")
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  // 記事の内容から最初の画像URLを抽出する関数（サムネイルがない場合のフォールバック）
  const extractFirstImageUrl = (content: string) => {
    const match = content.match(/!\[.*?\]\((.*?)\)/)
    return match ? match[1] : '/images/placeholder.jpg'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFD700]"></div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">エラー</h1>
          <p className="text-gray-600">{error || "記事が見つかりませんでした"}</p>
        </div>
      </div>
    )
  }

  // サムネイル画像のURL（設定されていない場合は記事内の最初の画像を使用）
  const heroImageUrl = post.thumbnail || extractFirstImageUrl(post.content);

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <div className="relative h-[700px] overflow-hidden">
        <Image
          src={heroImageUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority
          onError={(e) => {
            // @ts-ignore: Object is possibly 'null'
            e.target.src = '/images/placeholder.jpg';
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg mb-6">
              {new Date(post.date).toLocaleDateString("ja-JP")}
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Link href="/" className="text-white hover:text-[#FFD700] transition-colors">
                ホーム
              </Link>
              <span className="text-white">›</span>
              <Link href="/news" className="text-white hover:text-[#FFD700] transition-colors">
                最新記事
              </Link>
              <span className="text-white">›</span>
              <span className="text-white">{post.title.substring(0, 20)}{post.title.length > 20 ? '...' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 記事コンテンツ */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
            {/* タグがあれば表示 */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-block px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="prose max-w-none">
              <ReactMarkdown
                components={{
                  // pタグの中にdivが入らないように修正
                  img: ({ node, ...props }) => (
                    // pタグの外側に画像を配置
                    <img
                      {...props}
                      className="max-w-full h-auto rounded-lg mx-auto my-4"
                      alt={props.alt || "画像"}
                    />
                  ),
                  // 必要に応じて他のコンポーネントもカスタマイズ
                  p: ({ node, children, ...props }) => {
                    // 子要素に画像が含まれているかチェック
                    const hasImage = (
                      Array.isArray(children) && 
                      children.some(child => 
                        typeof child === 'object' && 
                        child !== null && 
                        'type' in child && 
                        child.type === 'img'
                      )
                    );
                    
                    // 画像を含む段落は特別に処理
                    if (hasImage) {
                      return <>{children}</>;
                    }
                    
                    // 通常の段落
                    return <p {...props}>{children}</p>;
                  }
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
            
            {/* 記事フッター */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <Link href="/news" className="inline-flex items-center text-[#FFD700] hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  記事一覧に戻る
                </Link>
                <div className="text-gray-500">
                  {new Date(post.date).toLocaleDateString("ja-JP")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 