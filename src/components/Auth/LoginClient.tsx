"use client"

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

type LoginTranslations = {
  login: {
    title: string;
    username: string;
    password: string;
    submit: string;
    loggingIn: string;
    errorEmptyFields: string;
    errorDefault: string;
  }
}

export default function LoginClient({ translations }: { translations: LoginTranslations }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const params = useParams()
  const t = translations.login;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username || !password) {
      setError(t.errorEmptyFields)
      return
    }
    
    try {
      setIsLoading(true)
      setError('')
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || t.errorDefault)
      }
      
      // ログイン成功
      const locale = params?.locale || 'ja'
      router.push(`/${locale}/admin/posts`)
      
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : t.errorDefault
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">{t.title}</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              {t.username}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              {t.password}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? t.loggingIn : t.submit}
          </button>
        </form>
      </div>
    </div>
  )
} 