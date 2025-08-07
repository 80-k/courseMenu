/**
 * 다국어 시스템을 위한 타입 정의 (레거시 호환성)
 * 
 * @deprecated 이 파일은 레거시 호환성을 위해 유지됩니다.
 * 새로운 코드에서는 src/types의 타입들을 사용하세요.
 */

// 핵심 타입들 re-export
export type {
  SupportedLanguage,
  NestedLocalizedText,
  TranslationKey,
  TranslationNamespace,
  TranslationParams,
  TranslationFunction,
  LanguageData,
  I18nContextType
} from '../types';

// LocalizedText는 core에서 가져옴
export type { LocalizedText } from '../types/core';

// 레거시 호환성을 위한 타입 별칭들
export type { TranslationData as Translations } from '../types/i18n';
export type { PartialLocalizedText } from '../types/core';

// 레거시 파라미터 타입
export type { TranslationParamValue as TranslationParamType } from '../types/i18n';
export type { TranslationOptions as TranslationConfig } from '../types/i18n';