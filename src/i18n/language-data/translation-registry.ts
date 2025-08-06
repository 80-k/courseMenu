/**
 * 번역 데이터 통합 관리
 */

import { ko } from './korean-texts';
import { ja } from './japanese-texts';
import type { Translations } from '../types';

// 모든 번역 데이터를 통합
export const translations: Translations = {
  ko,
  ja,
};

// 번역 데이터 가져오기 함수
export const getTranslations = () => translations;

// 특정 언어 번역 데이터 가져오기
export const getLanguageTranslations = (language: string) => {
  return translations[language] || translations.ko; // 기본값은 한국어
};

// 지원되는 언어 목록
export const SUPPORTED_LANGUAGES = Object.keys(translations);

// 기본 언어
export const DEFAULT_LANGUAGE = 'ko';

// 언어별 표시명
export const LANGUAGE_NAMES = {
  ko: '한국어',
  ja: '日本語',
  en: 'English',
} as const;