/**
 * 인증 관련 커스텀 훅들
 */

import { useContext } from 'react';
import { AuthContext } from './auth-context-definition';
import type { AuthContextType } from '../types/auth';

/**
 * useAuth 훅 - 인증 컨텍스트 사용
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * useAuthUser 훅 - 인증된 사용자 정보만 반환
 */
export const useAuthUser = () => {
  const { user, isAuthenticated } = useAuth();
  return isAuthenticated ? user : null;
};

/**
 * usePermissions 훅 - 권한 관련 유틸리티
 */
export const usePermissions = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated || !user) {
    return {
      permissions: [],
      role: null,
      isAdmin: false,
      isGuest: false,
      hasPermission: () => false,
      hasAnyPermission: () => false,
      hasAllPermissions: () => false,
    };
  }

  const permissions = user.permissions || [];
  const role = user.role || 'guest';
  const isAdmin = role === 'admin';
  const isGuest = role === 'guest';

  return {
    permissions,
    role,
    isAdmin,
    isGuest,
    hasPermission: (permission: string) => 
      permissions.includes(permission) || permissions.includes('*'),
    hasAnyPermission: (requiredPermissions: string[]) =>
      requiredPermissions.some(p => permissions.includes(p)) || permissions.includes('*'),
    hasAllPermissions: (requiredPermissions: string[]) =>
      requiredPermissions.every(p => permissions.includes(p)) || permissions.includes('*'),
  };
};