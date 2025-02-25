import { getPostBySlug, getPostSlugs } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import type { Metadata, ResolvingMetadata } from 'next'

// 型定義を更新
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// generateStaticParamsの戻り値の型を明示的に指定
export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, '').replace(/^\d+-/, '')
  }))
}

// generateMetadataの型を修正
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // paramsを解決
  const slug = (await params).slug
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  // 親のメタデータを取得
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${post.title} | NAFS`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/news/${slug}`,
      siteName: "NAFS",
      images: [
        {
          url: post.coverImage || "/images/news/news-hero.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
        ...previousImages
      ],
      type: "article",
    },
  }
}

export default async function PostPage({ params }: Props) {
  // paramsを解決
  const slug = (await params).slug
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <div className="relative h-[700px] overflow-hidden">
        <Image
          src="/images/news/news-hero.jpg"
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover"
          priority
          quality={75}
        />
        <div className="absolute inset-0 bg-black/60">
          <div className="container mx-auto px-4 h-full">
            <div className="flex flex-col justify-center h-full max-w-4xl">
              {/* 投稿メタ情報 */}
              <div className="flex items-center gap-4 text-white/80 mb-4">
                <div className="flex items-center gap-2">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span>{post.author.name}</span>
                </div>
                <span>/</span>
                <time>{post.date}</time>
                <span>/</span>
                <div className="flex items-center gap-2">
                  {post.categories.map((category: string, index: number) => (
                    <span key={index} className="bg-[#FFD700] text-black px-3 py-1 rounded-full text-sm">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              {/* タイトル */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              {/* パンくず */}
              <div className="flex items-center space-x-2 text-sm text-white/80">
                <Link href="/" className="hover:text-[#FFD700] transition-colors">
                  ホーム
                </Link>
                <span>›</span>
                <Link href="/news" className="hover:text-[#FFD700] transition-colors">
                  最新記事
                </Link>
                <span>›</span>
                <span>{post.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 記事本文 */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg max-w-4xl mx-auto">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  )
}