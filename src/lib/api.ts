import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import type { Post } from '@/types/post'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs.readdirSync(postsDirectory)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // デフォルトの投稿者情報
    const defaultAuthor = {
      name: 'レイナ',
      image: '/images/home/staff/sample.jpg'
    }

    return {
      slug: slug.replace(/\.md$/, ''),
      title: data.title,
      date: data.date,
      coverImage: data.coverImage,
      excerpt: data.excerpt,
      categories: data.categories,
      author: data.author || defaultAuthor,  // 投稿者情報がない場合はデフォルト値を使用
      content,
    }
  } catch (error) {
    console.error('Error reading post:', error)
    return null
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs()
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const cleanSlug = slug.replace(/\.md$/, '')
      const post = await getPostBySlug(cleanSlug)
      return post
    })
  )

  return posts
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .sort((post1, post2) => 
      new Date(post2.date).getTime() - new Date(post1.date).getTime()
    )
}

export type { Post } from '@/types/post'  // Postタイプをre-export 