"use client"

import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { FileDown } from 'lucide-react'

const downloadCategories = [
  {
    title: "入学資料",
    icon: "/images/downloads/admission-icon.svg",
    items: [
      {
        name: "募集要項（日本語）",
        path: "/documents/admission/requirements.pdf",
        size: "2.1 MB",
        format: "PDF"
      }
    ]
  },
  {
    title: "定期報告",
    icon: "/images/downloads/report-icon.svg",
    items: [
      {
        name: "自己点検・評価報告書（2023年度）",
        path: "/documents/reports/self-evaluation.pdf",
        size: "1.8 MB",
        format: "PDF"
      },
      {
        name: "日本語能力判定状況（2023年度）",
        path: "/documents/reports/japanese-ability.pdf",
        size: "1.2 MB",
        format: "PDF"
      }
    ]
  },
  {
    title: "パンフレット等",
    icon: "/images/downloads/pamphlet-icon.svg",
    items: [
      {
        name: "学校案内（日本語・英語）",
        path: "/documents/pamphlets/pamphlet-en.pdf",
        size: "3.5 MB",
        format: "PDF"
      },
      {
        name: "学校案内（日本語・中国語）",
        path: "/documents/pamphlets/pamphlet-cn.pdf",
        size: "3.5 MB",
        format: "PDF"
      }
    ]
  }
]

export default function DownloadsClient() {
  return (
    <div className="min-h-screen">
      {/* ヘッダー画像 */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/downloads/downloads-hero.jpg"
          alt="書類ダウンロード"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">書類ダウンロード</h1>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Link href="/" className="text-white hover:text-[#FFD700] transition-colors">
                ホーム
              </Link>
              <span className="text-white">›</span>
              <span className="text-white">書類ダウンロード</span>
            </div>
          </div>
        </div>
      </div>

      {/* ダウンロードセクション */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {downloadCategories.map((category, index) => (
              <div key={index} className="text-center">
                <div className="mb-6">
                  <Image
                    src={category.icon}
                    alt={category.title}
                    width={64}
                    height={64}
                    className="mx-auto text-[#FFD700]"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      href={item.path}
                      className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-gray-50 text-gray-600"
                    >
                      <span className="flex items-center justify-between">
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          {item.name}
                        </span>
                        <span className="text-sm text-gray-400">
                          {item.size} • {item.format}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 注意書きセクション */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-16 max-w-4xl mx-auto">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FileDown className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  ダウンロードについて
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>• クリックすると自動的にPDFファイルがダウンロードされます。</p>
                  <p>• ファイルの閲覧にはPDFリーダーが必要です。</p>
                  <p>• 書類の印刷は、A4サイズ・カラーでお願いいたします。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}