import React from 'react';
import Image from "next/image"
import Link from "next/link"
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"
import { getTranslations, getLocale } from 'next-intl/server'
import { Metadata } from 'next'

// 記事の型定義
type Article = {
  id: string;
  title: string;
  content: string;
  featuredImage: string;
  date: string;
  thumbnail?: string;
};

// サンプル記事データ（APIが利用できない場合のフォールバック）
const sampleArticles = {
  ja: {
    "1": {
      id: "1",
      title: "2021年 年末パーティー",
      content: "こんにちは、皆さんです(*^▽^*)\n\n12月17日は今年の年末パーティーでした。学生たちは楽しい時間を過ごしました。様々な国からの留学生が集まり、それぞれの文化を紹介し合いました。\n\n日本の伝統的なゲームや食べ物も楽しみました。来年もさらに充実した学校生活を送りましょう！",
      featuredImage: "/images/news/sample.jpg",
      date: "2021-12-20"
    },
    "2": {
      id: "2",
      title: "糸満市町端区 定例清掃活動",
      content: "こんにちは、皆さんです(*^▽^*)\n\n今月の25日に糸満市町端区の定例清掃活動に参加しました。学生たちは地域の方々と一緒にゴミ拾いや草むしりを行いました。\n\n地域との交流を深めることができ、とても有意義な時間でした。これからも地域の一員として積極的に活動していきます。",
      featuredImage: "/images/news/sample.jpg",
      date: "2021-11-27"
    },
    "3": {
      id: "3",
      title: "2021年度 第2回日本語能力試験",
      content: "こんにちは、皆さんです(*^▽^*)\n\n12月5日に2021年度第2回日本語能力試験が行われました。本校からも多くの学生が受験しました。\n\n試験に向けて一生懸命勉強してきた成果を発揮できたことと思います。結果発表が楽しみですね。次回の試験に向けても引き続き頑張りましょう！",
      featuredImage: "/images/news/sample.jpg",
      date: "2021-12-07"
    }
  },
  en: {
    "1": {
      id: "1",
      title: "2021 Year-End Party",
      content: "Hello everyone (*^▽^*)\n\nDecember 17th was this year's year-end party. Students had a great time. International students from various countries gathered and introduced their cultures to each other.\n\nWe also enjoyed traditional Japanese games and food. Let's have an even more fulfilling school life next year!",
      featuredImage: "/images/news/sample.jpg",
      date: "2021-12-20"
    },
    "2": {
      id: "2",
      title: "Itoman City Regular Cleaning Activity",
      content: "Hello everyone (*^▽^*)\n\nOn the 25th of this month, we participated in the regular cleaning activity in Itoman City. Students picked up trash and pulled weeds together with local residents.\n\nIt was a very meaningful time to deepen our interaction with the community. We will continue to actively participate as members of the community.",
      featuredImage: "/images/news/sample.jpg",
      date: "2021-11-27"
    },
    "3": {
      id: "3",
      title: "2021 JLPT Second Examination",
      content: "Hello everyone (*^▽^*)\n\nOn December 5th, the second Japanese Language Proficiency Test of 2021 was held. Many students from our school took the exam.\n\nI believe they were able to demonstrate the results of their hard work studying for the exam. We look forward to the results. Let's continue to work hard for the next exam!",
      featuredImage: "/images/news/sample.jpg",
      date: "2021-12-07"
    }
  },
  zh: {
    "1": {
      id: "1",
      title: "2021年 年终派对",
      content: "大家好 (*^▽^*)\n\n12月17日是今年的年终派对。学生们度过了愉快的时光。来自各国的留学生聚集在一起，相互介绍各自的文化。\n\n我们还享受了传统的日本游戏和食物。明年让我们的学校生活更加充实！",
      featuredImage: "/images/news/sample.jpg",
      date: "2021-12-20"
    },
    "2": {
      id: "2",
      title: "糸满市定期清扫活动",
      content: "大家好 (*^▽^*)\n\n本月25日，我们参加了糸满市的定期清扫活动。学生们与当地居民一起捡垃圾、除草。\n\n这是一段非常有意义的时间，加深了我们与社区的互动。我们将继续作为社区的一员积极参与。",
      featuredImage: "/images/news/sample.jpg",
      date: "2021-11-27"
    },
    "3": {
      id: "3",
      title: "2021年度 第二次日语能力考试",
      content: "大家好 (*^▽^*)\n\n12月5日举行了2021年度第二次日语能力考试。我校有许多学生参加了考试。\n\n相信他们能够展示出为考试努力学习的成果。我们期待着结果。让我们继续为下次考试努力！",
      featuredImage: "/images/news/sample.jpg",
      date: "2021-12-07"
    }
  }
};

