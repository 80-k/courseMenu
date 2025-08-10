/**
 * 확장 가능하고 권한 기반 라우팅 시스템
 * 
 * GitHub Pages 호환, 사용자 권한 기반 접근 제어,
 * 동적 라우트 생성 및 가드 시스템을 지원합니다.
 */

import type { Permission, UserRole } from '../types/auth';
import type { AccessControlType } from '../auth/HierarchicalPermissionSystem';

// =============================================================================
// ROUTE TYPES - 라우트 타입 정의
// =============================================================================

/**
 * 기본 라우트 정보
 */
export interface BaseRoute {
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
  meta?: {
    keywords?: string[];
    author?: string;
    robots?: string;
  };
}

/**
 * 보안 및 권한 설정 (계층적 권한 시스템)
 */
export interface RouteGuard {
  isPublic: boolean;
  accessType?: AccessControlType;
  requiredPermissions?: readonly Permission[];
  requiredRoles?: readonly UserRole[];
  isPersonalPage?: boolean;  // 개인 정보 페이지 여부
  redirectTo?: string;
  fallbackPath?: string;
}

/**
 * 네비게이션 설정
 */
export interface NavigationConfig {
  showInMenu: boolean;
  showInBreadcrumb: boolean;
  order: number;
  category?: 'main' | 'admin' | 'user';
  badge?: {
    text: string;
    color: 'red' | 'blue' | 'green' | 'yellow' | 'purple';
  };
}

/**
 * 완전한 라우트 설정
 */
export interface RouteConfig extends BaseRoute, RouteGuard, NavigationConfig {
  id: string;
  parentId?: string;
  children?: RouteConfig[];
}

// =============================================================================
// ROUTE DEFINITIONS - 라우트 정의
// =============================================================================

/**
 * 메인 공개 라우트들 (모든 사용자 접근 가능)
 */
export const PUBLIC_ROUTES: RouteConfig[] = [
  {
    id: 'home',
    path: '/',
    component: 'MainMenu',
    title: {
      ko: '메인',
      ja: 'メイン'
    },
    description: {
      ko: '상견례 메인 페이지',
      ja: '顔合わせメインページ'
    },
    items: {
      ko: '메뉴, 일정, 장소, 프로그램',
      ja: 'メニュー、日程、会場、プログラム'
    },
    icon: '🏠',
    isPublic: true,
    showInMenu: false,
    showInBreadcrumb: false,
    order: 0,
    category: 'main',
    meta: {
      keywords: ['상견례', '웨딩', '일본요리', '顔合わせ'],
      robots: 'index,follow'
    }
  },
  {
    id: 'course',
    path: '/course',
    component: 'CourseMenu',
    title: {
      ko: '식사',
      ja: '食事'
    },
    description: {
      ko: '정통 일본 요리의 정수를 담은 특별한 코스 메뉴',
      ja: '本格的な日本料理の真髄を込めた特別なコース料理'
    },
    items: {
      ko: '선부, 슌사이, 시루완, 쓰쿠리, 야키모노 등',
      ja: '先付、旬彩、汁椀、造里、焼物など'
    },
    icon: '🍱',
    isPublic: true,
    accessType: 'PUBLIC',
    showInMenu: true,
    showInBreadcrumb: true,
    order: 2,
    category: 'main'
  },
  {
    id: 'schedule',
    path: '/schedule',
    component: 'SchedulePage',
    title: {
      ko: '일정',
      ja: '日程'
    },
    description: {
      ko: '주요 날짜와 일정 안내',
      ja: '主要な日付と予定のご案内'
    },
    items: {
      ko: '입적, 상견례, 본식 일정',
      ja: '入籍、顔合わせ、結婚式日程'
    },
    icon: '📅',
    isPublic: true,
    accessType: 'PUBLIC',
    showInMenu: true,
    showInBreadcrumb: true,
    order: 4,
    category: 'main'
  },
  {
    id: 'location',
    path: '/location',
    component: 'LocationPage',
    title: {
      ko: '장소',
      ja: '会場'
    },
    description: {
      ko: '아모레볼레 산마르코 - 위치와 시설 안내',
      ja: 'アモレヴォレ サンマルコ - 位置と施設のご案内'
    },
    items: {
      ko: '위치정보, 시설안내, 주소, 연락처',
      ja: '位置情報、施設案内、住所、連絡先'
    },
    icon: '🏛️',
    isPublic: true,
    accessType: 'PUBLIC',
    showInMenu: true,
    showInBreadcrumb: true,
    order: 3,
    category: 'main'
  },
  {
    id: 'program',
    path: '/program',
    component: 'EventProgramPage',
    title: {
      ko: '시간표',
      ja: 'タイムテーブル'
    },
    description: {
      ko: '상견례 당일 진행 순서',
      ja: '顔合わせ当日の進行順序'
    },
    items: {
      ko: '인사, 건배, 식사, 대화, 기념촬영',
      ja: '挨拶、乾杯、食事、歓談、記念撮影'
    },
    icon: '📋',
    isPublic: true,
    accessType: 'PUBLIC',
    showInMenu: true,
    showInBreadcrumb: true,
    order: 1,
    category: 'main'
  }
] as const;

