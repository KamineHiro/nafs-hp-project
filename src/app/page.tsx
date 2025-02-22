"use client"

import { motion } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from 'react'

const heroImages = [
  {
    src: "/images/hero/hero1.jpg",
    alt: "NAFSキャンパス外観"
  },
  {
    src: "/images/hero/hero2.jpg",
    alt: "授業風景"
  },
  {
    src: "/images/hero/hero3.jpg",
    alt: "学生生活"
  }
]

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000) // 5秒ごとに画像を切り替え

    return () => clearInterval(timer)
  }, [])

  const features = [
    {
      title: "理念方針",
      description: "「学ぶ」を重んじ、「できる」を叶える",
      icon: "/images/philosophy.svg",
      link: "/about"
    },
    {
      title: "コース紹介",
      description: "進学1年6か月コース、進学2年コース",
      icon: "/images/course.svg",
      link: "/courses"
    },
    {
      title: "自然な日本語",
      description: "自然な日本語というのは何でしょうか",
      icon: "/images/japanese.svg",
      link: "/about"
    }
  ]

  return (
    <main>
      {/* ヒーローセクション */}
      <section className="relative h-[700px]">
        {/* スライダー画像 */}
        {heroImages.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              className="object-cover"
            />
            {/* オーバーレイ */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        {/* タイトルと説明 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
          <div className="relative w-[800px] h-[200px] mb-8">
            <Image
              src="/images/title-logo.png"
              alt="NAFS 日琉国際言語学院"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="text-2xl md:text-3xl text-center max-w-3xl mx-auto px-4 mt-4">
            沖縄から世界へ、世界から沖縄へ
          </p>
        </div>

        {/* スライダーインジケーター */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {features.map((feature, index) => (
              <Link 
                key={index} 
                href={feature.link}
                className="group"
              >
                <div className="bg-white p-8 rounded-lg text-center transition-transform hover:-translate-y-1 relative">
                  <div className="w-16 h-16 mx-auto mb-6 text-primary-color">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={64}
                      height={64}
                      className="text-primary-color"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                  <div className="mt-6 text-primary-color">
                    詳しく見る
                  </div>
                  
                  {/* 区切り線（最後のアイテム以外に表示） */}
                  {index < features.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-2/3 bg-gray-200" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 入学案内セクション */}
      <section className="relative">
        <div className="grid md:grid-cols-2 items-stretch">
          {/* 左側：桜の画像 */}
          <div className="relative h-[600px]">
            <Image
              src="/images/sakura.jpg"
              alt="桜の風景"
              fill
              className="object-cover"
            />
          </div>
          
          {/* 右側：テキストコンテンツ */}
          <div className="space-y-6 bg-[#FFF9E5] p-12">
            <h2 className="text-3xl font-bold">入学案内</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">在留資格「留学」について</h3>
                <p className="text-gray-600 leading-relaxed">
                  海外に居住しており、進学1年6か月コースまたは進学2年コースを申請する学生は、在留資格「留学」（中長期在留資格）の申請が必要となります。1年6か月コースの入学時期は毎年10月、2年コースは毎年4月です。各種留学資料の準備は半年前から始めるのがお勧めです。
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">日本在住の方について</h3>
                <p className="text-gray-600 leading-relaxed">
                  在留資格「留学」の新規申請が不要な方は、既に日本で在留資格「留学」を保持している方、あるいはその他日本での在留資格（例：投資・経営、家族滞在、その他の在留資格）を保持している方を指します。入学時期や問い合わせについては、いつでも学校に問い合わせることができます。
                </p>
              </div>
            </div>

            <Link
              href="/admission"
              className="inline-block bg-[#FFD700] text-black px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-bold"
            >
              詳しく見る
            </Link>
          </div>
        </div>
      </section>

      {/* 学校最新ニュース */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">学校最新ニュース</h2>
          <p className="text-center text-gray-600 mb-12">学校の最新ニュースをたくさん見てください♪</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* ニュースカード1 */}
            <Link href="/news/1" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48">
                  <Image
                    src="/images/news1.jpg"
                    alt="年末パーティー"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">2021年　年末パーティー</h3>
                  <p className="text-gray-600 text-sm">こんにちは、皆さんです(*^▽^*)12月17日は今年...</p>
                </div>
              </div>
            </Link>

            {/* ニュースカード2 */}
            <Link href="/news/2" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48">
                  <Image
                    src="/images/news2.jpg"
                    alt="清掃活動"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">糸満市町端区 定例清掃活動</h3>
                  <p className="text-gray-600 text-sm">こんにちは、皆さんです(*^▽^*)今月の25日に...</p>
                </div>
              </div>
            </Link>

            {/* ニュースカード3 */}
            <Link href="/news/3" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48">
                  <Image
                    src="/images/news3.jpg"
                    alt="JLPT試験"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">JLPT試験 表彰式</h3>
                  <p className="text-gray-600 text-sm">こんにちは、皆さんです(*^▽^*)本日、昨年の12...</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 学校の教職員 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">学校の教職員</h2>
          <p className="text-center text-gray-600 mb-12">笑顔あふれる教職員がたくさんいます。</p>
          
          <div className="grid md:grid-cols-4 gap-8">
            {staffMembers.map((staff, index) => (
              <div key={index} className="text-center">
                <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={staff.image}
                    alt={`${staff.name}先生`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg mb-1">{staff.name}</h3>
                <p className="text-gray-600">{staff.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 紹介動画セクション */}
      <section className="py-20 bg-[#FFF9E5]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">学校紹介動画</h2>
          <p className="text-center text-gray-600 mb-12">日琉国際言語学院の雰囲気をご覧ください</p>
          
          <div className="flex justify-center">
            <div className="relative w-[800px] h-[450px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/idCdOfknmO8"
                title="日琉国際言語学院紹介動画"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ドラゴンボートレースセクション */}
      <section className="relative h-[600px] bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/images/dragon-boat.jpg')" }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl">
            <p className="text-lg leading-relaxed mb-6 text-[#FFD700]">
              学校の所在地糸満市は中国との長い歴史があり、中国と同様に毎年糸満ハーレー（ドラゴンボートレース）が開催されています。伝統的な行事に学生も積極的に参加できるよう努めていります。この活動は伝統文化を継承し、学生のチームワーク精神とスポーツマンシップを養うことを目的とした教育活動の重要な一部であると考えております。
            </p>
            <p className="text-lg leading-relaxed text-[#FFD700]">
              糸満ハーレーは単なるスポーツイベントではなく、文化遺産であり、友情の象徴でもあります。当校は、この活動を通じて学生が地元の文化を体験できることを期待しております。
            </p>
          </div>
        </div>
      </section>
    </main>
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

// 教職員データ
const staffMembers = [
  {
    name: "ゆりえ",
    role: "日本語教師",
    image: "/images/sample.jpg"
  },
  {
    name: "るな",
    role: "日本語教師",
    image: "/images/sample.jpg"
  },
  {
    name: "きんい",
    role: "生活指導",
    image: "/images/sample.jpg"
  },
  {
    name: "あきら",
    role: "事務員",
    image: "/images/sample.jpg"
  },
  {
    name: "しんしん",
    role: "教務主任",
    image: "/images/sample.jpg"
  },
  {
    name: "まこ",
    role: "日本語教師",
    image: "/images/sample.jpg"
  },
  {
    name: "なつき",
    role: "日本語教師",
    image: "/images/sample.jpg"
  },
  {
    name: "れいな",
    role: "生活指導",
    image: "/images/sample.jpg"
  }
]

