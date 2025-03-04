import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* サイドバー */}
      <div className="bg-gray-800 text-white w-full md:w-64 flex-shrink-0 pt-12">
        <div className="p-4 border-b border-gray-700">
          <Link href="/admin/dashboard" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="日琉国際言語学院"
              width={150}
              height={40}
              className="invert"
            />
          </Link>
          <p className="text-sm text-gray-400 mt-2">管理者パネル</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                href="/admin/dashboard" 
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                ダッシュボード
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/posts" 
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                最新記事
              </Link>
            </li>
            {/* 他のナビゲーションリンクをここに追加 */}
          </ul>
        </nav>
      </div>
      
      {/* メインコンテンツ */}
      <div className="flex-grow bg-gray-100">
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">管理者パネル</h1>
            <Link 
              href="/"
              className="text-sm text-primary-color hover:underline"
              target="_blank"
            >
              サイトを表示
            </Link>
          </div>
        </header>
        
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  )
} 