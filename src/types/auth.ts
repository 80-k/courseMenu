/**
 * 인증 및 권한 관련 타입 정의
 * 
 * 보안을 고려한 사용자 인증, 역할 기반 접근 제어(RBAC) 시스템을 위한
 * 타입 정의들입니다.
 */

// =============================================================================
// CORE AUTH TYPES - 핵심 인증 타입들
// =============================================================================

/**
 * 사용자 역할 정의
 * - guest: 일반 방문자, 제한된 접근 권한
 * - admin: 관리자, 모든 기능 접근 가능
 */
export type UserRole = 'guest' | 'admin';

/**
 * 권한 정의 (계층적 권한 시스템)
 * 각 기능별로 세분화된 권한 시스템
 */
export type Permission = 
  // 와일드카드 권한
  | '*'                   // 모든 권한
  
  // 기본 읽기 권한 (게스트 레벨)
  | 'VIEW_MENU'           // 메뉴 조회
  | 'VIEW_SCHEDULE'       // 일정 조회
  | 'VIEW_LOCATION'       // 장소 정보 조회
  | 'VIEW_PROGRAM'        // 프로그램 조회
  
  // 기존 권한 호환성
  | 'read:menu'           // 메뉴 조회
  | 'read:schedule'       // 일정 조회
  | 'read:location'       // 장소 정보 조회
  | 'read:program'        // 프로그램 조회
  | 'write:menu'          // 메뉴 수정
  | 'write:schedule'      // 일정 수정
  | 'write:location'      // 장소 정보 수정
  | 'write:program'       // 프로그램 수정
  
  // 관리자 권한
  | 'MANAGE_USERS'        // 사용자 관리
  | 'MANAGE_SETTINGS'     // 설정 관리
  | 'VIEW_ANALYTICS'      // 분석 조회
  | 'MANAGE_CONTENT'      // 컨텐츠 관리
  | 'SYSTEM_ADMIN'        // 시스템 관리
  | 'admin:users'         // 사용자 관리 (호환성)
  | 'admin:system';       // 시스템 관리 (호환성)

/**
 * 사용자 정보 인터페이스
 */
export interface User {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly role: UserRole;
  readonly permissions: readonly Permission[];
  readonly createdAt: Date;
  readonly lastLoginAt?: Date;
  readonly isActive: boolean;
}

/**
 * 로그인 자격 증명
 */
export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
  readonly rememberMe?: boolean;
}

/**
 * JWT 토큰 페이로드
 */
export interface TokenPayload {
  readonly sub: string;    // 사용자 ID
  readonly email: string;
  readonly role: UserRole;
  readonly permissions: readonly Permission[];
  readonly iat: number;    // 발급 시간
  readonly exp: number;    // 만료 시간
  readonly iss: string;    // 발급자
}

/**
 * 인증 상태
 */
export interface AuthState {
  readonly isAuthenticated: boolean;
  readonly user: User | null;
  readonly token: string | null;
  readonly isLoading: boolean;
  readonly error: string | null;
}

/**
 * 로그인 응답
 */
export interface LoginResponse {
  readonly success: boolean;
  readonly user: User;
  readonly token: string;
  readonly refreshToken: string;
  readonly expiresIn: number;
}

/**
 * 로그아웃 응답
 */
export interface LogoutResponse {
  readonly success: boolean;
  readonly message: string;
}

// =============================================================================
// ROLE PERMISSIONS MAPPING - 역할별 권한 매핑
// =============================================================================

/**
 * 역할별 기본 권한 정의 (계층적 권한 시스템)
 */
export const ROLE_PERMISSIONS: Record<UserRole, readonly Permission[]> = {
  guest: [
    // 새로운 권한
    'VIEW_MENU',
    'VIEW_SCHEDULE',
    'VIEW_LOCATION',
    'VIEW_PROGRAM',
    // 호환성 유지
    'read:menu',
    'read:schedule',
    'read:location',
    'read:program'
  ] as const,
  
  admin: [
    // 게스트 권한 상속
    'VIEW_MENU',
    'VIEW_SCHEDULE',
    'VIEW_LOCATION',
    'VIEW_PROGRAM',
    // 관리자 전용 권한
    'MANAGE_USERS',
    'MANAGE_SETTINGS',
    'VIEW_ANALYTICS',
    'MANAGE_CONTENT',
    'SYSTEM_ADMIN',
    // 호환성 유지
    'read:menu',
    'read:schedule', 
    'read:location',
    'read:program',
    'write:menu',
    'write:schedule',
    'write:location', 
    'write:program',
    'admin:users',
    'admin:system'
  ] as const
} as const;

