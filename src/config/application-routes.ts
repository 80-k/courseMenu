/**
 * 애플리케이션 라우트 설정 및 관리
 */

export type AppMode = 'wedding' | 'sanggyeonrye' | 'afterparty';

// 라우트 인터페이스
export interface AppRoute {
  path: string;
  name: string;
  component: string;
  title: {
    ko: string;
    ja: string;
  };
  visibleInModes: readonly AppMode[];
  requiresAuth?: boolean;
  isPublic?: boolean;
}

// 기본 라우트 정의
export const ROUTES = {
  // 홈/메인 페이지
  HOME: {
    path: '/',
    name: 'home',
    component: 'MainMenu',
    title: {
      ko: '메인',
      ja: 'メイン',
    },
    visibleInModes: ['wedding', 'sanggyeonrye', 'afterparty'],
    isPublic: true,
  },
  
  // 코스 메뉴 (레스토랑/웨딩 공통)
  COURSE_MENU: {
    path: '/menu/course',
    name: 'courseMenu',
    component: 'CourseMenu',
    title: {
      ko: '코스 요리',
      ja: 'コース料理',
    },
    visibleInModes: ['wedding', 'sanggyeonrye'],
    isPublic: true,
  },
  
  // 일정 관리 (웨딩 전용)
  SCHEDULE: {
    path: '/wedding/schedule',
    name: 'weddingSchedule',
    component: 'SchedulePage',
    title: {
      ko: '일정 안내',
      ja: '日程案内',
    },
    visibleInModes: ['wedding'],
    isPublic: true,
  },
  
  // 예식장 정보 (웨딩 전용)
  VENUE: {
    path: '/wedding/venue',
    name: 'weddingVenue',
    component: 'VenuePage',
    title: {
      ko: '예식장 안내',
      ja: '式場のご案内',
    },
    visibleInModes: ['wedding'],
    isPublic: true,
  },
  
  // 프로그램/타임테이블 (웨딩/이벤트 공통)
  PROGRAM: {
    path: '/event/program',
    name: 'eventProgram',
    component: 'RightPage',
    title: {
      ko: '프로그램',
      ja: 'プログラム',
    },
    visibleInModes: ['wedding', 'afterparty'],
    isPublic: true,
  },
  
  // 웨딩 전체 정보 (기존 LeftPage)
  WEDDING_INFO: {
    path: '/wedding/info',
    name: 'weddingInfo',
    component: 'LeftPage',
    title: {
      ko: '웨딩 정보',
      ja: 'ウェディング情報',
    },
    visibleInModes: ['wedding'],
    isPublic: true,
  },
  
  // 상견례 정보 (상견례 전용)
  SANGGYEONRYE_INFO: {
    path: '/sanggyeonrye/info',
    name: 'sanggyeonryeInfo',
    component: 'SanggyeonryeInfoPage',
    title: {
      ko: '상견례 안내',
      ja: '顔合わせのご案内',
    },
    visibleInModes: ['sanggyeonrye'],
    isPublic: true,
  },
  
  // 뒷풀이 정보 (뒷풀이 전용)
  AFTERPARTY_INFO: {
    path: '/afterparty/info',
    name: 'afterpartyInfo',
    component: 'AfterpartyInfoPage',
    title: {
      ko: '뒷풀이 안내',
      ja: 'アフターパーティーのご案内',
    },
    visibleInModes: ['afterparty'],
    isPublic: true,
  },
  
  // 상견례 식당 정보 (상견례 전용)
  SANGGYEONRYE_RESTAURANT: {
    path: '/sanggyeonrye/restaurant',
    name: 'sanggyeonryeRestaurant',
    component: 'SanggyeonryeRestaurantPage',
    title: {
      ko: '식당 안내',
      ja: 'レストランのご案内',
    },
    visibleInModes: ['sanggyeonrye'],
    isPublic: true,
  },
} as const;

// 라우트 타입
export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey]['path'];
export type RouteName = typeof ROUTES[RouteKey]['name'];

