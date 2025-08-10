/**
 * 관리자 대시보드 페이지
 * 
 * 시스템 관리 기능들에 대한 중앙 허브 역할
 */

import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../auth/AuthContext';
import { getRoutesByCategory } from '../config/routes';
import { useI18n } from '../i18n';
import '../styles/global.css';

interface AdminMenuCardProps {
  title: string;
  description: string;
  icon: string;
  path: string;
  badge?: {
    text: string;
    color: string;
  };
  onClick: () => void;
}

const AdminMenuCard: React.FC<AdminMenuCardProps> = memo(({
  title,
  description,
  icon,
  badge,
  onClick
}) => (
  <div
    onClick={onClick}
    className="group bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer relative overflow-hidden"
  >
    {/* 배경 그라데이션 효과 */}
    <div className="absolute inset-0 bg-gradient-to-br from-red-50/20 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    {/* 뱃지 */}
    {badge && (
      <div className="absolute top-4 right-4">
        <span className={`px-2 py-1 text-xs font-bold rounded-full ${
          badge.color === 'red' ? 'bg-red-500 text-white' :
          badge.color === 'blue' ? 'bg-blue-500 text-white' :
          badge.color === 'green' ? 'bg-green-500 text-white' :
          badge.color === 'yellow' ? 'bg-yellow-500 text-white' :
          badge.color === 'purple' ? 'bg-purple-500 text-white' :
          'bg-gray-500 text-white'
        }`}>
          {badge.text}
        </span>
      </div>
    )}

    <div className="relative z-10">
      {/* 아이콘 */}
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      
      {/* 제목 */}
      <h3 className="text-lg font-bold text-gray-800 mb-2 font-serif group-hover:text-red-600 transition-colors duration-300">
        {title}
      </h3>
      
      {/* 설명 */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
      
      {/* 화살표 아이콘 */}
      <div className="mt-4 flex justify-end">
        <svg 
          className="w-5 h-5 text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
));

export const AdminDashboard: React.FC = memo(() => {
  const navigate = useNavigate();
  const { permissions, role } = usePermissions();
  const { translate } = useI18n();

  // 현재 사용자가 접근 가능한 관리자 라우트들
  const userRoles = role ? [role] : [];
  const adminRoutes = getRoutesByCategory('admin', permissions, userRoles);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="main-container">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-purple-600 rounded-full mb-4 shadow-lg">
          <span className="text-2xl text-white">⚙️</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2 font-serif">{translate('admin.dashboard.title')}</h1>
        <p className="text-gray-600">{translate('admin.dashboard.subtitle')}</p>
      </div>

      {/* 사용자 정보 */}
      <div className="bg-gradient-to-r from-red-50 to-purple-50 border border-red-200 rounded-xl p-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{translate('admin.dashboard.loginUser')}</p>
            <p className="font-semibold text-gray-800">{translate('admin.dashboard.adminRole')} ({role})</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-sm text-gray-600">{translate('admin.dashboard.statusActive')}</span>
          </div>
        </div>
      </div>

      {/* 관리자 메뉴 그리드 */}
      {adminRoutes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adminRoutes
            .filter(route => route.showInBreadcrumb !== false) // 관리자 대시보드에서는 breadcrumb 표시 가능한 모든 메뉴 표시
            .map(route => (
              <AdminMenuCard
                key={route.id}
                title={route.title.ko}
                description={route.description.ko}
                icon={route.icon}
                path={route.path}
                badge={route.badge}
                onClick={() => handleNavigate(route.path)}
              />
            ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">{translate('admin.dashboard.noAccess')}</h3>
          <p className="text-gray-500">{translate('admin.dashboard.contactAdmin')}</p>
        </div>
      )}

      {/* 시스템 정보 */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 font-serif">{translate('admin.dashboard.systemInfo')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">{translate('admin.dashboard.version')}</span>
              <span className="ml-2 font-mono">1.0.0</span>
            </div>
            <div>
              <span className="text-gray-600">{translate('admin.dashboard.environment')}</span>
              <span className="ml-2 font-mono">{import.meta.env.MODE}</span>
            </div>
            <div>
              <span className="text-gray-600">{translate('admin.dashboard.permissions')}</span>
              <span className="ml-2">{permissions.length}개</span>
            </div>
            <div>
              <span className="text-gray-600">{translate('admin.dashboard.lastUpdate')}</span>
              <span className="ml-2">{new Date().toLocaleDateString('ko-KR')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});