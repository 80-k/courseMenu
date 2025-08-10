/**
 * Z-Index 계층 관리 상수
 * 
 * 애플리케이션 전체에서 사용되는 z-index 값들을 체계적으로 관리합니다.
 * 계층별로 그룹화하여 유지보수성과 확장성을 높입니다.
 */

/**
 * Z-Index 계층 정의
 * 
 * 각 계층은 10단위로 구분하여 중간값 추가 시 유연성을 제공합니다.
 */
export const Z_INDEX = {
  // 기본 레이어 (0-9)
  BASE: 0,
  CONTENT: 1,
  
  // UI 요소 레이어 (10-19)
  CARD: 10,
  BUTTON: 11,
  FORM: 12,
  
  // 네비게이션 레이어 (20-29)
  NAVIGATION: 20,
  BREADCRUMB: 21,
  
  // 오버레이 레이어 (30-49)
  DROPDOWN: 30,
  TOOLTIP: 31,
  POPOVER: 32,
  
  // 고정 요소 레이어 (50-69)
  STICKY_HEADER: 50,
  FLOATING_ACTIONS: 55, // 헤더보다 앞에 위치
  FIXED_FOOTER: 51,
  
  // 모달/다이얼로그 레이어 (70-89)
  MODAL_BACKDROP: 70,
  MODAL: 71,
  ALERT: 72,
  
  // 최상위 레이어 (90-99)
  LOADING_OVERLAY: 90,
  ERROR_BOUNDARY: 91,
  DEBUG_TOOLS: 95,
  
  // 개발자 도구 (100+)
  DEV_OVERLAY: 100,
} as const;

/**
 * 특정 용도별 Z-Index 그룹
 */
export const Z_INDEX_GROUPS = {
  // 헤더 관련
  HEADER: {
    BASE: Z_INDEX.STICKY_HEADER,
    NAVIGATION: Z_INDEX.NAVIGATION,
    USER_MENU: Z_INDEX.DROPDOWN,
  },
  
  // 플로팅 요소들
  FLOATING: {
    ACTIONS: Z_INDEX.FLOATING_ACTIONS,
    TOOLTIP: Z_INDEX.TOOLTIP,
    POPOVER: Z_INDEX.POPOVER,
  },
  
  // 모달 시스템
  MODAL: {
    BACKDROP: Z_INDEX.MODAL_BACKDROP,
    CONTENT: Z_INDEX.MODAL,
    ALERT: Z_INDEX.ALERT,
  },
  
  // 폼 요소들
  FORM: {
    BASE: Z_INDEX.FORM,
    DROPDOWN: Z_INDEX.DROPDOWN,
    ERROR_MESSAGE: Z_INDEX.TOOLTIP,
  },
} as const;

/**
 * Tailwind CSS 클래스 매핑
 * 
 * z-index 값을 Tailwind CSS 클래스로 매핑합니다.
 * 사용자 정의 값은 arbitrary value 문법을 사용합니다.
 */
export const TAILWIND_Z_INDEX = {
  BASE: 'z-0',
  CONTENT: 'z-[1]',
  CARD: 'z-10',
  BUTTON: 'z-[11]',
  FORM: 'z-[12]',
  NAVIGATION: 'z-20',
  BREADCRUMB: 'z-[21]',
  DROPDOWN: 'z-30',
  TOOLTIP: 'z-[31]',
  POPOVER: 'z-[32]',
  STICKY_HEADER: 'z-50',
  FLOATING_ACTIONS: 'z-[55]',
  FIXED_FOOTER: 'z-[51]',
  MODAL_BACKDROP: 'z-[70]',
  MODAL: 'z-[71]',
  ALERT: 'z-[72]',
  LOADING_OVERLAY: 'z-[90]',
  ERROR_BOUNDARY: 'z-[91]',
  DEBUG_TOOLS: 'z-[95]',
  DEV_OVERLAY: 'z-[100]',
} as const;

/**
 * 유틸리티 함수들
 */
export const ZIndexUtils = {
  /**
   * z-index 값을 Tailwind CSS 클래스로 변환
   */
  toTailwindClass: (zIndex: number): string => {
    // 표준 Tailwind z-index 값들 (0, 10, 20, 30, 40, 50)
    const standardValues = [0, 10, 20, 30, 40, 50];
    if (standardValues.includes(zIndex)) {
      return `z-${zIndex}`;
    }
    // 사용자 정의 값은 arbitrary value 사용
    return `z-[${zIndex}]`;
  },
  
  /**
   * 두 z-index 값의 관계 확인
   */
  isAbove: (upperIndex: number, lowerIndex: number): boolean => {
    return upperIndex > lowerIndex;
  },
  
  /**
   * z-index 값 검증
   */
  isValidZIndex: (value: number): boolean => {
    return Number.isInteger(value) && value >= 0 && value <= 2147483647;
  },
} as const;

/**
 * 개발 모드에서 z-index 디버깅을 위한 유틸리티
 */
export const ZIndexDebug = {
  /**
   * 모든 z-index 값을 콘솔에 출력
   */
  logAllZIndexes: (): void => {
    if (process.env.NODE_ENV === 'development') {
      console.group('🔢 Z-Index Configuration');
      Object.entries(Z_INDEX).forEach(([key, value]) => {
        console.log(`${key}: ${value} (${ZIndexUtils.toTailwindClass(value)})`);
      });
      console.groupEnd();
    }
  },
  
  /**
   * 특정 요소들의 z-index 충돌 체크
   */
  checkConflicts: (elements: Array<{name: string, zIndex: number}>): void => {
    if (process.env.NODE_ENV === 'development') {
      const conflicts = elements.filter((el, index) => 
        elements.some((other, otherIndex) => 
          index !== otherIndex && el.zIndex === other.zIndex
        )
      );
      
      if (conflicts.length > 0) {
        console.warn('⚠️ Z-Index conflicts detected:', conflicts);
      }
    }
  },
} as const;