"use client"
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

// このページは動的にレンダリングする必要があります
export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale || 'ja'
  const [isChecking, setIsChecking] = useState(true)
  
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/check')
        const data = await response.json()
        
        if (data.authenticated) {
          // 認証済みの場合は記事一覧にリダイレクト
          router.push(`/${locale}/admin/posts`)
        } else {
          // 未認証の場合はログインページにリダイレクト
          router.push(`/${locale}/admin/login`)
        }
      } catch (error) {
        console.error('認証チェックエラー:', error)
        // エラーの場合もログインページにリダイレクト
        router.push(`/${locale}/admin/login`)
      } finally {
        setIsChecking(false)
      }
    }
    
    checkAuth()
  }, [router, locale])
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      {isChecking ? (
        <p>認証を確認中...</p>
      ) : (
        <p>リダイレクト中...</p>
      )}
    </div>
  )
}