import { memo } from 'react';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useI18n } from '../i18n';

interface HeaderProps {
  title?: {
    ko: string;
    ja: string;
  };
  linkTo?: string;
  showBackLink?: boolean;
}

export const Header: React.FC<HeaderProps> = memo(({ 
  title = { ko: '상견례 안내', ja: '顔合わせご案内' },
  linkTo = '/',
  showBackLink = false
}) => {
  const { language } = useI18n();

  const headerTitle = title[language as keyof typeof title];

  return (
    <header className="fixed bottom-0 left-0 w-full z-50 text-center m-0 px-4 py-3 border-t-2 border-gray-200/20 bg-white/75 backdrop-blur-xl backdrop-saturate-180 shadow-xl md:px-6 md:py-4">
      <h1 className="text-lg font-semibold -tracking-wide text-gray-900 text-shadow-sm font-serif leading-tight m-0 mb-3 md:text-2xl md:mb-5">
        {showBackLink ? (
          <Link to={linkTo} className="text-gray-900 no-underline text-shadow-sm transition-all duration-300 cursor-pointer inline-block px-2 py-1 rounded-lg relative overflow-hidden hover:text-primary-700 hover:shadow-md hover:-translate-y-0.5 hover:bg-primary-700/5 active:translate-y-0 active:bg-primary-700/10">
            {headerTitle}
          </Link>
        ) : (
          <span className="text-gray-900 text-shadow-sm inline-block px-2 py-1">
            {headerTitle}
          </span>
        )}
      </h1>
      <LanguageSwitcher />
    </header>
  );
});