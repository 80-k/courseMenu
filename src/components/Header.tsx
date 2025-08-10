import { memo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useI18n } from '../i18n';
import { TAILWIND_Z_INDEX } from '../constants/z-index';

interface HeaderProps {
  title?: {
    ko: string;
    ja: string;
  };
  linkTo?: string;
  showBackLink?: boolean;
}

export const Header: React.FC<HeaderProps> = memo(({ 
  title = { ko: 'S.G. 💍 MIYU', ja: 'S.G. 💍 MIYU' },
  linkTo: _linkTo = '/',
  showBackLink: _showBackLink = false
}) => {
  const { language } = useI18n();
  const headerRef = useRef<HTMLElement>(null);

  const headerTitle = title[language as keyof typeof title];

  // 헤더 높이를 CSS 변수로 설정
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [headerTitle]); // 제목이 바뀔 때도 다시 계산

  return (
    <header 
      ref={headerRef}
      className={`fixed bottom-0 left-0 w-full ${TAILWIND_Z_INDEX.STICKY_HEADER} text-center m-0 px-4 py-3 border-t-2 border-gray-200/20 bg-white/75 backdrop-blur-xl backdrop-saturate-180 shadow-xl md:px-6 md:py-4`}
    >
      <h1 className="text-lg font-semibold -tracking-wide text-gray-900 text-shadow-sm font-serif leading-tight m-0 mb-3 md:text-2xl md:mb-5">
        <Link to="/" className="text-gray-900 no-underline text-shadow-sm transition-all duration-300 cursor-pointer inline-block px-2 py-1 rounded-lg relative overflow-hidden hover:text-primary-700 hover:shadow-md hover:-translate-y-0.5 hover:bg-primary-700/5 active:translate-y-0 active:bg-primary-700/10">
          {headerTitle}
        </Link>
      </h1>
      <div className="flex items-center justify-center">
        <LanguageSwitcher />
      </div>
    </header>
  );
});