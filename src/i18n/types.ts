/**
 * 다국어 시스템을 위한 타입 정의
 */

// 다국어 지원 언어 타입
export type SupportedLanguage = 'ko' | 'ja' | 'en';

// 다국어 텍스트 객체 타입
export interface LocalizedText {
  [key: string]: string;
}

// 중첩된 다국어 객체 타입
export interface NestedLocalizedText {
  [key: string]: LocalizedText | NestedLocalizedText;
}

// 번역 키 타입
export type TranslationKey = string;

// 번역 네임스페이스
export type TranslationNamespace = 
  | 'common'
  | 'header' 
  | 'menu'
  | 'course'
  | 'schedule'
  | 'venue'
  | 'program'
  | 'ui'
  | 'floating';

// 번역 파라미터
export interface TranslationParams {
  [key: string]: string | number;
}

// 번역 함수 타입
export type TranslationFunction = (
  key: TranslationKey,
  params?: TranslationParams,
  namespace?: TranslationNamespace
) => string;

// 언어별 번역 데이터 구조
export interface LanguageData {
  [namespace: string]: NestedLocalizedText;
}

// 전체 번역 데이터 구조
export interface Translations {
  [language: string]: LanguageData;
}

// 번역 컨텍스트 타입
export interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: TranslationFunction;
  supportedLanguages: SupportedLanguage[];
  isLoading: boolean;
}