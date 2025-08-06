/**
 * 다국어 시스템을 위한 커스텀 훅들
 */

import { useContext } from 'react';
import { I18nContext } from './translation-provider';
import type { TranslationKey, TranslationParams, TranslationNamespace } from './types';

/**
 * 다국어 컨텍스트를 사용하는 훅
 */
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

/**
 * 번역 함수만 가져오는 간단한 훅
 */
export const useTranslation = () => {
  const { t } = useI18n();
  return { t };
};

/**
 * 현재 언어만 가져오는 훅
 */
export const useCurrentLanguage = () => {
  const { language } = useI18n();
  return language;
};

/**
 * 언어 변경 함수만 가져오는 훅
 */
export const useLanguageSwitcher = () => {
  const { setLanguage, supportedLanguages } = useI18n();
  return { setLanguage, supportedLanguages };
};

/**
 * 네임스페이스별 번역 함수를 제공하는 훅
 */
export const useNamespacedTranslation = (namespace: TranslationNamespace) => {
  const { t } = useI18n();
  
  const nsT = (key: TranslationKey, params?: TranslationParams) => {
    return t(key, params, namespace);
  };
  
  return { t: nsT, namespace };
};

/**
 * 특정 네임스페이스의 번역들을 미리 가져오는 훅
 */
export const usePrefetchTranslations = (namespaces: TranslationNamespace[]) => {
  const { language } = useI18n();
  
  // 실제 구현에서는 번역 데이터를 미리 로드하는 로직을 추가할 수 있습니다
  // 현재는 단순히 현재 언어를 반환합니다
  return { language, prefetched: namespaces };
};

/**
 * 다국어 지원 여부를 확인하는 훅
 */
export const useIsMultiLanguage = () => {
  const { supportedLanguages } = useI18n();
  return supportedLanguages.length > 1;
};