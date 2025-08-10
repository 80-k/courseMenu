/**
 * 역할 기반 접근 제어 (RBAC) 시스템
 * 
 * 사용자 권한 검증, 역할 관리, 접근 제어 로직을 제공합니다.
 * 확장 가능한 구조로 설계되어 새로운 역할과 권한을 쉽게 추가할 수 있습니다.
 */

import type { 
  User, 
  UserRole, 
  Permission
} from '../types/auth';

// =============================================================================
// PERMISSION CONSTANTS - 권한 상수들
// =============================================================================

/**
 * 읽기 권한들
 */
export const READ_PERMISSIONS: readonly Permission[] = [
  'read:menu',
  'read:schedule', 
  'read:location',
  'read:program'
] as const;

/**
 * 쓰기 권한들
 */
export const WRITE_PERMISSIONS: readonly Permission[] = [
  'write:menu',
  'write:schedule',
  'write:location',
  'write:program'
] as const;

/**
 * 관리자 권한들
 */
export const ADMIN_PERMISSIONS: readonly Permission[] = [
  'admin:users',
  'admin:system'
] as const;

/**
 * 모든 권한 목록
 */
export const ALL_PERMISSIONS: readonly Permission[] = [
  ...READ_PERMISSIONS,
  ...WRITE_PERMISSIONS,
  ...ADMIN_PERMISSIONS
] as const;

// =============================================================================
// ROLE MANAGEMENT - 역할 관리
// =============================================================================

/**
 * 역할별 기본 권한 반환
 */
export const getRolePermissions = (role: UserRole): readonly Permission[] => {
  const rolePermissions: Record<UserRole, readonly Permission[]> = {
    guest: READ_PERMISSIONS,
    admin: ALL_PERMISSIONS
  };
  
  return rolePermissions[role] || [];
};

/**
 * 역할이 특정 권한을 가지는지 확인
 */
export const roleHasPermission = (role: UserRole, permission: Permission): boolean => {
  const permissions = getRolePermissions(role);
  return permissions.includes(permission);
};

/**
 * 역할이 여러 권한을 모두 가지는지 확인
 */
export const roleHasAllPermissions = (role: UserRole, permissions: readonly Permission[]): boolean => {
  return permissions.every(permission => roleHasPermission(role, permission));
};

/**
 * 역할이 여러 권한 중 하나라도 가지는지 확인
 */
export const roleHasAnyPermission = (role: UserRole, permissions: readonly Permission[]): boolean => {
  return permissions.some(permission => roleHasPermission(role, permission));
};

/**
 * 두 역할 중 더 높은 권한 역할 반환
 */
export const getHigherRole = (role1: UserRole, role2: UserRole): UserRole => {
  const roleHierarchy: Record<UserRole, number> = {
    guest: 1,
    admin: 2
  };
  
  return roleHierarchy[role1] >= roleHierarchy[role2] ? role1 : role2;
};

/**
 * 역할이 다른 역할보다 높은 권한을 가지는지 확인
 */
export const isHigherRole = (role: UserRole, compareRole: UserRole): boolean => {
  const roleHierarchy: Record<UserRole, number> = {
    guest: 1,
    admin: 2
  };
  
  return roleHierarchy[role] > roleHierarchy[compareRole];
};

// =============================================================================
// PERMISSION CHECKING - 권한 검증
// =============================================================================

/**
 * 사용자가 특정 권한을 가지는지 확인
 */
export const userHasPermission = (user: User | null, permission: Permission): boolean => {
  if (!user || !user.isActive) return false;
  
  // 명시적 권한 확인
  if (user.permissions.includes(permission)) return true;
  
  // 역할 기반 권한 확인 (fallback)
  return roleHasPermission(user.role, permission);
};

/**
 * 사용자가 여러 권한을 모두 가지는지 확인
 */
