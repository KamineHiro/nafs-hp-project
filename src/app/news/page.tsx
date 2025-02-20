import React from 'react';

export default function News() {
  return (
    <div className="container mx-auto px-4 pt-20">
      <h1 className="text-3xl font-bold mb-8">最新記事</h1>
      <div className="space-y-6">
        {newsItems.map((item, index) => (
          <article key={index} className="border-b pb-6">
            <time className="text-gray-500">{item.date}</time>
            <h2 className="text-xl font-bold mt-2 mb-3">{item.title}</h2>
            <p className="text-gray-600">{item.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

const newsItems = [
  {
    date: '2024.03.20',
    title: '春期講座の受付開始',
    excerpt: '2024年春期講座の受付を開始しました。',
  },
  {
    date: '2024.03.15',
    title: '新規コース開設のお知らせ',
    excerpt: '新たにビジネス英語コースを開設します。',
  },
]; 