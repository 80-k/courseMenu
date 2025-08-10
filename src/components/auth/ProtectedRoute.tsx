/**
 * 보호된 라우트 컴포넌트
 * 
 * 특정 권한이나 역할이 필요한 라우트를 보호합니다.
 * 권한이 없는 경우 로그인 폼이나 접근 거부 메시지를 표시합니다.
 */

import React from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '../../auth/auth-hooks';
import { validateAccess } from '../../auth/permissions';
import type { Permission, UserRole, ProtectedRouteConfig } from '../../types/auth';
import { LoginForm } from './LoginForm';

// =============================================================================
// COMPONENT PROPS - 컴포넌트 Props
// =============================================================================

interface ProtectedRouteProps extends ProtectedRouteConfig {
  children: ReactNode;
  showLoginForm?: boolean;
  loadingComponent?: ReactNode;
  accessDeniedComponent?: ReactNode;
}

// =============================================================================
// ACCESS DENIED COMPONENT - 접근 거부 컴포넌트
// =============================================================================

interface AccessDeniedProps {
  reason?: string;
  onRetry?: () => void;
}

const AccessDenied: React.FC<AccessDeniedProps> = ({ reason, onRetry }) => (
  <div className="main-container">
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-lg p-8 max-w-md mx-auto">
        {/* 아이콘 */}
        <div className="mb-4">
          <svg
            className="w-16 h-16 mx-auto text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 15v2m0 0v2m0-2h2m-2 0H10m-7-7l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3h14l2 2v14l-2 2H5l-2-2V5l2-2z"
            />
          </svg>
        </div>
        
        {/* 메시지 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2 font-serif">
          접근이 제한되었습니다
        </h2>
        
        <p className="text-gray-600 text-sm mb-6">
          {reason || '이 페이지에 접근할 권한이 없습니다.'}
        </p>
        
        {/* 액션 버튼들 */}
        <div className="space-y-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              다시 시도
            </button>
          )}
          
          <button
            onClick={() => window.history.back()}
            className="w-full text-gray-600 py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-200 hover:text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            이전 페이지로
          </button>
        </div>
      </div>
    </div>
  </div>
);

// =============================================================================
// LOADING COMPONENT - 로딩 컴포넌트
// =============================================================================

const LoadingAuth: React.FC = () => (
  <div className="main-container">
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="mb-4">
          <svg
            className="animate-spin w-8 h-8 mx-auto text-primary-600"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <p className="text-gray-600 text-sm">인증 확인 중...</p>
      </div>
    </div>
  </div>
);

// =============================================================================
// PROTECTED ROUTE COMPONENT - 보호된 라우트 컴포넌트  
// =============================================================================

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermissions,
  requiredRoles,
  showLoginForm = true,
  loadingComponent,
  accessDeniedComponent,
  onAccessDenied
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // 로딩 중
  if (isLoading) {
    return loadingComponent || <LoadingAuth />;
  }

  // 인증되지 않은 경우
  if (!isAuthenticated) {
    if (showLoginForm) {
      return (
        <div className="main-container">
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md">
              <LoginForm
                onSuccess={() => {
                  // 로그인 성공 후 페이지 새로고침이나 리다이렉트
                  window.location.reload();
                }}
              />
            </div>
          </div>
        </div>
      );
    }

    // 커스텀 접근 거부 컴포넌트 또는 기본 컴포넌트
    return accessDeniedComponent || (
      <AccessDenied 
        reason="로그인이 필요합니다." 
        onRetry={() => window.location.reload()}
      />
    );
  }

  // 권한 검증
  const accessValidation = validateAccess(user, requiredPermissions, requiredRoles);
  
  if (!accessValidation.allowed) {
    // 접근 거부 콜백 호출
    onAccessDenied?.();
    
    // 커스텀 접근 거부 컴포넌트 또는 기본 컴포넌트
    return accessDeniedComponent || (
      <AccessDenied 
        reason={accessValidation.reason}
        onRetry={() => window.location.reload()}
      />
    );
  }

  // 모든 검증 통과
  return <>{children}</>;
};

// =============================================================================
// PERMISSION GATE COMPONENT - 권한 게이트 컴포넌트
// =============================================================================

interface PermissionGateProps {
  permissions?: readonly Permission[];
  roles?: readonly UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
  requireAll?: boolean;
}

/**
 * 특정 권한이 있을 때만 자식 컴포넌트를 렌더링하는 게이트 컴포넌트
 * 라우트 전체를 보호하는 것이 아닌 UI 요소 단위의 권한 제어에 사용
 */
export const PermissionGate: React.FC<PermissionGateProps> = ({
  permissions = [],
  roles = [],
  children,
  fallback = null,
}) => {
  const { user } = useAuth();
  
  const accessValidation = validateAccess(
    user, 
    permissions.length > 0 ? permissions : undefined,
    roles.length > 0 ? roles : undefined
  );
  
  if (!accessValidation.allowed) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};

// =============================================================================
// ROLE GATE COMPONENT - 역할 게이트 컴포넌트
// =============================================================================

interface RoleGateProps {
  roles: readonly UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * 특정 역할이 있을 때만 자식 컴포넌트를 렌더링하는 게이트 컴포넌트
 */
export const RoleGate: React.FC<RoleGateProps> = ({
  roles,
  children,
  fallback = null
}) => {
  return (
    <PermissionGate roles={roles} fallback={fallback}>
      {children}
    </PermissionGate>
  );
};

// =============================================================================
// ADMIN ONLY COMPONENT - 관리자 전용 컴포넌트
// =============================================================================

interface AdminOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * 관리자만 볼 수 있는 컴포넌트
 */
export const AdminOnly: React.FC<AdminOnlyProps> = ({ children, fallback = null }) => {
  return (
    <RoleGate roles={['admin']} fallback={fallback}>
      {children}
    </RoleGate>
  );
};