export const userHasAllPermissions = (user: User | null, permissions: readonly Permission[]): boolean => {
  if (!user || !user.isActive) return false;
  
  return permissions.every(permission => userHasPermission(user, permission));
};

/**
 * 사용자가 여러 권한 중 하나라도 가지는지 확인
 */
export const userHasAnyPermission = (user: User | null, permissions: readonly Permission[]): boolean => {
  if (!user || !user.isActive || permissions.length === 0) return false;
  
  return permissions.some(permission => userHasPermission(user, permission));
};

/**
 * 사용자가 특정 역할을 가지는지 확인
 */
export const userHasRole = (user: User | null, role: UserRole): boolean => {
  if (!user || !user.isActive) return false;
  
  return user.role === role;
};

/**
 * 사용자가 여러 역할 중 하나라도 가지는지 확인
 */
export const userHasAnyRole = (user: User | null, roles: readonly UserRole[]): boolean => {
  if (!user || !user.isActive || roles.length === 0) return false;
  
  return roles.includes(user.role);
};

/**
 * 사용자가 관리자 권한을 가지는지 확인
 */
export const userIsAdmin = (user: User | null): boolean => {
  return userHasRole(user, 'admin');
};

/**
 * 사용자가 게스트인지 확인
 */
export const userIsGuest = (user: User | null): boolean => {
  return !user || userHasRole(user, 'guest');
};

// =============================================================================
// RESOURCE ACCESS CONTROL - 리소스 접근 제어
// =============================================================================

/**
 * 메뉴 관련 접근 권한 확인
 */
export const canAccessMenu = (user: User | null, action: 'read' | 'write' = 'read'): boolean => {
  const permission: Permission = action === 'write' ? 'write:menu' : 'read:menu';
  return userHasPermission(user, permission);
};

/**
 * 일정 관련 접근 권한 확인
 */
export const canAccessSchedule = (user: User | null, action: 'read' | 'write' = 'read'): boolean => {
  const permission: Permission = action === 'write' ? 'write:schedule' : 'read:schedule';
  return userHasPermission(user, permission);
};

/**
 * 장소 정보 접근 권한 확인
 */
export const canAccessLocation = (user: User | null, action: 'read' | 'write' = 'read'): boolean => {
  const permission: Permission = action === 'write' ? 'write:location' : 'read:location';
  return userHasPermission(user, permission);
};

/**
 * 프로그램 접근 권한 확인
 */
export const canAccessProgram = (user: User | null, action: 'read' | 'write' = 'read'): boolean => {
  const permission: Permission = action === 'write' ? 'write:program' : 'read:program';
  return userHasPermission(user, permission);
};

/**
 * 사용자 관리 접근 권한 확인
 */
export const canManageUsers = (user: User | null): boolean => {
  return userHasPermission(user, 'admin:users');
};

/**
 * 시스템 관리 접근 권한 확인
 */
export const canManageSystem = (user: User | null): boolean => {
  return userHasPermission(user, 'admin:system');
};

// =============================================================================
// PERMISSION UTILITIES - 권한 유틸리티들
// =============================================================================

/**
 * 권한 설명 반환
 */
export const getPermissionDescription = (permission: Permission): string => {
  const descriptions: Record<Permission, string> = {
    // 와일드카드 권한
    '*': '모든 권한',
    
    // 새로운 권한
    'VIEW_MENU': '메뉴 조회 권한',
    'VIEW_SCHEDULE': '일정 조회 권한',
    'VIEW_LOCATION': '장소 정보 조회 권한',
    'VIEW_PROGRAM': '프로그램 조회 권한',
    'MANAGE_USERS': '사용자 관리 권한',
    'MANAGE_SETTINGS': '설정 관리 권한',
    'VIEW_ANALYTICS': '분석 조회 권한',
    'MANAGE_CONTENT': '컨텐츠 관리 권한',
    'SYSTEM_ADMIN': '시스템 관리 권한',
    // 호환성 권한
    'read:menu': '메뉴 조회 권한',
    'read:schedule': '일정 조회 권한', 
    'read:location': '장소 정보 조회 권한',
    'read:program': '프로그램 조회 권한',
    'write:menu': '메뉴 수정 권한',
    'write:schedule': '일정 수정 권한',
    'write:location': '장소 정보 수정 권한',
    'write:program': '프로그램 수정 권한',
    'admin:users': '사용자 관리 권한',
    'admin:system': '시스템 관리 권한'
  };
  
  return descriptions[permission] || '알 수 없는 권한';
};

