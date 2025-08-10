/**
 * 라우트 디버거 페이지
 * 
 * 개발 환경에서 라우팅 정보와 권한 상태를 확인할 수 있는 관리자 전용 도구
 */

import React, { memo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePermissions } from '../auth/auth-hooks';
import { getAccessibleRoutes, ALL_ROUTES } from '../config/routes';
import type { RouteConfig } from '../config/routes';
import '../styles/global.css';

interface RouteInfoCardProps {
  route: RouteConfig;
  isAccessible: boolean;
}

const RouteInfoCard: React.FC<RouteInfoCardProps> = memo(({ route, isAccessible }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`border rounded-lg p-4 ${
        isAccessible 
          ? 'border-green-300 bg-green-50' 
          : 'border-red-300 bg-red-50'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{route.icon}</span>
          <div>
            <h3 className="font-semibold text-gray-800">{route.title?.ko || route.id}</h3>
            <p className="text-sm text-gray-600">{route.path}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs rounded-full ${
            isAccessible 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isAccessible ? '접근 가능' : '접근 불가'}
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <svg 
              className={`w-4 h-4 transform transition-transform ${expanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm">
          <div><strong>ID:</strong> {route.id}</div>
          <div><strong>컴포넌트:</strong> {route.component}</div>
          <div><strong>카테고리:</strong> {route.category}</div>
          <div><strong>공개 여부:</strong> {route.isPublic ? '공개' : '보호됨'}</div>
          <div><strong>메뉴 표시:</strong> {route.showInMenu ? '표시' : '숨김'}</div>
          <div><strong>순서:</strong> {route.order}</div>
          {route.requiredRoles && (
            <div><strong>필요한 역할:</strong> {route.requiredRoles.join(', ')}</div>
          )}
          {route.requiredPermissions && (
            <div><strong>필요한 권한:</strong> {route.requiredPermissions.join(', ')}</div>
          )}
          {route.badge && (
            <div><strong>배지:</strong> {route.badge.text} ({route.badge.color})</div>
          )}
          <div><strong>설명:</strong> {route.description.ko}</div>
        </div>
      )}
    </div>
  );
});

const RouteDebugger: React.FC = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { permissions, role } = usePermissions();

  // 관리자가 아닌 경우 접근 차단
  React.useEffect(() => {
    if (role !== 'admin') {
      alert('관리자만 접근 가능한 페이지입니다.');
      navigate('/');
      return;
    }
  }, [role, navigate]);

  // 관리자가 아닌 경우 렌더링 차단
  if (role !== 'admin') {
    return null;
  }

  const handleBack = () => {
    navigate('/admin');
  };

  const userRoles = role ? [role] : [];
  const accessibleRoutes = getAccessibleRoutes(permissions, userRoles);
  const accessibleRouteIds = new Set(accessibleRoutes.map(r => r.id));

  // 카테고리별로 라우트 그룹화
  const routesByCategory = ALL_ROUTES.reduce((acc, route) => {
    const category = route.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(route);
    return acc;
  }, {} as Record<string, typeof ALL_ROUTES>);

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'main': return '메인';
      case 'admin': return '관리자';
      case 'user': return '사용자';
      default: return '기타';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'main': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-red-100 text-red-800';
      case 'user': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="main-container">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={handleBack}
            className="mr-4 p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 font-serif">라우트 디버거</h1>
            <p className="text-gray-600">라우팅 정보 및 권한 상태 확인</p>
          </div>
        </div>
        
        {/* 개발 환경 표시 */}
        <div className="text-right">
          <div className={`px-3 py-1 text-sm rounded-full ${
            import.meta.env.DEV ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
          }`}>
            {import.meta.env.DEV ? '개발 환경' : '프로덕션 환경'}
          </div>
        </div>
      </div>

      {/* 현재 사용자 정보 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 font-serif">현재 사용자 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">역할</h3>
            <p className="text-lg font-semibold text-gray-800">{role || 'none'}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">권한 수</h3>
            <p className="text-lg font-semibold text-gray-800">{permissions.length}개</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">접근 가능 라우트</h3>
            <p className="text-lg font-semibold text-gray-800">{accessibleRoutes.length}개</p>
          </div>
        </div>
        
        {/* 권한 목록 */}
        {permissions.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">현재 권한</h3>
            <div className="flex flex-wrap gap-2">
              {permissions.map(permission => (
                <span key={permission} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {permission}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 현재 위치 정보 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 font-serif">현재 위치</h2>
        <div className="space-y-2">
          <div><strong>경로:</strong> {location.pathname}</div>
          <div><strong>검색:</strong> {location.search || '없음'}</div>
          <div><strong>해시:</strong> {location.hash || '없음'}</div>
          <div><strong>상태:</strong> {location.state ? JSON.stringify(location.state) : '없음'}</div>
        </div>
      </div>

      {/* 라우트 정보 */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-800 font-serif">전체 라우트 정보</h2>
        
        {Object.entries(routesByCategory).map(([category, routes]) => (
          <div key={category} className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(category)}`}>
                {getCategoryName(category)}
              </span>
              <span className="text-sm text-gray-600">
                {routes.length}개 라우트 (접근 가능: {routes.filter(r => accessibleRouteIds.has(r.id)).length}개)
              </span>
            </div>
            
            <div className="grid gap-4">
              {routes
                .sort((a, b) => a.order - b.order)
                .map(route => (
                  <RouteInfoCard
                    key={route.id}
                    route={route}
                    isAccessible={accessibleRouteIds.has(route.id)}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* 통계 정보 */}
      <div className="mt-12 bg-gray-50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 font-serif">통계 정보</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{ALL_ROUTES.length}</p>
            <p className="text-sm text-gray-600">전체 라우트</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{accessibleRoutes.length}</p>
            <p className="text-sm text-gray-600">접근 가능</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">{ALL_ROUTES.length - accessibleRoutes.length}</p>
            <p className="text-sm text-gray-600">접근 불가</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">{Object.keys(routesByCategory).length}</p>
            <p className="text-sm text-gray-600">카테고리</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export { RouteDebugger };