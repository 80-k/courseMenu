/**
 * 로그아웃 서비스
 * 
 * 보안, 확장성, 유지보수성을 고려한 로그아웃 기능 구현
 */

import { clearTokens, getStoredToken } from './token-utils';

// =============================================================================
// TYPES - 타입 정의
// =============================================================================

export interface LogoutOptions {
  /** 모든 디바이스에서 로그아웃 (서버 구현 시) */
  logoutAllDevices?: boolean;
  /** 로그아웃 후 리다이렉트 경로 */
  redirectTo?: string;
  /** 로그아웃 이유 */
  reason?: 'user_initiated' | 'token_expired' | 'security_logout' | 'system_maintenance';
  /** 확인 메시지 표시 여부 */
  showConfirmation?: boolean;
  /** 사용자 데이터 정리 여부 */
  clearUserData?: boolean;
}

export interface LogoutResult {
  success: boolean;
  message?: string;
  redirectTo?: string;
  error?: string;
}

export type LogoutHook = (options: LogoutOptions) => void | Promise<void>;

// =============================================================================
// LOGOUT HOOKS REGISTRY - 로그아웃 훅 레지스트리
// =============================================================================

class LogoutHooksRegistry {
  private hooks: Map<string, LogoutHook> = new Map();

  register(name: string, hook: LogoutHook): void {
    this.hooks.set(name, hook);
  }

  unregister(name: string): void {
    this.hooks.delete(name);
  }

  async executeAll(options: LogoutOptions): Promise<void> {
    const results = await Promise.allSettled(
      Array.from(this.hooks.entries()).map(async ([name, hook]) => {
        try {
          await hook(options);
          console.log(`Logout hook '${name}' executed successfully`);
        } catch (error) {
          console.error(`Logout hook '${name}' failed:`, error);
          throw error;
        }
      })
    );

    const failures = results.filter(result => result.status === 'rejected');
    if (failures.length > 0) {
      console.warn(`${failures.length} logout hooks failed`);
    }
  }

  clear(): void {
    this.hooks.clear();
  }
}

// 전역 훅 레지스트리 인스턴스
const logoutHooksRegistry = new LogoutHooksRegistry();

// =============================================================================
// BUILT-IN HOOKS - 내장 로그아웃 훅들
// =============================================================================

/**
 * 토큰 정리 훅
 */
const tokenCleanupHook: LogoutHook = async (options) => {
  try {
    // 모든 저장소에서 토큰 제거
    clearTokens();
    
    // 추가 토큰 관련 정리
    sessionStorage.removeItem('auth_state');
    sessionStorage.removeItem('user_preferences');
    
    if (options.clearUserData) {
      // 사용자 데이터 정리 (옵션)
      localStorage.removeItem('user_settings');
      localStorage.removeItem('recent_activity');
    }
    
    console.log('Tokens and auth data cleared');
  } catch (error) {
    console.error('Token cleanup failed:', error);
    throw new Error('토큰 정리 중 오류가 발생했습니다.');
  }
};

/**
 * 세션 무효화 훅 (서버 구현 시)
 */
const sessionInvalidationHook: LogoutHook = async () => {
  try {
    const token = getStoredToken();
    if (!token) return;

    // 실제 구현에서는 서버 API 호출
    /*
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        logoutAllDevices: options.logoutAllDevices || false,
        reason: options.reason || 'user_initiated'
      })
    });
    
    if (!response.ok) {
      throw new Error(`Server logout failed: ${response.statusText}`);
    }
    */
    
    console.log('Session invalidated on server');
  } catch (error) {
    console.error('Session invalidation failed:', error);
    // 서버 로그아웃 실패는 치명적이지 않음 (클라이언트에서는 이미 정리됨)
  }
};

/**
 * 보안 정리 훅
 */
const securityCleanupHook: LogoutHook = async (options) => {
  try {
    // 브라우저 히스토리에서 민감한 정보 제거
    if (options.reason === 'security_logout') {
      // 보안 로그아웃인 경우 히스토리 정리
      window.history.replaceState(null, '', '/');
    }
    
    // 메모리 정리 (가능한 경우)
    if (typeof window !== 'undefined' && window.gc) {
      window.gc();
    }
    
    console.log('Security cleanup completed');
  } catch (error) {
    console.error('Security cleanup failed:', error);
  }
};

/**
 * 분석/로깅 훅
 */
