/**
 * 권한 오류 표시 컴포넌트
 * 
 * 사용자 친화적이고 개발자 디버깅에 편리한 권한 오류 UI
 */

import React, { memo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PermissionError, SuggestedAction } from '../../auth/PermissionErrorHandler';
import '../../styles/global.css';

// =============================================================================
// COMPONENT INTERFACES - 컴포넌트 인터페이스
// =============================================================================

interface PermissionErrorDisplayProps {
  error: PermissionError;
  onDismiss?: () => void;
  showDebugInfo?: boolean;
}

interface ActionButtonProps {
  action: SuggestedAction;
  onClick: () => void;
}

// =============================================================================
// ACTION BUTTON COMPONENT - 액션 버튼 컴포넌트
// =============================================================================

const ActionButton: React.FC<ActionButtonProps> = memo(({ action, onClick }) => {
  const getButtonStyles = (actionType: SuggestedAction['type'], isPrimary?: boolean) => {
    const baseStyles = "inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    if (isPrimary) {
      switch (actionType) {
        case 'LOGIN':
          return `${baseStyles} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500`;
        case 'CONTACT_ADMIN':
          return `${baseStyles} bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`;
        case 'REQUEST_PERMISSION':
          return `${baseStyles} bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500`;
        default:
          return `${baseStyles} bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-500`;
      }
    }
    
    return `${baseStyles} bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 border border-gray-300`;
  };

  const getIcon = (actionType: SuggestedAction['type']) => {
    switch (actionType) {
      case 'LOGIN':
        return <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>;
      case 'CONTACT_ADMIN':
        return <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>;
      case 'REQUEST_PERMISSION':
        return <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>;
      case 'GO_HOME':
        return <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>;
      case 'GO_BACK':
        return <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>;
      case 'UPGRADE_ROLE':
        return <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>;
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className={getButtonStyles(action.type, action.primary)}
      title={action.description}
    >
      {getIcon(action.type)}
      {action.label}
    </button>
  );
});

// =============================================================================
// DEBUG INFO COMPONENT - 디버그 정보 컴포넌트
// =============================================================================

interface DebugInfoProps {
  error: PermissionError;
  isExpanded: boolean;
  onToggle: () => void;
}

