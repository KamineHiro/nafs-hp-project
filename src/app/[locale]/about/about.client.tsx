"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"

// 学校の歴史データ
const history = [
  {
    year: '2022年',
    events: [
      {
        title: '日琉国際言語学院 設立',
        description: '沖縄県糸満市に日本語教育機関として設立',
        image: '/images/about/history/sample.jpg'
      }
    ]
  },
  {
    year: '2023年',
    events: [
      {
        title: '第一期生入学',
        description: '第一期生として10カ国から40名の留学生を迎える',
        image: '/images/about/history/sample.jpg'
      },
      {
        title: 'JLPT N2全員合格達成',
        description: '第一期生全員がJLPT N2に合格という快挙を達成',
        image: '/images/about/history/sample.jpg'
      }
    ]
  },
  {
    year: '2024年',
    events: [
      {
        title: '新校舎完成',
        description: '増加する学生に対応するため、新校舎が完成',
        image: '/images/about/history/sample.jpg'
      }
    ]
  }
];

export default function AboutClient() {
  return (
    <div className="min-h-screen">
      {/* ヘッダー画像 */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/about/about-hero.jpg"
          alt="学校概要"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">学校概要</h1>
            <Breadcrumb currentPage="学校概要" />
          </div>
        </div>
      </div>

      {/* 学校情報セクション */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">学校情報</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                <div className="grid grid-cols-3 p-4">
                  <div className="font-bold">学校名</div>
                  <div className="col-span-2">日本アジア福祉専門学校</div>
                </div>
                <div className="grid grid-cols-3 p-4">
                  <div className="font-bold">所在地</div>
                  <div className="col-span-2">
                    〒901-0361<br />
                    沖縄県糸満市糸満606-2
                  </div>
                </div>
                <div className="grid grid-cols-3 p-4">
                  <div className="font-bold">設立年月日</div>
                  <div className="col-span-2">2024年4月1日</div>
                </div>
                <div className="grid grid-cols-3 p-4">
                  <div className="font-bold">理事長</div>
                  <div className="col-span-2">赤嶺 幸子</div>
                </div>
                <div className="grid grid-cols-3 p-4">
                  <div className="font-bold">学校長</div>
                  <div className="col-span-2">赤嶺 幸子</div>
                </div>
                <div className="grid grid-cols-3 p-4">
                  <div className="font-bold">連絡先</div>
                  <div className="col-span-2">
                    TEL: 098-851-8266<br />
                    FAX: 098-851-8268
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 施設・設備セクション */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">施設・設備</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 教室 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/about/classroom.jpg"
                  alt="教室"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">教室</h3>
                <p className="text-gray-600">
                  最新の設備を備えた快適な学習環境を提供しています。
                </p>
              </div>
            </div>

            {/* 図書室 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/about/library.jpg"
                  alt="図書室"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">図書室</h3>
                <p className="text-gray-600">
                  日本語学習に役立つ書籍を多数取り揃えています。
                </p>
              </div>
            </div>

            {/* 学生ラウンジ */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/about/lounge.jpg"
                  alt="学生ラウンジ"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">学生ラウンジ</h3>
                <p className="text-gray-600">
                  休憩や交流のためのくつろぎスペースを用意しています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 沿革セクション */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">沿革</h2>
          <div className="max-w-4xl mx-auto">
            {history.map((period, index) => (
              <div key={index} className="mb-12">
                <h3 className="text-2xl font-bold mb-6">{period.year}</h3>
                <div className="space-y-8">
                  {period.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="flex items-start space-x-6">
                      <div className="relative w-32 h-24 flex-shrink-0">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 