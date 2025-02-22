import { getPostBySlug } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function PostPage({
  params
}: {
  params: { slug: string }
}) {
  try {
    const post = await getPostBySlug(params.slug)

    return (
      <div className="min-h-screen">
        {/* ヒーロー画像 */}
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
              {post.content}
            </div>
          </div>
        </article>
      </div>
    )
  } catch (error) {
    notFound()
  }
} 