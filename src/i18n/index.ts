/**
 * 다국어 시스템 진입점
 */

// 타입들
export type { 
  LocalizedText,
  NestedLocalizedText,
  TranslationKey,
  TranslationNamespace,
  TranslationParams,
  TranslationFunction,
  LanguageData,
  Translations,
  I18nContextType,
  SupportedLanguage
} from './types';

// 컨텍스트와 프로바이더
export { I18nContext } from './translation-context';
export { I18nProvider } from './translation-provider';

// 훅들
export { 
  useI18n,
  useTranslation,
  useCurrentLanguage,
  useLanguageSwitcher,
  useNamespacedTranslation,
  usePrefetchTranslations,
  useIsMultiLanguage
} from './translation-hooks';

// 번역 데이터
export { 
  translations,
  getTranslations,
  getLanguageTranslations,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANGUAGE_NAMES
} from './language-data/translation-registry';

// 유틸리티 함수들
export { createTranslationHelpers } from './translation-utilities';

// 기본 내보내기 - 가장 자주 사용되는 것들
export { useTranslation as default } from './translation-hooks';