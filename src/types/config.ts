/**
 * 타입 안전한 구성 관리 시스템
 * 
 * 애플리케이션의 모든 구성을 타입 안전하게 관리하는 시스템입니다.
 * 환경별 설정, 런타임 검증, 기본값 관리를 포함합니다.
 */

import type {
  SupportedLanguage,
  AppMode,
  Environment,
  FeatureFlags,
  MenuVisibility,
  AppConfig
} from './core';
import type { ValidationResult } from './guards';
import type { I18nConfig, TranslationNamespace } from './i18n';
import {
  isSupportedLanguage,
  isAppMode,
  isEnvironment
} from './guards';

// =============================================================================
// DEFAULT CONFIGURATIONS - 기본 구성들
// =============================================================================

/**
 * 기본 언어 설정
 */
export const DEFAULT_LANGUAGE: SupportedLanguage = 'ko';

/**
 * 지원되는 언어 목록
 */
export const SUPPORTED_LANGUAGES: readonly SupportedLanguage[] = ['ko', 'ja'] as const;

/**
 * 기본 애플리케이션 모드
 */
export const DEFAULT_APP_MODE: AppMode = 'wedding';

/**
 * 기본 환경
 */
export const DEFAULT_ENVIRONMENT: Environment = 'development';

/**
 * 기본 기능 플래그들
 */
export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  showSchedule: true,
  showLocation: true,
  showCourseMenu: true,
  showProgram: true,
  showFloatingButtons: true,
  showLanguageToggle: true,
} as const;

/**
 * 기본 메뉴 가시성 설정
 */
export const DEFAULT_MENU_VISIBILITY: MenuVisibility = {
  course: true,
  schedule: true,
  location: true,
  program: true,
} as const;

/**
 * 기본 번역 네임스페이스들
 */
export const DEFAULT_NAMESPACES: readonly TranslationNamespace[] = [
  'common',
  'header',
  'menu',
  'course',
  'leftPage',
  'location',
  'program',
  'ui',
  'floating'
] as const;

// =============================================================================
// CONFIGURATION INTERFACES - 구성 인터페이스들
// =============================================================================

/**
 * 환경 변수 기반 구성
 */
export interface EnvironmentConfig {
  /** 노드 환경 */
  readonly NODE_ENV: Environment;
  /** 개발 모드 여부 */
  readonly DEV: boolean;
  /** 프로덕션 모드 여부 */
  readonly PROD: boolean;
  /** API 기본 URL */
  readonly VITE_API_BASE_URL?: string;
  /** 애플리케이션 모드 */
  readonly VITE_APP_MODE?: AppMode;
  /** 기본 언어 */
  readonly VITE_DEFAULT_LANGUAGE?: SupportedLanguage;
  /** 디버그 모드 */
  readonly VITE_DEBUG?: boolean;
}

/**
 * 런타임 구성
 */
export interface RuntimeConfig extends AppConfig {
  /** 환경 설정 */
  readonly env: EnvironmentConfig;
  /** i18n 설정 */
  readonly i18n: I18nConfig;
  /** API 설정 */
  readonly api: {
    readonly baseUrl: string;
    readonly timeout: number;
    readonly retryAttempts: number;
  };
  /** 캐싱 설정 */
  readonly cache: {
    readonly enabled: boolean;
    readonly ttl: number;
    readonly maxSize: number;
  };
}

// =============================================================================
// CONFIGURATION BUILDERS - 구성 빌더들
// =============================================================================

/**
 * 환경 변수에서 구성을 빌드
 * 
 * @param env - 환경 변수들
 * @returns 검증된 환경 구성
 */
export function buildEnvironmentConfig(env: Record<string, string | undefined>): EnvironmentConfig {
  const nodeEnv = env.NODE_ENV;
  const isDev = env.DEV === 'true' || nodeEnv === 'development';
  const isProd = env.PROD === 'true' || nodeEnv === 'production';
  
  // 환경 검증
  const environment: Environment = isEnvironment(nodeEnv) 
    ? nodeEnv 
    : DEFAULT_ENVIRONMENT;
  
  // 앱 모드 검증
  const appMode: AppMode = isAppMode(env.VITE_APP_MODE) 
    ? env.VITE_APP_MODE 
    : DEFAULT_APP_MODE;
  
  // 기본 언어 검증
  const defaultLanguage: SupportedLanguage = isSupportedLanguage(env.VITE_DEFAULT_LANGUAGE)
    ? env.VITE_DEFAULT_LANGUAGE
    : DEFAULT_LANGUAGE;
  
  return {
    NODE_ENV: environment,
    DEV: isDev,
    PROD: isProd,
    VITE_API_BASE_URL: env.VITE_API_BASE_URL,
    VITE_APP_MODE: appMode,
    VITE_DEFAULT_LANGUAGE: defaultLanguage,
    VITE_DEBUG: env.VITE_DEBUG === 'true',
  } as const;
}

