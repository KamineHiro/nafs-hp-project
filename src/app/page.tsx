"use client"

import { motion } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative h-[600px] md:h-screen overflow-hidden">
        <Image 
          src="/images/community.jpg"
          alt="日琉国際言語学院のキャンパス"
          width={1920}
          height={1080}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent">
          <div className="container mx-auto h-full flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
              NAFS
            </h1>
            <p className="text-xl md:text-3xl font-light tracking-wider animate-fade-in-up-delay">
              日琉国際言語学院
            </p>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            充実した学習環境
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* 特徴1 */}
            <div className="card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 text-primary-color">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">経験豊富な講師陣</h3>
              <p className="text-gray-600">
                日本語教育の専門家が、一人ひとりの学習をサポートします。
              </p>
            </div>

            {/* 特徴2 */}
            <div className="card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 text-primary-color">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">少人数制クラス</h3>
              <p className="text-gray-600">
                きめ細やかな指導を実現する少人数制のクラス編成です。
              </p>
            </div>

            {/* 特徴3 */}
            <div className="card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 text-primary-color">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">充実した生活サポート</h3>
              <p className="text-gray-600">
                住居や生活面でのサポート体制も整っています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-20 bg-gray-50 mb-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            あなたの夢への第一歩を、私たちと共に
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            日本での留学生活を充実したものにするため、私たちがしっかりとサポートします。
          </p>
          <Link
            href="/contact"
            className="btn btn-primary text-lg px-8 py-4 hover:shadow-lg"
          >
            お問い合わせはこちら
          </Link>
        </div>
      </section>
    </div>
  )
}

const activities = [
  {
    title: "環境保全活動",
    description: "沖縄の豊かな自然環境を守り、次世代に継承するための活動を行っています。",
  },
  {
    title: "教育支援",
    description: "持続可能な開発のための教育（ESD）を通じて、未来を担う人材を育成します。",
  },
  {
    title: "地域活性化",
    description: "地域の資源を活かした持続可能な地域づくりを支援しています。",
  },
]

