import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* ヘッダー画像 */}
      <div className="relative h-[700px] overflow-hidden">
        <Image
          src="/images/about/about-hero.jpg"
          alt="学校について"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">学校について</h1>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Link href="/" className="hover:text-primary-color transition-colors">
                ホーム
              </Link>
              <span>›</span>
              <span>学校について</span>
            </div>
          </div>
        </div>
      </div>

      {/* 学院長挨拶 - 薄い黄色背景 */}
      <section className="bg-[#FFF9E5] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">学院長挨拶</h2>
          <div className="max-w-4xl mx-auto">
            <div className="prose max-w-none text-gray-600">
              <p className="text-center mb-8">
                日琉国際言語学院のホームページをご覧いただき、誠にありがとうございます。
              </p>
              <p className="mb-8">
                皆さんは留学生として日本に来ようと考え、準備をしていると思います。しかし、日本に来る前にもう一度自分自身に問いかけてみてください。「なぜ日本語を学ぶのか。目的や目標は何か。」皆さんそれぞれに目的や目標があるはずです。しかし、日本語での会話（話す、聞く）だけで、その目的や目標を実現できるのでしょうか？ 日本語の文章を読む、書くことができなければ、進学や就職は難しいかもしれません。日本語を「読む」「聞く」「話す」「書く」ことができるレベルまで習得するには、「不断の学び」が大切です。
              </p>
              <p className="mb-8">
                私たち日琉国際言語学院では、日本語を読んで理解し、日本語で話し合い、日本語の文章を書く力を養う指導を行っています。本気で日本語が上達したい皆さん、ぜひ「厳しさの中にも楽しさのある授業」をモットーとする本学院で、日本語の基礎を固め、さらに高いレベルを目指しましょう。
              </p>
              <p className="mb-12">
                一年中爽やかな海風を感じられる沖縄県糸満市にある日琉国際言語学院で、皆さんのご入学を心よりお待ちしております。
              </p>
              
              {/* 学院長の写真と名前 */}
              <div className="flex flex-col items-center">
                <div className="relative w-[800px] h-[480px] mb-4">
                  <Image
                    src="/images/about/principal.jpg"
                    alt="学院長：兼本 敏"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <p className="font-bold text-xl">学院長：兼本 敏</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 教育方針 - 薄いグレー背景 */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-20 max-w-6xl mx-auto">
            {/* 厳しさの中に優しさあり */}
            <div className="grid md:grid-cols-2 gap-12">
              <div className="order-1 md:order-1">
                <div className="max-w-xl bg-white p-8 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold mb-6">厳しさの中に優しさあり</h3>
                  <div className="text-gray-600 space-y-4">
                    <p>
                      当校の日本人講師は豊富な指導経験と深い知識を持ち、様々な国の学生に愛されています。指導プロセスは比較的厳格ですが、指導方法は非常に柔軟です。活気に満ちた教室では、丁寧な指導のもと、学生は日本語の基礎知識を学ぶだけでなく、日本の文化や伝統にも強い興味を抱くことができます。
                    </p>
                    <p>
                      先生方は厳しいだけでなく、学生一人一人を優しく見守ってくれます。常に学生の問題や困難に耳を傾け、辛抱強く指導や提案を提供します。
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-2 md:order-2">
                <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/images/about/classroom-teaching.jpg"
                    alt="教室での授業風景"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* きめ細やかな生活指導 */}
            <div className="grid md:grid-cols-2 gap-12">
              <div className="order-2 md:order-1">
                <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/images/about/student-guidance.jpg"
                    alt="学生指導の様子"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="max-w-xl bg-white p-8 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold mb-6">きめ細やかな生活指導</h3>
                  <div className="text-gray-600 space-y-4">
                    <p>
                      来日したばかりの学生は新しい環境に慣れておらず、スーパーへの買い出し、携帯電話とSIMカードの申し込み、銀行口座の開設など、次々と困難が生じます。日本語が分からない留学生。慣れない海外でもみんなが楽しく毎日を過ごせるよう、生活指導の先生が学生一人ひとりを丁寧に指導します。
                    </p>
                    <p>
                      働きながら学びたい学生には、生活指導員が履歴書の書き方や面接の仕方なども指導します。また、アルバイトをすることで、自身な日本語を習得できると考えています。ただし、働くことによって宿題ができなくなり、日本の習慣や文化を学ぶことができなくなってしまうことがないよう、より賢く日本語を学ぶことができるよう考えています。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 職員採用情報 */}
      <section className="relative py-32">
        {/* 背景画像 */}
        <div className="absolute inset-0 bg-black/30">
          <Image
            src="/images/about/japanese-pattern.jpg"
            alt="和室の背景"
            fill
            className="object-cover -z-10 opacity-90"
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl">
            {/* 上部の小見出し */}
            <div className="mb-8">
              <span className="text-white font-medium relative inline-block">
                日琉国際言語学院の一員（仲間）になる
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FFD700]"></span>
              </span>
            </div>

            {/* メインの見出し */}
            <h2 className="text-4xl font-bold mb-12 text-white">
              日琉国際言語学院の仲間に<br />
              なって異文化を楽しもう
            </h2>

            {/* 説明文 */}
            <div className="space-y-6 mb-12 max-w-2xl">
              <p className="text-white text-lg leading-relaxed">
                日琉国際言語学院は単なる外国人に日本語を教える学校だけではなく、多くの異文化交流の場でもあります。ここで働くことで、文化の多様性を感じ、お互いを尊重し、各国の考え方を理解しあうことができます。
              </p>
              <p className="text-white text-lg leading-relaxed">
                少しでも興味がある方は、お気軽にお問い合わせください。
              </p>
              <p className="text-white text-lg leading-relaxed">
                皆様のご参加をお待ちしております。
              </p>
            </div>

            {/* ボタン */}
            <div>
              <Link
                href="/contact"
                className="inline-block bg-[#FFD700] text-black px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-bold"
              >
                職員採用情報
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 