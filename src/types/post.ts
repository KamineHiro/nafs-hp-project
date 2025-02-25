type Author = {
  name: string;
  image: string;
}

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  categories: string[];
  content: string;
  author: Author;
} 