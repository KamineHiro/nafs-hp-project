"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function NewsDetail() {
  const [post, setPost] = useState<{ title: string; content: string; date: string; tags?: string[]; thumbnail?: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("Fetching post with ID:", id); // デバッグ用
        const res = await fetch(`/api/posts/${id}`)
        
        if (!res.ok) {
          console.error("API response not OK:", res.status, res.statusText);
          throw new Error("記事の取得に失敗しました")
        }
        
        const data = await res.json()
        console.log("Received data:", data); // デバッグ用
        setPost(data)
      } catch (err) {
        console.error("Error fetching post:", err)
        setError("記事の取得中にエラーが発生しました")
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

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

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">記事が見つかりません</h1>
          <Link href="/news" className="text-blue-500 hover:underline">
            記事一覧に戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/news" className="text-blue-500 hover:underline flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              記事一覧に戻る
            </Link>
          </div>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            {post.thumbnail && (
              <div className="relative h-96 w-full">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="p-8">
              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
              <div className="text-gray-500 mb-6">
                {new Date(post.date).toLocaleDateString("ja-JP")}
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    img: ({ src, alt }) => (
                      <div className="my-6 relative">
                        <Image
                          src={src || ''}
                          alt={alt || ''}
                          width={800}
                          height={450}
                          className="rounded-lg mx-auto"
                        />
                      </div>
                    ),
                    p: ({ children }) => <p className="mb-4">{children}</p>,
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 mb-4">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 mb-4">{children}</ol>
                    ),
                    li: ({ children }) => <li className="mb-2">{children}</li>,
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
} 