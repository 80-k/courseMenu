/**
 * 인증 컨텍스트 및 Provider
 * 
 * React Context API를 사용한 전역 인증 상태 관리
 * 토큰 자동 갱신, 권한 검증, 상태 지속성을 제공합니다.
 */

import React, { 
  useReducer, 
  useEffect, 
  useCallback,
  useMemo
} from 'react';
import type { ReactNode } from 'react';
import type { 
  AuthState, 
  AuthAction, 
  AuthContextType, 
  User, 
  LoginCredentials, 
  LoginResponse, 
  LogoutResponse, 
  Permission, 
  UserRole 
} from '../types/auth';
import { 
  createToken, 
  parseToken, 
  validateToken,
  storeToken, 
  storeRefreshToken,
  getStoredToken, 
  clearTokens,
  refreshTokenIfNeeded 
} from './token-utils';
import { userHasPermission, userHasRole, getRolePermissions } from './permissions';

// =============================================================================
// CONTEXT IMPORT - 컨텍스트 임포트 (Fast Refresh 호환)
// =============================================================================

import { AuthContext } from './auth-context-definition';

// =============================================================================
// INITIAL STATE - 초기 상태
// =============================================================================

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: true, // 앱 시작 시 로딩 상태
  error: null
};

// =============================================================================
// REDUCER - 상태 리듀서
// =============================================================================

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };
      
    case 'AUTH_LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        error: null
      };
      
    case 'AUTH_LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: action.payload.error
      };
      
    case 'AUTH_LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: null
      };
      
    case 'AUTH_TOKEN_REFRESH_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        error: null
      };
      
    case 'AUTH_TOKEN_REFRESH_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload.error
      };
      
    case 'AUTH_CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
      
    case 'AUTH_SET_LOADING':
      return {
        ...state,
        isLoading: action.payload.isLoading
      };
      
    default:
      return state;
  }
};

// =============================================================================
// DEMO USER DATA - 데모용 사용자 데이터
// =============================================================================

const DEMO_USERS = [
  {
    id: '1',
    email: 'guest@example.com',
    name: '게스트 사용자',
    role: 'guest' as UserRole,
    permissions: getRolePermissions('guest'),
    createdAt: new Date('2024-01-01'),
    isActive: true,
    password: 'guest123' // 실제 운영에서는 해시화 필요
  },
  {
    id: '2',
    email: 'admin@example.com',
    name: '관리자',
    role: 'admin' as UserRole,
    permissions: getRolePermissions('admin'),
    createdAt: new Date('2024-01-01'),
    isActive: true,
    password: 'admin123' // 실제 운영에서는 해시화 필요
  }
] as const;

