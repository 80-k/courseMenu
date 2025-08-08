/**
 * 조건부 렌더링을 위한 공통 컴포넌트
 */

import React from 'react';

// 환경변수에서 설정값 가져오기 (기본값 포함)
const DEFAULT_FEATURES = {
  showSchedule: import.meta.env.VITE_SHOW_SCHEDULE !== 'false',
  showLocation: import.meta.env.VITE_SHOW_LOCATION !== 'false', 
  showCourseMenu: import.meta.env.VITE_SHOW_COURSE_MENU !== 'false',
  showProgram: import.meta.env.VITE_SHOW_PROGRAM !== 'false',
  showFloatingButtons: import.meta.env.VITE_SHOW_FLOATING_BUTTONS !== 'false',
  showLanguageToggle: import.meta.env.VITE_SHOW_LANGUAGE_TOGGLE !== 'false',
};

const DEFAULT_MENU_VISIBILITY = {
  course: import.meta.env.VITE_MENU_COURSE !== 'false',
  schedule: import.meta.env.VITE_MENU_SCHEDULE !== 'false',
  location: import.meta.env.VITE_MENU_LOCATION !== 'false',
  program: import.meta.env.VITE_MENU_PROGRAM !== 'false',
};

const DEFAULT_APP_MODE = (import.meta.env.VITE_APP_MODE || 'wedding') as AppMode;
const DEFAULT_ENVIRONMENT = (import.meta.env.VITE_ENVIRONMENT || 'development') as 'development' | 'staging' | 'production';

type AppMode = 'wedding' | 'sanggyeonrye' | 'afterparty';

// 조건부 렌더링 타입들
interface BaseConditionalProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface FeatureConditionalProps extends BaseConditionalProps {
  feature: keyof typeof DEFAULT_FEATURES;
}

interface MenuConditionalProps extends BaseConditionalProps {
  menuId: string;
}

interface ModeConditionalProps extends BaseConditionalProps {
  modes: AppMode[];
}

interface EnvironmentConditionalProps extends BaseConditionalProps {
  environments: ('development' | 'staging' | 'production')[];
}

interface CustomConditionalProps extends BaseConditionalProps {
  condition: boolean | (() => boolean);
}

/**
 * 기능 플래그에 따른 조건부 렌더링
 */
export const FeatureGate: React.FC<FeatureConditionalProps> = ({ 
  feature, 
  children, 
  fallback = null 
}) => {
  const isEnabled = DEFAULT_FEATURES[feature];
  return isEnabled ? <>{children}</> : <>{fallback}</>;
};

/**
 * 메뉴 가시성에 따른 조건부 렌더링
 */
export const MenuGate: React.FC<MenuConditionalProps> = ({ 
  menuId, 
  children, 
  fallback = null 
}) => {
  const isVisible = DEFAULT_MENU_VISIBILITY[menuId as keyof typeof DEFAULT_MENU_VISIBILITY] ?? true;
  return isVisible ? <>{children}</> : <>{fallback}</>;
};

/**
 * 앱 모드에 따른 조건부 렌더링
 */
export const ModeGate: React.FC<ModeConditionalProps> = ({ 
  modes, 
  children, 
  fallback = null 
}) => {
  const currentMode = DEFAULT_APP_MODE;
  const shouldShow = modes.includes(currentMode);
  return shouldShow ? <>{children}</> : <>{fallback}</>;
};

/**
 * 환경에 따른 조건부 렌더링
 */
export const EnvironmentGate: React.FC<EnvironmentConditionalProps> = ({ 
  environments, 
  children, 
  fallback = null 
}) => {
  const currentEnv = DEFAULT_ENVIRONMENT;
  const shouldShow = environments.includes(currentEnv);
  return shouldShow ? <>{children}</> : <>{fallback}</>;
};

/**
 * 커스텀 조건에 따른 조건부 렌더링
 */
export const ConditionalRenderer: React.FC<CustomConditionalProps> = ({ 
  condition, 
  children, 
  fallback = null 
}) => {
  const shouldShow = typeof condition === 'function' ? condition() : condition;
  return shouldShow ? <>{children}</> : <>{fallback}</>;
};

/**
 * 복합 조건부 렌더링 (여러 조건을 조합)
 */
export interface MultiConditionalProps extends BaseConditionalProps {
  conditions: {
    feature?: keyof typeof DEFAULT_FEATURES;
    menuId?: string;
    modes?: AppMode[];
    environments?: ('development' | 'staging' | 'production')[];
    custom?: boolean | (() => boolean);
  };
  operator?: 'AND' | 'OR'; // 조건들을 AND 또는 OR로 결합
}

export const MultiConditionalRenderer: React.FC<MultiConditionalProps> = ({ 
  conditions, 
  operator = 'AND',
  children, 
  fallback = null 
}) => {
  const results: boolean[] = [];
  
  // 각 조건 평가
  if (conditions.feature !== undefined) {
    results.push(DEFAULT_FEATURES[conditions.feature]);
  }
  
  if (conditions.menuId !== undefined) {
    results.push(DEFAULT_MENU_VISIBILITY[conditions.menuId as keyof typeof DEFAULT_MENU_VISIBILITY] ?? true);
  }
  
  if (conditions.modes !== undefined) {
    const currentMode = DEFAULT_APP_MODE;
    results.push(conditions.modes.includes(currentMode));
  }
  
  if (conditions.environments !== undefined) {
    const currentEnv = DEFAULT_ENVIRONMENT;
    results.push(conditions.environments.includes(currentEnv));
  }
  
  if (conditions.custom !== undefined) {
    const customResult = typeof conditions.custom === 'function' 
      ? conditions.custom() 
      : conditions.custom;
    results.push(customResult);
  }
  
  // 결과 계산
  let shouldShow: boolean;
  if (operator === 'OR') {
    shouldShow = results.some(result => result);
  } else {
    shouldShow = results.every(result => result);
  }
  
  return shouldShow ? <>{children}</> : <>{fallback}</>;
};

/**
 * 개발자 전용 컴포넌트 (프로덕션에서는 숨김)
 */
export const DevOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <EnvironmentGate environments={['development']}>
      {children}
    </EnvironmentGate>
  );
};

/**
 * 프로덕션 전용 컴포넌트
 */
export const ProdOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <EnvironmentGate environments={['production']}>
      {children}
    </EnvironmentGate>
  );
};

/**
 * 웨딩 모드 전용 컴포넌트
 */
export const WeddingOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ModeGate modes={['wedding']}>
      {children}
    </ModeGate>
  );
};

/**
 * 상견례 모드 전용 컴포넌트
 */
export const SanggyeonryeOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ModeGate modes={['sanggyeonrye']}>
      {children}
    </ModeGate>
  );
};

/**
 * 뒷풀이 모드 전용 컴포넌트
 */
export const AfterpartyOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ModeGate modes={['afterparty']}>
      {children}
    </ModeGate>
  );
};

