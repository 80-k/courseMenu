/**
 * 계층적 권한 시스템을 위한 훅
 * 
 * 관리자가 모든 guest 권한을 상속하되, 개인 정보는 소유자만 접근 가능
 */

import { useCallback, useMemo } from 'react';
import { useAuth, usePermissions } from './auth-hooks';
import { 
  HierarchicalAccessControl, 
  calculateEffectivePermissions,
  hasRoleOrHigher,
  isAdmin,
  isResourceOwner,
  isAdminOrOwner,
  type HierarchicalContext,
  type AccessControlType,
  type UserInfo
} from './HierarchicalPermissionSystem';
import type { Permission, UserRole } from '../types/auth';

// =============================================================================
// HIERARCHICAL PERMISSION HOOK - 계층적 권한 훅
// =============================================================================

export const useHierarchicalPermissions = () => {
  const { isAuthenticated, user } = useAuth();
  const { role, permissions } = usePermissions();

  // 현재 사용자 정보
  const currentUserInfo: UserInfo = useMemo(() => ({
    id: user?.id || 'anonymous',
    role: role,
    permissions: permissions,
    isAuthenticated: isAuthenticated
  }), [user?.id, role, permissions, isAuthenticated]);

  // 효과적인 권한 계산 (상속 포함)
  const effectivePermissions = useMemo(() => 
    calculateEffectivePermissions(role, permissions),
    [role, permissions]
  );

  /**
   * 계층적 권한 확인
   */
  const checkHierarchicalAccess = useCallback((
    accessType: AccessControlType,
    options?: {
      requiredRoles?: readonly UserRole[];
      requiredPermissions?: readonly Permission[];
      targetUserId?: string;
      resourceOwnerId?: string;
    }
  ) => {
    const context: HierarchicalContext = {
      currentUser: currentUserInfo,
      targetUserId: options?.targetUserId,
      resourceOwnerId: options?.resourceOwnerId
    };

    return HierarchicalAccessControl.checkAccess(
      context,
      accessType,
      options?.requiredRoles,
      options?.requiredPermissions
    );
  }, [currentUserInfo]);

  /**
   * 라우트 접근 권한 확인
   */
  const checkRouteAccess = useCallback((
    routeInfo: {
      path: string;
      isPublic?: boolean;
      accessType?: AccessControlType;
      requiredRoles?: readonly UserRole[];
      requiredPermissions?: readonly Permission[];
      isPersonalPage?: boolean;
    },
    targetUserId?: string
  ) => {
    const context: HierarchicalContext = {
      currentUser: currentUserInfo,
      targetUserId
    };

    return HierarchicalAccessControl.checkRouteAccess(context, routeInfo);
  }, [currentUserInfo]);

  /**
   * 기능 접근 권한 확인
   */
  const checkFeatureAccess = useCallback((
    featureInfo: {
      name: string;
      accessType?: AccessControlType;
      requiredRoles?: readonly UserRole[];
      requiredPermissions?: readonly Permission[];
      isPersonalFeature?: boolean;
    },
    resourceOwnerId?: string
  ) => {
    const context: HierarchicalContext = {
      currentUser: currentUserInfo,
      resourceOwnerId
    };

    return HierarchicalAccessControl.checkFeatureAccess(context, featureInfo);
  }, [currentUserInfo]);

  return {
    // 사용자 정보
    currentUser: currentUserInfo,
    effectivePermissions,
    
    // 권한 확인 함수들
    checkHierarchicalAccess,
    checkRouteAccess,
    checkFeatureAccess,
    
    // 편의 함수들
    isAdmin: isAdmin(role),
    hasRoleOrHigher: (requiredRole: UserRole) => hasRoleOrHigher(role, requiredRole),
    isResourceOwner: (resourceOwnerId: string) => isResourceOwner(currentUserInfo.id, resourceOwnerId),
    isAdminOrOwner: (resourceOwnerId: string) => isAdminOrOwner(role, currentUserInfo.id, resourceOwnerId),
    
    // 특정 권한 확인
    canAccessPublic: () => checkHierarchicalAccess('PUBLIC').allowed,
    canAccessAuthenticated: () => checkHierarchicalAccess('AUTHENTICATED').allowed,
    canAccessGuestOrHigher: () => checkHierarchicalAccess('GUEST_OR_HIGHER').allowed,
    canAccessAdminOnly: () => checkHierarchicalAccess('ADMIN_ONLY').allowed
  };
};

