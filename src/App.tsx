import { BrowserRouter as Router } from "react-router-dom";
import { useMemo, useEffect } from "react";
import { I18nProvider } from "./i18n";
import { Header } from "./components/Header";
import { AppRoutes } from "./components/routing/AppRoutes";
import { FloatingActionsManager } from "./components/common/FloatingActionsManager";
import { useToggleState } from "./hooks/useToggleState";
import { useBackgroundStyle } from "./hooks/useBackgroundStyle";
import { useHeaderProps } from "./hooks/useHeaderProps";
import { courseMenuData } from "./data/menuData";
import { ASSETS } from "./constants/assets";
import { getBasePath, handleGitHubPagesRouting } from "./config/routes";
import { useAuth } from "./auth/AuthContext";
import "./styles/global.css";

function AppContent() {
  const { isAuthenticated } = useAuth();
  
  // 성능 최적화: menuIds를 메모이제이션하여 불필요한 재계산 방지
  const menuIds = useMemo(() => 
    courseMenuData.map((item) => item.id), 
    [courseMenuData]
  );
  
  const { isExpanded, toggle, toggleAll, allExpanded } = useToggleState(menuIds);

  // 커스텀 훅을 사용하여 관심사 분리
  useBackgroundStyle(ASSETS.BACKGROUND);
  const headerProps = useHeaderProps();

  // GitHub Pages 라우팅 처리
  useEffect(() => {
    handleGitHubPagesRouting();
  }, []);

  // 자동 로그아웃 설정 (인증된 사용자만)
  useEffect(() => {
    let autoLogoutManager: any = null;
    
    const initAutoLogout = async () => {
      if (isAuthenticated) {
        try {
          const { autoLogoutManager: manager } = await import('./auth/LogoutService');
          autoLogoutManager = manager;
          autoLogoutManager.enable();
          console.log('Auto logout enabled');
        } catch (error) {
          console.error('Failed to initialize auto logout:', error);
        }
      }
    };
    
    initAutoLogout();
    
    return () => {
      if (autoLogoutManager) {
        autoLogoutManager.disable();
        console.log('Auto logout disabled');
      }
    };
  }, [isAuthenticated]);

  return (
    <div className='min-h-screen w-full max-w-full overflow-x-hidden relative box-border'>
      <div className='w-full max-w-full overflow-x-hidden pb-24 relative box-border md:pb-32'>
        <AppRoutes isExpanded={isExpanded} toggle={toggle} />
      </div>

      {/* Header는 fixed로 화면 하단에 항상 고정 */}
      <Header {...headerProps} />

      {/* 페이지별 플로팅 액션 관리 */}
      <FloatingActionsManager 
        allExpanded={allExpanded} 
        onToggleAll={toggleAll} 
      />

    </div>
  );
}

function App() {
  // 환경에 따른 basepath 설정
  const basepath = getBasePath();
  
  return (
    <I18nProvider>
      <Router basename={basepath}>
        <AppContent />
      </Router>
    </I18nProvider>
  );
}

export default App;
