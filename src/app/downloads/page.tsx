import React from 'react';

const documents = [
  {
    category: '入学資料',
    items: [
      {
        title: '募集要項',
        description: '入学に必要な情報が記載された募集要項です。',
        url: '/documents/admission-guide.pdf'
      }
    ]
  },
  {
    category: '定期報告',
    items: [
      {
        title: '自己点検・評価報告書',
        description: '学校の自己点検および評価に関する報告書です。',
        url: '/documents/self-evaluation.pdf'
      },
      {
        title: '課程修了者の日本語能力習得状況等',
        description: '修了生の日本語能力に関する報告書です。',
        url: '/documents/japanese-proficiency-report.pdf'
      }
    ]
  },
  {
    category: 'パンフレット等',
    items: [
      {
        title: 'パンフレット（日本語・英語）',
        description: '学校案内のパンフレット（日本語・英語版）です。',
        url: '/documents/brochure-jp-en.pdf'
      },
      {
        title: 'パンフレット（日本語・中国語）',
        description: '学校案内のパンフレット（日本語・中国語版）です。',
        url: '/documents/brochure-jp-cn.pdf'
      }
    ]
  }
];

export default function Downloads() {
  return (
    <div className="container mx-auto px-4 pt-20">
      <h1 className="text-3xl font-bold mb-8 gradient-text">書類ダウンロード</h1>

      <div className="space-y-12">
        {documents.map((section, index) => (
          <section key={index} className="card p-8">
            <h2 className="text-2xl font-bold mb-6">{section.category}</h2>
            <div className="grid gap-6">
              {section.items.map((doc, docIndex) => (
                <div 
                  key={docIndex} 
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">{doc.title}</h3>
                      <p className="text-gray-600">{doc.description}</p>
                    </div>
                    <a
                      href={doc.url}
                      className="btn btn-primary flex items-center gap-2"
                      download
                    >
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      ダウンロード
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* 注意事項 */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold mb-4">ダウンロードに関する注意事項</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>各書類はPDF形式でダウンロードできます。</li>
          <li>PDFファイルの閲覧にはAdobe Readerなどのソフトウェアが必要です。</li>
          <li>書類の内容は予告なく変更される場合があります。</li>
        </ul>
      </div>

      {/* お問い合わせ */}
      <div className="text-center mt-12">
        <p className="text-lg mb-4">書類についてご不明な点がございましたら、お気軽にお問い合わせください。</p>
        <a 
          href="/contact" 
          className="btn btn-primary inline-block hover:shadow-lg"
        >
          お問い合わせはこちら
        </a>
      </div>
    </div>
  );
} 