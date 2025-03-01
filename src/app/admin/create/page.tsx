"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Tab } from "@headlessui/react"
import ReactMarkdown from "react-markdown"

// リッチテキストエディタをクライアントサイドのみでロード
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false })

export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    // 認証状態の確認
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check")
        if (!res.ok) {
          router.push("/admin/login")
        }
      } catch (err) {
        router.push("/admin/login")
      }
    }

    checkAuth()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      setError("タイトルと内容を入力してください")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          tags,
          thumbnail,
          date: new Date().toISOString(),
        }),
      })

      if (!res.ok) {
        throw new Error("記事の作成に失敗しました")
      }

      router.push("/admin")
    } catch (err) {
      console.error(err)
      setError("記事の作成中にエラーが発生しました")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleThumbnailUpload = async (file: File) => {
    if (!file) return

    setIsUploading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('サムネイルのアップロードに失敗しました')
      }

      const data = await response.json()
      setThumbnail(data.url)
    } catch (error) {
      console.error('Error uploading thumbnail:', error)
      setError(error instanceof Error ? error.message : 'サムネイルのアップロードに失敗しました')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8">新規記事作成</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                タイトル
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="記事のタイトルを入力"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                サムネイル画像
              </label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  {isUploading ? "アップロード中..." : "画像を選択"}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files && handleThumbnailUpload(e.target.files[0])}
                  accept="image/*"
                  className="hidden"
                />
                {thumbnail && (
                  <div className="relative w-24 h-24">
                    <img
                      src={thumbnail}
                      alt="サムネイル"
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => setThumbnail("")}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                タグ
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  placeholder="タグを入力（Enterで追加）"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-[#FFD700] text-white rounded hover:bg-yellow-500"
                >
                  追加
                </button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1.5 text-yellow-600 hover:text-yellow-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                内容
              </label>
              <Tab.Group>
                <Tab.List className="flex border-b border-gray-200 mb-4">
                  <Tab className={({ selected }) => 
                    `px-4 py-2 font-medium ${
                      selected 
                        ? 'text-[#FFD700] border-b-2 border-[#FFD700]' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`
                  }>
                    編集
                  </Tab>
                  <Tab className={({ selected }) => 
                    `px-4 py-2 font-medium ${
                      selected 
                        ? 'text-[#FFD700] border-b-2 border-[#FFD700]' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`
                  }>
                    プレビュー
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    <Editor
                      value={content}
                      onChange={setContent}
                      placeholder="記事の内容を入力..."
                    />
                  </Tab.Panel>
                  <Tab.Panel>
                    <div className="prose max-w-none border border-gray-300 rounded-lg p-4 min-h-[300px]">
                      {content ? (
                        <ReactMarkdown>
                          {content}
                        </ReactMarkdown>
                      ) : (
                        <p className="text-gray-400">プレビューするコンテンツがありません</p>
                      )}
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => router.push("/admin")}
                className="px-6 py-2 mr-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                キャンセル
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-[#FFD700] text-white rounded-lg hover:bg-yellow-500 disabled:opacity-50"
              >
                {isSubmitting ? "保存中..." : "保存"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 