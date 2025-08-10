/**
 * 권한 오류 처리 훅
 * 
 * 컴포넌트에서 기능별 권한을 확인하고 오류를 처리하기 위한 훅
 */

import { useState, useCallback } from 'react';
import { useAuth, usePermissions } from './auth-hooks';
import { createFeatureAccessError, type PermissionError } from './PermissionErrorHandler';
import type { Permission, UserRole } from '../types/auth';

// =============================================================================
// HOOK INTERFACE - 훅 인터페이스
// =============================================================================

export interface PermissionCheckResult {
  allowed: boolean;
  error?: PermissionError | null;
  checkPermission: (
    featureName: string,
    requiredPermissions?: readonly Permission[],
    requiredRoles?: readonly UserRole[]
  ) => boolean;
  showError: (error: PermissionError) => void;
  clearError: () => void;
}

export interface PermissionErrorModalState {
  isOpen: boolean;
  error?: PermissionError;
}

// =============================================================================
// PERMISSION ERROR HOOK - 권한 오류 훅
// =============================================================================

/**
 * 권한 확인 및 오류 처리를 위한 훅
 * 
 * @example
 * ```tsx
 * const { checkPermission, error, showError, clearError } = usePermissionError();
 * 
 * const handleDeleteAction = () => {
 *   const canDelete = checkPermission('deleteUser', ['DELETE_USER'], ['admin']);
 *   if (!canDelete) {
 *     return; // 오류는 자동으로 처리됨
 *   }
 *   // 삭제 로직 수행
 * };
 * ```
 */
export const usePermissionError = (): PermissionCheckResult & {
  error: PermissionError | null;
  modalState: PermissionErrorModalState;
  setModalState: (state: PermissionErrorModalState) => void;
} => {
  const { isAuthenticated } = useAuth();
  const { role, permissions } = usePermissions();
  const [error, setError] = useState<PermissionError | null>(null);
  const [modalState, setModalState] = useState<PermissionErrorModalState>({
    isOpen: false
  });

  // 현재 사용자 정보 구성
  const currentUser = {
    role: role,
    permissions: permissions,
    isAuthenticated: isAuthenticated
  };

  /**
   * 기능별 권한 확인
   */
  const checkPermission = useCallback((
    featureName: string,
    requiredPermissions?: readonly Permission[],
    requiredRoles?: readonly UserRole[]
  ): boolean => {
    // 로그인이 필요한데 로그인하지 않은 경우
    if (!isAuthenticated && (requiredRoles || requiredPermissions)) {
      const permissionError = createFeatureAccessError(
        featureName,
        currentUser,
        requiredPermissions,
        requiredRoles
      );
      setError(permissionError);
      setModalState({ isOpen: true, error: permissionError });
      return false;
    }

    // 관리자 권한이 필요한 경우
    if (requiredRoles?.includes('admin' as UserRole) && role !== 'admin') {
      const permissionError = createFeatureAccessError(
        featureName,
        currentUser,
        requiredPermissions,
        requiredRoles
      );
      setError(permissionError);
      setModalState({ isOpen: true, error: permissionError });
      return false;
    }

    // 특정 역할이 필요한 경우
    if (requiredRoles && requiredRoles.length > 0 && role && !requiredRoles.includes(role)) {
      const permissionError = createFeatureAccessError(
        featureName,
        currentUser,
        requiredPermissions,
        requiredRoles
      );
      setError(permissionError);
      setModalState({ isOpen: true, error: permissionError });
      return false;
    }

    // 특정 권한이 필요한 경우
    if (requiredPermissions && requiredPermissions.length > 0) {
      const hasAllPermissions = requiredPermissions.every(permission =>
        (permissions as Permission[]).includes(permission)
      );
      
      if (!hasAllPermissions) {
        const permissionError = createFeatureAccessError(
          featureName,
          currentUser,
          requiredPermissions,
          requiredRoles
        );
        setError(permissionError);
        setModalState({ isOpen: true, error: permissionError });
        return false;
      }
    }

    return true;
  }, [isAuthenticated, role, permissions, currentUser]);

  /**
   * 권한 오류 표시
   */
  const showError = useCallback((permissionError: PermissionError) => {
    setError(permissionError);
    setModalState({ isOpen: true, error: permissionError });
  }, []);

  /**
   * 오류 상태 초기화
   */
  const clearError = useCallback(() => {
    setError(null);
    setModalState({ isOpen: false });
  }, []);

  return {
    allowed: !error,
    error,
    modalState,
    setModalState,
    checkPermission,
    showError,
    clearError
  };
};

// =============================================================================
// SPECIFIC PERMISSION HOOKS - 특정 권한 확인 훅들
// =============================================================================

/**
 * 관리자 권한 확인 훅
 */
export const useAdminPermission = () => {
  const { checkPermission, ...rest } = usePermissionError();

  const checkAdminAccess = useCallback((featureName: string) => {
    return checkPermission(featureName, undefined, ['admin' as UserRole]);
  }, [checkPermission]);

  return {
    checkAdminAccess,
    ...rest
  };
};

/**
 * 메뉴 설정 권한 확인 훅
 */
export const useMenuPermission = () => {
  const { checkPermission, ...rest } = usePermissionError();

  const checkMenuAccess = useCallback((menuName: string) => {
    return checkPermission(
      `menu_${menuName}`, 
      [`MENU_${menuName.toUpperCase()}` as Permission]
    );
  }, [checkPermission]);

  return {
    checkMenuAccess,
    ...rest
  };
};

/**
 * 데이터 수정 권한 확인 훅
 */
export const useDataModificationPermission = () => {
  const { checkPermission, ...rest } = usePermissionError();

  const checkEditAccess = useCallback((resourceName: string) => {
    return checkPermission(
      `edit_${resourceName}`,
      [`EDIT_${resourceName.toUpperCase()}` as Permission]
    );
  }, [checkPermission]);

  const checkDeleteAccess = useCallback((resourceName: string) => {
    return checkPermission(
      `delete_${resourceName}`,
      [`DELETE_${resourceName.toUpperCase()}` as Permission],
      ['admin' as UserRole]
    );
  }, [checkPermission]);

  return {
    checkEditAccess,
    checkDeleteAccess,
    ...rest
  };
};

// =============================================================================
// PERMISSION ERROR MODAL HOOK - 권한 오류 모달 훅
// =============================================================================

/**
 * 권한 오류 모달 관리 훅
 */
export const usePermissionErrorModal = () => {
  const [modalState, setModalState] = useState<PermissionErrorModalState>({
    isOpen: false
  });

  const openModal = useCallback((error: PermissionError) => {
    setModalState({ isOpen: true, error });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false });
  }, []);

  return {
    modalState,
    openModal,
    closeModal,
    isOpen: modalState.isOpen,
    error: modalState.error
  };
};

export default usePermissionError;