'use client';

import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import {Globe} from 'lucide-react';

export default function LanguageSwitcher() {
  const t = useTranslations('language');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  
  // 現在のパスから言語部分を除去
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');
  
  const handleLanguageChange = (newLocale: string) => {
    // ユーザーの言語選択を保存
    if (typeof window !== 'undefined') {
      localStorage.setItem('userSelectedLanguage', newLocale);
    }
    
    // 新しい言語のパスに遷移
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
  };
  
  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 text-gray-700 hover:text-[#FFD700] transition-colors">
        <Globe className="w-5 h-5" />
        <span>{locale === 'ja' ? '日本語' : 'English'}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden transform scale-0 group-hover:scale-100 transition-transform origin-top-right z-50">
        {['ja', 'en'].map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`block w-full text-left px-4 py-2 text-sm ${
              lang === locale
                ? 'bg-[#FFD700]/20 text-[#B8860B]'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t(lang)}
          </button>
        ))}
      </div>
    </div>
  );
}