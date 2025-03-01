"use client"

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Image as ImageIcon, Save, Upload } from 'lucide-react'
import Link from "next/link"
import { motion } from "framer-motion"

// 既存のカテゴリーリスト
const existingCategories = ['イベント', 'ニュース', '表彰', '清掃', '学校生活']

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
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [customCategory, setCustomCategory] = useState('')
  const [availableCategories, setAvailableCategories] = useState(existingCategories)

  useEffect(() => {
    // 認証状態の確認
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check")
        if (!res.ok) {
          router.push("/admin/login")
        } else {
          fetchPosts()
        }
      } catch (err) {
        router.push("/admin/login")
      }
    }

    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts")
        if (!res.ok) {
          throw new Error("記事の取得に失敗しました")
        }
        const data = await res.json()
        setPosts(data)
      } catch (err) {
        setError("記事の取得中にエラーが発生しました")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          categories,
          coverImage,
          date: new Date().toISOString().split('T')[0],
        }),
      })

      if (response.ok) {
        router.push('/news')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // 画像アップロード処理
  const handleImageUpload = async (file: File) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      const data = await response.json()
      return data.url
    } catch (error) {
      console.error('Error:', error)
      return null
    } finally {
      setUploading(false)
    }
  }

  // 画像の挿入
  const insertImage = async (file: File) => {
    const imageUrl = await handleImageUpload(file)
    if (imageUrl) {
      const imageMarkdown = `\n![${file.name}](${imageUrl})\n`
      setContent(prev => prev + imageMarkdown)
    }
  }

  // カバー画像の設定
  const handleCoverImageUpload = async (file: File) => {
    const imageUrl = await handleImageUpload(file)
    if (imageUrl) {
      setCoverImage(imageUrl)
    }
  }

  // カテゴリーを追加
  const handleAddCustomCategory = async () => {
    if (!customCategory) return

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: customCategory }),
      })

      if (response.ok) {
        const updatedCategories = await response.json()
        setAvailableCategories(updatedCategories)
        setCategories([...categories, customCategory])
        setCustomCategory('')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

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
    } catch (err) {
      console.error(err)
      setError("記事の削除中にエラーが発生しました")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFD700]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">管理者ダッシュボード</h1>
            <div className="flex space-x-4">
              <Link
                href="/admin/create"
                className="bg-[#FFD700] text-black px-6 py-2 rounded-lg hover:opacity-90 transition-opacity font-bold"
              >
                新規記事作成
              </Link>
              <button
                onClick={() => router.push("/api/auth/logout")}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                ログアウト
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">記事一覧</h2>
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
                              href={`/news/${post.id}`}
                              className="text-blue-500 hover:text-blue-700"
                              target="_blank"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </Link>
                            <Link
                              href={`/admin/edit/${post.id}`}
                              className="text-green-500 hover:text-green-700"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </Link>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
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
      </div>
    </div>
  )
} 