/**
 * 관리자 전용 라우트들
 */
export const ADMIN_ROUTES: RouteConfig[] = [
  {
    id: 'admin',
    path: '/admin',
    component: 'AdminDashboard',
    title: {
      ko: '시스템 관리',
      ja: 'システム管理'
    },
    description: {
      ko: '사용자, 메뉴, 시스템 설정 관리',
      ja: 'ユーザー、メニュー、システム設定管理'
    },
    items: {
      ko: '메뉴 설정, 사용자 관리, 시스템 도구',
      ja: 'メニュー設定、ユーザー管理、システムツール'
    },
    icon: '⚙️',
    isPublic: false,
    accessType: 'ADMIN_ONLY',
    showInMenu: true,
    showInBreadcrumb: true,
    order: 100,
    category: 'admin',
    badge: {
      text: 'ADMIN',
      color: 'red'
    }
  },
  {
    id: 'admin-menu-settings',
    path: '/admin/menu-settings',
    parentId: 'admin',
    component: 'MenuSettings',
    title: {
      ko: '메뉴 설정',
      ja: 'メニュー設定'
    },
    description: {
      ko: '게스트 사용자 메뉴 표시 설정',
      ja: 'ゲストユーザーメニュー表示設定'
    },
    items: {
      ko: '메뉴 표시/숨김, 게스트 접근 제어',
      ja: 'メニュー表示/非表示、ゲストアクセス制御'
    },
    icon: '📋',
    isPublic: false,
    accessType: 'ADMIN_ONLY',
    showInMenu: false,
    showInBreadcrumb: true,
    order: 99,
    category: 'admin',
    badge: {
      text: 'MENU',
      color: 'blue'
    }
  },
  {
    id: 'admin-route-debugger',
    path: '/admin/route-debugger',
    parentId: 'admin',
    component: 'RouteDebugger',
    title: {
      ko: '라우트 디버거',
      ja: 'ルートデバッガー'
    },
    description: {
      ko: '라우팅 정보 및 권한 상태 확인',
      ja: 'ルーティング情報と権限状態確認'
    },
    items: {
      ko: '라우트 정보, 권한 확인, 개발 도구',
      ja: 'ルート情報、権限確認、開発ツール'
    },
    icon: '🔍',
    isPublic: false,
    accessType: 'ADMIN_ONLY',
    showInMenu: false, // 관리자 대시보드에서만 접근
    showInBreadcrumb: true,
    order: 98,
    category: 'admin',
    badge: {
      text: 'DEBUG',
      color: 'yellow'
    }
  },
  {
    id: 'admin-users',
    path: '/admin/users',
    parentId: 'admin',
    component: 'UserManagement',
    title: {
      ko: '사용자 관리',
      ja: 'ユーザー管理'
    },
    description: {
      ko: '사용자 계정 및 권한 관리',
      ja: 'ユーザーアカウントと権限管理'
    },
    items: {
      ko: '계정 생성, 권한 변경, 계정 삭제',
      ja: 'アカウント作成、権限変更、アカウント削除'
    },
    icon: '👥',
    isPublic: false,
    requiredPermissions: ['admin:users'],
    showInMenu: false,
    showInBreadcrumb: true,
    order: 101,
    category: 'admin'
  },
  {
    id: 'admin-system',
    path: '/admin/system',
    parentId: 'admin',
    component: 'SystemSettings',
    title: {
      ko: '시스템 설정',
      ja: 'システム設定'
    },
    description: {
      ko: '애플리케이션 시스템 설정',
      ja: 'アプリケーションシステム設定'
    },
    items: {
      ko: '환경 설정, 로그 관리, 백업',
      ja: '環境設定、ログ管理、バックアップ'
    },
    icon: '🔧',
    isPublic: false,
    accessType: 'ADMIN_ONLY',
    showInMenu: false,
    showInBreadcrumb: true,
    order: 102,
    category: 'admin'
  }
] as const;

