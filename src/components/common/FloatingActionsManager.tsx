import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { FloatingActions } from './FloatingActions';
import { FeatureGate } from './FeatureGates';
import { ROUTES } from '../../config/routes';

interface FloatingActionsManagerProps {
  allExpanded: boolean;
  onToggleAll: () => void;
}

/**
 * 페이지별 플로팅 액션을 관리하는 컴포넌트
 * 각 페이지에 적합한 플로팅 버튼을 조건부로 렌더링합니다.
 */
export const FloatingActionsManager: React.FC<FloatingActionsManagerProps> = memo(({
  allExpanded,
  onToggleAll,
}) => {
  const location = useLocation();

  return (
    <FeatureGate feature="showFloatingButtons">
      {/* 코스 메뉴 페이지 - 홈 버튼 + 모두 열기/닫기 버튼 */}
      {location.pathname === ROUTES.COURSE.path && (
        <FloatingActions 
          actionType="home-and-toggle" 
          allExpanded={allExpanded} 
          onToggleAll={onToggleAll} 
        />
      )}
      
      {/* 다른 페이지들 - 홈 버튼만 */}
      {[ROUTES.LOCATION.path, ROUTES.SCHEDULE.path, ROUTES.PROGRAM.path].some(path => path === location.pathname) && (
        <FloatingActions actionType="home" />
      )}
    </FeatureGate>
  );
});