// =============================================================================
// AUTH ACTIONS - 인증 액션 타입들
// =============================================================================

/**
 * 인증 액션 타입들
 */
export type AuthAction = 
  | { type: 'AUTH_LOGIN_START' }
  | { type: 'AUTH_LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_LOGIN_FAILURE'; payload: { error: string } }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_TOKEN_REFRESH_SUCCESS'; payload: { token: string } }
  | { type: 'AUTH_TOKEN_REFRESH_FAILURE'; payload: { error: string } }
  | { type: 'AUTH_CLEAR_ERROR' }
  | { type: 'AUTH_SET_LOADING'; payload: { isLoading: boolean } };

// =============================================================================
// AUTH CONTEXT TYPES - 인증 컨텍스트 타입들
// =============================================================================

/**
 * 인증 컨텍스트 액션들
 */
export interface AuthContextActions {
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: (options?: {
    showConfirmation?: boolean;
    reason?: 'user_initiated' | 'token_expired' | 'security_logout' | 'system_maintenance';
    clearUserData?: boolean;
  }) => Promise<LogoutResponse>;
  checkPermission: (permission: Permission) => boolean;
  hasRole: (role: UserRole) => boolean;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

/**
 * 인증 컨텍스트 타입
 */
export interface AuthContextType extends AuthState, AuthContextActions {}

// =============================================================================
// PROTECTED ROUTE TYPES - 보호된 라우트 타입들
// =============================================================================

/**
 * 보호된 라우트 설정
 */
export interface ProtectedRouteConfig {
  readonly requiredPermissions?: readonly Permission[];
  readonly requiredRoles?: readonly UserRole[];
  readonly fallbackPath?: string;
  readonly onAccessDenied?: () => void;
}

// =============================================================================
// TYPE GUARDS - 타입 가드들
// =============================================================================

/**
 * UserRole 타입 가드
 */
export const isUserRole = (value: unknown): value is UserRole => {
  return typeof value === 'string' && ['guest', 'admin'].includes(value);
};

/**
 * Permission 타입 가드
 */
export const isPermission = (value: unknown): value is Permission => {
  const validPermissions: readonly string[] = [
    // 새로운 권한
    'VIEW_MENU', 'VIEW_SCHEDULE', 'VIEW_LOCATION', 'VIEW_PROGRAM',
    'MANAGE_USERS', 'MANAGE_SETTINGS', 'VIEW_ANALYTICS', 'MANAGE_CONTENT', 'SYSTEM_ADMIN',
    // 호환성 권한
    'read:menu', 'read:schedule', 'read:location', 'read:program',
    'write:menu', 'write:schedule', 'write:location', 'write:program',
    'admin:users', 'admin:system'
  ];
  return typeof value === 'string' && validPermissions.includes(value);
};

/**
 * User 타입 가드
 */
export const isUser = (value: unknown): value is User => {
  if (typeof value !== 'object' || value === null) return false;
  
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.name === 'string' &&
    isUserRole(obj.role) &&
    Array.isArray(obj.permissions) &&
    obj.permissions.every(isPermission) &&
    obj.createdAt instanceof Date &&
    typeof obj.isActive === 'boolean'
  );
};

/**
 * TokenPayload 타입 가드
 */
export const isTokenPayload = (value: unknown): value is TokenPayload => {
  if (typeof value !== 'object' || value === null) return false;
  
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.sub === 'string' &&
    typeof obj.email === 'string' &&
    isUserRole(obj.role) &&
    Array.isArray(obj.permissions) &&
    obj.permissions.every(isPermission) &&
    typeof obj.iat === 'number' &&
    typeof obj.exp === 'number' &&
    typeof obj.iss === 'string'
  );
};

// =============================================================================
// UTILITY TYPES - 유틸리티 타입들  
// =============================================================================

/**
 * 인증이 필요한 컴포넌트 Props
 */
export type WithAuthProps<T = {}> = T & {
  user: User;
  permissions: readonly Permission[];
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: UserRole) => boolean;
};

/**
 * 선택적 인증 컴포넌트 Props
 */
export type WithOptionalAuthProps<T = {}> = T & {
  user?: User;
  permissions?: readonly Permission[];
  hasPermission?: (permission: Permission) => boolean;
  hasRole?: (role: UserRole) => boolean;
};