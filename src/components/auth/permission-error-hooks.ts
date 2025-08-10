/**
 * 권한 오류 관련 커스텀 훅들
 */

import React, { useContext } from 'react';

// Context는 provider 파일에서 import
export interface GlobalPermissionErrorContextType {
  showError: (error: any) => void;
  hideError: () => void;
  currentError: any | null;
  isVisible: boolean;
}

// Context는 runtime에서 주입됨
let GlobalPermissionErrorContext: React.Context<GlobalPermissionErrorContextType | undefined>;

export const setGlobalPermissionErrorContext = (context: React.Context<GlobalPermissionErrorContextType | undefined>) => {
  GlobalPermissionErrorContext = context;
};

/**
 * 전역 권한 오류 컨텍스트 사용 훅
 */
export const useGlobalPermissionError = (): GlobalPermissionErrorContextType => {
  const context = useContext(GlobalPermissionErrorContext);
  
  if (!context) {
    throw new Error('useGlobalPermissionError must be used within a GlobalPermissionErrorProvider');
  }
  
  return context;
};

/**
 * 자동 오류 표시 훅
 */
export const useAutoErrorDisplay = () => {
  const { showError } = useGlobalPermissionError();
  
  return {
    displayError: showError
  };
};