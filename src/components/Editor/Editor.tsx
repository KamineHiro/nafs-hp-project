"use client"

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { AlertCircle } from 'lucide-react'

// MDEditorをクライアントサイドのみでロード
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => <div className="h-[400px] border border-gray-300 rounded-md bg-gray-50 flex items-center justify-center">エディタを読み込み中...</div>
})

interface EditorProps {
  value: string
  onChange: (value: string) => void
  onImageUpload?: (file: File) => Promise<string>
}

export default function Editor({ value, onChange, onImageUpload }: EditorProps) {
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [mounted, setMounted] = useState(false)

  // クライアントサイドでのみレンダリング
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleImageUpload = async (file: File) => {
    if (!onImageUpload) return

    try {
      setIsUploading(true)
      setError(null)
      
      // 画像をアップロード
      const imageUrl = await onImageUpload(file)
      
      // マークダウン形式で画像を挿入
      const imageMarkdown = `![${file.name}](${imageUrl})`
      onChange(value + '\n' + imageMarkdown)
      
    } catch (err) {
      console.error('画像アップロードエラー:', err)
      setError('画像のアップロードに失敗しました')
    } finally {
      setIsUploading(false)
    }
  }

  const handlePaste = (event: React.ClipboardEvent) => {
    const items = event.clipboardData?.items
    if (!items || !onImageUpload) return

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile()
        if (file) {
          handleImageUpload(file)
          event.preventDefault()
          break
        }
      }
    }
  }

  return (
    <div className="editor-container" onPaste={handlePaste}>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r">
          <div className="flex items-center">
            <AlertCircle className="text-red-500 mr-3" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}
      
      {isUploading && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-r">
          <p className="text-blue-700">画像をアップロード中...</p>
        </div>
      )}
      
      <div data-color-mode="light">
        {mounted && (
          <MDEditor
            value={value}
            onChange={(val) => onChange(val || '')}
            height={400}
            preview="edit"
          />
        )}
      </div>
      
      {onImageUpload && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            画像をアップロード
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleImageUpload(e.target.files[0])
              }
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-color file:text-white hover:file:bg-primary-color/90"
          />
        </div>
      )}
    </div>
  )
}