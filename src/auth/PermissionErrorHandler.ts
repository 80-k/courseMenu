/**
 * 권한 오류 처리 시스템
 * 
 * 사용자 친화적이고 개발자 디버깅에 편리한 권한 오류 관리
 */

import type { Permission, UserRole } from '../types/auth';

// =============================================================================
// PERMISSION ERROR TYPES - 권한 오류 타입들
// =============================================================================

export type PermissionErrorType = 
  | 'INSUFFICIENT_ROLE'           // 역할 부족
  | 'MISSING_PERMISSION'         // 권한 부족  
  | 'NOT_AUTHENTICATED'          // 로그인 필요
  | 'FEATURE_DISABLED'           // 기능 비활성화
  | 'ROUTE_NOT_FOUND'           // 라우트 없음
  | 'ADMIN_ONLY'                // 관리자 전용
  | 'GUEST_RESTRICTED'          // 게스트 제한
  | 'MAINTENANCE_MODE'          // 점검 모드
  | 'RATE_LIMITED'              // 요청 제한
  | 'UNKNOWN_ERROR';            // 알 수 없는 오류

export interface PermissionError {
  type: PermissionErrorType;
  message: string;
  userMessage: string;
  debugInfo: PermissionDebugInfo;
  suggestedActions: SuggestedAction[];
  context: PermissionContext;
  timestamp: Date;
}

export interface PermissionDebugInfo {
  currentUser: {
    role: UserRole | null;
    permissions: readonly Permission[];
    isAuthenticated: boolean;
  };
  requiredAccess: {
    requiredRoles?: readonly UserRole[];
    requiredPermissions?: readonly Permission[];
  };
  missingAccess: {
    missingRoles?: readonly UserRole[];
    missingPermissions?: readonly Permission[];
  };
  route?: {
    path: string;
    component?: string;
    isPublic: boolean;
  };
  feature?: {
    name: string;
    isEnabled: boolean;
  };
  checkStack: PermissionCheck[];
}

export interface PermissionCheck {
  step: string;
  result: boolean;
  details: string;
  timestamp: Date;
}

export interface SuggestedAction {
  type: 'LOGIN' | 'REQUEST_PERMISSION' | 'CONTACT_ADMIN' | 'GO_HOME' | 'GO_BACK' | 'UPGRADE_ROLE';
  label: string;
  description: string;
  action: () => void;
  primary?: boolean;
}

export interface PermissionContext {
  location: string;
  userAgent: string;
  referrer: string;
  sessionId?: string;
  feature?: string;
  component?: string;
}

// =============================================================================
// PERMISSION ERROR MESSAGES - 권한 오류 메시지
// =============================================================================

