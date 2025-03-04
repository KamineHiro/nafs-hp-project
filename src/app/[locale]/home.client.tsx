"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { ArrowRight } from "lucide-react"
import { useTranslations } from 'next-intl'

// heroImagesをここで定義しない！

type HomeClientProps = {
  locale: string;
}

export default function HomeClient({ locale }: HomeClientProps) {
  const [mounted, setMounted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // 翻訳の取得
  const t = useTranslations('home')
  
  // ヒーロー画像
  const heroImages = [
    {
      src: "/images/home/hero1.jpg",
      alt: "NAFS Campus"
    },
    {
      src: "/images/home/hero2.jpg",
      alt: "Classroom Scene"
    },
    {
      src: "/images/home/hero3.jpg",
      alt: "Student Life"
    }
  ]
  
  // スライダーの自動切り替え - すべてのフックをここでまとめて宣言
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000)

    return () => clearInterval(timer)
  }, [heroImages.length]) // 依存配列を修正

  // マウント後にのみレンダリング
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const features = [
    {
      title: t('features.0.title'),
      description: t('features.0.description'),
      image: t('features.0.image'),
      alt: t('features.0.alt'),
      link: `/${locale}/about`
    },
    {
      title: t('features.1.title'),
      description: t('features.1.description'),
      image: t('features.1.image'),
      alt: t('features.1.alt'),
      link: `/${locale}/courses`
    },
    {
      title: t('features.2.title'),
      description: t('features.2.description'),
      image: t('features.2.image'),
      alt: t('features.2.alt'),
      link: `/${locale}/about`
    }
  ]

  // ニュースアイテム
  const newsItems = [
    {
      title: t('news.items.0.title'),
      description: t('news.items.0.description'),
      image: t('news.items.0.image') || '/images/home/sample.jpg',
      link: `/${locale}/news/1`
    },
    {
      title: t('news.items.1.title'),
      description: t('news.items.1.description'),
      image: t('news.items.1.image') || '/images/home/sample.jpg',
      link: `/${locale}/news/2`
    },
    {
      title: t('news.items.2.title'),
      description: t('news.items.2.description'),
      image: t('news.items.2.image') || '/images/home/sample.jpg',
      link: `/${locale}/news/3`
    }
  ]
  
  if (!mounted) {
    return <div className="min-h-screen"></div>
  }


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
          <div className="relative w-full max-w-[90vh] h-[200px] mb-8">
            <Image
              src="/images/home/title-logo.png"
              alt="NAFS 日琉国際言語学院"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="text-2xl md:text-3xl text-center max-w-3xl mx-auto px-4 mt-4">
            {t('hero.subtitle')}
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
                  <div className="w-24 h-24 mx-auto mb-6 relative">
                    <Image
                      src={feature.image}
                      alt={feature.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                  <div className="mt-6 text-primary-color">
                    {t('readMore')}
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
              src="/images/home/sakura.jpg"
              alt="桜の風景"
              fill
              className="object-cover"
            />
          </div>
          
          {/* 右側：テキストコンテンツ */}
          <div className="space-y-6 bg-[#FFF9E5] p-12">
            <h2 className="text-3xl font-bold">{t('admission.title')}</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">{t('admission.visa.title')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('admission.visa.description')}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">{t('admission.residents.title')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('admission.residents.description')}
                </p>
              </div>
            </div>

            <Link
              href={`/${locale}/admission`}
              className="inline-block bg-[#FFD700] text-black px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-bold"
            >
              {t('readMore')}
            </Link>
          </div>
        </div>
      </section>

      {/* 学校最新ニュース */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">{t('news.title')}</h2>
          <p className="text-center text-gray-600 mb-12">{t('news.description')}</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  <Link
                    href={item.link}
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    {t('readMore')} <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 学校の教職員 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">{t('staff.title')}</h2>
          <p className="text-center text-gray-600 mb-12">{t('staff.subtitle')}</p>
          
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
          <h2 className="text-3xl font-bold text-center mb-4">{t('video.title')}</h2>
          <p className="text-center text-gray-600 mb-12">{t('video.subtitle')}</p>
          
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
      <section className="relative h-[600px] bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/images/home/dragon-boat.jpg')" }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl">
            <p className="text-lg leading-relaxed mb-6 text-[#FFD700]">
              {t('dragonboat.description1')}
            </p>
            <p className="text-lg leading-relaxed text-[#FFD700]">
              {t('dragonboat.description2')}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

// 教職員データ
const staffMembers = [
  {
    name: "ゆりえ",
    role: "日本語教師",
    image: "/images/home/staff/sample.jpg"
  },
  {
    name: "るな",
    role: "日本語教師",
    image: "/images/home/staff/sample.jpg"
  },
  {
    name: "きんい",
    role: "生活指導",
    image: "/images/home/staff/sample.jpg"
  },
  {
    name: "あきら",
    role: "事務員",
    image: "/images/home/staff/sample.jpg"
  },
  {
    name: "しんしん",
    role: "教務主任",
    image: "/images/home/staff/sample.jpg"
  },
  {
    name: "まこ",
    role: "日本語教師",
    image: "/images/home/staff/sample.jpg"
  },
  {
    name: "なつき",
    role: "日本語教師",
    image: "/images/home/staff/sample.jpg"
  },
  {
    name: "れいな",
    role: "生活指導",
    image: "/images/home/staff/sample.jpg"
  }
] 