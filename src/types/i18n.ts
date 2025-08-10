/**
 * 국제화(i18n) 시스템을 위한 타입 정의
 * 
 * 타입 안전한 다국어 시스템을 위한 엄격한 타입 정의들을 제공합니다.
 * 컴파일 타임에 번역 키 검증과 타입 안전성을 보장합니다.
 */

import type { 
  SupportedLanguage, 
  NestedLocalizedText,
  TranslationKey
} from './core';

// =============================================================================
// TRANSLATION NAMESPACE TYPES - 번역 네임스페이스 타입들
// =============================================================================

/**
 * 지원되는 번역 네임스페이스들
 * 
 * @description 각 네임스페이스는 관련된 번역들을 그룹화합니다
 */
export type TranslationNamespace = 
  | 'common'      // 공통 텍스트
  | 'header'      // 헤더 관련
  | 'menu'        // 메뉴 관련
  | 'location'    // 장소 관련
  | 'program'     // 프로그램 관련
  | 'ui'          // UI 요소들
  | 'floating';   // 플로팅 UI

/**
 * 번역 키의 형태를 나타내는 타입
 * 
 * @example "common.loading" | "menu.title" | "course.items.0"
 */
export type NamespacedTranslationKey = `${TranslationNamespace}.${string}`;

// =============================================================================
// TRANSLATION PARAMETER TYPES - 번역 파라미터 타입들
// =============================================================================

/**
 * 번역 파라미터 값 타입
 */
export type TranslationParamValue = string | number | boolean;

/**
 * 번역 파라미터 맵 인터페이스
 * 
 * @description 번역 텍스트 내의 {{key}} 플레이스홀더를 대체할 값들
 * @example { name: '홍길동', count: 5 } → '{{name}}님이 {{count}}개를 주문했습니다'
 */
export interface TranslationParameterMap {
  readonly [key: string]: TranslationParamValue;
}

/**
 * 번역 함수 옵션 인터페이스
 * 
 * @description 번역 수행 시 추가적으로 제공할 수 있는 옵션들
 */
export interface TranslationConfiguration {
  /** 기본값 - 번역을 찾을 수 없을 때 사용할 대체 텍스트 */
  readonly defaultValue?: string;
  /** 파라미터 값들 - 번역 텍스트의 플레이스홀더를 대체할 값들 */
  readonly params?: TranslationParameterMap;
  /** 네임스페이스 - 번역 키를 찾을 네임스페이스 명시적 지정 */
  readonly namespace?: TranslationNamespace;
  /** 대체 언어 - 번역을 찾을 수 없을 때 사용할 언어 */
  readonly fallbackLanguage?: SupportedLanguage;
}

// =============================================================================
// LEGACY COMPATIBILITY TYPES - 레거시 호환성 타입들
// =============================================================================

/**
 * @deprecated TranslationParameterMap을 사용하세요
 */
export type TranslationParams = TranslationParameterMap;

/**
 * @deprecated TranslationConfiguration을 사용하세요
 */
export interface TranslationOptions {
  readonly defaultValue?: string;
  readonly params?: TranslationParams;
  readonly namespace?: TranslationNamespace;
  readonly fallbackLanguage?: SupportedLanguage;
}

// =============================================================================
// TRANSLATION FUNCTION TYPES - 번역 함수 타입들
// =============================================================================

/**
 * 기본 번역 함수 시그니처
 */
export type TranslationFunction = {
  /**
   * 번역 키로 번역된 텍스트를 가져옵니다
   * 
   * @param key - 번역 키 (e.g., 'menu.title')
   * @param options - 번역 옵션들 (파라미터, 네임스페이스 등)
   * @returns 번역된 텍스트 (문자열 또는 문자열 배열)
   */
  (key: TranslationKey, options?: TranslationConfiguration): string | string[];
  
  /**
   * 네임스페이스와 키로 번역된 텍스트를 가져옵니다
   * 
   * @param namespace - 번역 네임스페이스 (e.g., 'menu')
   * @param key - 네임스페이스 내 번역 키 (e.g., 'title')
   * @param options - 번역 옵션들
   * @returns 번역된 텍스트 (문자열 또는 문자열 배열)
   */
  (namespace: TranslationNamespace, key: string, options?: TranslationConfiguration): string | string[];
};

