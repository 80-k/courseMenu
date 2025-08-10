/**
 * 계층적 권한 시스템
 * 
 * 관리자는 모든 guest 권한을 상속하되, 개인 정보 페이지는 본인만 접근 가능
 */

import type { Permission, UserRole } from '../types/auth';

// =============================================================================
// HIERARCHICAL PERMISSION TYPES - 계층적 권한 타입
// =============================================================================

export interface UserInfo {
  id: string;
  role: UserRole | null;
  permissions: readonly Permission[];
  isAuthenticated: boolean;
}

export interface HierarchicalContext {
  currentUser: UserInfo;
  targetUserId?: string; // 개인 정보 페이지 접근 시 대상 사용자 ID
  resourceOwnerId?: string; // 리소스 소유자 ID
}

export type AccessControlType = 
  | 'PUBLIC'           // 누구나 접근 가능
  | 'AUTHENTICATED'    // 로그인 사용자만
  | 'GUEST_OR_HIGHER'  // guest 이상 권한
  | 'ADMIN_ONLY'       // 관리자만 접근 가능
  | 'OWNER_ONLY'       // 소유자만 접근 가능 (개인 정보)
  | 'OWNER_OR_ADMIN';  // 소유자 또는 관리자

// =============================================================================
// ROLE HIERARCHY - 역할 계층 구조
// =============================================================================

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  'guest': 1,
  'admin': 100
} as const;

/**
 * 역할 계층 확인
 * 상위 역할은 하위 역할의 모든 권한을 상속
 */
export const hasRoleOrHigher = (userRole: UserRole | null, requiredRole: UserRole): boolean => {
  if (!userRole) return false;
  
  const userLevel = ROLE_HIERARCHY[userRole] || 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0;
  
  return userLevel >= requiredLevel;
};

/**
 * 사용자가 특정 권한을 가지고 있는지 확인 (계층적)
 */
export const hasPermissionOrHigher = (
  userRole: UserRole | null, 
  userPermissions: readonly Permission[], 
  requiredPermission: Permission
): boolean => {
  // 관리자는 모든 권한을 가진 것으로 간주
  if (userRole === 'admin') {
    return true;
  }
  
  // 직접 권한 확인
  return userPermissions.includes(requiredPermission);
};

// =============================================================================
// PERMISSION INHERITANCE - 권한 상속 시스템
// =============================================================================

/**
 * 기본 guest 권한 목록
 */
export const GUEST_PERMISSIONS: readonly Permission[] = [
  'VIEW_MENU',
  'VIEW_SCHEDULE', 
  'VIEW_LOCATION',
  'VIEW_PROGRAM'
] as const;

/**
 * 관리자 전용 권한 목록
 */
export const ADMIN_PERMISSIONS: readonly Permission[] = [
  ...GUEST_PERMISSIONS,
  'MANAGE_USERS',
  'MANAGE_SETTINGS',
  'VIEW_ANALYTICS',
  'MANAGE_CONTENT',
  'SYSTEM_ADMIN'
] as const;

/**
 * 역할별 권한 상속 계산
 */
export const getInheritedPermissions = (role: UserRole | null): readonly Permission[] => {
  if (!role) return [];
  
  switch (role) {
    case 'admin':
      return ADMIN_PERMISSIONS;
    case 'guest':
      return GUEST_PERMISSIONS;
    default:
      return [];
  }
};

/**
 * 사용자의 전체 권한 계산 (상속 + 직접 부여)
 */
export const calculateEffectivePermissions = (
  role: UserRole | null, 
  directPermissions: readonly Permission[] = []
): readonly Permission[] => {
  const inheritedPermissions = getInheritedPermissions(role);
  const allPermissions = new Set([...inheritedPermissions, ...directPermissions]);
  return Array.from(allPermissions);
};

// =============================================================================
// ACCESS CONTROL ENGINE - 접근 제어 엔진
// =============================================================================

