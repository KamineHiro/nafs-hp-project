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
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <div className="relative h-[600px] overflow-hidden">
        <Image
          src="/images/news-hero.jpg"
          alt="最新記事"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              最新記事
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              学校の最新情報やイベント、学生の活動などをお届けします
            </motion.p>
            <motion.div 
              className="mt-8 flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link 
                href="/" 
                className="text-white hover:text-[#FFD700] transition-colors"
              >
                ホーム
              </Link>
              <span className="text-white">›</span>
              <span className="text-[#FFD700]">最新記事</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 記事一覧 */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {posts.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">記事がありません。</p>
          ) : (
            posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <Image
                    src={post.thumbnail || extractFirstImageUrl(post.content)}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      // @ts-expect-error: Object is possibly 'null'
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags && post.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-[#FFD700]/20 text-[#B8860B] text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-gray-500 text-sm mb-2">
                    {new Date(post.date).toLocaleDateString("ja-JP")}
                  </div>
                  <h2 className="text-xl font-bold mb-3 hover:text-[#FFD700] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {post.content.replace(/!\[.*?\]\(.*?\)/g, '').substring(0, 100)}...
                  </p>
                  <Link href={`/news/${post.id.replace('post_', '')}`} className="text-[#FFD700] font-semibold hover:underline inline-flex items-center">
                    続きを読む
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  )
}