/**
 * 네임스페이스별 번역 함수 시그니처
 */
/**
 * 특정 네임스페이스에 바인드된 번역 함수 시그니처
 * 
 * @description 네임스페이스가 미리 지정된 번역 함수
 */
export type NamespacedTranslationFunction = (
  key: string,
  options?: Omit<TranslationConfiguration, 'namespace'>
) => string | string[];

// =============================================================================
// TRANSLATION DATA TYPES - 번역 데이터 타입들
// =============================================================================

/**
 * 언어별 번역 데이터 구조
 * 
 * @description 각 언어에 대한 모든 네임스페이스의 번역 데이터
 */
export type LanguageData = {
  readonly [K in TranslationNamespace]: NestedLocalizedText;
};

/**
 * 전체 번역 데이터 구조
 * 
 * @description 모든 지원 언어에 대한 번역 데이터
 */
export type TranslationData = {
  readonly [L in SupportedLanguage]: LanguageData;
};

/**
 * 번역 로더 함수 타입
 * 
 * @description 동적으로 번역 데이터를 로드하는 함수
 */
export type TranslationLoader = (
  language: SupportedLanguage,
  namespace?: TranslationNamespace
) => Promise<NestedLocalizedText>;

/**
 * 번역 캐시 인터페이스
 */
export interface TranslationCache {
  /** 번역 데이터 가져오기 */
  get(language: SupportedLanguage, namespace: TranslationNamespace): NestedLocalizedText | undefined;
  
  /** 번역 데이터 저장하기 */
  set(language: SupportedLanguage, namespace: TranslationNamespace, data: NestedLocalizedText): void;
  
  /** 캐시 클리어 */
  clear(): void;
  
  /** 특정 언어의 캐시만 클리어 */
  clearLanguage(language: SupportedLanguage): void;
}

// =============================================================================
// I18N CONTEXT TYPES - i18n 컨텍스트 타입들
// =============================================================================

/**
 * i18n 컨텍스트의 상태
 */
export interface I18nContextState {
  /** 현재 언어 */
  readonly language: SupportedLanguage;
  /** 지원되는 언어 목록 */
  readonly supportedLanguages: readonly SupportedLanguage[];
  /** 로딩 상태 */
  readonly isLoading: boolean;
  /** 에러 상태 */
  readonly error: string | null;
  /** 번역 데이터 로딩 여부 */
  readonly isTranslationsLoaded: boolean;
}

/**
 * i18n 컨텍스트의 액션들
 */
export interface I18nContextActions {
  /** 언어 변경 */
  setLanguage: (language: SupportedLanguage) => void | Promise<void>;
  
  /** 번역 데이터 다시 로드 */
  reloadTranslations: () => Promise<void>;
  
  /** 특정 네임스페이스 프리로드 */
  preloadNamespace: (namespace: TranslationNamespace) => Promise<void>;
  
  /** 에러 클리어 */
  clearError: () => void;
}

/**
 * i18n 컨텍스트 전체 타입
 */
export interface I18nContextType extends I18nContextState, I18nContextActions {
  /** 번역 함수 */
  readonly translate: TranslationFunction;
  
  /** 네임스페이스별 번역 함수 팩토리 */
  readonly createNamespacedTranslator: (namespace: TranslationNamespace) => NamespacedTranslationFunction;
}

// =============================================================================
// HOOK TYPES - 훅 관련 타입들
// =============================================================================

/**
 * useTranslation 훅의 반환 타입
 */
export interface UseTranslationResult {
  /** 번역 함수 */
  readonly translate: TranslationFunction;
  /** 현재 언어 */
  readonly language: SupportedLanguage;
  /** 로딩 상태 */
  readonly isLoading: boolean;
  /** 에러 상태 */
  readonly error: string | null;
}

/**
 * useNamespacedTranslation 훅의 반환 타입
 */
export interface UseNamespacedTranslationResult {
  /** 네임스페이스별 번역 함수 */
  readonly translate: NamespacedTranslationFunction;
  /** 현재 언어 */
  readonly language: SupportedLanguage;
  /** 로딩 상태 */
  readonly isLoading: boolean;
  /** 에러 상태 */
  readonly error: string | null;
}

