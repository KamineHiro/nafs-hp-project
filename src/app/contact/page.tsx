import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* ヘッダー画像 */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/contact-hero.jpg"
          alt="お問い合わせ"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">お問い合わせ</h1>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Link href="/" className="hover:text-primary-color transition-colors">
                ホーム
              </Link>
              <span>›</span>
              <span>お問い合わせ</span>
            </div>
          </div>
        </div>
      </div>

      {/* アクセス情報セクション */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">アクセス情報</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {/* 住所 */}
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-[#FFD700]">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">住所</h3>
              <p className="text-gray-600">〒901-0361</p>
              <p className="text-gray-600">沖縄県糸満市糸満606-2</p>
            </div>

            {/* 営業時間 */}
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-[#FFD700]">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">営業時間</h3>
              <p className="text-gray-600">月〜金：8:30 - 17:30</p>
              <p className="text-gray-600">土日祝休み</p>
            </div>

            {/* 電話番号とFAX */}
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-[#FFD700]">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">電話番号 & FAX</h3>
              <p className="text-gray-600">TEL: 098-851-8266</p>
              <p className="text-gray-600">FAX: 098-851-8268</p>
            </div>
          </div>

          {/* Google Maps */}
          <div className="aspect-w-16 aspect-h-9 max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.8876368!2d127.66900699999999!3d26.129405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34e56bd8b45d0c63%3A0x4e4d0e5e58c5c0c0!2z5pel55Sw5Zu96Zqb6KiY6K235bCC!5e0!3m2!1sja!2sjp!4v1709705844630!5m2!1sja!2sjp"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="text-center mt-8 text-gray-600">
            <p>那覇空港から車で20分です。</p>
          </div>
        </div>
      </section>

      {/* お問い合わせフォーム */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">メールでのお問い合わせ</h2>
              <p className="text-gray-600 mb-2">（24時間受付）</p>
              <p className="text-gray-600">
                お問い合わせについては以下のフォームより承っております。<br />
                お手数ですが、ご入力のうえ確認画面へお進みください。<br />
                <span className="text-red-500">*</span>は必ずご入力をお願いいたします。
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="subject">
                    件名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
                    お問い合わせ内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent resize-none"
                    required
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-[#FFD700] text-black px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-bold inline-flex items-center"
                  >
                    送信する
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 