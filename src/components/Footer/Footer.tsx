'use client';

import Link from "next/link"
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Phone, Printer, Mail } from "lucide-react"
import { usePathname } from 'next/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const pathname = usePathname();
  
  // 管理者ページではフッターを表示しない
  if (pathname?.includes('/admin')) {
    return null;
  }
  
  // 現在の年を取得
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-950 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 学校について */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">{t('aboutSchool.title')}</h3>
            <p className="mb-4">{t('aboutSchool.tagline')}</p>
            
            <div className="mb-4">
              <p>{t('aboutSchool.entity')}</p>
              <p>{t('aboutSchool.director')}</p>
            </div>
            
            <p>{t('aboutSchool.philosophy')}</p>
          </div>

          {/* その他言語 */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">{t('languages.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ja" className="hover:text-white transition-colors">
                  日本語
                </Link>
              </li>
              <li>
                <Link href="/en" className="hover:text-white transition-colors">
                  English
                </Link>
              </li>
              <li>
                <Link href="/zh" className="hover:text-white transition-colors">
                  简体中文
                </Link>
              </li>
            </ul>
            
            <h3 className="text-xl font-bold mt-8 mb-4 text-white">{t('relatedLinks.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/about`} className="hover:text-white transition-colors">
                  {t('relatedLinks.about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about/accreditation`} className="hover:text-white transition-colors">
                  {t('relatedLinks.accreditation')}
                </Link>
              </li>
            </ul>
          </div>

          {/* 連絡先 */}
          <div>
            <h3 className="text-xl font-bold mb-5 text-white">{t('contact.title')}</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="mr-3 text-gray-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="text-white font-medium mb-1">{t('contact.address.label')}：</p>
                  <p>{t('contact.address.value')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="mr-3 text-gray-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-white font-medium mb-1">{t('contact.tel.label')}：</p>
                  <p>{t('contact.tel.value')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Printer className="mr-3 text-gray-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-white font-medium mb-1">{t('contact.fax.label')}：</p>
                  <p>{t('contact.fax.value')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="mr-3 text-gray-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-white font-medium mb-1">{t('contact.email.label')}：</p>
                  <p>{t('contact.email.value')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-5 text-center text-sm text-gray-500">
          <p>{t('copyrightWithYear', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  )
} 