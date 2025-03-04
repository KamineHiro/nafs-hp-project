"use client"

import React, { useState, useEffect } from 'react';
import Image from "next/image"
import Link from "next/link"
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"
import { useTranslations, useLocale } from 'next-intl'

// 記事の型定義
type Article = {
  id: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  date: string;
};

// サンプル記事データ
const sampleArticles = {
  ja: [
    {
      id: "1",
      title: "2021年 年末パーティー",
      excerpt: "こんにちは、皆さんです(*^▽^*)12月17日は今年の年末パーティーでした。学生たちは楽しい時間を過ごしました。",
      featuredImage: "/images/news/news1.jpg",
      date: "2021-12-20"
    },
    // ... other articles ...
  ],
  // ... other languages ...
};

export default function NewsClient() {
  const t = useTranslations('news');
  const locale = useLocale();
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const response = await fetch(`/api/posts?locale=${locale}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          setArticles(data);
          setError(null);
        } else {
          const localeSamples = sampleArticles[locale as keyof typeof sampleArticles] || sampleArticles.ja;
          setArticles(localeSamples);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to fetch articles:', err);
        const localeSamples = sampleArticles[locale as keyof typeof sampleArticles] || sampleArticles.ja;
        setArticles(localeSamples);
        setError(null);
      } finally {
        setLoading(false);
      }
    }
    
    fetchArticles();
  }, [locale, t]);

  return (
    <div className="min-h-screen">
      {/* ヘッダー画像 */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/news/news-hero.jpg"
          alt={t('hero.title')}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('hero.title')}</h1>
            <Breadcrumb currentPage={t('hero.breadcrumb')} />
          </div>
        </div>
      </div>

      {/* 記事一覧 */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">{t('pageTitle')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('pageDescription')}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <p>{t('loadingMessage')}</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            <p>{error}</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-10">
            <p>{t('noArticlesMessage')}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link href={`/${locale}/news/${article.id}`} className="group" key={article.id}>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image
                      src={article.featuredImage || "/images/news/sample.jpg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-gray-500 text-sm mb-2">{article.date}</p>
                    <h3 className="font-bold text-xl mb-2 group-hover:text-primary-color transition-colors">{article.title}</h3>
                    <p className="text-gray-600 text-sm">{article.excerpt}</p>
                    <div className="mt-4 text-primary-color font-medium group-hover:underline">
                      {t('readMore')}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 