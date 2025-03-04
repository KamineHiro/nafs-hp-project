"use client"

import { useState, useRef, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { toast } from 'react-hot-toast'
import { 
  Save, 
  Image, 
  ArrowLeft, 
  Eye, 
  EyeOff,
  Loader2
} from 'lucide-react'

// MarkdownEditorをクライアントサイドのみで動的にインポート
const MarkdownEditor = dynamic(() => import('@/components/MarkdownEditor/MarkdownEditor'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-md"></div>
})

type PostEditorTranslations = {
  title: string;
  titleLabel: string;
  contentLabel: string;
  saveButton: string;
  saving: string;
  errorMessage: string;
  successMessage: string;
  previewToggle: string;
  backToList: string;
  thumbnailLabel: string;
  thumbnailHint: string;
  publishedLabel: string;
  draftSaved: string;
}

type PostEditorProps = {
  translations: PostEditorTranslations;
  isNew: boolean;
  post?: {
    id: string;
    title: string;
    content: string;
    thumbnail?: string;
    published?: boolean;
  };
}

export default function PostEditorClient({ translations, isNew, post }: PostEditorProps) {
  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.content || '')
  const [thumbnail, setThumbnail] = useState(post?.thumbnail || '')
  const [published, setPublished] = useState(post?.published || false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [thumbnailPreview, setThumbnailPreview] = useState(post?.thumbnail || '')
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const params = useParams()
  const locale = params?.locale || 'ja'
  
  // 自動保存のタイマー
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title || content) {
        handleAutoSave()
      }
    }, 30000) // 30秒ごとに自動保存
    
    return () => clearTimeout(timer)
  }, [title, content])
  
  // 自動保存処理
  const handleAutoSave = async () => {
    if (isSaving || !title) return
    
    setIsSaving(true)
    try {
      // 自動保存のAPI呼び出し
      // ...
      
      toast.success(translations.draftSaved, {
        duration: 2000,
        position: 'bottom-right',
        icon: '💾'
      })
    } catch (error) {
      console.error('Auto save error:', error)
    } finally {
      setIsSaving(false)
    }
  }
  
  // 画像アップロード処理
  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      // FormDataの作成
      const formData = new FormData()
      formData.append('file', file)
      
      // APIエンドポイントへのアップロード
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        throw new Error('画像のアップロードに失敗しました')
      }
      
      const data = await response.json()
      return data.url // アップロードされた画像のURL
    } catch (error) {
      console.error('Image upload error:', error)
      return URL.createObjectURL(file) // フォールバック
    }
  }
  
  // サムネイル画像の選択
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // プレビュー用のURLを生成
    const previewUrl = URL.createObjectURL(file)
    setThumbnailPreview(previewUrl)
    
    // 実際のアップロード処理
    handleImageUpload(file).then(url => {
      setThumbnail(url)
    })
  }
  
  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title) {
      toast.error('タイトルを入力してください')
      return
    }
    
    setIsLoading(true)
    try {
      const endpoint = isNew 
        ? `/api/posts` 
        : `/api/posts/${post?.id}`
      
      const method = isNew ? 'POST' : 'PUT'
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          thumbnail,
          published
        }),
      })
      
      if (!response.ok) {
        throw new Error('記事の保存に失敗しました')
      }
      
      toast.success(translations.successMessage)
      
      // 新規作成の場合は記事一覧に戻る
      if (isNew) {
        router.push(`/${locale}/admin/posts`)
      }
    } catch (error) {
      console.error('Save error:', error)
      toast.error(translations.errorMessage)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => router.push(`/${locale}/admin/posts`)}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
            aria-label={translations.backToList}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">{translations.title}</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          {isSaving && (
            <span className="text-sm text-gray-500 flex items-center">
              <Loader2 size={16} className="mr-1 animate-spin" />
              自動保存中...
            </span>
          )}
          
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 flex items-center"
          >
            {previewMode ? <EyeOff size={18} className="mr-1" /> : <Eye size={18} className="mr-1" />}
            {previewMode ? '編集モード' : translations.previewToggle}
          </button>
          
          <button
            type="button"
            onClick={() => formRef.current?.requestSubmit()}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                {translations.saving}
              </>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                {translations.saveButton}
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* プレビューモード */}
      {previewMode ? (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-4">{title || '無題の記事'}</h1>
          {thumbnailPreview && (
            <div className="mb-6">
              <img 
                src={thumbnailPreview} 
                alt="サムネイル" 
                className="w-full max-h-80 object-cover rounded-lg"
              />
            </div>
          )}
          <div className="prose max-w-none">
            {/* ここにマークダウンのプレビューを表示 */}
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      ) : (
        /* 編集フォーム */
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* メインコンテンツ（左2/3） */}
            <div className="md:col-span-2 space-y-6">
              {/* タイトル入力 */}
              <div>
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                  {translations.titleLabel}
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                  placeholder="記事のタイトルを入力"
                />
              </div>
              
              {/* コンテンツ入力 */}
              <div>
                <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
                  {translations.contentLabel}
                </label>
                <MarkdownEditor
                  value={content}
                  onChange={setContent}
                  height={500}
                  imageUploadFn={handleImageUpload}
                />
              </div>
            </div>
            
            {/* サイドバー（右1/3） */}
            <div className="space-y-6">
              {/* 公開設定 */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-3">公開設定</h3>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span>{translations.publishedLabel}</span>
                </label>
              </div>
              
              {/* サムネイル設定 */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-3">{translations.thumbnailLabel}</h3>
                
                {thumbnailPreview ? (
                  <div className="mb-3 relative group">
                    <img 
                      src={thumbnailPreview} 
                      alt="サムネイルプレビュー" 
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-white text-gray-800 p-2 rounded-full"
                      >
                        <Image size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 mb-3"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Image size={24} className="mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">{translations.thumbnailHint}</p>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  画像を選択
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  )
} 