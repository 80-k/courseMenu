/**
 * 브랜드 타입 유틸리티
 * 
 * 타입 안전성을 위한 브랜드 타입 생성과 검증 유틸리티들을 제공합니다.
 * 런타임에서는 일반 값이지만 컴파일 타임에서는 구별되는 타입을 만들 수 있습니다.
 */

import type {
  MenuItemId,
  RoutePath,
  TranslationKey,
  SupportedLanguage
} from './core';
import { 
  isString,
  type ValidationResult
} from './guards';

// =============================================================================
// BRAND TYPE CREATORS - 브랜드 타입 생성자들
// =============================================================================

/**
 * 메뉴 항목 ID 생성
 * 
 * @param value - 문자열 값
 * @returns 유효한 메뉴 항목 ID 또는 null
 */
export function createMenuItemId(value: string): MenuItemId | null {
  if (!isString(value) || value.trim().length === 0) {
    return null;
  }
  
  // 메뉴 ID는 영숫자, 하이픈, 언더스코어만 허용
  const validPattern = /^[a-zA-Z0-9_-]+$/;
  if (!validPattern.test(value)) {
    return null;
  }
  
  return value as MenuItemId;
}

/**
 * 라우트 경로 생성
 * 
 * @param value - 경로 문자열
 * @returns 유효한 라우트 경로 또는 null
 */
export function createRoutePath(value: string): RoutePath | null {
  if (!isString(value)) {
    return null;
  }
  
  // 경로는 반드시 /로 시작해야 함
  if (!value.startsWith('/')) {
    return null;
  }
  
  // 유효한 URL 경로 패턴 검증
  const validPathPattern = /^\/[\w\-/]*$/;
  if (!validPathPattern.test(value)) {
    return null;
  }
  
  return value as RoutePath;
}

/**
 * 번역 키 생성
 * 
 * @param value - 번역 키 문자열
 * @returns 유효한 번역 키 또는 null
 */
export function createTranslationKey(value: string): TranslationKey | null {
  if (!isString(value) || value.trim().length === 0) {
    return null;
  }
  
  // 번역 키는 점으로 구분된 네임스페이스.키 형태여야 함
  const validKeyPattern = /^[a-zA-Z][a-zA-Z0-9]*(\.[a-zA-Z][a-zA-Z0-9]*)*$/;
  if (!validKeyPattern.test(value)) {
    return null;
  }
  
  return value as TranslationKey;
}

// =============================================================================
// VALIDATION FUNCTIONS - 검증 함수들
// =============================================================================

/**
 * 메뉴 항목 ID 검증
 * 
 * @param value - 검증할 값
 * @returns 검증 결과
 */
export function validateMenuItemId(value: unknown): ValidationResult<MenuItemId> {
  if (!isString(value)) {
    return {
      isValid: false,
      errors: ['Menu item ID must be a string']
    };
  }
  
  const menuItemId = createMenuItemId(value);
  if (menuItemId === null) {
    return {
      isValid: false,
      errors: ['Invalid menu item ID format. Must contain only alphanumeric characters, hyphens, and underscores']
    };
  }
  
  return {
    isValid: true,
    data: menuItemId
  };
}

/**
 * 라우트 경로 검증
 * 
 * @param value - 검증할 값
 * @returns 검증 결과
 */
export function validateRoutePath(value: unknown): ValidationResult<RoutePath> {
  if (!isString(value)) {
    return {
      isValid: false,
      errors: ['Route path must be a string']
    };
  }
  
  const routePath = createRoutePath(value);
  if (routePath === null) {
    return {
      isValid: false,
      errors: ['Invalid route path format. Must start with / and contain only valid URL characters']
    };
  }
  
  return {
    isValid: true,
    data: routePath
  };
}

/**
 * 번역 키 검증
 * 
 * @param value - 검증할 값
 * @returns 검증 결과
 */
export function validateTranslationKey(value: unknown): ValidationResult<TranslationKey> {
  if (!isString(value)) {
    return {
      isValid: false,
      errors: ['Translation key must be a string']
    };
  }
  
  const translationKey = createTranslationKey(value);
  if (translationKey === null) {
    return {
      isValid: false,
      errors: ['Invalid translation key format. Must follow namespace.key pattern with alphanumeric characters']
    };
  }
  
  return {
    isValid: true,
    data: translationKey
  };
}

// =============================================================================
// CONVERSION UTILITIES - 변환 유틸리티들
// =============================================================================

