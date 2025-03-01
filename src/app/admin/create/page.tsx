"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Tab } from "@headlessui/react"
import ReactMarkdown from "react-markdown"
import Image from "next/image"

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
  const router = useRouter()

  useEffect(() => {
    // 認証状態の確認
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check")
        if (!res.ok) {
          router.push("/admin/login")
        }
      } catch (error) {
        console.error("認証エラー:", error)
        router.push("/admin/login")
      }
    }

    checkAuth()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      setError("タイトルを入力してください")
      return
    }
    
    if (!content.trim()) {
      setError("内容を入力してください")
      return
    }
    
    setIsSubmitting(true)
    
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
    } catch (error) {
      console.error("Error:", error)
      setError("記事の作成中にエラーが発生しました")
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

  // プレビュー用のコンポーネント
  const PreviewImage = ({ src }: { src: string }) => {
    if (!src) return null
    
    return (
      <div className="relative h-48 w-full mb-4">
        <Image
          src={src}
          alt="サムネイル"
          fill
          className="object-cover rounded-lg"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">新規記事作成</h1>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                タイトル
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="記事のタイトルを入力"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="thumbnail" className="block text-gray-700 font-medium mb-2">
                サムネイル画像
              </label>
              <input
                type="file"
                id="thumbnail"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              />
              {isUploading && <p className="mt-2 text-gray-500">アップロード中...</p>}
              {thumbnail && <PreviewImage src={thumbnail} />}
            </div>
            
            <div className="mb-6">
              <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">
                タグ
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
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
            
            <div className="mb-6">
              <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
                内容
              </label>
              <Tab.Group>
                <Tab.List className="flex border-b mb-4">
                  <Tab className={({ selected }) =>
                    `px-4 py-2 font-medium ${
                      selected
                        ? "border-b-2 border-[#FFD700] text-[#FFD700]"
                        : "text-gray-500 hover:text-gray-700"
                    }`
                  }>
                    編集
                  </Tab>
                  <Tab className={({ selected }) =>
                    `px-4 py-2 font-medium ${
                      selected
                        ? "border-b-2 border-[#FFD700] text-[#FFD700]"
                        : "text-gray-500 hover:text-gray-700"
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
                      onImageUpload={handleImageUpload}
                    />
                  </Tab.Panel>
                  <Tab.Panel>
                    <div className="prose max-w-none border rounded-lg p-4 min-h-[300px]">
                      <ReactMarkdown>
                        {content}
                      </ReactMarkdown>
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