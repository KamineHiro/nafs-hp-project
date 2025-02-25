"use client"

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Image as ImageIcon, Save, Upload } from 'lucide-react'

// 既存のカテゴリーリスト
const existingCategories = ['イベント', 'ニュース', '表彰', '清掃', '学校生活']

export default function AdminPage() {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const [customCategory, setCustomCategory] = useState('')
  const [availableCategories, setAvailableCategories] = useState(existingCategories)

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
            <div className="flex flex-wrap gap-2 mb-2">
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
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">既存のカテゴリーから選択</option>
                {availableCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  if (newCategory && !categories.includes(newCategory)) {
                    setCategories([...categories, newCategory])
                    setNewCategory('')
                  }
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                追加
              </button>
            </div>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                placeholder="新しいカテゴリーを入力"
              />
              <button
                type="button"
                onClick={handleAddCustomCategory}
                className="px-4 py-2 bg-[#FFD700] text-black rounded-md hover:bg-opacity-90"
              >
                新規作成
              </button>
            </div>
          </div>

          {/* カバー画像 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              カバー画像
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                placeholder="画像のURL"
                required
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <Upload className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 本文 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              本文 (Markdown)
            </label>
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono"
                rows={15}
                required
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute right-2 bottom-2 p-2 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 非表示のファイル入力 */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                if (!coverImage) {
                  handleCoverImageUpload(file)
                } else {
                  insertImage(file)
                }
              }
            }}
          />

          {/* 送信ボタン */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-3 bg-[#FFD700] text-black rounded-md hover:bg-opacity-90 flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {uploading ? '画像アップロード中...' : '保存する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 