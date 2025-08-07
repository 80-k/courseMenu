/**
 * 핵심 도메인 타입 정의
 * 
 * 이 파일은 애플리케이션의 핵심 비즈니스 도메인 타입들을 정의합니다.
 * 모든 타입은 명확하고 재사용 가능하며, 타입 안전성을 보장합니다.
 */

// =============================================================================
// ID TYPES - 식별자 타입들 (문자열 기반, 실용적 접근)
// =============================================================================

/**
 * 메뉴 항목의 고유 식별자
 * 
 * @description 메뉴 항목을 식별하기 위한 고유 문자열 ID
 * @example 'course', 'schedule', 'venue', 'program'
 * @pattern 영숫자, 하이픈(-), 언더스코어(_)만 허용
 */
export type MenuItemId = string;

/**
 * 라우터 URL 경로
 * 
 * @description React Router에서 사용되는 애플리케이션 내 경로
 * @example '/', '/course', '/schedule', '/venue'
 * @pattern 반드시 /로 시작해야 함
 */
export type RoutePath = string;

/**
 * 다국어 번역 키
 * 
 * @description 번역 시스템에서 텍스트를 식별하는 키
 * @example 'common.loading', 'menu.course.title', 'header.mainTitle.wedding'
 * @pattern 네임스페이스.하위키.세부키 형식 (점으로 구분)
 */
export type TranslationKey = string;

// =============================================================================
// LANGUAGE TYPES - 다국어 시스템 타입들
// =============================================================================

/**
 * 애플리케이션에서 지원하는 언어 코드
 * 
 * @description ISO 639-1 표준 언어 코드
 * - 'ko': 한국어
 * - 'ja': 일본어
 * 
 * @example 'ko' | 'ja'
 */
export type SupportedLanguage = 'ko' | 'ja';

/**
 * 다국어 텍스트 매핑 객체
 * 
 * @description 모든 지원 언어에 대한 번역 텍스트를 포함하는 완전한 객체
 * @example { ko: '메뉴', ja: 'メニュー' }
 * @requires 모든 SupportedLanguage에 대한 값이 필수
 */
export type LocalizedText = Record<SupportedLanguage, string>;

/**
 * 부분적 언어별 텍스트 매핑
 * 
 * @description 일부 언어만 포함할 수 있는 텍스트
 */
export type PartialLocalizedText = Partial<LocalizedText>;

/**
 * 중첩된 다국어 객체 구조
 * 
 * @description 복잡한 번역 구조를 위한 재귀적 타입
 */
export type NestedLocalizedText = {
  readonly [key: string]: string | LocalizedText | NestedLocalizedText | readonly string[];
};

// =============================================================================
// APPLICATION MODES - 애플리케이션 모드 타입들
// =============================================================================

/**
 * 애플리케이션 실행 모드
 * 
 * @description 각 모드에 따라 다른 UI와 기능이 표시됨
 * - wedding: 웨딩 (결혼식 당일)
 * - sanggyeonrye: 상견례 (양가 부모님 만남)
 * - afterparty: 뒷풀이 (식후 파티)
 */
export type AppMode = 'wedding' | 'sanggyeonrye' | 'afterparty';

/**
 * 실행 환경 타입
 */
export type Environment = 'development' | 'staging' | 'production';

// =============================================================================
// MENU TYPES - 메뉴 관련 타입들
// =============================================================================

/**
 * 메뉴 항목의 기본 구조
 * 
 * @description 모든 메뉴 항목이 가져야 하는 필수 속성들
 */
export interface BaseMenuItem {
  /** 고유 식별자 */
  readonly id: MenuItemId;
  /** 다국어 제목 */
  readonly title: LocalizedText;
  /** 선택적 다국어 설명 */
  readonly description?: LocalizedText;
  /** 활성화 여부 */
  readonly enabled: boolean;
  /** 표시될 모드들 */
  readonly visibleInModes: readonly AppMode[];
}

/**
 * 코스 메뉴 항목
 */
export interface CourseMenuItem extends BaseMenuItem {
  /** 코스 항목들 (다국어) */
  readonly items: readonly LocalizedText[];
}

/**
 * 네비게이션 메뉴 항목
 */
export interface NavigationMenuItem extends BaseMenuItem {
  /** 메뉴 아이콘 */
  readonly icon: string;
  /** 연결될 URL (선택적) */
  readonly href?: RoutePath;
  /** 메뉴 항목 내용 */
  readonly items: LocalizedText;
}

/**
 * 메뉴 카테고리
 */
export interface MenuCategory {
  readonly id: MenuItemId;
  readonly icon: string;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly items: LocalizedText;
  readonly href?: RoutePath;
}

// =============================================================================
// ROUTE TYPES - 라우팅 관련 타입들
// =============================================================================

/**
 * 애플리케이션 라우트 정보
 */
export interface AppRoute {
  /** URL 경로 */
  readonly path: RoutePath;
  /** 라우트 이름 */
  readonly name: string;
  /** 렌더링할 컴포넌트명 */
  readonly component: string;
  /** 다국어 제목 */
  readonly title: LocalizedText;
  /** 표시될 모드들 */
  readonly visibleInModes: readonly AppMode[];
  /** 인증 필요 여부 */
  readonly requiresAuth?: boolean;
  /** 공개 접근 가능 여부 */
  readonly isPublic?: boolean;
}

// =============================================================================
// UTILITY TYPES - 유틸리티 타입들
// =============================================================================

/**
 * 깊은 읽기 전용 타입
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? T[P] extends readonly (infer U)[]
      ? readonly U[]
      : DeepReadonly<T[P]>
    : T[P];
};

/**
 * 옵셔널 필드들을 필수로 만드는 유틸리티 타입
 */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * 특정 필드들만 옵셔널로 만드는 유틸리티 타입
 */
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * null과 undefined를 제외하는 타입
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

// =============================================================================
// TYPE GUARDS - 타입 가드 함수들을 위한 타입들
// =============================================================================

/**
 * 타입 가드 함수 시그니처
 */
export type TypeGuard<T> = (value: unknown) => value is T;


// =============================================================================
// CONFIGURATION TYPES - 설정 관련 타입들
// =============================================================================

/**
 * 기능 플래그 설정
 */
export interface FeatureFlags {
  readonly showSchedule: boolean;
  readonly showVenue: boolean;
  readonly showCourseMenu: boolean;
  readonly showProgram: boolean;
  readonly showFloatingButtons: boolean;
  readonly showLanguageToggle: boolean;
}

/**
 * 메뉴 가시성 설정
 */
export interface MenuVisibility {
  readonly course: boolean;
  readonly schedule: boolean;
  readonly venue: boolean;
  readonly program: boolean;
}

/**
 * 애플리케이션 설정
 */
export interface AppConfig {
  readonly mode: AppMode;
  readonly environment: Environment;
  readonly defaultLanguage: SupportedLanguage;
  readonly supportedLanguages: readonly SupportedLanguage[];
  readonly features: FeatureFlags;
  readonly menuVisibility: MenuVisibility;
}