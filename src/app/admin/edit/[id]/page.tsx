"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import dynamic from "next/dynamic"
import { Tab } from "@headlessui/react"
import ReactMarkdown from "react-markdown"
import Image from "next/image"

// リッチテキストエディタをクライアントサイドのみでロード
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false })

// 既存のカテゴリーリスト
const existingCategories = ['イベント', 'ニュース', '表彰', '清掃', '学校生活']

export default function EditPost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [date, setDate] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    // 認証状態の確認
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check")
        if (!res.ok) {
          router.push("/admin/login")
        } else {
          fetchPost()
        }
      } catch (error) {
        console.error("認証エラー:", error)
        router.push("/admin/login")
      }
    }

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`)
        if (!res.ok) {
          throw new Error("記事の取得に失敗しました")
        }
        const data = await res.json()
        setTitle(data.title)
        setContent(data.content)
        setDate(data.date)
        setTags(data.tags || [])
        setThumbnail(data.thumbnail || "")
      } catch (error) {
        console.error("Error:", error)
        setError("記事の取得中にエラーが発生しました")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [id, router])

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
          date,
          tags,
          thumbnail
        }),
      })

      if (!res.ok) {
        throw new Error("記事の更新に失敗しました")
      }

      router.push("/admin")
    } catch (error) {
      console.error("Error:", error)
      setError("記事の更新中にエラーが発生しました")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleTagAdd()
    }
  }

  const handleCategorySelect = (category: string) => {
    if (!tags.includes(category)) {
      setTags([...tags, category])
    }
  }

  const handleImageUpload = async (file: File) => {
    if (!file) return

    setIsUploading(true)
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
    } finally {
      setIsUploading(false)
    }
  }

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const imageUrl = await handleImageUpload(file)
      if (imageUrl) {
        setThumbnail(imageUrl)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsUploading(false)
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
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">記事の編集</h1>
            <button
              onClick={() => router.push("/admin")}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              戻る
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
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
                placeholder="記事のタイトルを入力"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="thumbnail" className="block text-gray-700 font-bold mb-2">
                サムネイル画像
              </label>
              <input
                type="file"
                id="thumbnail"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
              />
              {isUploading && <p className="mt-2 text-gray-500">アップロード中...</p>}
              {thumbnail && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">現在のサムネイル:</p>
                  <div className="relative h-48 w-full">
                    <Image
                      src={thumbnail}
                      alt="サムネイル"
                      className="h-full w-auto object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">
                タグ
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                  placeholder="タグを入力して追加"
                />
                <button
                  type="button"
                  onClick={handleTagAdd}
                  className="px-4 py-2 bg-[#FFD700] text-white rounded-r-lg hover:bg-yellow-500"
                >
                  追加
                </button>
              </div>
              
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">既存のカテゴリーから選択:</p>
                <div className="flex flex-wrap gap-2">
                  {existingCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategorySelect(category)}
                      className={`px-3 py-1 text-sm rounded-full ${
                        tags.includes(category)
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  <p className="text-sm text-gray-600 w-full mb-1">選択中のタグ:</p>
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="ml-2 text-yellow-600 hover:text-yellow-800"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-4">
                <Tab
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                    ${
                      selected
                        ? 'bg-white shadow text-[#FFD700]'
                        : 'text-gray-700 hover:bg-white/[0.12] hover:text-[#FFD700]'
                    }`
                  }
                >
                  編集
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                    ${
                      selected
                        ? 'bg-white shadow text-[#FFD700]'
                        : 'text-gray-700 hover:bg-white/[0.12] hover:text-[#FFD700]'
                    }`
                  }
                >
                  プレビュー
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <div className="mb-6">
                    <Editor
                      value={content}
                      onChange={setContent}
                      onImageUpload={handleImageUpload}
                    />
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="prose max-w-none border border-gray-300 rounded-lg p-4 min-h-[300px]">
                    <ReactMarkdown>
                      {content}
                    </ReactMarkdown>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#FFD700] text-white px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "更新中..." : "更新する"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 