/**
 * 타입 가드 및 검증 유틸리티
 * 
 * 런타임에서 타입 안전성을 보장하기 위한 타입 가드 함수들을 제공합니다.
 * 모든 함수는 타입 narrowing을 지원하며, 명확한 에러 메시지를 제공합니다.
 */

import type {
  SupportedLanguage,
  LocalizedText,
  PartialLocalizedText,
  NestedLocalizedText,
  AppMode,
  Environment,
  MenuItemId,
  RoutePath,
  TranslationKey,
  BaseMenuItem,
  CourseMenuItem,
  NavigationMenuItem,
  AppRoute,
  TypeGuard
} from './core';

/**
 * 타입 검증 결과
 */
export interface ValidationResult<T> {
  readonly isValid: boolean;
  readonly data?: T;
  readonly errors?: readonly string[];
}

// =============================================================================
// PRIMITIVE TYPE GUARDS - 기본 타입 가드들
// =============================================================================

/**
 * 문자열인지 확인하는 타입 가드
 */
export const isString: TypeGuard<string> = (value): value is string => 
  typeof value === 'string';

/**
 * 숫자인지 확인하는 타입 가드
 */
export const isNumber: TypeGuard<number> = (value): value is number => 
  typeof value === 'number' && !isNaN(value);

/**
 * 불린인지 확인하는 타입 가드
 */
export const isBoolean: TypeGuard<boolean> = (value): value is boolean => 
  typeof value === 'boolean';

/**
 * 객체인지 확인하는 타입 가드 (null 제외)
 */
export const isObject: TypeGuard<Record<string, unknown>> = (value): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * 배열인지 확인하는 타입 가드
 */
export const isArray: TypeGuard<readonly unknown[]> = (value): value is readonly unknown[] =>
  Array.isArray(value);

/**
 * null이 아닌 값인지 확인하는 타입 가드
 */
export const isNotNull = <T>(value: T | null): value is T =>
  value !== null;

/**
 * undefined가 아닌 값인지 확인하는 타입 가드
 */
export const isNotUndefined = <T>(value: T | undefined): value is T =>
  value !== undefined;

/**
 * null과 undefined가 아닌 값인지 확인하는 타입 가드
 */
export const isNotNullish = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined;

// =============================================================================
// DOMAIN TYPE GUARDS - 도메인 타입 가드들
// =============================================================================

/**
 * 지원되는 언어 코드인지 확인
 */
export const isSupportedLanguage: TypeGuard<SupportedLanguage> = (value): value is SupportedLanguage =>
  isString(value) && (value === 'ko' || value === 'ja');

/**
 * 애플리케이션 모드인지 확인
 */
export const isAppMode: TypeGuard<AppMode> = (value): value is AppMode =>
  isString(value) && ['wedding', 'sanggyeonrye', 'afterparty'].includes(value);

/**
 * 환경 타입인지 확인
 */
export const isEnvironment: TypeGuard<Environment> = (value): value is Environment =>
  isString(value) && ['development', 'staging', 'production'].includes(value);

/**
 * 메뉴 항목 ID인지 확인
 */
export const isMenuItemId: TypeGuard<MenuItemId> = (value): value is MenuItemId =>
  isString(value) && value.length > 0;

/**
 * 라우트 경로인지 확인
 */
export const isRoutePath: TypeGuard<RoutePath> = (value): value is RoutePath =>
  isString(value) && value.startsWith('/');

/**
 * 번역 키인지 확인
 */
export const isTranslationKey: TypeGuard<TranslationKey> = (value): value is TranslationKey =>
  isString(value) && value.length > 0;

// =============================================================================
// LOCALIZED TEXT TYPE GUARDS - 다국어 텍스트 타입 가드들
// =============================================================================

/**
 * LocalizedText 객체인지 확인
 */
export const isLocalizedText: TypeGuard<LocalizedText> = (value): value is LocalizedText => {
  if (!isObject(value)) return false;
  
  // 모든 지원 언어에 대한 문자열 값이 있는지 확인
  const supportedLanguages: SupportedLanguage[] = ['ko', 'ja'];
  return supportedLanguages.every(lang => 
    lang in value && isString(value[lang])
  );
};

/**
 * PartialLocalizedText 객체인지 확인
 */
export const isPartialLocalizedText: TypeGuard<PartialLocalizedText> = (value): value is PartialLocalizedText => {
  if (!isObject(value)) return false;
  
  // 적어도 하나의 지원 언어에 대한 문자열 값이 있는지 확인
  const supportedLanguages: SupportedLanguage[] = ['ko', 'ja'];
  return supportedLanguages.some(lang => 
    lang in value && isString(value[lang])
  );
};

/**
 * NestedLocalizedText 객체인지 확인
 */
export const isNestedLocalizedText: TypeGuard<NestedLocalizedText> = (value): value is NestedLocalizedText => {
  if (!isObject(value)) return false;
  
  // 모든 값이 유효한 nested localized text 구조인지 재귀적으로 확인
  return Object.values(value).every(nestedValue => 
    isString(nestedValue) || 
    isLocalizedText(nestedValue) || 
    (isArray(nestedValue) && nestedValue.every(isString)) ||
    isNestedLocalizedText(nestedValue)
  );
};

// =============================================================================
// MENU ITEM TYPE GUARDS - 메뉴 항목 타입 가드들
// =============================================================================

/**
 * BaseMenuItem 객체인지 확인
 */
