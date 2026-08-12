import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const toggleLanguage = () => {
    const nextLang = currentLang.startsWith('ar') ? 'en' : 'ar';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 hover:border-black text-xs font-semibold tracking-wider transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm"
      aria-label="Toggle language"
    >
      <Globe size={14} className="text-gray-700" />
      <span className="uppercase text-gray-800">
        {currentLang.startsWith('ar') ? 'EN' : 'عربي'}
      </span>
    </button>
  );
}
