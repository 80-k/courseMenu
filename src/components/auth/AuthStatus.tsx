/**
 * 인증 상태 표시 컴포넌트
 * 
 * 현재 로그인한 사용자 정보와 로그아웃 기능을 제공합니다.
 * 헤더나 사이드바에서 사용할 수 있는 간단한 UI 컴포넌트입니다.
 */

import React, { useState, useCallback } from 'react';
import { useAuth, usePermissions } from '../../auth/AuthContext';
import { getRoleDescription } from '../../auth/permissions';
import { useI18n } from '../../i18n';
import { LoginForm } from './LoginForm';

// =============================================================================
// COMPONENT PROPS - 컴포넌트 Props
// =============================================================================

interface AuthStatusProps {
  showDetails?: boolean;
  showLoginButton?: boolean;
  className?: string;
  compact?: boolean;
}

// =============================================================================
// AUTH STATUS COMPONENT - 인증 상태 컴포넌트
// =============================================================================

export const AuthStatus: React.FC<AuthStatusProps> = ({
  showDetails = false,
  showLoginButton = true,
  className = '',
  compact = false
}) => {
  const { 
    isAuthenticated, 
    user, 
    logout, 
    isLoading 
  } = useAuth();
  
  const { 
    isAdmin, 
    isGuest, 
    permissions, 
    role 
  } = usePermissions();

  const { translate } = useI18n();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // =============================================================================
  // EVENT HANDLERS - 이벤트 핸들러들
  // =============================================================================

  const handleLogout = useCallback(async () => {
    setIsLoggingOut(true);
    setShowDropdown(false);
    
    try {
      // 보안 강화된 로그아웃 실행
      const result = await logout({
        showConfirmation: true,
        reason: 'user_initiated',
        clearUserData: role === 'admin' // 관리자는 사용자 데이터도 정리
      });
      
      if (result.success && result.message) {
        // 성공 메시지 표시 (선택적)
        console.log('Logout successful:', result.message);
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // 오류 발생 시에도 기본 로그아웃 처리 (이미 logout 함수에서 처리됨)
    } finally {
      setIsLoggingOut(false);
      
      // 로그아웃 후 홈으로 리다이렉트 (필요 시)
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
  }, [logout, role]);

  const handleLoginSuccess = useCallback(() => {
    setShowLoginForm(false);
  }, []);

  // =============================================================================
  // RENDER HELPERS - 렌더링 헬퍼들
  // =============================================================================

  /**
   * 로딩 상태 렌더링
   */
  if (isLoading) {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="animate-pulse flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-20 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  /**
   * 미인증 상태 렌더링
   */
  if (!isAuthenticated) {
    return (
      <div className={`${className}`}>
        {showLoginButton && !showLoginForm && (
          <button
            onClick={() => setShowLoginForm(true)}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
{translate('login.loginButton')}
          </button>
        )}
        
        {showLoginForm && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              // 배경 클릭 시에만 닫기 (모달 내용 클릭 시에는 닫지 않음)
              if (e.target === e.currentTarget) {
                setShowLoginForm(false);
              }
            }}
          >
            <div className="w-full max-w-md relative">
              {/* 닫기 버튼 */}
              <button
                onClick={() => setShowLoginForm(false)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 z-10 transition-all duration-200"
                aria-label={translate('auth.loginWindowClose')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* 로그인 폼 */}
              <LoginForm
                onSuccess={handleLoginSuccess}
                onCancel={() => setShowLoginForm(false)}
                showGuestLogin={true}
                showRememberMe={true}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  /**
   * 인증된 상태 렌더링
   */
  return (
    <div className={`relative ${className}`}>
      {/* 사용자 정보 버튼 */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 hover:shadow-sm"
        title={translate('auth.userMenu')}
      >
        {/* 사용자 아바타 */}
        <div className={`flex-shrink-0 ${compact ? 'w-6 h-6' : 'w-8 h-8'} bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm`}>
          <span className={`text-white font-semibold ${compact ? 'text-xs' : 'text-sm'}`}>
            {user?.name.charAt(0).toUpperCase()}
          </span>
        </div>
        
        {!compact && (
          <>
            {/* 사용자 정보 */}
            <div className="flex flex-col items-start">
              <span className="font-medium text-gray-800">{user?.name}</span>
              <span className={`text-xs ${isAdmin ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>
                {role && getRoleDescription(role)}
              </span>
            </div>
            
            {/* 드롭다운 아이콘 */}
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ml-1 ${showDropdown ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>

      {/* compact 모드에서 빠른 로그아웃 버튼 */}
      {compact && isAuthenticated && (
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="ml-2 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
          title={translate('auth.logout')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      )}

      {/* 드롭다운 메뉴 */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* 사용자 정보 헤더 */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* 권한 정보 */}
          {showDetails && (
            <div className="px-4 py-3 border-b border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">{translate('auth.permissions')}</h4>
              <div className="space-y-1">
                <p className="text-xs text-gray-600">
                  <strong>{translate('auth.role')}</strong> {role && getRoleDescription(role)}
                </p>
                <p className="text-xs text-gray-600">
                  <strong>{translate('admin.dashboard.permissions')}</strong> {permissions.length}개
                </p>
                {isAdmin && (
                  <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
{translate('users.admin')}
                  </span>
                )}
                {isGuest && (
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
{translate('users.guest')}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* 액션 버튼들 */}
          <div className="px-4 py-3">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg transition-colors duration-200 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? (
                <>
                  <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {translate('auth.loggingOut')}
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  {translate('auth.logout')}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* 드롭다운 외부 클릭시 닫기 */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};