import { redirect } from 'next/navigation';

// ルートページにアクセスした場合、デフォルト言語にリダイレクト
export default function RootPage() {
  redirect('/ja');
}

