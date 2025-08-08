/**
 * 단순하고 명확한 라우트 설정
 * 현재 실제 구현된 페이지만 포함, GitHub Pages 최적화
 */

export interface RouteConfig {
  path: string;
  component: string;
  title: {
    ko: string;
    ja: string;
  };
  description: {
    ko: string;
    ja: string;
  };
  items: {
    ko: string;
    ja: string;
  };
  icon: string;
  isPublic: boolean;
}

/**
 * 실제 구현된 라우트만 정의 (KISS 원칙)
 */
export const ROUTES = {
  // 메인 페이지
  HOME: {
    path: '/',
    component: 'MainMenu',
    title: {
      ko: '메인',
      ja: 'メイン',
    },
    description: {
      ko: '메인 페이지',
      ja: 'メインページ',
    },
    items: {
      ko: '',
      ja: '',
    },
    icon: '🏠',
    isPublic: true,
  },

  // 코스 요리 (가장 중요한 기능)
  COURSE: {
    path: '/course',
    component: 'CourseMenu',
    title: {
      ko: '식사',
      ja: '食事',
    },
    description: {
      ko: '정통 일본 요리의 정수를 담은 특별한 코스 메뉴',
      ja: '本格的な日本料理の真髄を込めた特別なコース料理',
    },
    items: {
      ko: '선부, 순채, 국물, 회, 구이 등',
      ja: '先付、旬彩、汁椀、造里、焼物など',
    },
    icon: '🍱',
    isPublic: true,
  },

  // 중요한 날들 (일정이 아니라 기념일 목록)
  SCHEDULE: {
    path: '/schedule', 
    component: 'SchedulePage',
    title: {
      ko: '일정',
      ja: '日程',
    },
    description: {
      ko: '주요 날짜와 일정',
      ja: '主要な日付と予定',
    },
    items: {
      ko: '입적, 상견례, 본식 일정',
      ja: '入籍、顔合わせ、結婚式日程',
    },
    icon: '📅',
    isPublic: true,
  },

  // 웨딩홀 정보
  LOCATION: {
    path: '/location',
    component: 'LocationPage', 
    title: {
      ko: '장소',
      ja: '会場',
    },
    description: {
      ko: '아모레볼레 산마르코 - 위치와 시설 안내',
      ja: 'アモレヴォレ サンマルコ - 位置と施設案内',
    },
    items: {
      ko: '위치정보, 시설안내, 주소, 연락처',
      ja: '位置情報、施設案内、住所、連絡先',
    },
    icon: '🏛️',
    isPublic: true,
  },

  // 당일 프로그램 
  PROGRAM: {
    path: '/program',
    component: 'EventProgramPage',
    title: {
      ko: '시간표', 
      ja: 'タイムテーブル',
    },
    description: {
      ko: '상견례 진행 순서',
      ja: '顔合わせの進行順序',
    },
    items: {
      ko: '오늘의 전체 스케줄',
      ja: '本日の全体スケジュール',
    },
    icon: '📋',
    isPublic: true,
  },
} as const;

/**
 * 라우트 키 타입
 */
export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey]['path'];

/**
 * 모든 라우트 정보를 배열로 반환
 */
export const getAllRoutes = (): RouteConfig[] => {
  return Object.values(ROUTES);
};

/**
 * 경로로 라우트 찾기
 */
export const findRouteByPath = (path: string): RouteConfig | undefined => {
  return Object.values(ROUTES).find(route => route.path === path);
};

/**
 * 메인 페이지에서 표시할 네비게이션 카드용 라우트들 
 * (홈 제외한 모든 라우트, 지정된 순서대로 정렬)
 * 순서: 1.시간표 → 2.식사 → 3.장소 → 4.일정
 */
export const getNavigationRoutes = (): RouteConfig[] => {
  const routeOrder = ['PROGRAM', 'COURSE', 'LOCATION', 'SCHEDULE'] as const;
  
  return routeOrder.map(key => ROUTES[key]);
};

/**
 * GitHub Pages basename 설정
 */
export const GITHUB_PAGES_BASE = '/courseMenu';

/**
 * 개발/프로덕션 환경에 따른 전체 URL 생성
 */
export const createFullUrl = (path: string): string => {
  if (import.meta.env.PROD) {
    return `${GITHUB_PAGES_BASE}${path}`;
  }
  return path;
};