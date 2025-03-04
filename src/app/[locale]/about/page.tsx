import { unstable_setRequestLocale } from 'next-intl/server';
import AboutClient from './about.client';

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

export default async function AboutPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  // サーバーコンポーネントでロケールを設定
  unstable_setRequestLocale(locale);
  
  return <AboutClient />;
} 