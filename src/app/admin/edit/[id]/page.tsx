"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import dynamic from "next/dynamic"
import { Tab } from "@headlessui/react"
import ReactMarkdown from "react-markdown"

// リッチテキストエディタをクライアントサイドのみでロード
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false })

export default function EditPost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [date, setDate] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
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
      } catch (err) {
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
      } catch (err) {
        console.error(err)
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
        }),
      })

      if (!res.ok) {
        throw new Error("記事の更新に失敗しました")
      }

      router.push("/admin")
    } catch (err) {
      console.error(err)
      setError("記事の更新中にエラーが発生しました")
    } finally {
      setIsSubmitting(false)
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
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
                      内容
                    </label>
                    <Editor
                      value={content}
                      onChange={setContent}
                      placeholder="記事の内容を入力"
                    />
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="mb-6 border rounded-lg p-6 min-h-[300px] prose max-w-none">
                    <h2 className="text-2xl font-bold mb-4">{title || "タイトル"}</h2>
                    <div className="text-gray-500 mb-4">
                      {new Date(date).toLocaleDateString("ja-JP")}
                    </div>
                    <ReactMarkdown>{content || "内容がここに表示されます"}</ReactMarkdown>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#FFD700] text-black px-6 py-2 rounded-lg hover:opacity-90 transition-opacity font-bold disabled:opacity-50"
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