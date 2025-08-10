/**
 * 애플리케이션 라우팅 시스템
 * 
 * 권한 기반 라우팅, 동적 컴포넌트 로딩, 라우트 가드를 지원하는
 * 확장 가능한 라우팅 시스템입니다.
 */

import React, { Suspense, lazy, memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { usePermissions } from '../../auth/AuthContext';
import { 
  getAccessibleRoutes, 
  type RouteConfig
} from '../../config/routes';
import { RouteGuard } from './RouteGuard';
import { RouteMetaManager } from './RouteMetaManager';

// =============================================================================
// DYNAMIC COMPONENT LOADING - 동적 컴포넌트 로딩
// =============================================================================

/**
 * 컴포넌트 동적 import를 위한 매핑
 * 모든 라우트 컴포넌트 포함
 */
const componentMap = {
  MainMenu: lazy(() => import('../../pages/MainMenu').then(m => ({ default: m.MainMenu }))),
  CourseMenu: lazy(() => import('../../pages/CourseMenu').then(m => ({ default: m.CourseMenu }))),
  SchedulePage: lazy(() => import('../../pages/SchedulePage').then(m => ({ default: m.SchedulePage }))),
  LocationPage: lazy(() => import('../../pages/LocationPage').then(m => ({ default: m.LocationPage }))),
  EventProgramPage: lazy(() => import('../../pages/EventProgramPage').then(m => ({ default: m.EventProgramPage }))),
  // 관리자 컴포넌트들
  AdminDashboard: lazy(() => import('../../pages/AdminDashboard').then(m => ({ default: m.AdminDashboard }))),
  UserManagement: lazy(() => import('../../pages/UserManagement').then(m => ({ default: m.UserManagement }))),
  SystemSettings: lazy(() => import('../../pages/SystemSettings').then(m => ({ default: m.SystemSettings }))),
  MenuSettings: lazy(() => import('../../pages/MenuSettings').then(m => ({ default: m.MenuSettings }))),
  RouteDebugger: lazy(() => import('../../pages/RouteDebugger').then(m => ({ default: m.RouteDebugger }))),
  UserProfile: lazy(() => import('../../pages/UserProfile').then(m => ({ default: m.UserProfile })))
} as const;

type ComponentName = keyof typeof componentMap;

// =============================================================================
// LOADING COMPONENT - 로딩 컴포넌트
// =============================================================================

const RouteLoadingFallback: React.FC = () => (
  <div className="main-container">
    <div className="flex items-center justify-center min-h-[60vh]">
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
        <p className="text-gray-600 text-sm">페이지를 불러오는 중...</p>
      </div>
    </div>
  </div>
);

// =============================================================================
// ROUTE COMPONENT RENDERER - 라우트 컴포넌트 렌더러
// =============================================================================

interface RouteRendererProps {
  route: RouteConfig;
  isExpanded?: (id: string) => boolean;
  toggle?: (id: string) => void;
}

const RouteRenderer: React.FC<RouteRendererProps> = ({ 
  route, 
  isExpanded, 
  toggle 
}) => {
  const componentName = route.component as ComponentName;
  const Component = componentMap[componentName];

  if (!Component) {
    console.error(`Component "${route.component}" not found in componentMap`);
    return <Navigate to="/" replace />;
  }

  // CourseMenu 컴포넌트는 특별한 props가 필요함
  const renderComponent = () => {
    if (componentName === 'CourseMenu') {
      // CourseMenu는 isExpanded와 toggle이 필수
      if (!isExpanded || !toggle) {
        console.error('CourseMenu requires isExpanded and toggle props');
        return <Navigate to="/" replace />;
      }
      // TypeScript를 위한 명시적 타입 캐스팅
      const CourseMenuComponent = Component as React.ComponentType<{ isExpanded: (id: string) => boolean; toggle: (id: string) => void; }>;
      return <CourseMenuComponent isExpanded={isExpanded} toggle={toggle} />;
    }
    
    // 다른 컴포넌트들은 props 없이 렌더링
    const StandardComponent = Component as React.ComponentType<{}>;
    return <StandardComponent />;
  };

  return (
    <RouteGuard route={route}>
      <div>
        <RouteMetaManager route={route} />
        {renderComponent()}
      </div>
    </RouteGuard>
  );
};

// =============================================================================
// 404 NOT FOUND PAGE - 404 페이지
// =============================================================================

const NotFoundPage: React.FC = () => (
  <div className="main-container">
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-lg p-8 max-w-md mx-auto">
        {/* 404 아이콘 */}
        <div className="mb-6">
          <div className="text-6xl mb-4">🔍</div>
        </div>
        
        {/* 제목 */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4 font-serif">
          404
        </h1>
        
        <h2 className="text-xl font-semibold text-gray-700 mb-4 font-serif">
          페이지를 찾을 수 없습니다
        </h2>
        
        {/* 설명 */}
        <p className="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        
        {/* 홈으로 돌아가기 버튼 */}
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-lg transition-all duration-200 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          홈으로 돌아가기
        </a>
      </div>
    </div>
  </div>
);

// =============================================================================
// APP ROUTES COMPONENT - 메인 라우팅 컴포넌트
// =============================================================================

interface AppRoutesProps {
  isExpanded: (id: string) => boolean;
  toggle: (id: string) => void;
}

export const AppRoutes: React.FC<AppRoutesProps> = memo(({ isExpanded, toggle }) => {
  const { permissions, role } = usePermissions();

  // 현재 사용자가 접근 가능한 라우트들
  const userRoles = role ? [role] : [];
  const accessibleRoutes = getAccessibleRoutes(permissions, userRoles);

  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        {/* 접근 가능한 라우트들을 동적으로 렌더링 */}
        {accessibleRoutes.map(route => (
          <Route
            key={route.id}
            path={route.path}
            element={
              <RouteRenderer
                route={route}
                isExpanded={isExpanded}
                toggle={toggle}
              />
            }
          />
        ))}

        {/* 404 페이지 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
});

