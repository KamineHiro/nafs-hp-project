import React from 'react';
import Image from "next/image"
import Link from "next/link"

const courses = [
  {
    id: "advanced-2year",
    title: "進学2年コース",
    icon: "/images/desk-study.jpg",
    description: "初級から丁寧に学び、日本語の基礎から応用までじっくり学べます。",
    details: "初級からしっかり学び、日本語熟達者を目指します。"
  },
  {
    id: "advanced-1.5year",
    title: "進学1年6か月コース",
    icon: "/images/desk-study.jpg",
    description: "短期間で上級レベルを目指したい方向けのコースです。",
    details: "初級からしっかり学び、日本語熟達者を目指します。"
  },
  {
    id: "private",
    title: "プライベートレッスン",
    icon: "/images/private-lesson.jpg",
    description: "自分のペースで自由に日本語を勉強することができます。",
    details: "自分のペースで自由に日本語を勉強することができます。"
  }
]

export default function Courses() {
  return (
    <div className="min-h-screen">
      {/* ヘッダー画像 */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/classroom.jpg"
          alt="教室の様子"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">コース</h1>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Link href="/" className="hover:text-primary-color transition-colors">
                ホーム
              </Link>
              <span>›</span>
              <span>コース</span>
            </div>
          </div>
        </div>
      </div>

      {/* コース紹介 */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">コース紹介</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            本校には日本の専門学校、大学、大学院への進学を目指す進学コースとプライベートレッスンがございます。プライベートレッスンは学生の要望に合わせて授業時間を自由に調整できます。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="card p-8 text-center hover:translate-y-[-4px] transition-all duration-300">
              <div className="w-20 h-20 mx-auto mb-6">
                <Image
                  src={course.icon}
                  alt={course.title}
                  width={80}
                  height={80}
                  className="text-primary-color"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">{course.title}</h3>
              <p className="text-gray-600 mb-6">{course.description}</p>
              <Link
                href={`/courses/${course.id}`}
                className="inline-block bg-primary-color text-white px-6 py-2 rounded-lg hover:bg-primary-color/90 transition-colors"
              >
                詳しく見る
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* お問い合わせセクション */}
      <section className="py-20 bg-gray-50 mb-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            コースについて詳しく知りたい方へ
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            各コースの詳細や入学手続きについて、お気軽にお問い合わせください。
          </p>
          <Link
            href="/contact"
            className="btn btn-primary text-lg px-8 py-4 hover:shadow-lg"
          >
            お問い合わせはこちら
          </Link>
        </div>
      </section>
    </div>
  )
} 