/**
 * 인증된 사용자 전용 라우트들
 */
export const AUTH_ROUTES: RouteConfig[] = [
  {
    id: 'profile',
    path: '/profile',
    component: 'UserProfile',
    title: {
      ko: '프로필',
      ja: 'プロフィール'
    },
    description: {
      ko: '사용자 프로필 및 설정',
      ja: 'ユーザープロフィールと設定'
    },
    items: {
      ko: '개인정보, 설정 변경',
      ja: '個人情報、設定変更'
    },
    icon: '👤',
    isPublic: false,
    accessType: 'OWNER_ONLY',
    isPersonalPage: true,
    showInMenu: true,
    showInBreadcrumb: true,
    order: 50,
    category: 'user'
  }
] as const;

// =============================================================================
// ROUTE REGISTRY - 라우트 레지스트리
// =============================================================================

/**
 * 모든 라우트를 통합한 레지스트리
 */
export const ALL_ROUTES: RouteConfig[] = [
  ...PUBLIC_ROUTES,
  ...AUTH_ROUTES,
  ...ADMIN_ROUTES
] as const;

/**
 * 라우트 ID로 라우트 찾기
 */
export const ROUTE_MAP: Record<string, RouteConfig> = ALL_ROUTES.reduce(
  (acc, route) => ({
    ...acc,
    [route.id]: route
  }),
  {}
);

// =============================================================================
// ROUTE UTILITIES - 라우트 유틸리티 함수들
// =============================================================================

/**
 * 경로로 라우트 찾기
 */
export const findRouteByPath = (path: string): RouteConfig | undefined => {
  return ALL_ROUTES.find(route => route.path === path);
};

/**
 * ID로 라우트 찾기
 */
export const findRouteById = (id: string): RouteConfig | undefined => {
  return ROUTE_MAP[id];
};

/**
 * 사용자 권한에 따른 접근 가능한 라우트 필터링 (계층적 권한 시스템)
 */
export const getAccessibleRoutes = (
  userPermissions: readonly Permission[] = [],
  userRoles: readonly UserRole[] = []
): RouteConfig[] => {
  const currentUserRole = userRoles[0] || null;
  const isAdmin = currentUserRole === 'admin';
  
  return ALL_ROUTES.filter(route => {
    // 공개 라우트는 항상 접근 가능
    if (route.isPublic) return true;
    
    // 관리자는 개인 페이지를 제외한 모든 페이지에 접근 가능
    if (isAdmin) {
      // 개인 페이지는 본인만 접근 가능 (별도 처리 필요)
      if (route.isPersonalPage) {
        return false; 
      }
      return true; // 관리자는 모든 일반 페이지 접근 가능
    }
    
    // 필요한 역할 확인 
    if (route.requiredRoles && route.requiredRoles.length > 0) {
      const hasRole = route.requiredRoles.includes(currentUserRole as UserRole);
      if (!hasRole) return false;
    }
    
    // 필요한 권한 확인 
    if (route.requiredPermissions && route.requiredPermissions.length > 0) {
      const hasAllPermissions = route.requiredPermissions.every(permission => 
        userPermissions.includes(permission)
      );
      if (!hasAllPermissions) return false;
    }
    
    return true;
  });
};

/**
 * 네비게이션 메뉴용 라우트 가져오기
 */
export const getNavigationRoutes = (
  userPermissions: readonly Permission[] = [],
  userRoles: readonly UserRole[] = []
): RouteConfig[] => {
  return getAccessibleRoutes(userPermissions, userRoles)
    .filter(route => route.showInMenu)
    .sort((a, b) => a.order - b.order);
};