// =============================================================================
// AUTH PROVIDER COMPONENT - 인증 프로바이더 컴포넌트
// =============================================================================

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // =============================================================================
  // AUTHENTICATION FUNCTIONS - 인증 함수들
  // =============================================================================

  /**
   * 로그인 함수
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<LoginResponse> => {
    dispatch({ type: 'AUTH_LOGIN_START' });

    try {
      // 실제 구현에서는 서버 API 호출
      // 여기서는 데모용 로컬 검증
      const user = DEMO_USERS.find(u => 
        u.email === credentials.email && 
        u.password === credentials.password
      );

      if (!user) {
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
      }

      if (!user.isActive) {
        throw new Error('비활성화된 계정입니다.');
      }

      // JWT 토큰 생성
      const token = await createToken({
        sub: user.id,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
        iss: 'courseMenu-app'
      });

      const refreshToken = `refresh_${token}`;

      // 사용자 객체 생성 (비밀번호 제외)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      // password 는 로그인 처리에서만 사용되고 사용자 상태에서는 제거
      const authenticatedUser: User = {
        ...userWithoutPassword,
        lastLoginAt: new Date()
      };

      // 토큰 저장
      storeToken(token, credentials.rememberMe || false);
      storeRefreshToken(refreshToken, credentials.rememberMe || false);

      // 상태 업데이트
      dispatch({ 
        type: 'AUTH_LOGIN_SUCCESS', 
        payload: { user: authenticatedUser, token } 
      });

      const response: LoginResponse = {
        success: true,
        user: authenticatedUser,
        token,
        refreshToken,
        expiresIn: 24 * 60 * 60 // 24시간
      };

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '로그인에 실패했습니다.';
      dispatch({ type: 'AUTH_LOGIN_FAILURE', payload: { error: errorMessage } });
      
      throw new Error(errorMessage);
    }
  }, []);

  /**
   * 로그아웃 함수 (강화된 보안 로그아웃 서비스 사용)
   */
  const logout = useCallback(async (options?: {
    showConfirmation?: boolean;
    reason?: 'user_initiated' | 'token_expired' | 'security_logout' | 'system_maintenance';
    clearUserData?: boolean;
  }): Promise<LogoutResponse> => {
    try {
      // LogoutService를 동적 import로 로드하여 순환 의존성 방지
      const { LogoutService } = await import('./LogoutService');
      const logoutService = LogoutService.getInstance();
      
      const result = await logoutService.performLogout({
        showConfirmation: options?.showConfirmation || false,
        reason: options?.reason || 'user_initiated',
        clearUserData: options?.clearUserData || false,
        redirectTo: '/'
      });
      
      if (result.success) {
        dispatch({ type: 'AUTH_LOGOUT' });
      }
      
      return {
        success: result.success,
        message: result.message || result.error || '로그아웃 처리 완료'
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '로그아웃에 실패했습니다.';
      
      // 오류가 발생해도 기본 로그아웃 처리
      clearTokens();
      dispatch({ type: 'AUTH_LOGOUT' });
      
      return {
        success: false,
        message: errorMessage
      };
    }
  }, []);

  /**
   * 토큰 갱신 함수
   */
  const refreshToken = useCallback(async (): Promise<void> => {
    try {
      if (!state.token) {
        throw new Error('갱신할 토큰이 없습니다.');
      }

      const newToken = await refreshTokenIfNeeded(state.token);
      if (!newToken) {
        throw new Error('토큰 갱신에 실패했습니다.');
      }

      dispatch({ 
        type: 'AUTH_TOKEN_REFRESH_SUCCESS', 
        payload: { token: newToken } 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '토큰 갱신에 실패했습니다.';
      dispatch({ 
        type: 'AUTH_TOKEN_REFRESH_FAILURE', 
        payload: { error: errorMessage } 
      });
    }
  }, [state.token]);

  // =============================================================================
  // PERMISSION FUNCTIONS - 권한 함수들
  // =============================================================================

  /**
   * 권한 확인 함수
   */
  const checkPermission = useCallback((permission: Permission): boolean => {
    return userHasPermission(state.user, permission);
  }, [state.user]);

  /**
   * 역할 확인 함수
   */
  const hasRole = useCallback((role: UserRole): boolean => {
    return userHasRole(state.user, role);
  }, [state.user]);

  /**
   * 에러 클리어 함수
   */
  const clearError = useCallback((): void => {
    dispatch({ type: 'AUTH_CLEAR_ERROR' });
  }, []);

  // =============================================================================
  // INITIALIZATION EFFECT - 초기화 이펙트
  // =============================================================================

  /**
   * 앱 시작 시 저장된 토큰으로 인증 상태 복원
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch({ type: 'AUTH_SET_LOADING', payload: { isLoading: true } });

        const storedToken = getStoredToken();
        if (!storedToken) {
          dispatch({ type: 'AUTH_SET_LOADING', payload: { isLoading: false } });
          return;
        }

        const isValid = await validateToken(storedToken);
        if (!isValid) {
          clearTokens();
          dispatch({ type: 'AUTH_SET_LOADING', payload: { isLoading: false } });
          return;
        }

        const tokenPayload = parseToken(storedToken);
        if (!tokenPayload) {
          clearTokens();
          dispatch({ type: 'AUTH_SET_LOADING', payload: { isLoading: false } });
          return;
        }

        // 토큰에서 사용자 정보 복원
        const user: User = {
          id: tokenPayload.sub,
          email: tokenPayload.email,
          name: tokenPayload.email.split('@')[0], // 간단한 이름 생성
          role: tokenPayload.role,
          permissions: tokenPayload.permissions,
          createdAt: new Date(tokenPayload.iat * 1000),
          lastLoginAt: new Date(),
          isActive: true
        };

        dispatch({ 
          type: 'AUTH_LOGIN_SUCCESS', 
          payload: { user, token: storedToken } 
        });
      } catch (error) {
        console.error('Authentication initialization failed:', error);
        clearTokens();
        dispatch({ type: 'AUTH_SET_LOADING', payload: { isLoading: false } });
      }
    };

    initializeAuth();
  }, []);

  /**
   * 토큰 자동 갱신 설정
   */
  useEffect(() => {
    if (!state.isAuthenticated || !state.token) return;

    const interval = setInterval(async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error('Auto token refresh failed:', error);
      }
    }, 15 * 60 * 1000); // 15분마다 체크

    return () => clearInterval(interval);
  }, [state.isAuthenticated, state.token, refreshToken]);

  // =============================================================================
  // CONTEXT VALUE - 컨텍스트 값
  // =============================================================================

  const contextValue = useMemo<AuthContextType>(() => ({
    // 상태
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    token: state.token,
    isLoading: state.isLoading,
    error: state.error,
    
    // 액션
    login,
    logout,
    checkPermission,
    hasRole,
    refreshToken,
    clearError
  }), [
    state.isAuthenticated,
    state.user,
    state.token,
    state.isLoading,
    state.error,
    login,
    logout,
    checkPermission,
    hasRole,
    refreshToken,
    clearError
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// =============================================================================
// NOTES - 참고사항
// =============================================================================

/**
 * 커스텀 훅들은 auth-hooks.ts 파일에 분리되어 있습니다.
 * Fast Refresh 지원을 위해 컴포넌트와 훅을 분리했습니다.
 * 
 * 사용법:
 * import { useAuth, usePermissions } from './auth-hooks';
 */