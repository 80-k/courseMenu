import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ALL_ROUTES } from '../config/routes';

// 성능 최적화: 경로별 루트 조회 맵을 생성 (한 번만 생성됨)
const routesByPath = ALL_ROUTES.reduce((acc, route) => {
  acc[route.path] = route;
  return acc;
}, {} as Record<string, typeof ALL_ROUTES[number]>);

/**
 * 현재 위치에 따른 헤더 속성을 계산하는 훅
 * 성능 최적화를 위해 라우트 조회에 Map을 사용합니다.
 */
export const useHeaderProps = () => {
  const location = useLocation();

  return useMemo(() => {
    const path = location.pathname;
    const currentRoute = routesByPath[path];
    
    if (currentRoute && path !== '/') {
      return {
        title: currentRoute.title,
        linkTo: "/",
        showBackLink: true,
      };
    }
    return {};
  }, [location.pathname]);
};