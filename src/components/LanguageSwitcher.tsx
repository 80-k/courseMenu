import { useI18n } from '../i18n';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useI18n();

  return (
    <div className={`language-toggle ${language === 'ja' ? 'ja-active' : ''}`}>
      <button
        className={`lang-btn ${language === 'ko' ? 'active' : ''}`}
        onClick={() => setLanguage('ko')}
      >
        한국어
      </button>
      <button
        className={`lang-btn ${language === 'ja' ? 'active' : ''}`}
        onClick={() => setLanguage('ja')}
      >
        日本語
      </button>
    </div>
  );
};