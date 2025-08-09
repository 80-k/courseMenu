import { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainMenu } from '../../pages/MainMenu';
import { CourseMenu } from '../../pages/CourseMenu';
import { EventProgramPage } from '../../pages/EventProgramPage';
import { SchedulePage } from '../../pages/SchedulePage';
import { LocationPage } from '../../pages/LocationPage';
import { ROUTES } from '../../config/routes';

interface AppRoutesProps {
  isExpanded: (id: string) => boolean;
  toggle: (id: string) => void;
}

/**
 * 애플리케이션의 라우팅을 관리하는 컴포넌트
 * 모든 페이지 라우트를 정의하고 관리합니다.
 */
export const AppRoutes: React.FC<AppRoutesProps> = memo(({ isExpanded, toggle }) => {
  return (
    <Routes>
      {/* 메인 페이지 */}
      <Route path={ROUTES.HOME.path} element={<MainMenu />} />
      
      {/* 기능 페이지들 */}
      <Route path={ROUTES.COURSE.path} element={<CourseMenu isExpanded={isExpanded} toggle={toggle} />} />
      <Route path={ROUTES.SCHEDULE.path} element={<SchedulePage />} />
      <Route path={ROUTES.LOCATION.path} element={<LocationPage />} />
      <Route path={ROUTES.PROGRAM.path} element={<EventProgramPage />} />
    </Routes>
  );
});