/**
 * i18n 구성을 빌드
 * 
 * @param envConfig - 환경 구성
 * @returns i18n 구성
 */
export function buildI18nConfig(envConfig: EnvironmentConfig): I18nConfig {
  return {
    defaultLanguage: envConfig.VITE_DEFAULT_LANGUAGE ?? DEFAULT_LANGUAGE,
    supportedLanguages: SUPPORTED_LANGUAGES,
    fallbackLanguage: DEFAULT_LANGUAGE,
    namespaces: DEFAULT_NAMESPACES,
    translationFilePattern: '/locales/{language}/{namespace}.json',
    keySeparator: '.',
    namespaceSeparator: ':',
    debug: envConfig.VITE_DEBUG ?? envConfig.DEV,
    enableCache: !envConfig.DEV,
    cacheTTL: envConfig.DEV ? 0 : 5 * 60 * 1000, // 5분
  } as const;
}

/**
 * 앱 구성을 빌드
 * 
 * @param envConfig - 환경 구성
 * @returns 앱 구성
 */
export function buildAppConfig(envConfig: EnvironmentConfig): AppConfig {
  return {
    mode: envConfig.VITE_APP_MODE ?? DEFAULT_APP_MODE,
    environment: envConfig.NODE_ENV,
    defaultLanguage: envConfig.VITE_DEFAULT_LANGUAGE ?? DEFAULT_LANGUAGE,
    supportedLanguages: SUPPORTED_LANGUAGES,
    features: DEFAULT_FEATURE_FLAGS,
    menuVisibility: DEFAULT_MENU_VISIBILITY,
  } as const;
}

/**
 * 런타임 구성을 빌드
 * 
 * @param env - 환경 변수들
 * @returns 완전한 런타임 구성
 */
export function buildRuntimeConfig(env: Record<string, string | undefined>): RuntimeConfig {
  const envConfig = buildEnvironmentConfig(env);
  const appConfig = buildAppConfig(envConfig);
  const i18nConfig = buildI18nConfig(envConfig);
  
  return {
    ...appConfig,
    env: envConfig,
    i18n: i18nConfig,
    api: {
      baseUrl: envConfig.VITE_API_BASE_URL ?? '/api',
      timeout: 10000,
      retryAttempts: 3,
    },
    cache: {
      enabled: !envConfig.DEV,
      ttl: envConfig.DEV ? 0 : 5 * 60 * 1000, // 5분
      maxSize: 100,
    },
  } as const;
}

// =============================================================================
// CONFIGURATION VALIDATION - 구성 검증
// =============================================================================

/**
 * 기능 플래그들을 검증
 * 
 * @param features - 검증할 기능 플래그들
 * @returns 검증 결과
 */
export function validateFeatureFlags(features: unknown): ValidationResult<FeatureFlags> {
  if (typeof features !== 'object' || features === null) {
    return {
      isValid: false,
      errors: ['Feature flags must be an object']
    };
  }
  
  const featureObj = features as Record<string, unknown>;
  const requiredFeatures: (keyof FeatureFlags)[] = [
    'showSchedule',
    'showLocation', 
    'showCourseMenu',
    'showProgram',
    'showFloatingButtons',
    'showLanguageToggle'
  ];
  
  const errors: string[] = [];
  
  for (const feature of requiredFeatures) {
    if (!(feature in featureObj)) {
      errors.push(`Missing required feature flag: ${feature}`);
    } else if (typeof featureObj[feature] !== 'boolean') {
      errors.push(`Feature flag ${feature} must be a boolean`);
    }
  }
  
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  return {
    isValid: true,
    data: featureObj as unknown as FeatureFlags
  };
}

/**
 * 메뉴 가시성 설정을 검증
 * 
 * @param menuVisibility - 검증할 메뉴 가시성 설정
 * @returns 검증 결과
 */