const DebugInfo: React.FC<DebugInfoProps> = memo(({ error, isExpanded, onToggle }) => {
  if (!import.meta.env.DEV) return null;

  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <button
        onClick={onToggle}
        className="flex items-center text-sm text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
      >
        <svg 
          className={`w-4 h-4 mr-2 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        개발자 디버그 정보 {isExpanded ? '숨기기' : '보기'}
      </button>
      
      {isExpanded && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm">
          <div className="space-y-4">
            {/* 기본 오류 정보 */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">오류 정보</h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div><strong>타입:</strong> {error.type}</div>
                <div><strong>시간:</strong> {error.timestamp.toLocaleString()}</div>
                <div><strong>메시지:</strong> {error.message}</div>
                <div><strong>심각도:</strong> {getSeverityBadge(error.type)}</div>
              </div>
            </div>

            {/* 사용자 정보 */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">현재 사용자</h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div><strong>역할:</strong> {error.debugInfo.currentUser.role || 'none'}</div>
                <div><strong>인증:</strong> {error.debugInfo.currentUser.isAuthenticated ? '✅ 예' : '❌ 아니오'}</div>
                <div><strong>권한 수:</strong> {error.debugInfo.currentUser.permissions.length}개</div>
                <div>
                  <strong>권한:</strong>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {error.debugInfo.currentUser.permissions.length > 0 ? (
                      error.debugInfo.currentUser.permissions.map(permission => (
                        <span key={permission} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {permission}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">없음</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 필요한 접근 권한 */}
            {(error.debugInfo.requiredAccess.requiredRoles || error.debugInfo.requiredAccess.requiredPermissions) && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">필요한 권한</h4>
                <div className="space-y-2 text-xs">
                  {error.debugInfo.requiredAccess.requiredRoles && (
                    <div>
                      <strong>필요한 역할:</strong>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {error.debugInfo.requiredAccess.requiredRoles.map(role => (
                          <span key={role} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {error.debugInfo.requiredAccess.requiredPermissions && (
                    <div>
                      <strong>필요한 권한:</strong>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {error.debugInfo.requiredAccess.requiredPermissions.map(permission => (
                          <span key={permission} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 부족한 권한 */}
            {(error.debugInfo.missingAccess.missingRoles || error.debugInfo.missingAccess.missingPermissions) && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">부족한 권한</h4>
                <div className="space-y-2 text-xs">
                  {error.debugInfo.missingAccess.missingRoles && error.debugInfo.missingAccess.missingRoles.length > 0 && (
                    <div>
                      <strong>부족한 역할:</strong>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {error.debugInfo.missingAccess.missingRoles.map(role => (
                          <span key={role} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {error.debugInfo.missingAccess.missingPermissions && error.debugInfo.missingAccess.missingPermissions.length > 0 && (
                    <div>
                      <strong>부족한 권한:</strong>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {error.debugInfo.missingAccess.missingPermissions.map(permission => (
                          <span key={permission} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 라우트 정보 */}
            {error.debugInfo.route && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">라우트 정보</h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div><strong>경로:</strong> {error.debugInfo.route.path}</div>
                  <div><strong>컴포넌트:</strong> {error.debugInfo.route.component || 'N/A'}</div>
                  <div><strong>공개:</strong> {error.debugInfo.route.isPublic ? '✅ 예' : '❌ 아니오'}</div>
                </div>
              </div>
            )}

            {/* 컨텍스트 정보 */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">컨텍스트</h4>
              <div className="space-y-1 text-xs">
                <div><strong>위치:</strong> <code className="bg-gray-200 px-1 rounded text-xs">{error.context.location}</code></div>
                <div><strong>참조:</strong> <code className="bg-gray-200 px-1 rounded text-xs">{error.context.referrer || 'N/A'}</code></div>
                <div><strong>User Agent:</strong> <code className="bg-gray-200 px-1 rounded text-xs break-all">{error.context.userAgent}</code></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

// =============================================================================
// HELPER FUNCTIONS - 도움 함수들
// =============================================================================

const getSeverityBadge = (errorType: string) => {
  const severityMap: Record<string, { label: string; className: string }> = {
    INSUFFICIENT_ROLE: { label: '높음', className: 'bg-red-100 text-red-800' },
    MISSING_PERMISSION: { label: '높음', className: 'bg-red-100 text-red-800' },
    NOT_AUTHENTICATED: { label: '중간', className: 'bg-yellow-100 text-yellow-800' },
    ADMIN_ONLY: { label: '높음', className: 'bg-red-100 text-red-800' },
    GUEST_RESTRICTED: { label: '중간', className: 'bg-yellow-100 text-yellow-800' },
    FEATURE_DISABLED: { label: '낮음', className: 'bg-blue-100 text-blue-800' },
    MAINTENANCE_MODE: { label: '낮음', className: 'bg-blue-100 text-blue-800' },
    RATE_LIMITED: { label: '중간', className: 'bg-yellow-100 text-yellow-800' }
  };

  const severity = severityMap[errorType] || { label: '알 수 없음', className: 'bg-gray-100 text-gray-800' };
  return <span className={`px-2 py-1 text-xs rounded ${severity.className}`}>{severity.label}</span>;
};

const getErrorIcon = (errorType: string) => {
  const iconMap: Record<string, string> = {
    INSUFFICIENT_ROLE: '🔐',
    MISSING_PERMISSION: '🚫',
    NOT_AUTHENTICATED: '🔑',
    FEATURE_DISABLED: '⏸️',
    ROUTE_NOT_FOUND: '🔍',
    ADMIN_ONLY: '👑',
    GUEST_RESTRICTED: '👤',
    MAINTENANCE_MODE: '🔧',
    RATE_LIMITED: '⏱️',
    UNKNOWN_ERROR: '❓'
  };

  return iconMap[errorType] || '❓';
};

// =============================================================================
// MAIN COMPONENT - 메인 컴포넌트
// =============================================================================

export const PermissionErrorDisplay: React.FC<PermissionErrorDisplayProps> = memo(({ 
  error, 
  onDismiss,
  showDebugInfo = import.meta.env.DEV 
}) => {
  const navigate = useNavigate();
  const [debugExpanded, setDebugExpanded] = useState(false);

  const handleActionClick = useCallback((action: SuggestedAction) => {
    try {
      action.action();
    } catch (error) {
      console.error('Action execution failed:', error);
    }
  }, []);

  const handleDismiss = useCallback(() => {
    if (onDismiss) {
      onDismiss();
    } else {
      // 기본 동작: 홈으로 이동
      navigate('/');
    }
  }, [onDismiss, navigate]);

  return (
    <div className="main-container">
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
          {/* 오류 헤더 */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{getErrorIcon(error.type)}</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2 font-serif">
              접근이 제한되었습니다
            </h1>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-sm text-gray-500">오류 유형:</span>
              <code className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded font-mono">
                {error.type}
              </code>
            </div>
          </div>

          {/* 사용자 메시지 */}
          <div className="mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-blue-800 leading-relaxed">
                    {error.userMessage}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 권한 정보 요약 */}
          <div className="mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">권한 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">현재 역할:</span>
                  <span className="ml-2 font-medium">
                    {error.debugInfo.currentUser.role || '로그인 필요'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">인증 상태:</span>
                  <span className="ml-2">
                    {error.debugInfo.currentUser.isAuthenticated ? (
                      <span className="text-green-600 font-medium">✅ 로그인됨</span>
                    ) : (
                      <span className="text-red-600 font-medium">❌ 로그인 필요</span>
                    )}
                  </span>
                </div>
                {error.debugInfo.missingAccess.missingRoles && error.debugInfo.missingAccess.missingRoles.length > 0 && (
                  <div className="md:col-span-2">
                    <span className="text-gray-600">필요한 역할:</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {error.debugInfo.missingAccess.missingRoles.map(role => (
                        <span key={role} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 제안된 액션들 */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm">해결 방법</h3>
            <div className="flex flex-wrap gap-3">
              {error.suggestedActions.map((action, index) => (
                <ActionButton
                  key={index}
                  action={action}
                  onClick={() => handleActionClick(action)}
                />
              ))}
            </div>
          </div>

          {/* 디버그 정보 */}
          {showDebugInfo && (
            <DebugInfo
              error={error}
              isExpanded={debugExpanded}
              onToggle={() => setDebugExpanded(!debugExpanded)}
            />
          )}

          {/* 닫기 버튼 */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <button
              onClick={handleDismiss}
              className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded px-2 py-1"
            >
              이 메시지 닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PermissionErrorDisplay;