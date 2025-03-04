"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { 
  PlusCircle, 
  Search, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  AlertCircle
} from 'lucide-react'
import Image from 'next/image'

type Post = {
  id: string
  title: string
  date: string
  tags: string[]
  thumbnail?: string
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const router = useRouter()
  const params = useParams()
  const locale = params?.locale ? String(params.locale) : 'ja'

  const postsPerPage = 10

  // fetchPosts関数をuseCallbackでラップ - 先に宣言
  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch(`/api/posts?page=${currentPage}&limit=${postsPerPage}&search=${searchTerm}`)
      if (!res.ok) {
        throw new Error("記事の取得に失敗しました")
      }
      const data = await res.json()
      setPosts(data.posts || [])
      setTotalPages(Math.ceil((data.total || 0) / postsPerPage))
    } catch (error) {
      console.error("Error:", error)
      setError("記事の取得中にエラーが発生しました")
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, postsPerPage, searchTerm])

  // 認証チェックと記事取得
  useEffect(() => {
    const checkAuthAndFetchPosts = async () => {
      try {
        // 認証チェック
        const authRes = await fetch('/api/auth/check')
        if (!authRes.ok) {
          // 認証されていない場合はログインページにリダイレクト
          router.push(`/${locale}/admin/login`)
          return
        }
        
        // 認証OKなら記事を取得
        await fetchPosts()
      } catch (error) {
        console.error("Auth Error:", error)
        router.push(`/${locale}/admin/login`)
      }
    }
    
    checkAuthAndFetchPosts()
  }, [router, currentPage, searchTerm, locale, fetchPosts])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1) // 検索時は1ページ目に戻る
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm("この記事を削除してもよろしいですか？")) {
      return
    }

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error("記事の削除に失敗しました")
      }

      // 記事リストを更新
      setPosts(posts.filter(post => post.id !== id))
    } catch (error) {
      console.error("Error:", error)
      setError("記事の削除中にエラーが発生しました")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">記事管理</h1>
            
            {/* 新規作成ボタン */}
            <Link
              href={`/${locale}/admin/posts/new`}
              className="inline-flex items-center px-4 py-2 bg-primary-color text-white rounded-md hover:bg-primary-color/90 transition-colors"
            >
              <PlusCircle className="mr-2" size={18} />
              新規記事
            </Link>
          </div>
          
          {/* 検索フォーム */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="記事を検索..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm"
              />
            </div>
          </form>
          
          {error && (
            <div className="mx-6 mt-6 flex items-center p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md">
              <AlertCircle className="text-red-500 mr-3" size={20} />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="p-6">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">記事がありません</p>
                <Link
                  href={`/${locale}/admin/posts/new`}
                  className="inline-flex items-center px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-primary-color/90 transition-colors"
                >
                  <PlusCircle className="mr-2" size={18} />
                  新規記事作成
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        タイトル
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        日付
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        タグ
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        アクション
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {post.thumbnail && (
                              <div className="flex-shrink-0 h-10 w-10 mr-3">
                                <Image 
                                  src={post.thumbnail || '/images/placeholder.jpg'}
                                  alt={post.title}
                                  width={100}
                                  height={60}
                                  className="rounded-md object-cover"
                                />
                              </div>
                            )}
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                {post.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {formatDate(post.date)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {post.tags && post.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-color/10 text-primary-color"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link
                              href={`/${locale}/admin/posts/edit/${post.id}`}
                              className="text-indigo-600 hover:text-indigo-900 p-1.5 hover:bg-indigo-50 rounded"
                            >
                              <Edit size={16} />
                            </Link>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="text-red-600 hover:text-red-900 p-1.5 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* ページネーション */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  {/* ページ番号 */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-md ${
                        currentPage === page
                          ? 'bg-primary-color text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={16} />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 