export function validateMenuVisibility(menuVisibility: unknown): ValidationResult<MenuVisibility> {
  if (typeof menuVisibility !== 'object' || menuVisibility === null) {
    return {
      isValid: false,
      errors: ['Menu visibility must be an object']
    };
  }
  
  const menuObj = menuVisibility as Record<string, unknown>;
  const requiredMenus: (keyof MenuVisibility)[] = [
    'course',
    'schedule',
    'location',
    'program'
  ];
  
  const errors: string[] = [];
  
  for (const menu of requiredMenus) {
    if (!(menu in menuObj)) {
      errors.push(`Missing required menu visibility: ${menu}`);
    } else if (typeof menuObj[menu] !== 'boolean') {
      errors.push(`Menu visibility ${menu} must be a boolean`);
    }
  }
  
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  return {
    isValid: true,
    data: menuObj as unknown as MenuVisibility
  };
}

/**
 * 앱 구성을 검증
 * 
 * @param config - 검증할 앱 구성
 * @returns 검증 결과
 */
export function validateAppConfig(config: unknown): ValidationResult<AppConfig> {
  if (typeof config !== 'object' || config === null) {
    return {
      isValid: false,
      errors: ['App config must be an object']
    };
  }
  
  const configObj = config as Record<string, unknown>;
  const errors: string[] = [];
  
  // 필수 필드들 검증
  if (!isAppMode(configObj.mode)) {
    errors.push('Invalid or missing app mode');
  }
  
  if (!isEnvironment(configObj.environment)) {
    errors.push('Invalid or missing environment');
  }
  
  if (!isSupportedLanguage(configObj.defaultLanguage)) {
    errors.push('Invalid or missing default language');
  }
  
  if (!Array.isArray(configObj.supportedLanguages) || 
      !configObj.supportedLanguages.every(isSupportedLanguage)) {
    errors.push('Invalid or missing supported languages');
  }
  
  // 기능 플래그 검증
  const featuresResult = validateFeatureFlags(configObj.features);
  if (!featuresResult.isValid) {
    errors.push(...(featuresResult.errors ?? []));
  }
  
  // 메뉴 가시성 검증
  const menuResult = validateMenuVisibility(configObj.menuVisibility);
  if (!menuResult.isValid) {
    errors.push(...(menuResult.errors ?? []));
  }
  
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  return {
    isValid: true,
    data: configObj as unknown as AppConfig
  };
}

// =============================================================================
// CONFIGURATION UTILITIES - 구성 유틸리티들
// =============================================================================

/**
 * 현재 환경의 런타임 구성을 가져옴
 * 
 * @returns 런타임 구성
 */
export function getCurrentRuntimeConfig(): RuntimeConfig {
  // Vite의 import.meta.env 사용
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return buildRuntimeConfig(import.meta.env as Record<string, string | undefined>);
  }
  
  // 환경 변수가 없는 경우를 처리
  try {
    // Node.js 환경에서는 process.env가 있을 수 있음
    const processEnv = typeof globalThis !== 'undefined' && 
      'process' in globalThis ? 
      (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env : undefined;
    if (processEnv) {
      return buildRuntimeConfig(processEnv as Record<string, string | undefined>);
    }
  } catch {
    // process가 정의되지 않은 환경에서는 무시
  }
  
  // 기본 구성 반환
  return buildRuntimeConfig({});
}

/**
 * 구성 병합 유틸리티
 * 
 * @param baseConfig - 기본 구성
 * @param overrideConfig - 덮어쓸 구성
 * @returns 병합된 구성
 */
export function mergeConfigs<T extends Record<string, unknown>>(
  baseConfig: T,
  overrideConfig: Partial<T>
): T {
  return {
    ...baseConfig,
    ...overrideConfig
  };
}

/**
 * 구성을 JSON으로 직렬화 (민감한 정보 제외)
 * 
 * @param config - 직렬화할 구성
 * @returns 직렬화된 구성
 */
export function serializeConfig(config: RuntimeConfig): string {
  // 민감한 정보 제거
  const safeConfig = {
    mode: config.mode,
    environment: config.environment,
    defaultLanguage: config.defaultLanguage,
    supportedLanguages: config.supportedLanguages,
    features: config.features,
    menuVisibility: config.menuVisibility,
    i18n: {
      ...config.i18n,
      // API 관련 정보는 제외
    },
    cache: config.cache
  };
  
  return JSON.stringify(safeConfig, null, 2);
}

/**
 * 개발 환경에서 구성 정보를 콘솔에 출력
 * 
 * @param config - 출력할 구성
 */
export function logConfigInDev(config: RuntimeConfig): void {
  if (config.env.DEV) {
    console.group('🔧 Application Configuration');
    console.log('Mode:', config.mode);
    console.log('Environment:', config.environment);
    console.log('Default Language:', config.defaultLanguage);
    console.log('Supported Languages:', config.supportedLanguages);
    console.log('Features:', config.features);
    console.log('Menu Visibility:', config.menuVisibility);
    console.groupEnd();
  }
}