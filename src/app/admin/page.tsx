"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileDown, Image as ImageIcon, Save } from 'lucide-react'

export default function AdminPage() {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const router = useRouter()

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">記事管理画面</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
          {/* タイトル */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              タイトル
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* 抜粋 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              抜粋
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
              required
            />
          </div>

          {/* カテゴリー */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              カテゴリー
            </label>
            <div className="flex gap-2 mb-2">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#FFD700] text-black text-sm rounded-full flex items-center gap-2"
                >
                  {category}
                  <button
                    type="button"
                    onClick={() => setCategories(categories.filter((_, i) => i !== index))}
                    className="hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                placeholder="新しいカテゴリーを追加"
              />
              <button
                type="button"
                onClick={() => {
                  if (newCategory) {
                    setCategories([...categories, newCategory])
                    setNewCategory('')
                  }
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                追加
              </button>
            </div>
          </div>

          {/* 本文 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              本文 (Markdown)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono"
              rows={15}
              required
            />
          </div>

          {/* カバー画像 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              カバー画像URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                required
              />
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 送信ボタン */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#FFD700] text-black rounded-md hover:bg-opacity-90 flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              保存する
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 