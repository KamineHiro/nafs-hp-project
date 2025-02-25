import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts, type Post } from '@/lib/api'

export default async function News() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/news-hero.jpg"
          alt="最新記事"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">最新記事</h1>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Link href="/" className="text-white hover:text-[#FFD700] transition-colors">
                ホーム
              </Link>
              <span className="text-white">›</span>
              <span className="text-white">最新記事</span>
            </div>
          </div>
        </div>
      </div>

      {/* ニュース一覧 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8">
            {posts.map((post: Post) => (
              <Link 
                key={post.slug}
                href={`/news/${post.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative h-[240px] md:h-auto">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="md:w-2/3 p-6 md:p-8">
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
                    <h2 className="text-2xl font-bold mt-2 mb-4 group-hover:text-[#FFD700] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600">{post.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 