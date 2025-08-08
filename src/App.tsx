import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useMemo } from "react";
import { I18nProvider } from "./i18n";
import { MainMenu } from "./pages/MainMenu";
import { CourseMenu } from "./pages/CourseMenu";
import { EventProgramPage } from "./pages/EventProgramPage";
import { SchedulePage } from "./pages/SchedulePage";
import { LocationPage } from "./pages/LocationPage";
import { Header } from "./components/Header";
import { FloatingActions } from "./components/common/FloatingActions";
import { FeatureGate } from "./components/common/FeatureGates";
import { useToggleState } from "./hooks/useToggleState";
import { courseMenuData } from "./data/menuData";
import { ROUTES } from "./config/routes";
import { ASSETS } from "./constants/assets";
import "./styles/global.css";

function AppContent() {
  const location = useLocation();
  
  // 성능 최적화: menuIds를 메모이제이션하여 불필요한 재계산 방지
  const menuIds = useMemo(() => 
    courseMenuData.map((item) => item.id), 
    [courseMenuData]
  );
  
  const { isExpanded, toggle, toggleAll, allExpanded } = useToggleState(menuIds);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${ASSETS.BACKGROUND})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
  }, []);
  
  // 더 이상 레거시 리다이렉션 처리 불필요

  const getHeaderProps = () => {
    const path = location.pathname;
    const currentRoute = Object.values(ROUTES).find(route => route.path === path);
    
    if (currentRoute && path !== '/') {
      return {
        title: currentRoute.title,
        linkTo: "/",
        showBackLink: true,
      };
    }
    return {};
  };

  return (
    <div className='min-h-screen w-full max-w-full overflow-x-hidden relative box-border'>
      <div className='w-full max-w-full overflow-x-hidden pb-24 relative box-border md:pb-32'>
        <Routes>
          {/* 메인 페이지 */}
          <Route path={ROUTES.HOME.path} element={<MainMenu />} />
          
          {/* 실제 구현된 페이지들 - 간단한 경로 */}
          <Route path={ROUTES.COURSE.path} element={<CourseMenu isExpanded={isExpanded} toggle={toggle} />} />
          <Route path={ROUTES.SCHEDULE.path} element={<SchedulePage />} />
          <Route path={ROUTES.LOCATION.path} element={<LocationPage />} />
          <Route path={ROUTES.PROGRAM.path} element={<EventProgramPage />} />
          
          {/* 사용하지 않는 WeddingInfoPage는 제거 */}
        </Routes>
      </div>

      {/* Header는 fixed로 화면 하단에 항상 고정 */}
      <Header {...getHeaderProps()} />

      {/* FloatingButtons는 전체 화면 기준으로 위치 */}
      <FeatureGate feature="showFloatingButtons">
        {/* 코스 메뉴 페이지 - 홈 버튼 + 모두 열기/닫기 버튼 */}
        {location.pathname === ROUTES.COURSE.path && (
          <FloatingActions 
            actionType="home-and-toggle" 
            allExpanded={allExpanded} 
            onToggleAll={toggleAll} 
          />
        )}
        
        {/* 다른 페이지들 - 홈 버튼만 */}
        {[ROUTES.LOCATION.path, ROUTES.SCHEDULE.path, ROUTES.PROGRAM.path].some(path => path === location.pathname) && (
          <FloatingActions actionType="home" />
        )}
      </FeatureGate>
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