/**
 * 카테고리별 라우트 그룹화
 */
export const getRoutesByCategory = (
  category: RouteConfig['category'],
  userPermissions: readonly Permission[] = [],
  userRoles: readonly UserRole[] = []
): RouteConfig[] => {
  return getAccessibleRoutes(userPermissions, userRoles)
    .filter(route => route.category === category)
    .sort((a, b) => a.order - b.order);
};

/**
 * 브레드크럼 경로 생성
 */
export const getBreadcrumbPath = (currentPath: string): RouteConfig[] => {
  const currentRoute = findRouteByPath(currentPath);
  if (!currentRoute) return [];
  
  const breadcrumbs: RouteConfig[] = [];
  
  // 부모 라우트 찾기
  const findParents = (route: RouteConfig): void => {
    if (route.parentId) {
      const parent = findRouteById(route.parentId);
      if (parent && parent.showInBreadcrumb) {
        findParents(parent);
        breadcrumbs.push(parent);
      }
    }
  };
  
  findParents(currentRoute);
  
  // 현재 라우트 추가
  if (currentRoute.showInBreadcrumb) {
    breadcrumbs.push(currentRoute);
  }
  
  return breadcrumbs;
};

/**
 * 자식 라우트 가져오기
 */
export const getChildRoutes = (parentId: string): RouteConfig[] => {
  return ALL_ROUTES.filter(route => route.parentId === parentId);
};

// =============================================================================
// ENVIRONMENT CONFIGURATION - 환경 설정
// =============================================================================

/**
 * 환경별 basepath 설정
 */
export const getBasePath = (): string => {
  // GitHub Pages 환경에서는 repository name을 basepath로 사용
  if (import.meta.env.PROD && window.location.hostname.includes('github.io')) {
    return '/courseMenu';
  }
  
  // 로컬 개발 환경과 다른 프로덕션 환경에서는 root path 사용
  return '/';
};

/**
 * GitHub Pages 라우팅을 위한 404.html 리다이렉트 처리
 */
export const handleGitHubPagesRouting = (): void => {
  // GitHub Pages SPA 라우팅 지원
  const redirect = sessionStorage.getItem('redirect');
  if (redirect) {
    sessionStorage.removeItem('redirect');
    window.history.replaceState(null, '', redirect);
  }
};

/**
 * 전체 URL 생성 (환경에 따라 basepath 포함)
 */
export const createFullUrl = (path: string): string => {
  const basePath = getBasePath();
  
  // basePath가 '/'이면 그냥 path 반환
  if (basePath === '/') return path;
  
  // basePath와 path 결합
  return `${basePath}${path === '/' ? '' : path}`;
};

/**
 * 라우트 가드 검증
 */
export const validateRouteAccess = (
  route: RouteConfig,
  userPermissions: readonly Permission[] = [],
  userRoles: readonly UserRole[] = []
): { allowed: boolean; redirectTo?: string; reason?: string } => {
  // 공개 라우트는 항상 허용
  if (route.isPublic) {
    return { allowed: true };
  }
  
  // 인증 필요
  if (userRoles.length === 0) {
    return {
      allowed: false,
      redirectTo: route.redirectTo || '/',
      reason: '로그인이 필요합니다.'
    };
  }
  
  // 역할 확인
  if (route.requiredRoles && route.requiredRoles.length > 0) {
    const hasRequiredRole = route.requiredRoles.some(role => userRoles.includes(role));
    if (!hasRequiredRole) {
      return {
        allowed: false,
        redirectTo: route.fallbackPath || '/',
        reason: `필요한 역할: ${route.requiredRoles.join(', ')}`
      };
    }
  }
  
  // 권한 확인
  if (route.requiredPermissions && route.requiredPermissions.length > 0) {
    const hasAllPermissions = route.requiredPermissions.every(permission => 
      userPermissions.includes(permission)
    );
    if (!hasAllPermissions) {
      const missingPermissions = route.requiredPermissions.filter(
        permission => !userPermissions.includes(permission)
      );
      return {
        allowed: false,
        redirectTo: route.fallbackPath || '/',
        reason: `필요한 권한: ${missingPermissions.join(', ')}`
      };
    }
  }
  
  return { allowed: true };
};