const ERROR_MESSAGES: Record<PermissionErrorType, {
  title: string;
  userMessage: string;
  debugMessage: string;
  icon: string;
  severity: 'error' | 'warning' | 'info';
}> = {
  INSUFFICIENT_ROLE: {
    title: '역할 권한이 부족합니다',
    userMessage: '이 기능을 사용하려면 더 높은 권한이 필요합니다. 관리자에게 문의하세요.',
    debugMessage: 'User role does not meet the required role level',
    icon: '🔐',
    severity: 'error'
  },
  MISSING_PERMISSION: {
    title: '접근 권한이 없습니다',
    userMessage: '이 기능에 접근할 권한이 없습니다. 필요한 권한을 요청하거나 관리자에게 문의하세요.',
    debugMessage: 'User lacks required permissions',
    icon: '🚫',
    severity: 'error'
  },
  NOT_AUTHENTICATED: {
    title: '로그인이 필요합니다',
    userMessage: '이 기능을 사용하려면 먼저 로그인해주세요.',
    debugMessage: 'User is not authenticated',
    icon: '🔑',
    severity: 'warning'
  },
  FEATURE_DISABLED: {
    title: '기능이 비활성화되어 있습니다',
    userMessage: '현재 이 기능은 사용할 수 없습니다. 나중에 다시 시도해주세요.',
    debugMessage: 'Feature is currently disabled',
    icon: '⏸️',
    severity: 'info'
  },
  ROUTE_NOT_FOUND: {
    title: '페이지를 찾을 수 없습니다',
    userMessage: '요청하신 페이지가 존재하지 않거나 이동되었습니다.',
    debugMessage: 'Route does not exist',
    icon: '🔍',
    severity: 'error'
  },
  ADMIN_ONLY: {
    title: '관리자 전용 기능입니다',
    userMessage: '이 기능은 관리자만 사용할 수 있습니다.',
    debugMessage: 'Feature requires admin role',
    icon: '👑',
    severity: 'error'
  },
  GUEST_RESTRICTED: {
    title: '게스트 계정으로는 사용할 수 없습니다',
    userMessage: '이 기능을 사용하려면 정회원 권한이 필요합니다.',
    debugMessage: 'Guest role cannot access this feature',
    icon: '👤',
    severity: 'warning'
  },
  MAINTENANCE_MODE: {
    title: '시스템 점검 중입니다',
    userMessage: '현재 시스템 점검 중이므로 일부 기능이 제한됩니다.',
    debugMessage: 'System is in maintenance mode',
    icon: '🔧',
    severity: 'info'
  },
  RATE_LIMITED: {
    title: '요청 횟수를 초과했습니다',
    userMessage: '너무 많은 요청을 보내셨습니다. 잠시 후 다시 시도해주세요.',
    debugMessage: 'Rate limit exceeded',
    icon: '⏱️',
    severity: 'warning'
  },
  UNKNOWN_ERROR: {
    title: '알 수 없는 오류가 발생했습니다',
    userMessage: '예상치 못한 오류가 발생했습니다. 관리자에게 문의하세요.',
    debugMessage: 'Unknown permission error',
    icon: '❓',
    severity: 'error'
  }
};

// =============================================================================
// PERMISSION ERROR HANDLER - 권한 오류 핸들러
// =============================================================================

export class PermissionErrorHandler {
  private static instance: PermissionErrorHandler;
  private errorHistory: PermissionError[] = [];
  private maxHistorySize = 50;
  
  private constructor() {}
  
  static getInstance(): PermissionErrorHandler {
    if (!PermissionErrorHandler.instance) {
      PermissionErrorHandler.instance = new PermissionErrorHandler();
    }
    return PermissionErrorHandler.instance;
  }
  
  /**
   * 권한 오류 생성 및 처리
   */
  createError(
    type: PermissionErrorType,
    context: Partial<PermissionDebugInfo>,
    additionalMessage?: string
  ): PermissionError {
    const errorConfig = ERROR_MESSAGES[type];
    const timestamp = new Date();
    
    const error: PermissionError = {
      type,
      message: errorConfig.debugMessage,
      userMessage: additionalMessage || errorConfig.userMessage,
      debugInfo: this.buildDebugInfo(context),
      suggestedActions: this.buildSuggestedActions(type, context),
      context: this.buildContext(),
      timestamp
    };
    
    // 오류 히스토리에 추가
    this.addToHistory(error);
    
    // 개발 환경에서 콘솔 로깅
    if (import.meta.env.DEV) {
      this.logError(error);
    }
    
    // 분석을 위한 오류 추적 (실제 구현에서는 외부 서비스로 전송)
    this.trackError(error);
    
    return error;
  }
  
  /**
   * 라우트 접근 권한 오류 생성
   */
  createRouteAccessError(
    currentUser: { role: UserRole | null; permissions: readonly Permission[]; isAuthenticated: boolean },
    route: { path: string; requiredRoles?: readonly UserRole[]; requiredPermissions?: readonly Permission[]; isPublic: boolean },
    component?: string
  ): PermissionError {
    let type: PermissionErrorType = 'UNKNOWN_ERROR';
    
    if (!currentUser.isAuthenticated && !route.isPublic) {
      type = 'NOT_AUTHENTICATED';
    } else if (route.requiredRoles?.includes('admin' as UserRole) && currentUser.role !== 'admin') {
      type = 'ADMIN_ONLY';
    } else if (route.requiredRoles && route.requiredRoles.length > 0) {
      type = 'INSUFFICIENT_ROLE';
    } else if (route.requiredPermissions && route.requiredPermissions.length > 0) {
      type = 'MISSING_PERMISSION';
    }
    
    const missingRoles = route.requiredRoles?.filter(role => currentUser.role !== role) || [];
    const missingPermissions = route.requiredPermissions?.filter(permission => 
      !currentUser.permissions.includes(permission)
    ) || [];
    
    return this.createError(type, {
      currentUser,
      requiredAccess: {
        requiredRoles: route.requiredRoles,
        requiredPermissions: route.requiredPermissions
      },
      missingAccess: {
        missingRoles,
        missingPermissions
      },
      route: {
        path: route.path,
        component,
        isPublic: route.isPublic
      }
    });
  }
  
