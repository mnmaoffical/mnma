import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ className = '' }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const toggleLanguage = () => {
    const nextLang = currentLang.startsWith('ar') ? 'en' : 'ar';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-gray-300 hover:border-black text-xs font-semibold tracking-wider transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-sm ${className}`}
      aria-label="Toggle language"
    >
      <Globe size={13} className="text-gray-700 flex-shrink-0" />
      <span className="uppercase text-gray-800">
        {currentLang.startsWith('ar') ? 'EN' : 'عربي'}
      </span>
    </button>
  );
}