// 레거시 라우트 매핑 (기존 URL과의 호환성을 위한)
export const LEGACY_ROUTE_MAPPING = {
  '/course': ROUTES.COURSE_MENU.path,
  '/left': ROUTES.WEDDING_INFO.path,
  '/right': ROUTES.PROGRAM.path,
  '/schedule': ROUTES.SCHEDULE.path,
  '/venue': ROUTES.VENUE.path,
} as const;

/**
 * 현재 앱 모드에서 사용 가능한 라우트들을 가져오는 함수
 */
export function getAvailableRoutes(mode: AppMode): AppRoute[] {
  return Object.values(ROUTES).filter(route => 
    (route.visibleInModes as unknown as AppMode[]).includes(mode)
  );
}

/**
 * 라우트 키로 라우트 정보 가져오기
 */
export function getRoute(key: RouteKey): AppRoute {
  return ROUTES[key];
}

/**
 * 경로로 라우트 찾기
 */
export function findRouteByPath(path: string): AppRoute | undefined {
  return Object.values(ROUTES).find(route => route.path === path);
}

/**
 * 레거시 경로를 새 경로로 변환
 */
export function transformLegacyPath(legacyPath: string): string {
  return LEGACY_ROUTE_MAPPING[legacyPath as keyof typeof LEGACY_ROUTE_MAPPING] || legacyPath;
}

/**
 * 라우트가 현재 모드에서 접근 가능한지 확인
 */
export function isRouteAccessible(routeKey: RouteKey, mode: AppMode): boolean {
  const route = ROUTES[routeKey];
  return (route.visibleInModes as unknown as AppMode[]).includes(mode);
}

/**
 * 네비게이션 URL 생성 헬퍼
 */
export const createNavigationUrl = {
  home: () => ROUTES.HOME.path,
  courseMenu: () => ROUTES.COURSE_MENU.path,
  schedule: () => ROUTES.SCHEDULE.path,
  venue: () => ROUTES.VENUE.path,
  program: () => ROUTES.PROGRAM.path,
  weddingInfo: () => ROUTES.WEDDING_INFO.path,
  sanggyeonryeInfo: () => ROUTES.SANGGYEONRYE_INFO.path,
  afterpartyInfo: () => ROUTES.AFTERPARTY_INFO.path,
  sanggyeonryeRestaurant: () => ROUTES.SANGGYEONRYE_RESTAURANT.path,
};

/**
 * 동적 라우트 생성 (필요시 파라미터 포함)
 */
export function createDynamicRoute(baseRoute: string, params: Record<string, string>): string {
  let route = baseRoute;
  Object.entries(params).forEach(([key, value]) => {
    route = route.replace(`:${key}`, value);
  });
  return route;
}

/**
 * 브레드크럼 생성을 위한 라우트 계층 구조
 */
export const ROUTE_HIERARCHY = {
  [ROUTES.HOME.path]: [],
  [ROUTES.COURSE_MENU.path]: [ROUTES.HOME.path],
  [ROUTES.SCHEDULE.path]: [ROUTES.HOME.path],
  [ROUTES.VENUE.path]: [ROUTES.HOME.path],
  [ROUTES.PROGRAM.path]: [ROUTES.HOME.path],
  [ROUTES.WEDDING_INFO.path]: [ROUTES.HOME.path],
  [ROUTES.SANGGYEONRYE_INFO.path]: [ROUTES.HOME.path],
  [ROUTES.AFTERPARTY_INFO.path]: [ROUTES.HOME.path],
  [ROUTES.SANGGYEONRYE_RESTAURANT.path]: [ROUTES.HOME.path],
} as const;

/**
 * 특정 경로의 브레드크럼 가져오기
 */
export function getBreadcrumbs(currentPath: string): AppRoute[] {
  const hierarchy = ROUTE_HIERARCHY[currentPath as keyof typeof ROUTE_HIERARCHY] || [];
  const breadcrumbs: AppRoute[] = [];
  
  hierarchy.forEach(path => {
    const route = findRouteByPath(path);
    if (route) {
      breadcrumbs.push(route);
    }
  });
  
  // 현재 페이지 추가
  const currentRoute = findRouteByPath(currentPath);
  if (currentRoute) {
    breadcrumbs.push(currentRoute);
  }
  
  return breadcrumbs;
}