  /**
   * 기능 접근 권한 오류 생성
   */
  createFeatureAccessError(
    featureName: string,
    currentUser: { role: UserRole | null; permissions: readonly Permission[]; isAuthenticated: boolean },
    requiredPermissions?: readonly Permission[],
    requiredRoles?: readonly UserRole[]
  ): PermissionError {
    let type: PermissionErrorType = 'MISSING_PERMISSION';
    
    if (!currentUser.isAuthenticated) {
      type = 'NOT_AUTHENTICATED';
    } else if (requiredRoles?.includes('admin' as UserRole) && currentUser.role !== 'admin') {
      type = 'ADMIN_ONLY';
    } else if (currentUser.role === 'guest' && requiredRoles && !requiredRoles.includes('guest' as UserRole)) {
      type = 'GUEST_RESTRICTED';
    }
    
    return this.createError(type, {
      currentUser,
      requiredAccess: {
        requiredRoles,
        requiredPermissions
      },
      missingAccess: {
        missingRoles: requiredRoles?.filter(role => currentUser.role !== role) || [],
        missingPermissions: requiredPermissions?.filter(permission => 
          !currentUser.permissions.includes(permission)
        ) || []
      },
      feature: {
        name: featureName,
        isEnabled: true
      }
    });
  }
  
  /**
   * 디버그 정보 구성
   */
  private buildDebugInfo(context: Partial<PermissionDebugInfo>): PermissionDebugInfo {
    return {
      currentUser: context.currentUser || { role: null, permissions: [], isAuthenticated: false },
      requiredAccess: context.requiredAccess || {},
      missingAccess: context.missingAccess || {},
      route: context.route,
      feature: context.feature,
      checkStack: context.checkStack || []
    };
  }
  
  /**
   * 제안된 액션 구성
   */
  private buildSuggestedActions(type: PermissionErrorType, context: Partial<PermissionDebugInfo>): SuggestedAction[] {
    const actions: SuggestedAction[] = [];
    
    switch (type) {
      case 'NOT_AUTHENTICATED':
        actions.push({
          type: 'LOGIN',
          label: '로그인',
          description: '로그인하여 이 기능을 사용하세요',
          action: () => this.showLoginModal(),
          primary: true
        });
        break;
        
      case 'INSUFFICIENT_ROLE':
      case 'ADMIN_ONLY':
        actions.push({
          type: 'CONTACT_ADMIN',
          label: '관리자 문의',
          description: '권한 승급을 위해 관리자에게 문의하세요',
          action: () => this.contactAdmin(),
          primary: true
        });
        break;
        
      case 'MISSING_PERMISSION':
        actions.push({
          type: 'REQUEST_PERMISSION',
          label: '권한 요청',
          description: '필요한 권한을 요청하세요',
          action: () => this.requestPermission(context.missingAccess?.missingPermissions || [])
        });
        break;
    }
    
    // 공통 액션들
    actions.push(
      {
        type: 'GO_HOME',
        label: '홈으로 가기',
        description: '메인 페이지로 이동합니다',
        action: () => window.location.href = '/'
      },
      {
        type: 'GO_BACK',
        label: '뒤로 가기',
        description: '이전 페이지로 돌아갑니다',
        action: () => window.history.back()
      }
    );
    
    return actions;
  }
  
  /**
   * 컨텍스트 정보 구성
   */
  private buildContext(): PermissionContext {
    return {
      location: window.location.href,
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };
  }
  
  /**
   * 오류 히스토리에 추가
   */
  private addToHistory(error: PermissionError): void {
    this.errorHistory.unshift(error);
    if (this.errorHistory.length > this.maxHistorySize) {
      this.errorHistory = this.errorHistory.slice(0, this.maxHistorySize);
    }
  }
  
