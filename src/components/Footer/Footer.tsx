import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 学校について */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">日琉国際言語学院について</h3>
            <p className="text-sm mb-4">
              日本最南端の日本語学校で自然な日本語を学ぶ
            </p>
            <div className="space-y-2">
              <p className="text-sm">設置主体：株式会社 日琉国際言語学院（日本語教育機関）</p>
              <p className="text-sm">代表取締役：リ タンキ</p>
              <p className="text-sm">学校理念：「学ぶ」を重んじ、「できる」を叶える</p>
            </div>
          </div>

          {/* その他言語 */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">その他言語</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ja" className="text-sm hover:text-white transition-colors">
                  日本語
                </Link>
              </li>
              <li>
                <Link href="/en" className="text-sm hover:text-white transition-colors">
                  English
                </Link>
              </li>
              <li>
                <Link href="/zh" className="text-sm hover:text-white transition-colors">
                  简体中文
                </Link>
              </li>
            </ul>

            <h3 className="text-white text-lg font-bold mt-8 mb-4">関連リンク</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-white transition-colors">
                  学校について
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="text-sm hover:text-white transition-colors">
                  告示された日本語教育機関リスト
                </Link>
              </li>
            </ul>
          </div>

          {/* 連絡先 */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">連絡先</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">住所：糸満市字糸満６０６番地の２</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm">TEL：098-851-8266</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span className="text-sm">FAX：098-851-8268</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">Email：info@nafs.okinawa</span>
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm">Copyright © 2017 - {new Date().getFullYear()} 日琉国際言語学院</p>
        </div>
      </div>
    </footer>
  )
} 