"use client"

import { useState, useEffect } from 'react'
import { Pencil, Trash } from 'lucide-react'
import Link from "next/link"
import { motion } from "framer-motion"

// 既存のカテゴリーリスト
// const existingCategories = ['イベント', 'ニュース', '表彰', '清掃', '学校生活']

type Post = {
  id: string
  title: string
  date: string
  content: string
}

export default function AdminDashboard() {
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
      } catch (error) {
        console.error("Error:", error)
        setError("記事の取得中にエラーが発生しました")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("この記事を削除してもよろしいですか？")) return

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error("記事の削除に失敗しました")
      }

      setPosts(posts.filter(post => post.id !== id))
    } catch (error) {
      console.error("Error:", error)
      setError("記事の削除中にエラーが発生しました")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFD700]"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">記事一覧</h1>
          <div className="flex space-x-4">
            <Link
              href="/admin/create"
              className="bg-[#FFD700] text-black px-6 py-2 rounded-lg hover:opacity-90 transition-opacity font-bold"
            >
              新規記事作成
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {posts.length === 0 ? (
          <p className="text-gray-500">記事がありません。新しい記事を作成してください。</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">タイトル</th>
                  <th className="py-3 px-6 text-left">投稿日</th>
                  <th className="py-3 px-6 text-center">アクション</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {posts.map((post) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-6 text-left">
                      <div className="font-medium">{post.title}</div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {new Date(post.date).toLocaleDateString("ja-JP")}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center space-x-2">
                        <Link
                          href={`/admin/edit/${post.id.replace('post_', '')}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
} 