  /**
   * 개발용 오류 로깅
   */
  private logError(error: PermissionError): void {
    const errorConfig = ERROR_MESSAGES[error.type];
    
    console.group(`🚨 Permission Error: ${error.type}`);
    console.error(`${errorConfig.icon} ${errorConfig.title}`);
    console.log('User Message:', error.userMessage);
    console.log('Debug Message:', error.message);
    console.table({
      'Current Role': error.debugInfo.currentUser.role || 'none',
      'Required Roles': error.debugInfo.requiredAccess.requiredRoles?.join(', ') || 'none',
      'Missing Roles': error.debugInfo.missingAccess.missingRoles?.join(', ') || 'none',
      'Current Permissions': error.debugInfo.currentUser.permissions.length,
      'Required Permissions': error.debugInfo.requiredAccess.requiredPermissions?.length || 0,
      'Missing Permissions': error.debugInfo.missingAccess.missingPermissions?.length || 0
    });
    
    if (error.debugInfo.route) {
      console.log('Route Info:', error.debugInfo.route);
    }
    
    if (error.debugInfo.feature) {
      console.log('Feature Info:', error.debugInfo.feature);
    }
    
    console.log('Context:', error.context);
    console.log('Suggested Actions:', error.suggestedActions.map(a => a.label).join(', '));
    console.groupEnd();
  }
  
  /**
   * 오류 추적 (분석용)
   */
  private trackError(error: PermissionError): void {
    // 실제 구현에서는 외부 분석 서비스로 전송
    console.log('📊 Permission Error Tracked:', {
      type: error.type,
      timestamp: error.timestamp,
      user: error.debugInfo.currentUser.role,
      route: error.debugInfo.route?.path
    });
  }
  
  /**
   * 로그인 모달 표시
   */
  private showLoginModal(): void {
    // LoginForm 컴포넌트 또는 모달 표시
    const event = new CustomEvent('showLoginModal');
    window.dispatchEvent(event);
  }
  
  /**
   * 관리자 문의
   */
  private contactAdmin(): void {
    // 관리자 문의 폼 또는 이메일 클라이언트 열기
    window.open('mailto:admin@example.com?subject=권한 요청', '_blank');
  }
  
  /**
   * 권한 요청
   */
  private requestPermission(permissions: readonly Permission[]): void {
    // 권한 요청 폼 표시
    alert(`다음 권한이 필요합니다: ${permissions.join(', ')}`);
  }
  
  /**
   * 오류 히스토리 가져오기
   */
  getErrorHistory(): readonly PermissionError[] {
    return this.errorHistory;
  }
  
  /**
   * 특정 타입의 오류 통계
   */
  getErrorStats(): Record<PermissionErrorType, number> {
    return this.errorHistory.reduce((stats, error) => {
      stats[error.type] = (stats[error.type] || 0) + 1;
      return stats;
    }, {} as Record<PermissionErrorType, number>);
  }
  
  /**
   * 오류 히스토리 초기화
   */
  clearErrorHistory(): void {
    this.errorHistory = [];
  }
}

// =============================================================================
// CONVENIENCE FUNCTIONS - 편의 함수들
// =============================================================================

export const permissionErrorHandler = PermissionErrorHandler.getInstance();

/**
 * 라우트 접근 권한 오류 생성
 */
export const createRouteAccessError = (
  currentUser: { role: UserRole | null; permissions: readonly Permission[]; isAuthenticated: boolean },
  route: { path: string; requiredRoles?: readonly UserRole[]; requiredPermissions?: readonly Permission[]; isPublic: boolean },
  component?: string
): PermissionError => {
  return permissionErrorHandler.createRouteAccessError(currentUser, route, component);
};

/**
 * 기능 접근 권한 오류 생성
 */
export const createFeatureAccessError = (
  featureName: string,
  currentUser: { role: UserRole | null; permissions: readonly Permission[]; isAuthenticated: boolean },
  requiredPermissions?: readonly Permission[],
  requiredRoles?: readonly UserRole[]
): PermissionError => {
  return permissionErrorHandler.createFeatureAccessError(featureName, currentUser, requiredPermissions, requiredRoles);
};

export default PermissionErrorHandler;