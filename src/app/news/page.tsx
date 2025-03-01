"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

type Post = {
  id: string
  title: string
  date: string
  content: string
  tags?: string[]
  thumbnail?: string
}

export default function NewsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts")
        if (!res.ok) {
          throw new Error("記事の取得に失敗しました")
        }
        const data = await res.json()
        setPosts(data)
      } catch (err) {
        console.error(err)
        setError("記事の取得中にエラーが発生しました")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">エラー</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <div className="relative h-[700px] overflow-hidden">
        <Image
          src="/images/news/news-hero.jpg"
          alt="最新記事"
          fill
          className="object-cover"
          priority  
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">最新記事</h1>
            <p className="text-lg md:text-xl mb-6">
              日琉国際言語学院の最新情報やイベント、学生の活動などをお届けします
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Link href="/" className="text-white hover:text-[#FFD700] transition-colors">
                ホーム
              </Link>
              <span className="text-white">›</span>
              <span className="text-white">最新記事</span>
            </div>
          </div>
        </div>
      </div>

      {/* 記事一覧セクション */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">記事がありません</p>
          ) : (
            <div className="max-w-4xl mx-auto space-y-8">
              {posts.map((post) => {
                // サムネイルがあればそれを使用、なければ記事内の最初の画像を使用
                const imageUrl = post.thumbnail || extractFirstImageUrl(post.content)
                
                return (
                  <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Link href={`/news/${post.id.replace('post_', '')}`} className="block">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-2/5 h-64 md:h-auto">
                          <img
                            src={imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/images/placeholder.jpg'
                            }}
                          />
                        </div>
                        <div className="md:w-3/5 p-6">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags && post.tags.length > 0 ? (
                              post.tags.map((tag, index) => (
                                <span 
                                  key={index} 
                                  className="inline-block px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))
                            ) : (
                              <span className="inline-block px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                                ニュース
                              </span>
                            )}
                          </div>
                          <h2 className="text-2xl font-bold mb-3 line-clamp-2">{post.title}</h2>
                          <p className="text-gray-500 mb-4">
                            <span className="inline-block mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {new Date(post.date).toLocaleDateString("ja-JP")}
                            </span>
                            <span className="inline-block">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              レイナ
                            </span>
                          </p>
                          <div className="text-gray-600 line-clamp-3">
                            {post.content.replace(/!\[.*?\]\(.*?\)/g, '').substring(0, 150)}
                            {post.content.length > 150 ? '...' : ''}
                          </div>
                          <div className="mt-4">
                            <span className="inline-block text-[#FFD700] font-semibold hover:underline">
                              続きを読む →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <button className="bg-[#FFD700] hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full transition-colors">
              もっと見る
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}