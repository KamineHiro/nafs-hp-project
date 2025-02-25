import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts')

export type Post = {
  slug: string
  title: string
  date: string
  coverImage: string
  excerpt: string
  categories: string[]
  content: string
}

export function getPostSlugs() {
  try {
    return fs.readdirSync(postsDirectory)
  } catch (error) {
    return []
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const fullPath = join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: data.date,
      coverImage: data.coverImage,
      excerpt: data.excerpt,
      categories: data.categories,
      content,
    }
  } catch (error) {
    return null
  }
}

export async function getAllPosts() {
  const slugs = getPostSlugs()
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug)
      return post
    })
  )

  // nullを除外し、日付でソート
  return posts
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .sort((post1, post2) => 
      new Date(post2.date).getTime() - new Date(post1.date).getTime()
    )
} 