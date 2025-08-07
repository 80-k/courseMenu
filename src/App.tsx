import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { I18nProvider } from "./i18n";
import { MainMenu } from "./pages/MainMenu";
import { CourseMenu } from "./pages/CourseMenu";
import { WeddingInfoPage } from "./pages/WeddingInfoPage";
import { EventProgramPage } from "./pages/EventProgramPage";
import { SchedulePage } from "./pages/SchedulePage";
import { VenuePage } from "./pages/VenuePage";
import { Header } from "./components/Header";
import { CourseMenuActions } from "./components/CourseMenuActions";
import { FeatureGate } from "./components/common/FeatureGates";
import { useToggleState } from "./hooks/useToggleState";
import { courseMenuData } from "./data/menuData";
import { ROUTES, transformLegacyPath } from "./config/application-routes";
import { ASSETS } from "./constants/assets";
import { useI18n } from "./i18n";
import "./styles/global.css";

function AppContent() {
  const location = useLocation();
  const { translate } = useI18n();
  const { isExpanded, toggle, toggleAll, allExpanded } = useToggleState(
    courseMenuData.map((item) => item.id)
  );

  useEffect(() => {
    document.body.style.backgroundImage = `url(${ASSETS.BACKGROUND})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
  }, []);
  
  // 레거시 라우트 리다이렉션 처리
  const currentPath = location.pathname;
  const newPath = transformLegacyPath(currentPath);
  if (newPath !== currentPath) {
    return <Navigate to={newPath} replace />;
  }

  const getHeaderProps = () => {
    const path = location.pathname;
    
    // 새로운 라우트 구조에 따른 헤더 설정
    if (path === ROUTES.COURSE_MENU.path || path === "/course") {
      return {
        title: {
          ko: translate("header.courseTitle"),
          ja: translate("header.courseTitle"),
        },
        linkTo: "/",
        showBackLink: true,
      };
    } else if (path === ROUTES.WEDDING_INFO.path || path === "/left") {
      return {
        title: {
          ko: translate("header.scheduleWeddingTitle"),
          ja: translate("header.scheduleWeddingTitle"),
        },
        linkTo: "/",
        showBackLink: true,
      };
    } else if (path === ROUTES.SCHEDULE.path || path === "/schedule") {
      return {
        title: {
          ko: translate("header.scheduleMenuTitle"),
          ja: translate("header.scheduleMenuTitle"),
        },
        linkTo: "/",
        showBackLink: true,
      };
    } else if (path === ROUTES.VENUE.path || path === "/venue") {
      return {
        title: {
          ko: translate("venue.title"),
          ja: translate("venue.title"),
        },
        linkTo: "/",
        showBackLink: true,
      };
    } else if (path === ROUTES.PROGRAM.path || path === "/right") {
      return {
        title: {
          ko: translate("header.programMenuTitle"),
          ja: translate("header.programMenuTitle"),
        },
        linkTo: "/",
        showBackLink: true,
      };
    }
    return {};
  };

  return (
    <div className='app-wrapper'>
      <div className='app-content'>
        <Routes>
          {/* 메인 페이지 */}
          <Route path={ROUTES.HOME.path} element={<MainMenu />} />
          
          {/* 새로운 라우트 구조 */}
          <Route
            path={ROUTES.COURSE_MENU.path}
            element={<CourseMenu isExpanded={isExpanded} toggle={toggle} />}
          />
          <Route path={ROUTES.WEDDING_INFO.path} element={<WeddingInfoPage />} />
          <Route path={ROUTES.SCHEDULE.path} element={<SchedulePage />} />
          <Route path={ROUTES.VENUE.path} element={<VenuePage />} />
          <Route path={ROUTES.PROGRAM.path} element={<EventProgramPage />} />
          
          {/* 레거시 라우트 호환성 */}
          <Route path='/course' element={<Navigate to={ROUTES.COURSE_MENU.path} replace />} />
          <Route path='/left' element={<Navigate to={ROUTES.WEDDING_INFO.path} replace />} />
          <Route path='/schedule' element={<Navigate to={ROUTES.SCHEDULE.path} replace />} />
          <Route path='/venue' element={<Navigate to={ROUTES.VENUE.path} replace />} />
          <Route path='/right' element={<Navigate to={ROUTES.PROGRAM.path} replace />} />
        </Routes>
      </div>

      {/* Header는 fixed로 화면 하단에 항상 고정 */}
      <Header {...getHeaderProps()} />

      {/* FloatingButtons는 전체 화면 기준으로 위치 */}
      <FeatureGate feature="showFloatingButtons">
        {(location.pathname === ROUTES.COURSE_MENU.path || location.pathname === "/course") && (
          <CourseMenuActions allExpanded={allExpanded} onToggleAll={toggleAll} />
        )}
      </FeatureGate>
    </div>
  );
}

function App() {
  return (
    <I18nProvider>
      <Router>
        <AppContent />
      </Router>
    </I18nProvider>
  );
}

export default App;