export class HierarchicalAccessControl {
  /**
   * 계층적 접근 권한 확인
   */
  static checkAccess(
    context: HierarchicalContext,
    accessType: AccessControlType,
    requiredRoles?: readonly UserRole[],
    requiredPermissions?: readonly Permission[]
  ): {
    allowed: boolean;
    reason?: string;
    debugInfo: {
      accessType: AccessControlType;
      userRole: UserRole | null;
      effectivePermissions: readonly Permission[];
      isOwner?: boolean;
      inheritedFromRole?: boolean;
    };
  } {
    const { currentUser, targetUserId, resourceOwnerId } = context;
    const effectivePermissions = calculateEffectivePermissions(
      currentUser.role, 
      currentUser.permissions
    );

    const debugInfo = {
      accessType,
      userRole: currentUser.role,
      effectivePermissions,
      isOwner: targetUserId ? currentUser.id === targetUserId : 
               resourceOwnerId ? currentUser.id === resourceOwnerId : false,
      inheritedFromRole: currentUser.role === 'admin'
    };

    // 1. PUBLIC 접근
    if (accessType === 'PUBLIC') {
      return { allowed: true, debugInfo };
    }

    // 2. 인증 필요
    if (!currentUser.isAuthenticated) {
      return { 
        allowed: false, 
        reason: '로그인이 필요합니다',
        debugInfo 
      };
    }

    // 3. AUTHENTICATED - 로그인한 사용자만
    if (accessType === 'AUTHENTICATED') {
      return { allowed: true, debugInfo };
    }

    // 4. OWNER_ONLY - 소유자만 접근 가능 (개인 정보)
    if (accessType === 'OWNER_ONLY') {
      const isOwner = targetUserId ? currentUser.id === targetUserId :
                     resourceOwnerId ? currentUser.id === resourceOwnerId : false;
      
      if (!isOwner) {
        return {
          allowed: false,
          reason: '본인의 정보만 접근할 수 있습니다',
          debugInfo: { ...debugInfo, isOwner }
        };
      }
      return { allowed: true, debugInfo: { ...debugInfo, isOwner: true } };
    }

    // 5. OWNER_OR_ADMIN - 소유자 또는 관리자
    if (accessType === 'OWNER_OR_ADMIN') {
      const isOwner = targetUserId ? currentUser.id === targetUserId :
                     resourceOwnerId ? currentUser.id === resourceOwnerId : false;
      const isAdmin = currentUser.role === 'admin';
      
      if (!isOwner && !isAdmin) {
        return {
          allowed: false,
          reason: '본인의 정보이거나 관리자 권한이 필요합니다',
          debugInfo: { ...debugInfo, isOwner }
        };
      }
      return { allowed: true, debugInfo: { ...debugInfo, isOwner } };
    }

    // 6. ADMIN_ONLY - 관리자만 접근
    if (accessType === 'ADMIN_ONLY') {
      if (currentUser.role !== 'admin') {
        return {
          allowed: false,
          reason: '관리자 권한이 필요합니다',
          debugInfo
        };
      }
      return { allowed: true, debugInfo };
    }

    // 7. GUEST_OR_HIGHER - guest 이상 권한 (관리자 포함)
    if (accessType === 'GUEST_OR_HIGHER') {
      if (!hasRoleOrHigher(currentUser.role, 'guest')) {
        return {
          allowed: false,
          reason: 'guest 이상의 권한이 필요합니다',
          debugInfo
        };
      }
      return { allowed: true, debugInfo };
    }

    // 8. 특정 역할 확인
    if (requiredRoles && requiredRoles.length > 0) {
      const hasRequiredRole = requiredRoles.some(role => 
        hasRoleOrHigher(currentUser.role, role)
      );
      
      if (!hasRequiredRole) {
        return {
          allowed: false,
          reason: `필요한 역할: ${requiredRoles.join(', ')}`,
          debugInfo
        };
      }
    }

    // 9. 특정 권한 확인
    if (requiredPermissions && requiredPermissions.length > 0) {
      const hasAllPermissions = requiredPermissions.every(permission =>
        hasPermissionOrHigher(currentUser.role, effectivePermissions, permission)
      );
      
      if (!hasAllPermissions) {
        const missingPermissions = requiredPermissions.filter(permission =>
          !hasPermissionOrHigher(currentUser.role, effectivePermissions, permission)
        );
        
        return {
          allowed: false,
          reason: `필요한 권한: ${missingPermissions.join(', ')}`,
          debugInfo
        };
      }
    }

    return { allowed: true, debugInfo };
  }

  /**
   * 라우트 접근 권한 확인 (계층적)
   */
  static checkRouteAccess(
    context: HierarchicalContext,
    route: {
      path: string;
      isPublic?: boolean;
      accessType?: AccessControlType;
      requiredRoles?: readonly UserRole[];
      requiredPermissions?: readonly Permission[];
      isPersonalPage?: boolean;
    }
  ) {
    // 개인 페이지인 경우
    if (route.isPersonalPage) {
      return this.checkAccess(context, 'OWNER_ONLY');
    }

    // 공개 페이지
    if (route.isPublic) {
      return this.checkAccess(context, 'PUBLIC');
    }

    // 명시적 접근 타입이 있는 경우
    if (route.accessType) {
      return this.checkAccess(
        context, 
        route.accessType, 
        route.requiredRoles, 
        route.requiredPermissions
      );
    }

    // 관리자 페이지 판단
    if (route.path.includes('/admin/')) {
      return this.checkAccess(context, 'ADMIN_ONLY');
    }

    // 기본: 인증된 사용자
    return this.checkAccess(
      context, 
      'AUTHENTICATED', 
      route.requiredRoles, 
      route.requiredPermissions
    );
  }

  /**
   * 기능 접근 권한 확인 (계층적)
   */
  static checkFeatureAccess(
    context: HierarchicalContext,
    feature: {
      name: string;
      accessType?: AccessControlType;
      requiredRoles?: readonly UserRole[];
      requiredPermissions?: readonly Permission[];
      isPersonalFeature?: boolean;
    }
  ) {
    // 개인 기능인 경우
    if (feature.isPersonalFeature) {
      return this.checkAccess(context, 'OWNER_OR_ADMIN');
    }

    // 명시적 접근 타입
    if (feature.accessType) {
      return this.checkAccess(
        context, 
        feature.accessType, 
        feature.requiredRoles, 
        feature.requiredPermissions
      );
    }

    // 기본: guest 이상 권한
    return this.checkAccess(
      context, 
      'GUEST_OR_HIGHER', 
      feature.requiredRoles, 
      feature.requiredPermissions
    );
  }
}

// =============================================================================
// CONVENIENCE FUNCTIONS - 편의 함수
// =============================================================================

/**
 * 사용자가 관리자인지 확인
 */
export const isAdmin = (userRole: UserRole | null): boolean => {
  return userRole === 'admin';
};

/**
 * 사용자가 특정 리소스의 소유자인지 확인
 */
export const isResourceOwner = (userId: string, resourceOwnerId: string): boolean => {
  return userId === resourceOwnerId;
};

/**
 * 관리자이거나 리소스 소유자인지 확인
 */
export const isAdminOrOwner = (
  userRole: UserRole | null, 
  userId: string, 
  resourceOwnerId: string
): boolean => {
  return isAdmin(userRole) || isResourceOwner(userId, resourceOwnerId);
};

export default HierarchicalAccessControl;