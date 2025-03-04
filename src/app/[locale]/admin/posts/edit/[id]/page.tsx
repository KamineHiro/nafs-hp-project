"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import dynamic from "next/dynamic"
import Image from "next/image"
import { AlertCircle } from "lucide-react"
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

// MDエディタをクライアントサイドのみでロード
const MDEditor = dynamic(() => import("@uiw/react-md-editor").then(mod => mod.default), { 
  ssr: false 
})

// 既存のカテゴリーリスト
const existingCategories = ['イベント', 'ニュース', '表彰', '清掃', '学校生活']

export default function EditPost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [thumbnailPreview, setThumbnailPreview] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")
  const [publishDate, setPublishDate] = useState<string>("")
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const locale = params.locale as string

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`)
        
        if (!res.ok) {
          throw new Error(`記事の取得に失敗しました`)
        }
        
        const data = await res.json()
        
        setTitle(data.title || "")
        setContent(data.content || "")
        setTags(data.tags || [])
        setThumbnail(data.thumbnail || "")
        setThumbnailPreview(data.thumbnail || "")
        
        if (data.date) {
          const date = new Date(data.date)
          setPublishDate(date.toISOString().slice(0, 10))
        }
      } catch (error) {
        console.error("記事取得エラー:", error)
        setError(`記事の取得中にエラーが発生しました`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      setError("タイトルと内容を入力してください")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          date: new Date(publishDate).toISOString(),
          tags,
          thumbnail
        }),
      })

      if (!res.ok) {
        throw new Error("記事の更新に失敗しました")
      }

      router.push(`/${locale}/admin/posts`)
    } catch (error) {
      console.error("更新エラー:", error)
      setError(`記事の更新中にエラーが発生しました`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (tagInput.trim() && !tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
        setTagInput("")
      }
    }
  }

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleCategorySelect = (category: string) => {
    if (!tags.includes(category)) {
      setTags([...tags, category])
    }
  }

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        throw new Error('画像のアップロードに失敗しました')
      }

      const data = await res.json()
      setThumbnail(data.url)
      setThumbnailPreview(data.url)
    } catch (error) {
      console.error('Error:', error)
      setError('サムネイル画像のアップロードに失敗しました')
    } finally {
      setIsUploading(false)
    }
  }

  // 画像アップロード処理
  const handleImageUpload = async (file: File) => {
    if (!file) return null

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("画像のアップロードに失敗しました")
      }

      const data = await res.json()
      return data.url
    } catch (error) {
      console.error("Error uploading image:", error)
      setError("画像のアップロードに失敗しました")
      return null
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
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">記事を編集</h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <div className="flex">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                タイトル
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                placeholder="記事のタイトルを入力..."
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
                公開日
              </label>
              <input
                type="date"
                id="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                カテゴリー / タグ
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {existingCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      tags.includes(category)
                        ? 'bg-yellow-400 text-gray-800'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="ml-2 text-gray-700 hover:text-gray-900"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="tags">
                新しいタグを追加...
              </label>
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                placeholder="新しいタグを追加..."
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="thumbnail">
                サムネイル画像
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  id="thumbnail"
                  onChange={handleThumbnailUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('thumbnail')?.click()}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  disabled={isUploading}
                >
                  {isUploading ? '画像をアップロード中...' : '画像を選択'}
                </button>
                {thumbnailPreview && (
                  <div className="relative">
                    <Image 
                      src={thumbnailPreview} 
                      alt="サムネイルプレビュー" 
                      width={100} 
                      height={60} 
                      className="rounded-lg border object-cover" 
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnail('')
                        setThumbnailPreview('')
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
                内容
              </label>
              <div data-color-mode="light" className="wmde-markdown-var">
                <MDEditor
                  value={content}
                  onChange={(value) => setContent(value || "")}
                  height={500}
                  preview="edit"
                  commands={[
                    "header",
                    "bold",
                    "italic",
                    "quote",
                    "code",
                    "link",
                    "image",
                    "unordered-list",
                    "ordered-list",
                    "fullscreen"
                  ] as unknown as string[]}
                  {...{
                    imageUploadFn: async (file: File) => {
                      const url = await handleImageUpload(file);
                      if (url) {
                        return url;
                      }
                      throw new Error("画像のアップロードに失敗しました");
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={() => router.push(`/${locale}/admin/posts`)}
                className="mr-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                キャンセル
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-yellow-400 text-gray-800 rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    更新中...
                  </>
                ) : '更新する'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 