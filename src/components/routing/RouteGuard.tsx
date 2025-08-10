/**
 * 라우트 가드 컴포넌트
 * 
 * 사용자 권한에 따른 라우트 접근 제어를 담당합니다.
 * 권한이 없는 경우 권한 오류 처리 시스템을 통해 사용자 친화적인 오류 페이지를 표시합니다.
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, usePermissions } from '../../auth/auth-hooks';
import { type RouteConfig, findRouteByPath } from '../../config/routes';
import { createRouteAccessError } from '../../auth/PermissionErrorHandler';
import { PermissionErrorDisplay } from '../auth/PermissionErrorDisplay';
import { HierarchicalAccessControl } from '../../auth/HierarchicalPermissionSystem';
import type { UserRole, Permission } from '../../types/auth';

// =============================================================================
// COMPONENT PROPS - 컴포넌트 Props
// =============================================================================

interface RouteGuardProps {
  children: React.ReactElement;
  route: RouteConfig;
}

// =============================================================================
// PERMISSION ERROR WRAPPER - 권한 오류 래퍼
// =============================================================================

interface PermissionErrorWrapperProps {
  route: RouteConfig;
  currentUser: {
    role: UserRole | null;
    permissions: readonly Permission[] | never[];
    isAuthenticated: boolean;
  };
}

const PermissionErrorWrapper: React.FC<PermissionErrorWrapperProps> = ({ 
  route, 
  currentUser 
}) => {
  // 라우트 접근 권한 오류 생성
  const permissionError = createRouteAccessError(
    currentUser,
    {
      path: route.path,
      requiredRoles: route.requiredRoles,
      requiredPermissions: route.requiredPermissions,
      isPublic: route.isPublic || false
    },
    route.component || route.title.ko
  );

  return (
    <PermissionErrorDisplay 
      error={permissionError}
      showDebugInfo={import.meta.env.DEV}
    />
  );
};

// =============================================================================
// ROUTE GUARD COMPONENT - 라우트 가드 컴포넌트
// =============================================================================

export const RouteGuard: React.FC<RouteGuardProps> = ({ children, route }) => {
  const { isAuthenticated, user } = useAuth();
  const { permissions, role } = usePermissions();

  // 현재 사용자 정보 구성 (계층적 권한 시스템용)
  const hierarchicalContext = {
    currentUser: {
      id: user?.id || 'anonymous',
      role: role,
      permissions: permissions,
      isAuthenticated: isAuthenticated
    },
    targetUserId: undefined, // 라우트 매개변수에서 추출 예정
    resourceOwnerId: undefined
  };

  // 계층적 권한 검사
  const accessResult = HierarchicalAccessControl.checkRouteAccess(hierarchicalContext, {
    path: route.path,
    isPublic: route.isPublic,
    accessType: route.accessType,
    requiredRoles: route.requiredRoles,
    requiredPermissions: route.requiredPermissions,
    isPersonalPage: route.isPersonalPage
  });

  // 보안 로깅
  React.useEffect(() => {
    if (!accessResult.allowed) {
      console.error(`SECURITY: Unauthorized access attempt to ${route.path} by user ${hierarchicalContext.currentUser.id} (${hierarchicalContext.currentUser.role || 'none'})`);
      console.log('Access denied reason:', accessResult.reason);
      console.log('Debug info:', accessResult.debugInfo);
    }
  }, [accessResult.allowed, route.path, hierarchicalContext.currentUser.id, hierarchicalContext.currentUser.role]);

  // 접근 허용된 경우
  if (accessResult.allowed) {
    return children;
  }

  // 권한 오류 표시
  const currentUser = {
    role: role,
    permissions: permissions,
    isAuthenticated: isAuthenticated
  };

  return (
    <PermissionErrorWrapper
      route={route}
      currentUser={currentUser}
    />
  );
};

// =============================================================================
// DYNAMIC ROUTE GUARD - 동적 라우트 가드
// =============================================================================

interface DynamicRouteGuardProps {
  children: React.ReactElement;
  path?: string;
}

/**
 * 경로를 기반으로 자동으로 라우트를 찾아서 가드를 적용하는 컴포넌트
 */
export const DynamicRouteGuard: React.FC<DynamicRouteGuardProps> = ({ 
  children, 
  path 
}) => {
  const location = useLocation();
  const currentPath = path || location.pathname;
  
  // 현재 경로에 해당하는 라우트 찾기
  const route = findRouteByPath(currentPath);
  
  // 라우트를 찾을 수 없는 경우 (404)
  if (!route) {
    return <Navigate to="/" replace />;
  }
  
  // 라우트 가드 적용
  return (
    <RouteGuard route={route}>
      {children}
    </RouteGuard>
  );
};

// =============================================================================
// BREADCRUMB COMPONENT - 브레드크럼 컴포넌트
// =============================================================================

interface BreadcrumbProps {
  currentPath?: string;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  currentPath,
  className = ''
}) => {
  const location = useLocation();
  const path = currentPath || location.pathname;
  
  // 브레드크럼 경로 가져오기
  const breadcrumbs = findRouteByPath(path);
  
  if (!breadcrumbs || breadcrumbs.path === '/') {
    return null; // 홈 페이지에서는 브레드크럼 표시 안함
  }

  return (
    <nav className={`flex items-center space-x-2 text-sm text-gray-600 mb-4 ${className}`}>
      <a 
        href="/"
        className="hover:text-primary-600 transition-colors duration-200"
      >
        🏠 홈
      </a>
      <span>/</span>
      <span className="text-gray-800 font-medium">
        {breadcrumbs.icon} {breadcrumbs.title.ko}
      </span>
    </nav>
  );
};

// =============================================================================
// ROUTE METADATA MANAGER - 라우트 메타데이터 관리
// =============================================================================

interface RouteMetaManagerProps {
  route: RouteConfig;
}

export const RouteMetaManager: React.FC<RouteMetaManagerProps> = ({ route }) => {
  React.useEffect(() => {
    // 페이지 제목 설정
    document.title = `${route.title.ko} - S.G. 💍 MIYU`;
    
    // 메타 태그 업데이트
    const updateMetaTag = (name: string, content: string) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };
    
    // 설명 메타 태그
    updateMetaTag('description', route.description.ko);
    
    // 키워드 메타 태그
    if (route.meta?.keywords) {
      updateMetaTag('keywords', route.meta.keywords.join(', '));
    }
    
    // robots 메타 태그
    if (route.meta?.robots) {
      updateMetaTag('robots', route.meta.robots);
    }
    
    // author 메타 태그
    if (route.meta?.author) {
      updateMetaTag('author', route.meta.author);
    }
    
    // Open Graph 태그들
    updateMetaTag('og:title', route.title.ko);
    updateMetaTag('og:description', route.description.ko);
    updateMetaTag('og:type', 'website');
    
  }, [route]);
  
  return null; // 렌더링할 내용 없음
};