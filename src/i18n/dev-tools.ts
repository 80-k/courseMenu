/**
 * i18n 시스템을 위한 개발 도구들
 * 
 * 개발 모드에서 번역 키 검증, 누락된 번역 감지, 
 * 사용되지 않는 번역 키 찾기 등의 기능을 제공합니다.
 */

import type { 
  TranslationKey, 
  SupportedLanguage
} from '../types';
import { translations } from './language-data/translation-registry';

// =============================================================================
// DEVELOPMENT VALIDATION UTILITIES
// =============================================================================

/**
 * 번역 키가 모든 언어에 존재하는지 검증
 */
export const validateTranslationKey = (
  key: TranslationKey,
  languages: SupportedLanguage[] = ['ko', 'ja']
): boolean => {
  return languages.every(lang => {
    const translation = getNestedTranslation(translations[lang], key);
    return translation !== null && translation !== undefined;
  });
};

/**
 * 중첩된 객체에서 번역 값을 가져오는 헬퍼
 */
const getNestedTranslation = (obj: any, key: string): any => {
  const keys = key.split('.');
  let current = obj;
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return null;
    }
  }
  
  return current;
};

/**
 * 누락된 번역 키들을 찾는 함수
 */
export const findMissingTranslations = (
  keys: TranslationKey[],
  languages: SupportedLanguage[] = ['ko', 'ja']
): Record<SupportedLanguage, TranslationKey[]> => {
  const missing: Record<SupportedLanguage, TranslationKey[]> = {} as any;
  
  languages.forEach(lang => {
    missing[lang] = keys.filter(key => {
      const translation = getNestedTranslation(translations[lang], key);
      return translation === null || translation === undefined || translation === '';
    });
  });
  
  return missing;
};

/**
 * 번역 완성도를 계산하는 함수
 */
export const calculateTranslationCompleteness = (
  keys: TranslationKey[],
  languages: SupportedLanguage[] = ['ko', 'ja']
): Record<SupportedLanguage, number> => {
  const completeness: Record<SupportedLanguage, number> = {} as any;
  
  languages.forEach(lang => {
    const totalKeys = keys.length;
    const translatedKeys = keys.filter(key => {
      const translation = getNestedTranslation(translations[lang], key);
      return translation !== null && translation !== undefined && translation !== '';
    }).length;
    
    completeness[lang] = totalKeys > 0 ? Math.round((translatedKeys / totalKeys) * 100) : 100;
  });
  
  return completeness;
};

/**
 * 개발 모드에서 번역 키 사용 시 검증 및 경고
 */
export const validateTranslationUsage = (
  key: TranslationKey,
  currentLanguage: SupportedLanguage
): void => {
  if (process.env.NODE_ENV !== 'development') return;
  
  const translation = getNestedTranslation(translations[currentLanguage], key);
  
  if (translation === null || translation === undefined) {
    console.warn(`[i18n] Missing translation for key: "${key}" in language: "${currentLanguage}"`);
  }
  
  // 빈 문자열 체크
  if (translation === '') {
    console.warn(`[i18n] Empty translation for key: "${key}" in language: "${currentLanguage}"`);
  }
  
  // 타입 체크 (문자열 또는 배열이어야 함)
  if (translation !== null && translation !== undefined && 
      typeof translation !== 'string' && !Array.isArray(translation)) {
    console.warn(`[i18n] Invalid translation type for key: "${key}". Expected string or string[], got: ${typeof translation}`);
  }
};

/**
 * 개발 모드에서 번역 통계 출력
 */
export const logTranslationStats = (keys: TranslationKey[]): void => {
  if (process.env.NODE_ENV !== 'development') return;
  
  const languages: SupportedLanguage[] = ['ko', 'ja'];
  const missing = findMissingTranslations(keys, languages);
  const completeness = calculateTranslationCompleteness(keys, languages);
  
  console.group('🌐 Translation Statistics');
  console.log(`Total keys: ${keys.length}`);
  
  languages.forEach(lang => {
    const missingCount = missing[lang].length;
    const completion = completeness[lang];
    
    console.log(`${lang.toUpperCase()}: ${completion}% complete (${missingCount} missing)`);
    
    if (missingCount > 0) {
      console.group(`Missing keys in ${lang}:`);
      missing[lang].forEach(key => console.log(`- ${key}`));
      console.groupEnd();
    }
  });
  
  console.groupEnd();
};

// =============================================================================
// RUNTIME TRANSLATION HELPERS
// =============================================================================

/**
 * 안전한 번역 함수 (개발 모드에서 추가 검증)
 */
export const safeTranslate = (
  key: TranslationKey,
  language: SupportedLanguage,
  defaultValue?: string
): string | string[] => {
  // 개발 모드에서 검증
  if (process.env.NODE_ENV === 'development') {
    validateTranslationUsage(key, language);
  }
  
  const translation = getNestedTranslation(translations[language], key);
  
  if (translation === null || translation === undefined || translation === '') {
    // 대체값이 있으면 사용, 없으면 키 자체를 반환
    return defaultValue || `[${key}]`;
  }
  
  return translation;
};

/**
 * 번역 키가 존재하는지 확인
 */
export const hasTranslation = (
  key: TranslationKey,
  language: SupportedLanguage
): boolean => {
  const translation = getNestedTranslation(translations[language], key);
  return translation !== null && translation !== undefined && translation !== '';
};

// =============================================================================
// DEVELOPMENT MODE UTILITIES
// =============================================================================

/**
 * 개발 모드에서만 동작하는 번역 디버거
 */
export const createTranslationDebugger = () => {
  if (process.env.NODE_ENV !== 'development') {
    return {
      logMissing: () => {},
      logStats: () => {},
      validate: () => true
    };
  }
  
  const usedKeys = new Set<TranslationKey>();
  
  return {
    /**
     * 사용된 키를 추적
     */
    trackUsage: (key: TranslationKey) => {
      usedKeys.add(key);
    },
    
    /**
     * 누락된 번역들을 콘솔에 출력
     */
    logMissing: () => {
      const keys = Array.from(usedKeys);
      const missing = findMissingTranslations(keys);
      
      Object.entries(missing).forEach(([lang, missingKeys]) => {
        if (missingKeys.length > 0) {
          console.warn(`[i18n] Missing translations in ${lang}:`, missingKeys);
        }
      });
    },
    
    /**
     * 번역 통계를 콘솔에 출력
     */
    logStats: () => {
      const keys = Array.from(usedKeys);
      logTranslationStats(keys);
    },
    
    /**
     * 모든 사용된 키들을 검증
     */
    validate: (): boolean => {
      const keys = Array.from(usedKeys);
      const missing = findMissingTranslations(keys);
      
      return Object.values(missing).every(missingKeys => missingKeys.length === 0);
    },
    
    /**
     * 현재까지 사용된 키들 반환
     */
    getUsedKeys: () => Array.from(usedKeys)
  };
};

// 전역 디버거 인스턴스 (개발 모드에서만)
export const translationDebugger = createTranslationDebugger();