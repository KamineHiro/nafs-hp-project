"use client"

import React, { useState, useEffect } from 'react';
import Image from "next/image"
import Link from "next/link"
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"
import { useTranslations, useLocale } from 'next-intl'

export default function CoursesClient() {
  const t = useTranslations('courses');
  const locale = useLocale();
  
  const [courses, setCourses] = useState<{
    id: string;
    title: string;
    description: string;
    details?: string;
  }[]>([]);

  useEffect(() => {
    try {
      const courseData = t.raw('courseList');
      if (Array.isArray(courseData)) {
        setCourses(courseData);
      }
    } catch (error) {
      console.error('Failed to load course data:', error);
    }
  }, [t]);

  return (
    <div className="min-h-screen">
      {/* ヘッダー画像 */}
      <div className="relative h-[700px] overflow-hidden">
        <Image
          src="/images/course/courses-hero.jpg"
          alt={t('hero.title')}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('hero.title')}</h1>
            <Breadcrumb currentPage={t('hero.breadcrumb')} />
          </div>
        </div>
      </div>

      {/* コース紹介 */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">{t('intro.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('intro.description')}
          </p>
        </div>

        {courses && courses.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={course.id} className="card p-8 text-center hover:translate-y-[-4px] transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-6">
                  <Image
                    src={index === 2 
                      ? "/images/course/private-lesson.jpg" 
                      : `/images/course/desk-study${index + 1}.jpg`}
                    alt={course.title}
                    width={80}
                    height={80}
                    className="text-primary-color"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                <p className="text-gray-600 mb-6">{course.description}</p>
                <Link
                  href={`/${locale}/courses/${course.id}`}
                  className="inline-block bg-primary-color text-white px-6 py-2 rounded-lg hover:bg-primary-color/90 transition-colors"
                >
                  {t('readMore')}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">コース情報を読み込み中...</p>
        )}
      </div>

      {/* お問い合わせセクション */}
      <section className="py-20 bg-gray-50 mb-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="btn btn-primary text-lg px-8 py-4 hover:shadow-lg"
          >
            {t('contact.button')}
          </Link>
        </div>
      </section>
    </div>
  );
} 