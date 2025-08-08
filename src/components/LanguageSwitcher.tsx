import { useI18n } from '../i18n';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useI18n();

  return (
    <div className="inline-flex justify-center bg-gray-50 p-1 rounded-full border border-gray-200 shadow-inner relative overflow-hidden transition-all duration-300">
      <div className={`absolute top-1 left-1 w-[calc(50%-2px)] h-[calc(100%-8px)] bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full transition-transform duration-300 shadow-lg z-10 ${
        language === 'ja' ? 'translate-x-[calc(100%+2px)]' : 'translate-x-0'
      }`} />
      <button
        className={`px-4 py-2 border-none bg-transparent cursor-pointer rounded-full text-sm font-semibold transition-all duration-300 relative z-20 min-w-[60px] outline-none select-none tracking-wide ${
          language === 'ko' 
            ? 'text-white text-shadow-sm -translate-y-0.5' 
            : 'text-gray-600 hover:text-primary-600 hover:-translate-y-0.5'
        } md:px-6 md:py-2.5 md:text-base md:min-w-[75px]`}
        onClick={() => setLanguage('ko')}
      >
        한국어
      </button>
      <button
        className={`px-4 py-2 border-none bg-transparent cursor-pointer rounded-full text-sm font-semibold transition-all duration-300 relative z-20 min-w-[60px] outline-none select-none tracking-wide ${
          language === 'ja' 
            ? 'text-white text-shadow-sm -translate-y-0.5' 
            : 'text-gray-600 hover:text-primary-600 hover:-translate-y-0.5'
        } md:px-6 md:py-2.5 md:text-base md:min-w-[75px]`}
        onClick={() => setLanguage('ja')}
      >
        日本語
      </button>
    </div>
  );
};