// 記事内容の処理を追加
const processContent = (content: string) => {
  // まず、HTMLの<img>タグに width と height 属性を追加
  let processedContent = content.replace(
    /<img\s+src="([^"]+)"([^>]*)>/g, 
    '<img src="$1" width="800" height="auto" $2>'
  );
  
  // 次に、マークダウン形式の画像を<img>タグに変換
  processedContent = processedContent.replace(
    /!\[(.*?)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" width="800" height="auto" />'
  );
  
  return processedContent;
};

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    // サーバーとクライアントで一貫した形式を使用
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC' // タイムゾーンを固定
    }).format(date);
  } catch (e) {
    console.error('Date formatting error:', e);
    return dateString;
  }
};

// Next.js 15.1.7に対応した型定義
type Params = Promise<{ id: string; locale: string }>;

// メタデータ生成関数を修正
export async function generateMetadata({ 
  params 
}: { 
  params: Params 
}): Promise<Metadata> {
  const { id, locale } = await params;
  
  // サンプルデータからタイトルを取得
  const localeSamples = sampleArticles[locale as keyof typeof sampleArticles] || sampleArticles.ja;
  const article = localeSamples[id as keyof typeof localeSamples];
  
  return {
    title: article ? article.title : `記事 ${id}`,
    description: article ? article.content.substring(0, 160) : '記事の詳細'
  };
}

// ページコンポーネントを修正
export default async function ArticlePage({ 
  params 
}: { 
  params: Params 
}) {
  const { id } = await params;
  const t = await getTranslations('news');
  const locale = await getLocale();
  
  // APIからデータを取得
  let article: Article | null = null;
  let error: string | null = null;
  
  try {
    // サーバーサイドでデータ取得
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/posts/${id}?locale=${locale}`, { next: { revalidate: 60 } });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    article = await response.json();
  } catch (err) {
    console.error('Failed to fetch article:', err);
    // エラー時はサンプルデータを使用
    const localeSamples = sampleArticles[locale as keyof typeof sampleArticles] || sampleArticles.ja;
    article = localeSamples[id as keyof typeof localeSamples] || null;
    
    if (!article) {
      error = t('errorMessage');
    }
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || t('errorMessage')}</p>
          <Link 
            href={`/${locale}/news`}
            className="inline-block bg-primary-color text-white px-6 py-2 rounded-lg"
          >
            {t('backToNewsList')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* ヘッダー画像 */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src={article.featuredImage || "/images/news/placeholder.jpg"}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            <p>{t('publishedOn', { date: formatDate(article.date) })}</p>
            <div className="mt-6">
              <Breadcrumb 
                items={[
                  { label: t('hero.breadcrumb'), href: `/${locale}/news` },
                  { label: article.title, href: `/${locale}/news/${id}` }
                ]} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* 記事内容 */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {article.thumbnail && (
            <div className="mb-8">
              <Image
                src={article.thumbnail}
                alt={article.title}
                width={800}
                height={450}
                className="w-full rounded-lg object-cover"
              />
            </div>
          )}
          
          <div className="prose prose-lg mx-auto">
            <div dangerouslySetInnerHTML={{ __html: processContent(article.content) }} />
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href={`/${locale}/news`}
              className="inline-block bg-primary-color text-white px-6 py-2 rounded-lg hover:bg-primary-color/90 transition-colors"
            >
              {t('backToNewsList')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 