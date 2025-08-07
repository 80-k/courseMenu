/**
 * 다국어 시스템 유틸리티 함수들
 */

import type { 
  SupportedLanguage, 
  TranslationNamespace, 
  NestedLocalizedText
} from '../types';
import { 
  isObject, 
  isString
} from '../types';
import { getLanguageTranslations, LANGUAGE_NAMES } from './language-data/translation-registry';

/**
 * 특정 네임스페이스에 대한 번역 헬퍼 함수들을 생성
 */
export function createTranslationHelpers(namespace: TranslationNamespace) {
  return {
    /**
     * 네임스페이스 내의 특정 키에 대한 번역을 가져옴
     */
    getTranslation: (language: SupportedLanguage, key: string): string => {
      const translations = getLanguageTranslations(language);
      const namespaceData = translations[namespace];
      
      if (!namespaceData) {
        console.warn(`Namespace '${namespace}' not found for language '${language}'`);
        return key;
      }
      
      const value = getNestedProperty(namespaceData, key);
      return typeof value === 'string' ? value : key;
    },
    
    /**
     * 네임스페이스 내의 모든 번역을 가져옴
     */
    getAllTranslations: (language: SupportedLanguage) => {
      const translations = getLanguageTranslations(language);
      return translations[namespace] || {};
    },
    
    /**
     * 특정 키의 모든 언어 번역을 가져옴
     */
    getMultiLanguageTranslation: (key: string): Record<string, string> => {
      const result: Record<string, string> = {};
      
      Object.keys(LANGUAGE_NAMES).forEach(lang => {
        const translations = getLanguageTranslations(lang);
        const namespaceData = translations[namespace];
        
        if (namespaceData) {
          const value = getNestedProperty(namespaceData, key);
          if (typeof value === 'string') {
            result[lang] = value;
          }
        }
      });
      
      return result;
    }
  };
}

/**
 * 중첩된 객체에서 점 표기법을 사용하여 속성 값을 가져옴
 */
function getNestedProperty(obj: NestedLocalizedText, path: string): string | undefined {
  const keys = path.split('.');
  let current: unknown = obj;
  
  for (const key of keys) {
    if (isObject(current) && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  
  return isString(current) ? current : undefined;
}

/**
 * 언어 코드를 표시 이름으로 변환
 */
export function getLanguageDisplayName(language: string): string {
  return LANGUAGE_NAMES[language as keyof typeof LANGUAGE_NAMES] || language;
}

/**
 * 번역 데이터의 유효성을 검사
 */
export function validateTranslations(translations: NestedLocalizedText, language: SupportedLanguage): boolean {
  try {
    // 기본적인 구조 검사
    if (!translations || typeof translations !== 'object') {
      console.error(`Invalid translation structure for language: ${language}`);
      return false;
    }
    
    // 필수 네임스페이스 검사
    const requiredNamespaces = ['common', 'header', 'menu'];
    for (const namespace of requiredNamespaces) {
      if (!translations[namespace]) {
        console.warn(`Missing required namespace '${namespace}' for language: ${language}`);
      }
    }
    
    return true;
  } catch (error) {
    console.error(`Translation validation error for language ${language}:`, error);
    return false;
  }
}

/**
 * 번역 키가 존재하는지 확인
 */
export function hasTranslation(
  language: SupportedLanguage, 
  key: string, 
  namespace?: TranslationNamespace
): boolean {
  try {
    const translations = getLanguageTranslations(language);
    
    if (namespace) {
      const namespaceData = translations[namespace];
      return !!getNestedProperty(namespaceData, key);
    }
    
    return !!getNestedProperty(translations, key);
  } catch {
    return false;
  }
}

/**
 * 번역 누락된 키들을 찾기 (개발용)
 */
export function findMissingTranslations(
  baseLanguage: SupportedLanguage,
  targetLanguage: SupportedLanguage
): string[] {
  const missing: string[] = [];
  const baseTranslations = getLanguageTranslations(baseLanguage);
  const targetTranslations = getLanguageTranslations(targetLanguage);
  
  function checkObject(baseObj: NestedLocalizedText, targetObj: NestedLocalizedText, path = '') {
    Object.keys(baseObj).forEach(key => {
      const currentPath = path ? `${path}.${key}` : key;
      const baseValue = baseObj[key];
      const targetValue = targetObj?.[key];
      
      if (typeof baseValue === 'string') {
        if (typeof targetValue !== 'string') {
          missing.push(currentPath);
        }
      } else if (typeof baseValue === 'object' && baseValue !== null) {
        if (isObject(baseValue) && isObject(targetValue)) {
          checkObject(baseValue as NestedLocalizedText, targetValue as NestedLocalizedText, currentPath);
        }
      }
    });
  }
  
  checkObject(baseTranslations, targetTranslations);
  return missing;
}

/**
 * 개발 모드에서 번역 통계 출력
 */
export function logTranslationStats() {
  if (import.meta.env.DEV) {
    const languages = Object.keys(LANGUAGE_NAMES);
    console.group('🌐 Translation Statistics');
    
    languages.forEach(lang => {
      const translations = getLanguageTranslations(lang);
      const keyCount = countTranslationKeys(translations);
      console.log(`${getLanguageDisplayName(lang)}: ${keyCount} keys`);
    });
    
    // 누락된 번역 검사
    const baseLanguage = 'ko' as SupportedLanguage;
    languages.forEach(lang => {
      if (lang !== baseLanguage) {
        const missing = findMissingTranslations(baseLanguage, lang as SupportedLanguage);
        if (missing.length > 0) {
          console.warn(`Missing translations in ${lang}:`, missing);
        }
      }
    });
    
    console.groupEnd();
  }
}

/**
 * 번역 키 개수를 세는 헬퍼 함수
 */
function countTranslationKeys(obj: NestedLocalizedText): number {
  let count = 0;
  
  function countRecursive(current: NestedLocalizedText) {
    Object.values(current as Record<string, unknown>).forEach((value: unknown) => {
      if (typeof value === 'string') {
        count++;
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        countRecursive(value as NestedLocalizedText);
      }
    });
  }
  
  countRecursive(obj);
  return count;
}