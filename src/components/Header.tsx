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

export const Header: React.FC<HeaderProps> = ({ 
  title = { ko: '상견례 안내', ja: '顔合わせご案内' },
  linkTo = '/',
  showBackLink = false
}) => {
  const { language } = useI18n();

  const headerTitle = title[language as keyof typeof title];

  return (
    <header className="app-header">
      <h1>
        {showBackLink ? (
          <Link to={linkTo} className="header-link">
            {headerTitle}
          </Link>
        ) : (
          <span className="header-title">
            {headerTitle}
          </span>
        )}
      </h1>
      <LanguageSwitcher />
    </header>
  );
};