/**
 * 역할 설명 반환
 */
export const getRoleDescription = (role: UserRole): string => {
  const descriptions: Record<UserRole, string> = {
    guest: '방문자 - 제한된 조회 권한',
    admin: '관리자 - 모든 기능 접근 가능'
  };
  
  return descriptions[role] || '알 수 없는 역할';
};

/**
 * 사용자 권한 요약 반환
 */
export const getUserPermissionSummary = (user: User | null): string => {
  if (!user) return '인증되지 않은 사용자';
  
  const roleDesc = getRoleDescription(user.role);
  const permissionCount = user.permissions.length;
  
  return `${roleDesc} (${permissionCount}개 권한)`;
};

/**
 * 권한별 사용자 필터링
 */
export const filterUsersByPermission = (users: User[], permission: Permission): User[] => {
  return users.filter(user => userHasPermission(user, permission));
};

/**
 * 역할별 사용자 필터링
 */
export const filterUsersByRole = (users: User[], role: UserRole): User[] => {
  return users.filter(user => userHasRole(user, role));
};

// =============================================================================
// PERMISSION VALIDATION - 권한 검증
// =============================================================================

/**
 * 액세스 토큰 검증 wrapper
 */
export const validateAccess = (
  user: User | null,
  requiredPermissions?: readonly Permission[],
  requiredRoles?: readonly UserRole[]
): { allowed: boolean; reason?: string } => {
  // 사용자 존재 확인
  if (!user) {
    return { allowed: false, reason: '인증이 필요합니다' };
  }
  
  // 활성 사용자 확인
  if (!user.isActive) {
    return { allowed: false, reason: '비활성화된 사용자입니다' };
  }
  
  // 필수 권한 확인
  if (requiredPermissions && requiredPermissions.length > 0) {
    const hasAllPermissions = userHasAllPermissions(user, requiredPermissions);
    if (!hasAllPermissions) {
      const missingPermissions = requiredPermissions.filter(
        permission => !userHasPermission(user, permission)
      );
      return { 
        allowed: false, 
        reason: `다음 권한이 필요합니다: ${missingPermissions.map(getPermissionDescription).join(', ')}` 
      };
    }
  }
  
  // 필수 역할 확인
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = userHasAnyRole(user, requiredRoles);
    if (!hasRequiredRole) {
      return { 
        allowed: false, 
        reason: `다음 역할 중 하나가 필요합니다: ${requiredRoles.map(getRoleDescription).join(', ')}` 
      };
    }
  }
  
  return { allowed: true };
};

/**
 * 권한 체크 데코레이터 함수
 */
export const requirePermissions = <T extends any[], R>(
  permissions: readonly Permission[],
  fn: (user: User, ...args: T) => R
) => {
  return (user: User | null, ...args: T): R => {
    const validation = validateAccess(user, permissions);
    if (!validation.allowed) {
      throw new Error(validation.reason || '권한이 부족합니다');
    }
    return fn(user!, ...args);
  };
};

/**
 * 역할 체크 데코레이터 함수
 */
export const requireRoles = <T extends any[], R>(
  roles: readonly UserRole[],
  fn: (user: User, ...args: T) => R
) => {
  return (user: User | null, ...args: T): R => {
    const validation = validateAccess(user, undefined, roles);
    if (!validation.allowed) {
      throw new Error(validation.reason || '권한이 부족합니다');
    }
    return fn(user!, ...args);
  };
};