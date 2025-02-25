import { getPostBySlug, getPostSlugs } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'

// 静的なパスを生成
export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, '').replace(/^\d+-/, '') // タイムスタンプを除去
  }))
}

export default async function PostPage({
  params
}: {
  params: { slug: string }
}) {
  // タイムスタンプ付きのスラッグを探す
  const allSlugs = getPostSlugs()
  const fullSlug = allSlugs.find(s => s.endsWith(`${params.slug}.md`))
  
  if (!fullSlug) {
    notFound()
  }

  const post = await getPostBySlug(fullSlug.replace(/\.md$/, ''))

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* サムネイル画像 */}
      <div className="relative h-[400px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* 記事コンテンツ */}
      <article className="container mx-auto px-4 py-12 -mt-32 relative">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-2 mb-4">
            {post.categories.map((category: string, index: number) => (
              <span 
                key={index}
                className="px-3 py-1 bg-[#FFD700] text-black text-sm rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
          <time className="text-gray-500 text-sm">{post.date}</time>
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-8">{post.title}</h1>
          <div className="prose max-w-none">
            <ReactMarkdown
              components={{
                p: (props) => {
                  const { node, children } = props as { node: any; children: React.ReactNode }
                  if (node?.children[0]?.type === 'element' && node.children[0].tagName === 'img') {
                    return <>{children}</>
                  }
                  return <p>{children}</p>
                },
                img: ({ src, alt }) => (
                  <div className="relative h-[400px] my-8">
                    <Image
                      src={src || ''}
                      alt={alt || ''}
                      fill
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-contain"
                    />
                  </div>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  )
} 