export const isBaseMenuItem: TypeGuard<BaseMenuItem> = (value): value is BaseMenuItem => {
  if (!isObject(value)) return false;
  
  return (
    'id' in value && isMenuItemId(value.id) &&
    'title' in value && isLocalizedText(value.title) &&
    'enabled' in value && isBoolean(value.enabled) &&
    'visibleInModes' in value && isArray(value.visibleInModes) &&
    value.visibleInModes.every(isAppMode) &&
    (
      !('description' in value) || 
      value.description === undefined || 
      isLocalizedText(value.description)
    )
  );
};

/**
 * CourseMenuItem 객체인지 확인
 */
export const isCourseMenuItem: TypeGuard<CourseMenuItem> = (value): value is CourseMenuItem => {
  if (!isBaseMenuItem(value)) return false;
  
  return (
    'items' in value && 
    isArray(value.items) && 
    value.items.every(isLocalizedText)
  );
};

/**
 * NavigationMenuItem 객체인지 확인
 */
export const isNavigationMenuItem: TypeGuard<NavigationMenuItem> = (value): value is NavigationMenuItem => {
  if (!isBaseMenuItem(value)) return false;
  
  return (
    'icon' in value && isString(value.icon) &&
    'items' in value && isLocalizedText(value.items) &&
    (
      !('href' in value) || 
      value.href === undefined || 
      isRoutePath(value.href)
    )
  );
};

// =============================================================================
// ROUTE TYPE GUARDS - 라우트 타입 가드들
// =============================================================================

/**
 * AppRoute 객체인지 확인
 */
export const isAppRoute: TypeGuard<AppRoute> = (value): value is AppRoute => {
  if (!isObject(value)) return false;
  
  return (
    'path' in value && isRoutePath(value.path) &&
    'name' in value && isString(value.name) &&
    'component' in value && isString(value.component) &&
    'title' in value && isLocalizedText(value.title) &&
    'visibleInModes' in value && isArray(value.visibleInModes) &&
    value.visibleInModes.every(isAppMode) &&
    (
      !('requiresAuth' in value) || 
      value.requiresAuth === undefined || 
      isBoolean(value.requiresAuth)
    ) &&
    (
      !('isPublic' in value) || 
      value.isPublic === undefined || 
      isBoolean(value.isPublic)
    )
  );
};

// =============================================================================
// VALIDATION UTILITIES - 검증 유틸리티들
// =============================================================================

/**
 * 값을 검증하고 ValidationResult를 반환
 */
export function validateType<T>(
  value: unknown,
  guard: TypeGuard<T>,
  fieldName?: string
): ValidationResult<T> {
  try {
    if (guard(value)) {
      return {
        isValid: true,
        data: value
      };
    }
    
    return {
      isValid: false,
      errors: [`${fieldName || 'Value'} failed type validation`]
    };
  } catch (error) {
    return {
      isValid: false,
      errors: [`Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`]
    };
  }
}

/**
 * 배열의 모든 요소가 특정 타입인지 검증
 */
export function validateArray<T>(
  values: unknown,
  guard: TypeGuard<T>,
  fieldName?: string
): ValidationResult<readonly T[]> {
  if (!isArray(values)) {
    return {
      isValid: false,
      errors: [`${fieldName || 'Value'} is not an array`]
    };
  }
  
  const validatedItems: T[] = [];
  const errors: string[] = [];
  
  values.forEach((value, index) => {
    const result = validateType(value, guard, `${fieldName}[${index}]`);
    if (result.isValid && result.data !== undefined) {
      validatedItems.push(result.data);
    } else {
      errors.push(...(result.errors || []));
    }
  });
  
  if (errors.length > 0) {
    return {
      isValid: false,
      errors
    };
  }
  
  return {
    isValid: true,
    data: validatedItems
  };
}

/**
 * 객체의 필수 필드들을 검증
 */
export function validateRequiredFields<T extends Record<string, unknown>>(
  obj: unknown,
  requiredFields: readonly (keyof T)[],
  fieldName?: string
): ValidationResult<Partial<T>> {
  if (!isObject(obj)) {
    return {
      isValid: false,
      errors: [`${fieldName || 'Value'} is not an object`]
    };
  }
  
  const errors: string[] = [];
  
  requiredFields.forEach(field => {
    if (!(field in obj)) {
      errors.push(`Missing required field: ${String(field)}`);
    }
  });
  
  if (errors.length > 0) {
    return {
      isValid: false,
      errors
    };
  }
  
  return {
    isValid: true,
    data: obj as Partial<T>
  };
}

// =============================================================================
// ASSERTION UTILITIES - 어설션 유틸리티들
// =============================================================================

/**
 * 타입 어설션 - 개발 환경에서 타입 체크
 */
export function assertType<T>(
  value: unknown,
  guard: TypeGuard<T>,
  message?: string
): asserts value is T {
  if (!guard(value)) {
    throw new TypeError(message || 'Type assertion failed');
  }
}

/**
 * null이 아님을 어설션
 */
export function assertNotNull<T>(
  value: T | null,
  message?: string
): asserts value is T {
  if (value === null) {
    throw new TypeError(message || 'Value is null');
  }
}

/**
 * undefined가 아님을 어설션
 */
export function assertNotUndefined<T>(
  value: T | undefined,
  message?: string
): asserts value is T {
  if (value === undefined) {
    throw new TypeError(message || 'Value is undefined');
  }
}

/**
 * null과 undefined가 아님을 어설션
 */
export function assertNotNullish<T>(
  value: T | null | undefined,
  message?: string
): asserts value is T {
  if (value == null) {
    throw new TypeError(message || 'Value is null or undefined');
  }
}