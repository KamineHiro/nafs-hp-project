declare module '@/messages/*.json' {
  const value: Record<string, string | Record<string, string>>;
  export default value;
} 

type Post = {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  thumbnail?: string;
} 