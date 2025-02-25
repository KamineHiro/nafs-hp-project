type Author = {
  name: string;
  image: string;
}

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  image?: string;
  date: string;
  categories: string[];
  content: string;
  author: Author;
} 