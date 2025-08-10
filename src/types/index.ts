/**
 * 타입 정의 통합 진입점
 * 
 * 애플리케이션의 모든 타입 정의를 중앙에서 관리하고 export합니다.
 * 이 파일을 통해 타입들을 일관되게 import할 수 있습니다.
 * 
 * @example
 * ```typescript
 * import { 
 *   SupportedLanguage, 
 *   LocalizedText, 
 *   isLocalizedText,
 *   validateType 
 * } from '@/types';
 * 
 * const text: LocalizedText = { ko: '안녕', ja: 'こんにちは' };
 * if (isLocalizedText(text)) {
 *   console.log(text.ko); // 타입 안전함
 * }
 * ```
 * 
 * @fileoverview
 * 타입 시스템의 특징:
 * - 브랜드 타입으로 타입 안전성 보장
 * - 런타임 타입 가드로 검증
 * - 포괄적인 JSDoc 문서화
 * - 레거시 호환성 지원
 * 
 * @author 개발팀
 * @version 1.0.0
 */

// =============================================================================
// CORE TYPES - 핵심 타입들
// =============================================================================

export type {
  // Branded types
  MenuItemId,
  RoutePath,
  TranslationKey,
  
  // Language types
  SupportedLanguage,
  LocalizedText,
  PartialLocalizedText,
  NestedLocalizedText,
  
  // Application types
  AppMode,
  Environment,
  
  // Menu types
  BaseMenuItem,
  CourseMenuItem,
  NavigationMenuItem,
  MenuCategory,
  
  // Route types
  AppRoute,
  
  // Utility types
  DeepReadonly,
  RequiredFields,
  OptionalFields,
  NonNullable,
  
  // Type guard types
  TypeGuard,
  
  // Configuration types
  FeatureFlags,
  MenuVisibility,
  AppConfig
} from './core';

// =============================================================================
// TYPE GUARDS - 타입 가드들
// =============================================================================

export {
  // Primitive guards
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
  isNotNull,
  isNotUndefined,
  isNotNullish,
  
  // Domain guards
  isSupportedLanguage,
  isAppMode,
  isEnvironment,
  isMenuItemId,
  isRoutePath,
  isTranslationKey,
  
  // Localized text guards
  isLocalizedText,
  isPartialLocalizedText,
  isNestedLocalizedText,
  
  // Menu item guards
  isBaseMenuItem,
  isCourseMenuItem,
  isNavigationMenuItem,
  
  // Route guards
  isAppRoute,
  
  // Validation utilities
  validateType,
  validateArray,
  validateRequiredFields,
  
  // Validation result type
  type ValidationResult,
  
  // Assertion utilities
  assertType,
  assertNotNull,
  assertNotUndefined,
  assertNotNullish
} from './guards';

// =============================================================================
// I18N TYPES - 국제화 타입들
// =============================================================================

export type {
  // Namespace types
  TranslationNamespace,
  NamespacedTranslationKey,
  
  // Parameter types
  TranslationParamValue,
  TranslationParams,
  TranslationOptions,
  
  // Function types
  TranslationFunction,
  NamespacedTranslationFunction,
  
  // Data types
  LanguageData,
  TranslationData,
  TranslationLoader,
  TranslationCache,
  
  // Context types
  I18nContextState,
  I18nContextActions,
  I18nContextType,
  
  // Hook types
  UseTranslationResult,
  UseNamespacedTranslationResult,
  UseLanguageSwitcherResult,
  
  // Utility types
  TranslationKeyExtractionResult,
  TranslationValidationResult,
  TranslationStats,
  
  // Provider types
  I18nProviderProps,
  
  // Configuration types
  I18nConfig
} from './i18n';


// =============================================================================
// RE-EXPORTS - 기본 React 타입들 재export
// =============================================================================

export type {
  ReactNode,
  ReactElement,
  ComponentType,
  FC,
  PropsWithChildren
} from 'react';


// =============================================================================
// CONFIGURATION UTILITIES - 구성 유틸리티들
// =============================================================================

export {
  // Default configurations
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  DEFAULT_APP_MODE,
  DEFAULT_ENVIRONMENT,
  DEFAULT_FEATURE_FLAGS,
  DEFAULT_MENU_VISIBILITY,
  DEFAULT_NAMESPACES,
  
  // Configuration builders
  buildEnvironmentConfig,
  buildI18nConfig,
  buildAppConfig,
  buildRuntimeConfig,
  
  // Configuration validators
  validateFeatureFlags,
  validateMenuVisibility,
  validateAppConfig,
  
  // Configuration utilities
  getCurrentRuntimeConfig,
  mergeConfigs,
  serializeConfig,
  logConfigInDev
} from './config';

export type {
  // Configuration types
  EnvironmentConfig,
  RuntimeConfig
} from './config';

// =============================================================================
// UTILITY TYPE HELPERS - 유틸리티 타입 헬퍼들
// =============================================================================

/**
 * 객체의 키들을 유니온 타입으로 추출
 */
export type KeysOf<T> = keyof T;

/**
 * 객체의 값들을 유니온 타입으로 추출
 */
export type ValuesOf<T> = T[keyof T];

/**
 * 함수의 첫 번째 파라미터 타입 추출
 */
export type FirstParameter<T extends (...args: unknown[]) => unknown> = T extends (
  first: infer P,
  ...args: unknown[]
) => unknown
  ? P
  : never;

/**
 * 함수의 리턴 타입에서 Promise를 언래핑
 */
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

/**
 * 배열 타입에서 요소 타입 추출
 */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

/**
 * 선택적 필드들을 포함한 Partial 타입
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 함수가 아닌 프로퍼티들만 추출
 */
export type NonFunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

/**
 * 함수가 아닌 프로퍼티들로만 구성된 타입
 */
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

/**
 * 특정 타입을 제외한 타입
 */
export type Exclude<T, U> = T extends U ? never : T;

/**
 * 특정 타입만 추출한 타입
 */
export type Extract<T, U> = T extends U ? T : never;

// =============================================================================
// AUTH TYPES - 인증 관련 타입들  
// =============================================================================

export type {
  // Core auth types
  User,
  UserRole,
  Permission,
  LoginCredentials,
  LoginResponse,
  LogoutResponse,
  TokenPayload,
  AuthState,
  AuthAction,
  AuthContextType,
  ProtectedRouteConfig,
  
  // Utility types
  WithAuthProps,
  WithOptionalAuthProps
} from './auth';

export {
  // Constants
  ROLE_PERMISSIONS,
  
  // Type guards
  isUserRole,
  isPermission,
  isUser,
  isTokenPayload
} from './auth';