/**
 * 안전하게 문자열을 메뉴 항목 ID로 변환
 * 
 * @param value - 변환할 문자열
 * @param fallback - 실패시 사용할 기본값
 * @returns 메뉴 항목 ID
 */
export function toMenuItemId(value: string, fallback: MenuItemId): MenuItemId {
  const menuItemId = createMenuItemId(value);
  return menuItemId ?? fallback;
}

/**
 * 안전하게 문자열을 라우트 경로로 변환
 * 
 * @param value - 변환할 문자열
 * @param fallback - 실패시 사용할 기본값
 * @returns 라우트 경로
 */
export function toRoutePath(value: string, fallback: RoutePath): RoutePath {
  const routePath = createRoutePath(value);
  return routePath ?? fallback;
}

/**
 * 안전하게 문자열을 번역 키로 변환
 * 
 * @param value - 변환할 문자열
 * @param fallback - 실패시 사용할 기본값
 * @returns 번역 키
 */
export function toTranslationKey(value: string, fallback: TranslationKey): TranslationKey {
  const translationKey = createTranslationKey(value);
  return translationKey ?? fallback;
}

// =============================================================================
// BRAND TYPE CHECKERS - 브랜드 타입 체커들
// =============================================================================

/**
 * 값이 메뉴 항목 ID인지 확인
 * 
 * @param value - 확인할 값
 * @returns 메뉴 항목 ID 여부
 */
export function isMenuItemId(value: unknown): value is MenuItemId {
  return validateMenuItemId(value).isValid;
}

/**
 * 값이 라우트 경로인지 확인
 * 
 * @param value - 확인할 값
 * @returns 라우트 경로 여부
 */
export function isRoutePath(value: unknown): value is RoutePath {
  return validateRoutePath(value).isValid;
}

/**
 * 값이 번역 키인지 확인
 * 
 * @param value - 확인할 값
 * @returns 번역 키 여부
 */
export function isTranslationKey(value: unknown): value is TranslationKey {
  return validateTranslationKey(value).isValid;
}

// =============================================================================
// BRANDED TYPE UTILITIES - 브랜드 타입 유틸리티들
// =============================================================================

/**
 * 브랜드 타입에서 원본 값 추출
 * 
 * @param brandedValue - 브랜드 타입 값
 * @returns 원본 문자열 값
 */
export function unwrapBrandedType<T extends string>(brandedValue: T): string {
  return brandedValue as string;
}

/**
 * 여러 브랜드 값들을 원본 문자열 배열로 변환
 * 
 * @param brandedValues - 브랜드 타입 값들
 * @returns 원본 문자열 배열
 */
export function unwrapBrandedArray<T extends string>(brandedValues: readonly T[]): string[] {
  return brandedValues.map(unwrapBrandedType);
}

/**
 * 브랜드 타입 값을 안전하게 다른 브랜드 타입으로 변환
 * 
 * @param value - 변환할 브랜드 값
 * @param validator - 대상 브랜드 타입 검증자
 * @returns 변환된 브랜드 값 또는 null
 */
export function convertBrandedType<From extends string, To extends string>(
  value: From,
  validator: (value: unknown) => value is To
): To | null {
  const stringValue = unwrapBrandedType(value);
  return validator(stringValue) ? stringValue as To : null;
}

// =============================================================================
// LANGUAGE-SPECIFIC UTILITIES - 언어별 유틸리티들
// =============================================================================

/**
 * 언어 코드에 따른 기본 라우트 경로 생성
 * 
 * @param language - 언어 코드
 * @param basePath - 기본 경로
 * @returns 언어별 라우트 경로
 */
export function createLocalizedRoutePath(
  language: SupportedLanguage, 
  basePath: string
): RoutePath {
  const localizedPath = `/${language}${basePath}`;
  const routePath = createRoutePath(localizedPath);
  
  if (routePath === null) {
    throw new Error(`Invalid localized route path: ${localizedPath}`);
  }
  
  return routePath;
}

/**
 * 언어별 번역 키 생성
 * 
 * @param namespace - 네임스페이스
 * @param key - 키
 * @param language - 언어 (선택적)
 * @returns 번역 키
 */
export function createNamespacedTranslationKey(
  namespace: string,
  key: string,
  language?: SupportedLanguage
): TranslationKey {
  const fullKey = language 
    ? `${namespace}.${language}.${key}`
    : `${namespace}.${key}`;
  
  const translationKey = createTranslationKey(fullKey);
  
  if (translationKey === null) {
    throw new Error(`Invalid translation key: ${fullKey}`);
  }
  
  return translationKey;
}