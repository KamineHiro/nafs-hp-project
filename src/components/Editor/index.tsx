"use client"

import { useRef, useState } from "react"

type EditorProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function Editor({ value, onChange, placeholder }: EditorProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleImageUpload = async (file: File) => {
    if (!file) return

    // ファイル形式チェック
    const fileType = file.type.split('/')[0]
    if (fileType !== 'image') {
      setUploadError('画像ファイルのみアップロードできます')
      return
    }

    setIsUploading(true)
    setUploadError("")

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'アップロードに失敗しました')
      }

      const data = await response.json()
      
      // テキストエリアのカーソル位置に画像マークダウンを挿入
      const textarea = textareaRef.current
      if (textarea) {
        const startPos = textarea.selectionStart
        const endPos = textarea.selectionEnd
        const textBefore = value.substring(0, startPos)
        const textAfter = value.substring(endPos)
        
        // 画像マークダウンを挿入
        const imageMarkdown = `![画像](${data.url})`
        const newValue = textBefore + imageMarkdown + textAfter
        
        onChange(newValue)
        
        // カーソル位置を更新
        setTimeout(() => {
          textarea.focus()
          const newCursorPos = startPos + imageMarkdown.length
          textarea.setSelectionRange(newCursorPos, newCursorPos)
        }, 0)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      setUploadError(error instanceof Error ? error.message : '画像のアップロードに失敗しました')
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg">
      <div className="flex items-center gap-2 p-2 border-b">
        <button
          type="button"
          onClick={handleFileButtonClick}
          disabled={isUploading}
          className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 flex items-center gap-1"
        >
          {isUploading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>アップロード中...</span>
            </>
          ) : (
            <>
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>画像を挿入</span>
            </>
          )}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
          accept="image/*"
          className="hidden"
        />
      </div>
      
      {uploadError && (
        <div className="p-2 text-red-500 text-sm">{uploadError}</div>
      )}
      
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-64 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
      />
      
      <div className="p-2 text-xs text-gray-500">
        <p>画像の挿入: 「画像を挿入」ボタンをクリックするか、マークダウン形式 ![代替テキスト](画像URL) で直接入力できます</p>
        <p>見出し: # 大見出し、## 中見出し、### 小見出し</p>
        <p>リスト: * 項目 または 1. 項目</p>
        <p>リンク: [テキスト](URL)</p>
      </div>
    </div>
  )
} 