/**
 * useLanguageSwitcher 훅의 반환 타입
 */
export interface UseLanguageSwitcherResult {
  /** 현재 언어 */
  readonly currentLanguage: SupportedLanguage;
  /** 지원되는 언어 목록 */
  readonly supportedLanguages: readonly SupportedLanguage[];
  /** 언어 변경 함수 */
  readonly setLanguage: (language: SupportedLanguage) => void | Promise<void>;
  /** 언어 표시명 가져오기 */
  readonly getLanguageDisplayName: (language: SupportedLanguage) => string;
  /** 다국어 지원 여부 */
  readonly isMultiLanguage: boolean;
}

// =============================================================================
// TRANSLATION UTILITY TYPES - 번역 유틸리티 타입들
// =============================================================================

/**
 * 번역 키 추출 결과
 */
export interface TranslationKeyExtractionResult {
  /** 추출된 키들 */
  readonly keys: readonly TranslationKey[];
  /** 네임스페이스별 키들 */
  readonly keysByNamespace: Record<TranslationNamespace, readonly string[]>;
  /** 총 키 개수 */
  readonly totalKeys: number;
}

/**
 * 번역 검증 결과
 */
export interface TranslationValidationResult {
  /** 검증 성공 여부 */
  readonly isValid: boolean;
  /** 누락된 번역 키들 */
  readonly missingKeys: readonly TranslationKey[];
  /** 사용되지 않는 번역 키들 */
  readonly unusedKeys: readonly TranslationKey[];
  /** 에러 메시지들 */
  readonly errors: readonly string[];
  /** 경고 메시지들 */
  readonly warnings: readonly string[];
}

/**
 * 번역 통계 정보
 */
export interface TranslationStats {
  /** 언어별 번역 키 수 */
  readonly keysByLanguage: Record<SupportedLanguage, number>;
  /** 네임스페이스별 번역 키 수 */
  readonly keysByNamespace: Record<TranslationNamespace, number>;
  /** 번역 완성도 (퍼센트) */
  readonly completionRate: Record<SupportedLanguage, number>;
  /** 총 번역 키 수 */
  readonly totalKeys: number;
}

// =============================================================================
// PROVIDER TYPES - 프로바이더 타입들
// =============================================================================

/**
 * I18nProvider 컴포넌트의 props
 */
export interface I18nProviderProps {
  /** 자식 컴포넌트들 */
  readonly children: React.ReactNode;
  /** 초기 언어 (선택적) */
  readonly initialLanguage?: SupportedLanguage;
  /** 번역 데이터 (선택적, 정적 데이터용) */
  readonly translations?: TranslationData;
  /** 번역 로더 (선택적, 동적 로딩용) */
  readonly loader?: TranslationLoader;
  /** 캐시 구현체 (선택적) */
  readonly cache?: TranslationCache;
  /** 에러 처리 함수 (선택적) */
  readonly onError?: (error: Error) => void;
  /** 언어 변경 시 콜백 (선택적) */
  readonly onLanguageChange?: (language: SupportedLanguage) => void;
}

// =============================================================================
// CONFIGURATION TYPES - 설정 타입들
// =============================================================================

/**
 * i18n 시스템 설정
 */
export interface I18nConfig {
  /** 기본 언어 */
  readonly defaultLanguage: SupportedLanguage;
  /** 지원되는 언어 목록 */
  readonly supportedLanguages: readonly SupportedLanguage[];
  /** 대체 언어 */
  readonly fallbackLanguage: SupportedLanguage;
  /** 네임스페이스 목록 */
  readonly namespaces: readonly TranslationNamespace[];
  /** 번역 파일 경로 패턴 */
  readonly translationFilePattern?: string;
  /** 번역 키 구분자 */
  readonly keySeparator: string;
  /** 네임스페이스 구분자 */
  readonly namespaceSeparator: string;
  /** 개발 모드에서 디버그 정보 표시 여부 */
  readonly debug: boolean;
  /** 번역 캐시 사용 여부 */
  readonly enableCache: boolean;
  /** 캐시 TTL (밀리초) */
  readonly cacheTTL: number;
}