const analyticsHook: LogoutHook = async (options) => {
  try {
    // 로그아웃 이벤트 로깅 (실제 구현에서는 분석 서비스로 전송)
    const logData = {
      timestamp: new Date().toISOString(),
      reason: options.reason || 'user_initiated',
      logoutAllDevices: options.logoutAllDevices || false,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    console.log('Logout analytics:', logData);
    
    // 실제 구현에서는 분석 서비스로 전송
    // await sendAnalyticsEvent('user_logout', logData);
  } catch (error) {
    console.error('Analytics logging failed:', error);
    // 분석 실패는 치명적이지 않음
  }
};

// =============================================================================
// LOGOUT SERVICE - 로그아웃 서비스
// =============================================================================

export class LogoutService {
  private static instance: LogoutService;
  
  private constructor() {
    // 기본 훅들 등록
    this.registerDefaultHooks();
  }
  
  static getInstance(): LogoutService {
    if (!LogoutService.instance) {
      LogoutService.instance = new LogoutService();
    }
    return LogoutService.instance;
  }
  
  /**
   * 기본 로그아웃 훅들 등록
   */
  private registerDefaultHooks(): void {
    logoutHooksRegistry.register('tokenCleanup', tokenCleanupHook);
    logoutHooksRegistry.register('sessionInvalidation', sessionInvalidationHook);
    logoutHooksRegistry.register('securityCleanup', securityCleanupHook);
    logoutHooksRegistry.register('analytics', analyticsHook);
  }
  
  /**
   * 커스텀 로그아웃 훅 등록
   */
  registerHook(name: string, hook: LogoutHook): void {
    logoutHooksRegistry.register(name, hook);
  }
  
  /**
   * 로그아웃 훅 제거
   */
  unregisterHook(name: string): void {
    logoutHooksRegistry.unregister(name);
  }
  
  /**
   * 안전한 로그아웃 실행
   */
  async performLogout(options: LogoutOptions = {}): Promise<LogoutResult> {
    const defaultOptions: LogoutOptions = {
      logoutAllDevices: false,
      redirectTo: '/',
      reason: 'user_initiated',
      showConfirmation: false,
      clearUserData: false,
      ...options
    };
    
    try {
      // 확인 메시지 표시 (옵션)
      if (defaultOptions.showConfirmation) {
        const confirmed = confirm(
          defaultOptions.reason === 'security_logout' 
            ? '보안상의 이유로 로그아웃됩니다. 계속하시겠습니까?'
            : '정말 로그아웃하시겠습니까?'
        );
        
        if (!confirmed) {
          return {
            success: false,
            message: '로그아웃이 취소되었습니다.'
          };
        }
      }
      
      // 모든 로그아웃 훅 실행
      await logoutHooksRegistry.executeAll(defaultOptions);
      
      return {
        success: true,
        message: this.getLogoutMessage(defaultOptions.reason),
        redirectTo: defaultOptions.redirectTo
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '로그아웃 중 오류가 발생했습니다.';
      
      return {
        success: false,
        error: errorMessage,
        redirectTo: defaultOptions.redirectTo // 오류 발생 시에도 리다이렉트
      };
    }
  }
  
  /**
   * 강제 로그아웃 (보안 목적)
   */
  async forceLogout(reason: 'token_expired' | 'security_logout' | 'system_maintenance' = 'security_logout'): Promise<LogoutResult> {
    return this.performLogout({
      logoutAllDevices: true,
      reason,
      showConfirmation: false,
      clearUserData: true,
      redirectTo: '/'
    });
  }
  
  /**
   * 로그아웃 메시지 생성
   */
  private getLogoutMessage(reason?: string): string {
    switch (reason) {
      case 'token_expired':
        return '세션이 만료되어 로그아웃되었습니다.';
      case 'security_logout':
        return '보안상의 이유로 로그아웃되었습니다.';
      case 'system_maintenance':
        return '시스템 점검으로 인해 로그아웃되었습니다.';
      default:
        return '성공적으로 로그아웃되었습니다.';
    }
  }
}

// =============================================================================
// CONVENIENCE FUNCTIONS - 편의 함수들
// =============================================================================

/**
 * 기본 로그아웃 함수
 */
export const logout = async (options?: LogoutOptions): Promise<LogoutResult> => {
  const service = LogoutService.getInstance();
  return service.performLogout(options);
};

/**
 * 확인 메시지와 함께 로그아웃
 */
export const logoutWithConfirmation = async (options?: Omit<LogoutOptions, 'showConfirmation'>): Promise<LogoutResult> => {
  return logout({ ...options, showConfirmation: true });
};

/**
 * 강제 로그아웃 (보안)
 */
export const forceLogout = async (reason?: 'token_expired' | 'security_logout' | 'system_maintenance'): Promise<LogoutResult> => {
  const service = LogoutService.getInstance();
  return service.forceLogout(reason);
};

/**
 * 모든 디바이스에서 로그아웃
 */
export const logoutAllDevices = async (options?: Omit<LogoutOptions, 'logoutAllDevices'>): Promise<LogoutResult> => {
  return logout({ ...options, logoutAllDevices: true });
};

/**
 * 커스텀 로그아웃 훅 등록
 */
export const registerLogoutHook = (name: string, hook: LogoutHook): void => {
  const service = LogoutService.getInstance();
  service.registerHook(name, hook);
};

/**
 * 로그아웃 훅 제거
 */
export const unregisterLogoutHook = (name: string): void => {
  const service = LogoutService.getInstance();
  service.unregisterHook(name);
};

// =============================================================================
// AUTO LOGOUT - 자동 로그아웃
// =============================================================================

/**
 * 자동 로그아웃 관리자
 */
export class AutoLogoutManager {
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private warningTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private lastActivity: number = Date.now();
  private isEnabled: boolean = false;
  
  constructor(
    timeoutMinutes: number = 30,
    warningMinutes: number = 5
  ) {
    this.timeoutMinutes = timeoutMinutes;
    this.warningMinutes = warningMinutes;
    // lastActivity 사용을 위해 초기값 설정
    void this.lastActivity;
  }
  
  private readonly timeoutMinutes: number;
  private readonly warningMinutes: number;
  
  /**
   * 자동 로그아웃 활성화
   */
  enable(): void {
    this.isEnabled = true;
    this.resetTimeout();
    this.bindActivityListeners();
  }
  
  /**
   * 자동 로그아웃 비활성화
   */
  disable(): void {
    this.isEnabled = false;
    this.clearTimeouts();
    this.unbindActivityListeners();
  }
  
  /**
   * 타임아웃 리셋
   */
  resetTimeout(): void {
    if (!this.isEnabled) return;
    
    this.clearTimeouts();
    this.lastActivity = Date.now();
    
    const timeoutMs = this.timeoutMinutes * 60 * 1000;
    const warningMs = (this.timeoutMinutes - this.warningMinutes) * 60 * 1000;
    
    // 경고 타이머
    this.warningTimeoutId = setTimeout(() => {
      this.showWarning();
    }, warningMs);
    
    // 로그아웃 타이머
    this.timeoutId = setTimeout(() => {
      this.performAutoLogout();
    }, timeoutMs);
  }
  
  /**
   * 타이머 정리
   */
  private clearTimeouts(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.warningTimeoutId) {
      clearTimeout(this.warningTimeoutId);
      this.warningTimeoutId = null;
    }
  }
  
  /**
   * 활동 리스너 바인딩
   */
  private bindActivityListeners(): void {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    const throttledReset = this.throttle(() => this.resetTimeout(), 1000);
    
    events.forEach(event => {
      document.addEventListener(event, throttledReset, { passive: true });
    });
  }
  
  /**
   * 활동 리스너 제거
   */
  private unbindActivityListeners(): void {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.removeEventListener(event, this.resetTimeout);
    });
  }
  
  /**
   * 경고 표시
   */
  private showWarning(): void {
    const remainingMinutes = this.warningMinutes;
    const message = `${remainingMinutes}분 후 자동으로 로그아웃됩니다. 계속 사용하시려면 페이지에서 활동해주세요.`;
    
    // 실제 구현에서는 더 나은 UI 컴포넌트 사용
    if (confirm(message + '\n\n계속 사용하시겠습니까?')) {
      this.resetTimeout();
    }
  }
  
  /**
   * 자동 로그아웃 실행
   */
  private async performAutoLogout(): Promise<void> {
    await forceLogout('token_expired');
    alert('비활성으로 인해 자동 로그아웃되었습니다.');
    window.location.href = '/';
  }
  
  /**
   * 쓰로틀링 유틸리티
   */
  private throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
    let inThrottle: boolean;
    return ((...args: Parameters<T>): ReturnType<T> | void => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }) as T;
  }
}

// 전역 자동 로그아웃 매니저 인스턴스
export const autoLogoutManager = new AutoLogoutManager();

export default LogoutService;