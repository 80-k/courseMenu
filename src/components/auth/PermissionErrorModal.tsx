/**
 * 권한 오류 모달 컴포넌트
 * 
 * 전역적으로 사용할 수 있는 권한 오류 표시 모달
 */

import React, { memo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { PermissionError } from '../../auth/PermissionErrorHandler';
import { PermissionErrorDisplay } from './PermissionErrorDisplay';

// =============================================================================
// COMPONENT INTERFACES - 컴포넌트 인터페이스
// =============================================================================

interface PermissionErrorModalProps {
  isOpen: boolean;
  error?: PermissionError | null;
  onClose: () => void;
  showDebugInfo?: boolean;
}

// =============================================================================
// MODAL OVERLAY - 모달 오버레이
// =============================================================================

interface ModalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = memo(({ 
  isOpen, 
  onClose, 
  children 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 약간의 지연을 두어 애니메이션 효과 제공
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // 스크롤 방지
      document.body.style.overflow = 'hidden';
      
      // ESC 키로 닫기
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEsc);
      
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ 
        backgroundColor: isVisible ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0)' 
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-auto transition-all duration-300 transform ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          title="모달 닫기"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {children}
      </div>
    </div>
  );
});

// =============================================================================
// MAIN COMPONENT - 메인 컴포넌트
// =============================================================================

export const PermissionErrorModal: React.FC<PermissionErrorModalProps> = memo(({ 
  isOpen, 
  error, 
  onClose,
  showDebugInfo = import.meta.env.DEV
}) => {
  // 포털을 위한 컨테이너 확인
  const portalRoot = document.getElementById('modal-root') || document.body;

  // 오류가 없으면 렌더링하지 않음
  if (!error) return null;

  const modalContent = (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-xl shadow-2xl">
        <PermissionErrorDisplay
          error={error}
          onDismiss={onClose}
          showDebugInfo={showDebugInfo}
        />
      </div>
    </ModalOverlay>
  );

  return createPortal(modalContent, portalRoot);
});

// =============================================================================
// GLOBAL PERMISSION ERROR PROVIDER - 전역 권한 오류 제공자
// =============================================================================

interface GlobalPermissionErrorContextType {
  showError: (error: PermissionError) => void;
  hideError: () => void;
  currentError: PermissionError | null;
}

const GlobalPermissionErrorContext = React.createContext<GlobalPermissionErrorContextType | null>(null);

interface GlobalPermissionErrorProviderProps {
  children: React.ReactNode;
}

export const GlobalPermissionErrorProvider: React.FC<GlobalPermissionErrorProviderProps> = ({ 
  children 
}) => {
  const [currentError, setCurrentError] = useState<PermissionError | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showError = (error: PermissionError) => {
    setCurrentError(error);
    setIsModalOpen(true);
  };

  const hideError = () => {
    setIsModalOpen(false);
    // 애니메이션이 끝난 후 오류 상태 정리
    setTimeout(() => setCurrentError(null), 300);
  };

  const value = {
    showError,
    hideError,
    currentError
  };

  return (
    <GlobalPermissionErrorContext.Provider value={value}>
      {children}
      <PermissionErrorModal
        isOpen={isModalOpen}
        error={currentError}
        onClose={hideError}
        showDebugInfo={import.meta.env.DEV}
      />
    </GlobalPermissionErrorContext.Provider>
  );
};

/**
 * 전역 권한 오류 컨텍스트 사용 훅
 */
export const useGlobalPermissionError = (): GlobalPermissionErrorContextType => {
  const context = React.useContext(GlobalPermissionErrorContext);
  
  if (!context) {
    throw new Error('useGlobalPermissionError must be used within a GlobalPermissionErrorProvider');
  }
  
  return context;
};

// =============================================================================
// FEATURE-SPECIFIC ERROR HANDLERS - 기능별 오류 핸들러
// =============================================================================

/**
 * 자동 오류 표시 훅
 * 
 * @example
 * ```tsx
 * const { checkAndShowError } = useAutoErrorDisplay();
 * 
 * const handleAction = () => {
 *   checkAndShowError('deleteUser', ['DELETE_USER'], ['admin'], () => {
 *     // 권한이 있을 때만 실행되는 로직
 *     performDelete();
 *   });
 * };
 * ```
 */
export const useAutoErrorDisplay = () => {
  const { showError } = useGlobalPermissionError();
  
  return {
    showError,
    checkAndShowError: (
      error: PermissionError
    ) => {
      showError(error);
    }
  };
};

export default PermissionErrorModal;