// =============================================================================
// SPECIFIC PERMISSION HOOKS - 특정 권한 훅들
// =============================================================================

/**
 * 관리자 권한 확인 훅 (계층적)
 */
export const useAdminHierarchicalPermission = () => {
  const { checkHierarchicalAccess, isAdmin } = useHierarchicalPermissions();

  const checkAdminAccess = useCallback((featureName: string) => {
    const result = checkHierarchicalAccess('ADMIN_ONLY');
    
    if (!result.allowed && import.meta.env.DEV) {
      console.warn(`Admin access denied for feature: ${featureName}`, result.debugInfo);
    }
    
    return result;
  }, [checkHierarchicalAccess]);

  return {
    isAdmin,
    checkAdminAccess,
    canManageUsers: () => checkAdminAccess('USER_MANAGEMENT').allowed,
    canManageSettings: () => checkAdminAccess('SYSTEM_SETTINGS').allowed,
    canViewAnalytics: () => checkAdminAccess('ANALYTICS').allowed
  };
};

/**
 * 개인 정보 접근 권한 훅
 */
export const usePersonalDataPermission = () => {
  const { checkHierarchicalAccess, currentUser, isAdminOrOwner } = useHierarchicalPermissions();

  const checkPersonalDataAccess = useCallback((
    targetUserId: string,
    accessType: 'OWNER_ONLY' | 'OWNER_OR_ADMIN' = 'OWNER_OR_ADMIN'
  ) => {
    return checkHierarchicalAccess(accessType, { targetUserId });
  }, [checkHierarchicalAccess]);

  const canEditProfile = useCallback((targetUserId: string) => {
    return checkPersonalDataAccess(targetUserId, 'OWNER_ONLY').allowed;
  }, [checkPersonalDataAccess]);

  const canViewProfile = useCallback((targetUserId: string) => {
    return checkPersonalDataAccess(targetUserId, 'OWNER_OR_ADMIN').allowed;
  }, [checkPersonalDataAccess]);

  return {
    currentUserId: currentUser.id,
    checkPersonalDataAccess,
    canEditProfile,
    canViewProfile,
    isOwnerOf: (resourceOwnerId: string) => currentUser.id === resourceOwnerId,
    isAdminOrOwner
  };
};

/**
 * 메뉴 접근 권한 훅 (계층적)
 */
export const useMenuHierarchicalPermission = () => {
  const { checkFeatureAccess, hasRoleOrHigher } = useHierarchicalPermissions();

  const checkMenuAccess = useCallback((menuName: string) => {
    return checkFeatureAccess({
      name: `menu_${menuName}`,
      accessType: 'GUEST_OR_HIGHER'
    });
  }, [checkFeatureAccess]);

  return {
    checkMenuAccess,
    canAccessCourse: () => checkMenuAccess('course').allowed,
    canAccessSchedule: () => checkMenuAccess('schedule').allowed,
    canAccessLocation: () => checkMenuAccess('location').allowed,
    canAccessProgram: () => checkMenuAccess('program').allowed,
    hasGuestOrHigher: () => hasRoleOrHigher('guest')
  };
};

/**
 * 데이터 수정 권한 훅 (계층적)
 */
export const useDataModificationHierarchicalPermission = () => {
  const { checkFeatureAccess, isAdmin } = useHierarchicalPermissions();

  const checkEditAccess = useCallback((resourceName: string, ownerId?: string) => {
    return checkFeatureAccess({
      name: `edit_${resourceName}`,
      accessType: ownerId ? 'OWNER_OR_ADMIN' : 'ADMIN_ONLY',
      isPersonalFeature: !!ownerId
    }, ownerId);
  }, [checkFeatureAccess]);

  const checkDeleteAccess = useCallback((resourceName: string) => {
    return checkFeatureAccess({
      name: `delete_${resourceName}`,
      accessType: 'ADMIN_ONLY'
    });
  }, [checkFeatureAccess]);

  return {
    isAdmin,
    checkEditAccess,
    checkDeleteAccess,
    canEdit: (resourceName: string, ownerId?: string) => checkEditAccess(resourceName, ownerId).allowed,
    canDelete: (resourceName: string) => checkDeleteAccess(resourceName).allowed
  };
};

export default useHierarchicalPermissions;