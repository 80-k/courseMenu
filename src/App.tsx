import { BrowserRouter as Router } from "react-router-dom";
import { useMemo } from "react";
import { I18nProvider } from "./i18n";
import { Header } from "./components/Header";
import { AppRoutes } from "./components/routing/AppRoutes";
import { FloatingActionsManager } from "./components/common/FloatingActionsManager";
import { useToggleState } from "./hooks/useToggleState";
import { useBackgroundStyle } from "./hooks/useBackgroundStyle";
import { useHeaderProps } from "./hooks/useHeaderProps";
import { courseMenuData } from "./data/menuData";
import { ASSETS } from "./constants/assets";
import "./styles/global.css";

function AppContent() {
  // 성능 최적화: menuIds를 메모이제이션하여 불필요한 재계산 방지
  const menuIds = useMemo(() => 
    courseMenuData.map((item) => item.id), 
    [courseMenuData]
  );
  
  const { isExpanded, toggle, toggleAll, allExpanded } = useToggleState(menuIds);

  // 커스텀 훅을 사용하여 관심사 분리
  useBackgroundStyle(ASSETS.BACKGROUND);
  const headerProps = useHeaderProps();

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
  return (
    <I18nProvider>
      <Router basename="/courseMenu">
        <AppContent />
      </Router>
    </I18nProvider>
  );
}

export default App;
