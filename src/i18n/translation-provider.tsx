/**
 * 다국어 시스템 컨텍스트
 */

import React, { createContext, useState, useCallback, useEffect } from 'react';
// 순환 참조 방지를 위해 직접 설정값 사용
const DEFAULT_SUPPORTED_LANGUAGES: SupportedLanguage[] = ['ko', 'ja'];
const DEFAULT_LANGUAGE: SupportedLanguage = 'ko';
import { getLanguageTranslations } from './language-data/translation-registry';
import type { 
  I18nContextType, 
  TranslationKey, 
  TranslationParams, 
  TranslationNamespace,
  SupportedLanguage 
} from './types';

// 컨텍스트 생성
export const I18nContext = createContext<I18nContextType | undefined>(undefined);

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
   * 번역 함수
   */
  const translateText = useCallback((
    translationKey: TranslationKey,
    interpolationParams?: TranslationParams,
    textNamespace?: TranslationNamespace
  ): string => {
    try {
      const translations = getLanguageTranslations(language);
      
      // 네임스페이스가 지정된 경우 해당 네임스페이스에서 찾기
      if (textNamespace) {
        const namespaceData = translations[textNamespace];
        if (namespaceData) {
          const value = getNestedValue(namespaceData, translationKey);
          if (value) {
            return interpolateParams(value, interpolationParams);
          }
        }
      }
      
      // 전체 번역 데이터에서 키로 검색
      const value = getNestedValue(translations, translationKey);
      if (value) {
        return interpolateParams(value, interpolationParams);
      }
      
      // 네임스페이스.키 형태로 재시도
      if (translationKey.includes('.')) {
        const [ns, ...keyParts] = translationKey.split('.');
        const nsData = translations[ns];
        if (nsData) {
          const nestedValue = getNestedValue(nsData, keyParts.join('.'));
          if (nestedValue) {
            return interpolateParams(nestedValue, interpolationParams);
          }
        }
      }
      
      console.warn(`Translation not found: ${translationKey} (language: ${language}, namespace: ${textNamespace})`);
      return translationKey; // 번역을 찾을 수 없으면 키 자체를 반환
      
    } catch (error) {
      console.error('Translation error:', error);
      return translationKey;
    }
  }, [language]);

  // 언어 변경 시 HTML lang 속성 설정
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: I18nContextType = {
    language,
    setLanguage: switchToLanguage,
    t: translateText,
    supportedLanguages: DEFAULT_SUPPORTED_LANGUAGES,
    isLoading,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

/**
 * 중첩된 객체에서 점 표기법으로 값을 가져오는 헬퍼 함수
 */
function getNestedValue(obj: any, path: string): string | undefined {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  
  return typeof current === 'string' ? current : undefined;
}

/**
 * 파라미터 보간을 수행하는 헬퍼 함수
 */
function interpolateParams(text: string, params?: TranslationParams): string {
  if (!params) return text;
  
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return params[key]?.toString() || match;
  });
}