"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"

const admissionSteps = [
    {
        step: 1,
        title: "お問合せ & 申し込み",
        description: "入学願書と必要書類を提出していただきます。",
        icon: "/images/admission/contact.svg"
    },
    {
        step: 2,
        title: "出願書類準備",
        description: "パスポートや証明写真など、必要な書類を準備します。",
        icon: "/images/admission/document.svg"
    },
    {
        step: 3,
        title: "出入国在留管理庁へ書類を提出",
        description: "学校が入国管理局に在留資格認定証明書の交付申請を行います。",
        icon: "/images/admission/submit.svg"
    },
    {
        step: 4,
        title: "出入国在留管理庁による書類審査",
        description: "入国管理局での審査には約2～3ヶ月かかります。",
        icon: "/images/admission/review.svg"
    },
    {
        step: 5,
        title: "審査結果発表",
        description: "在留資格認定証明書が交付されます。",
        icon: "/images/admission/result.svg"
    },
    {
        step: 6,
        title: "学費納付",
        description: "指定された期間内に学費をお支払いください。",
        icon: "/images/admission/payment.svg"
    },
    {
        step: 7,
        title: "ビザ申請",
        description: "在外日本国大使館でビザの申請を行います。",
        icon: "/images/admission/visa.svg"
    },
    {
        step: 8,
        title: "入国、入学、オリエンテーション",
        description: "日本へ入国し、オリエンテーションに参加します。",
        icon: "/images/admission/orientation.svg"
    }
];

const requiredDocuments = [
    "入学願書（本校指定）",
    "最終学歴の卒業証明書",
    "最終学歴の成績証明書",
    "日本語学習証明書",
    "パスポートのコピー",
    "証明写真（4cm*3cm）6枚",
    "経費支弁書（本校指定）",
    "経費支弁者の預金残高証明書",
    "経費支弁者の在職証明書",
    "経費支弁者の収入証明書"
];

export default function AdmissionClient() {
  return (
    <main>
      {/* ヒーローセクション */}
      <section className="relative h-[700px]">
        <Image
          src="/images/admission/hero.jpg"
          alt="入学案内"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">入学案内</h1>
          <Breadcrumb currentPage="入学案内" />
        </div>
      </section>

      {/* コース情報 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">コース情報</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-2xl font-bold mb-4">進学1年6か月コース</h3>
              <p className="text-gray-600 mb-4">入学時期 : 10月</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>日本語能力試験N2以上を目指す</li>
                <li>大学・専門学校への進学準備</li>
                <li>中級から上級の日本語学習</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-2xl font-bold mb-4">進学2年コース</h3>
              <p className="text-gray-600 mb-4">入学時期 : 4月</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>初級から上級まで体系的に学習</li>
                <li>日本語能力試験N2以上を目指す</li>
                <li>充実した進学指導</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 入学までの流れ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">入学までの流れ</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8 relative">
            {admissionSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-sm relative z-10"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFD700] text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <div className="text-center mt-4">
                    <div className="w-16 h-16 mx-auto mb-4">
                      <Image
                        src={step.icon}
                        alt={step.title}
                        width={64}
                        height={64}
                      />
                    </div>
                    <h3 className="font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
                
                {index < admissionSteps.length - 1 && (
                  <>
                    {/* デスクトップ用の横向き矢印 */}
                    <div className="hidden lg:block absolute top-1/2 -right-8 w-6 h-6 transform -translate-y-1/2 z-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#FFD700"
                        className="w-6 h-6"
                      >
                        <path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z" />
                      </svg>
                    </div>
                    
                    {/* タブレット用の下向き矢印 */}
                    <div className="hidden md:block lg:hidden absolute -bottom-8 left-1/2 w-6 h-6 transform -translate-x-1/2 z-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#FFD700"
                        className="w-6 h-6 transform rotate-90"
                      >
                        <path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z" />
                      </svg>
                    </div>
                    
                    {/* モバイル用の下向き矢印 */}
                    <div className="md:hidden absolute -bottom-8 left-1/2 w-6 h-6 transform -translate-x-1/2 z-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#FFD700"
                        className="w-6 h-6 transform rotate-90"
                      >
                        <path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z" />
                      </svg>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 必要書類 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">必要書類</h2>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border">
            <ul className="space-y-4">
              {requiredDocuments.map((doc, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <span className="text-[#FFD700]">✓</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-gray-600">
              ※ 国や地域によって追加書類が必要となる場合があります。
              詳細については直接お問い合わせください。
            </p>
          </div>
        </div>
      </section>

      {/* お問い合わせCTA */}
      <section className="py-20 bg-[#FFF9E5]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">お問い合わせ</h2>
          <p className="text-gray-600 mb-8">
            入学に関するご質問やご不明な点がございましたら、<br />
            お気軽にお問い合わせください。
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#FFD700] text-black px-8 py-4 rounded-lg hover:opacity-90 transition-opacity font-bold"
          >
            お問い合わせはこちら
          </Link>
        </div>
      </section>
    </main>
  );
} 