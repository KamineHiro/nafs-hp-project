"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

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
    <div className="min-h-screen pt-24">
      {/* ヘッダーセクション */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">最新記事</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            学校の最新情報やイベント、学生の活動などをお届けします。
          </p>
        </div>
      </div>

      {/* 記事一覧 */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">記事がありません。</p>
          ) : (
            posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <Link href={`/news/${post.id.replace('post_', '')}`}>
                  <div className="relative h-48">
                    <Image
                      src={post.thumbnail || extractFirstImageUrl(post.content)}
                      alt={post.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        // @ts-expect-error: Object is possibly 'null'
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-gray-500 text-sm mb-2">
                      {new Date(post.date).toLocaleDateString("ja-JP")}
                    </div>
                    <h2 className="text-xl font-bold mb-3 hover:text-[#FFD700] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {post.content.replace(/!\[.*?\]\(.*?\)/g, '').substring(0, 100)}...
                    </p>
                    <span className="text-[#FFD700] font-semibold hover:underline">
                      続きを読む
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}