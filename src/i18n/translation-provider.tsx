/**
 * 다국어 시스템 컨텍스트 및 프로바이더
 */

import React, { createContext, useState, useCallback, useEffect } from 'react';
import { getLanguageTranslations } from './language-data/translation-registry';
import type { 
  TranslationKey, 
  TranslationNamespace,
  TranslationOptions,
  SupportedLanguage,
  I18nContextType,
  TranslationFunction,
  NestedLocalizedText
} from '../types';

// 컨텍스트 생성
export const I18nContext = createContext<I18nContextType | undefined>(undefined);

// 유틸리티 함수들
function getNestedValue(obj: NestedLocalizedText, path: string): string | string[] | null {
  const keys = path.split('.');
  let result: unknown = obj;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return null;
    }
  }
  
  // 문자열 또는 문자열 배열을 반환
  if (typeof result === 'string') {
    return result;
  }
  if (Array.isArray(result) && result.every(item => typeof item === 'string')) {
    return result as string[];
  }
  
  return null;
}

function interpolateParams(text: string | string[], params?: Record<string, string | number | boolean>): string | string[] {
  if (!params) return text;
  
  if (typeof text === 'string') {
    let result = text;
    Object.entries(params).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      result = result.replace(new RegExp(placeholder, 'g'), String(value));
    });
    return result;
  }
  
  if (Array.isArray(text)) {
    return text.map(item => {
      let result = item;
      Object.entries(params).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`;
        result = result.replace(new RegExp(placeholder, 'g'), String(value));
      });
      return result;
    });
  }
  
  return text;
}

// 순환 참조 방지를 위해 직접 설정값 사용
const DEFAULT_SUPPORTED_LANGUAGES: SupportedLanguage[] = ['ko', 'ja'];
const DEFAULT_LANGUAGE: SupportedLanguage = 'ko';

interface I18nProviderProps {
  children: React.ReactNode;
  initialLanguage?: SupportedLanguage;
}

/**
 * 다국어 프로바이더 컴포넌트
 */
export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children, 
  initialLanguage 
}) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    // 초기 언어 결정 우선순위:
    // 1. props로 전달된 initialLanguage
    // 2. localStorage에 저장된 언어
    // 3. 설정 파일의 기본 언어
    if (initialLanguage && DEFAULT_SUPPORTED_LANGUAGES.includes(initialLanguage)) {
      return initialLanguage;
    }
    
    const savedLanguage = localStorage.getItem('preferred-language') as SupportedLanguage;
    if (savedLanguage && DEFAULT_SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      return savedLanguage;
    }
    
    return DEFAULT_LANGUAGE;
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 언어 변경 함수
   */
  const switchToLanguage = useCallback((newLanguage: SupportedLanguage) => {
    if (!DEFAULT_SUPPORTED_LANGUAGES.includes(newLanguage)) {
      console.warn(`Unsupported language: ${newLanguage}. Falling back to ${DEFAULT_LANGUAGE}`);
      newLanguage = DEFAULT_LANGUAGE;
    }
    
    setIsLoading(true);
    setLanguageState(newLanguage);
    
    // DOM 언어 속성 설정
    document.documentElement.lang = newLanguage;
    
    // localStorage에 저장
    localStorage.setItem('preferred-language', newLanguage);
    
    // 로딩 상태 해제 (비동기 번역 로딩을 시뮬레이션)
    setTimeout(() => setIsLoading(false), 100);
  }, []);

  /**
   * 네임스페이스별 번역 함수 팩토리
   */
  const createNamespacedTranslation = useCallback((namespace: TranslationNamespace) => {
    return (key: string, options?: Omit<TranslationOptions, 'namespace'>) => {
      // translateText 함수를 직접 호출하지 말고 내재화를 사용
      const translations = getLanguageTranslations(language);
      const namespaceData = translations[namespace as keyof typeof translations];
      if (namespaceData && typeof namespaceData === 'object') {
        const value = getNestedValue(namespaceData, key);
        if (value) {
          return interpolateParams(value, options?.params);
        }
      }
      console.warn(`Translation not found: ${namespace}.${key} (language: ${language})`);
      return `${namespace}.${key}`;
    };
  }, [language]);

  /**
   * 번역 데이터 다시 로드
   */
  const reloadTranslations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // 실제로는 여기서 번역 데이터를 다시 로드할 수 있음
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Translation reload failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 특정 네임스페이스 프리로드
   */
  const preloadNamespace = useCallback(async (namespace: TranslationNamespace) => {
    try {
      setError(null);
      // 실제로는 여기서 특정 네임스페이스를 프리로드할 수 있음
      console.debug(`Preloading namespace: ${namespace}`);
      await new Promise(resolve => setTimeout(resolve, 50));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Namespace preload failed');
    }
  }, []);

  /**
   * 에러 클리어
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * 번역 함수 - 두 가지 시그니처를 지원
   */
  const translateText = useCallback((
    keyOrNamespace: TranslationKey | TranslationNamespace,
    keyOrOptions?: string | TranslationOptions,
    options?: TranslationOptions
  ): string | string[] => {
    try {
      const translations = getLanguageTranslations(language);
      
      // 첫 번째 인자가 네임스페이스인지 확인 (3개 인자 형태)
      if (typeof keyOrOptions === 'string') {
        // (namespace: TranslationNamespace, key: string, options?: TranslationOptions)
        const namespace = keyOrNamespace as TranslationNamespace;
        const key = keyOrOptions;
        const namespaceData = translations[namespace as keyof typeof translations];
        if (namespaceData) {
          const value = getNestedValue(namespaceData, key);
          if (value) {
            return interpolateParams(value, options?.params);
          }
        }
        console.warn(`Translation not found: ${namespace}.${key} (language: ${language})`);
        return `${namespace}.${key}`;
      }
      
      // 첫 번째 인자가 TranslationKey (2개 인자 형태)
      const translationKey = keyOrNamespace;
      const translationOptions = keyOrOptions as TranslationOptions | undefined;
      
      // 옵션에 네임스페이스가 지정된 경우
      if (translationOptions && translationOptions.namespace) {
        const namespaceData = translations[translationOptions.namespace as keyof typeof translations];
        if (namespaceData) {
          const value = getNestedValue(namespaceData, translationKey);
          if (value) {
            return interpolateParams(value, translationOptions.params);
          }
        }
      }
      
      // 전체 번역 데이터에서 키로 검색
      const value = getNestedValue(translations, translationKey);
      if (value) {
        return interpolateParams(value, translationOptions?.params);
      }
      
      // 네임스페이스.키 형태로 재시도
      if (typeof translationKey === 'string' && translationKey.includes('.')) {
        const [namespace, ...keyParts] = translationKey.split('.');
        const namespaceData = translations[namespace as keyof typeof translations];
        if (namespaceData) {
          const nestedValue = getNestedValue(namespaceData, keyParts.join('.'));
          if (nestedValue) {
            return interpolateParams(nestedValue, translationOptions?.params);
          }
        }
      }
      
      console.warn(`Translation not found: ${translationKey} (language: ${language})`);
      return String(translationKey); // 번역을 찾을 수 없으면 키 자체를 반환
      
    } catch (error) {
      console.error('Translation error:', error);
      return String(keyOrNamespace);
    }
  }, [language]);

  // 언어 변경 시 HTML lang 속성 설정
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: I18nContextType = {
    language,
    supportedLanguages: DEFAULT_SUPPORTED_LANGUAGES,
    isLoading,
    error,
    isTranslationsLoaded: true, // 정적 번역이므로 항상 로드됨
    setLanguage: switchToLanguage,
    reloadTranslations,
    preloadNamespace,
    clearError,
    translate: translateText as TranslationFunction,
    createNamespacedTranslator: createNamespacedTranslation,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

