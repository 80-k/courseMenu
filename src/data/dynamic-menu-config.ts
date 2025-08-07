/**
 * 환경 설정에 따른 동적 데이터 관리 시스템
 */

import type { SupportedLanguage } from '../i18n/types';

// 임시로 기본값 사용 (순환 참조 방지)
const DEFAULT_APP_MODE = 'wedding' as const;
const DEFAULT_MENU_VISIBILITY = {
  course: true,
  schedule: true,
  location: true,
  program: true,
};

// 기본 데이터 인터페이스들
export interface LocalizedContent {
  [key: string]: string;
}

export interface ConfigurableMenuItem {
  id: string;
  sortId: number;
  title: LocalizedContent;
  description?: LocalizedContent;
  items?: LocalizedContent[] | LocalizedContent;
  icon?: string;
  href?: string;
  enabled: boolean;
  visibleInModes: string[];
  requiredFeatures?: string[];
}

export interface ConfigurableCourseItem {
  id: string;
  sortId: number;
  title: LocalizedContent;
  description?: LocalizedContent;
  items: LocalizedContent[];
  enabled: boolean;
  visibleInModes: string[];
}

// 웨딩 모드 메뉴 데이터
const weddingMenuData: ConfigurableMenuItem[] = [
  {
    id: "course",
    sortId: 2,
    icon: "🍱",
    title: {
      ko: "식사",
      ja: "食事",
    },
    description: {
      ko: "정통 일본 요리의 정수를 담은 특별한 코스 메뉴를 경험해보세요",
      ja: "本格的な日本料理の真髄を込めた特別なコース料理をお楽しみください",
    },
    items: {
      ko: "선부, 슌사이, 시루완, 쓰쿠리, 야키모노 등",
      ja: "先付、旬彩、汁椀、造里、焼物など",
    },
    href: "/menu/course",
    enabled: true,
    visibleInModes: ["wedding", "sanggyeonrye"],
    requiredFeatures: ["showCourseMenu"],
  },
  {
    id: "schedule",
    sortId: 4,
    icon: "📅",
    title: {
      ko: "일정",
      ja: "日程",
    },
    description: {
      ko: "앞으로의 일정과 중요한 날",
      ja: "今後の予定と大切な日",
    },
    items: {
      ko: "혼인신고, 상견례, 전촬영, 결혼식 일정",
      ja: "入籍、顔合わせ、前撮り、結婚式日程",
    },
    href: "/wedding/schedule",
    enabled: true,
    visibleInModes: ["wedding"],
    requiredFeatures: ["showSchedule"],
  },
  {
    id: "location",
    sortId: 3,
    icon: "🏛️",
    title: {
      ko: "장소",
      ja: "会場",
    },
    description: {
      ko: "아모레볼레 산마르코",
      ja: "アモレヴォレ サンマルコ",
    },
    items: {
      ko: "위치 정보, 시설, 주소, 연락처, 길안내",
      ja: "位置情報、施設案内、住所、連絡先",
    },
    href: "/wedding/location",
    enabled: true,
    visibleInModes: ["wedding"],
    requiredFeatures: ["showLocation"],
  },
  {
    id: "program",
    sortId: 1,
    icon: "📋",
    title: {
      ko: "시간표",
      ja: "タイムテーブル",
    },
    description: {
      ko: "당일 프로그램 안내",
      ja: "当日のプログラムのご案内",
    },
    items: {
      ko: "예식 내용, 진행 순서 안내",
      ja: "進行順序と内容",
    },
    href: "/event/program",
    enabled: true,
    visibleInModes: ["wedding"],
    requiredFeatures: ["showProgram"],
  },
];

// 상견례 모드 메뉴 데이터
const sanggyeonryeMenuData: ConfigurableMenuItem[] = [
  {
    id: "course",
    sortId: 2,
    icon: "🍱",
    title: {
      ko: "코스 메뉴",
      ja: "コース料理",
    },
    description: {
      ko: "셰프의 정성이 담긴 특별한 코스 메뉴",
      ja: "シェフこだわりの特別なコース料理",
    },
    items: {
      ko: "계절 요리, 특선 요리, 디저트",
      ja: "季節料理、特選料理、デザート",
    },
    href: "/menu/course",
    enabled: true,
    visibleInModes: ["sanggyeonrye"],
    requiredFeatures: ["showCourseMenu"],
  },
  {
    id: "sanggyeonrye_info",
    sortId: 1,
    icon: "🤝",
    title: {
      ko: "상견례 정보",
      ja: "顔合わせ情報",
    },
    description: {
      ko: "상견례 일정 및 준비사항",
      ja: "顔合わせの日程と準備事項",
    },
    items: {
      ko: "만남 시간, 장소 안내, 준비물",
      ja: "面会時間、場所のご案内、準備物",
    },
    href: "/sanggyeonrye/info",
    enabled: true,
    visibleInModes: ["sanggyeonrye"],
  },
  {
    id: "about",
    sortId: 3,
    icon: "🏪",
    title: {
      ko: "레스토랑 소개",
      ja: "レストラン紹介",
    },
    description: {
      ko: "레스토랑의 역사와 철학",
      ja: "レストランの歴史と理念",
    },
    items: {
      ko: "셰프 소개, 레스토랑 역사, 위치 안내",
      ja: "シェフ紹介、レストラン歴史、アクセス",
    },
    href: "/about",
    enabled: true,
    visibleInModes: ["sanggyeonrye"],
  },
];

// 뒷풀이 모드 메뉴 데이터
const afterpartyMenuData: ConfigurableMenuItem[] = [
  {
    id: "program",
    sortId: 1,
    icon: "📋",
    title: {
      ko: "프로그램",
      ja: "プログラム",
    },
    description: {
      ko: "이벤트 프로그램 안내",
      ja: "イベントプログラム案内",
    },
    items: {
      ko: "일정, 순서, 참가 안내",
      ja: "日程、順序、参加案内",
    },
    href: "/event/program",
    enabled: true,
    visibleInModes: ["afterparty"],
  },
  {
    id: "registration",
    sortId: 2,
    icon: "✍️",
    title: {
      ko: "참가 신청",
      ja: "参加申込",
    },
    description: {
      ko: "이벤트 참가 신청",
      ja: "イベント参加申込",
    },
    items: {
      ko: "신청 방법, 참가비, 준비물",
      ja: "申込方法、参加費、持参物",
    },
    href: "/registration",
    enabled: true,
    visibleInModes: ["afterparty"],
  },
];

// 모든 메뉴 데이터 통합
const allMenuData = {
  wedding: weddingMenuData,
  sanggyeonrye: sanggyeonryeMenuData,
  afterparty: afterpartyMenuData,
};

/**
 * 현재 설정에 따라 표시할 메뉴 항목들을 가져오는 함수
 */
export function getAvailableMenuItemsForCurrentEnvironment(): ConfigurableMenuItem[] {
  const currentMode = DEFAULT_APP_MODE;
  const modeData = allMenuData[currentMode] || allMenuData.wedding;
  
  return modeData.filter(item => {
    // 기본 활성화 상태 확인
    if (!item.enabled) return false;
    
    // 현재 모드에서 표시 가능한지 확인
    if (!item.visibleInModes.includes(currentMode)) return false;
    
    // 메뉴별 가시성 설정 확인 (기본값 사용)
    if (!DEFAULT_MENU_VISIBILITY[item.id as keyof typeof DEFAULT_MENU_VISIBILITY]) return false;
    
    return true;
  }).sort((a, b) => a.sortId - b.sortId);
}

/**
 * 특정 메뉴 항목이 표시되어야 하는지 확인
 */
export function isMenuItemVisibleInCurrentMode(menuItemId: string): boolean {
  const availableItems = getAvailableMenuItemsForCurrentEnvironment();
  return availableItems.some(item => item.id === menuItemId);
}

/**
 * 현재 언어에 맞는 메뉴 데이터 가져오기
 */
export function getMenuItemsWithTranslations(targetLanguage: SupportedLanguage): Array<{id: string, icon: string, title: LocalizedContent, description: LocalizedContent, items: LocalizedContent, href?: string}> {
  const availableItems = getAvailableMenuItemsForCurrentEnvironment();
  
  return availableItems.map(item => ({
    id: item.id,
    icon: item.icon || '📋',
    title: {
      ko: item.title.ko || item.title[targetLanguage] || item.id,
      ja: item.title.ja || item.title[targetLanguage] || item.id,
    },
    description: {
      ko: item.description?.ko || item.description?.[targetLanguage] || '',
      ja: item.description?.ja || item.description?.[targetLanguage] || '',
    },
    items: {
      ko: typeof item.items === 'object' && !Array.isArray(item.items) ? ((item.items as LocalizedContent).ko || (item.items as LocalizedContent)[targetLanguage] || '') : (String(item.items) || ''),
      ja: typeof item.items === 'object' && !Array.isArray(item.items) ? ((item.items as LocalizedContent).ja || (item.items as LocalizedContent)[targetLanguage] || '') : (String(item.items) || ''),
    },
    href: item.href,
  }));
}

/**
 * 디버그 정보 출력 (개발 환경에서만)
 */
if (import.meta.env.DEV) {
  console.log('📋 Menu Configuration:', {
    mode: DEFAULT_APP_MODE,
    availableMenuItems: getAvailableMenuItemsForCurrentEnvironment().map(item => item.id),
    menuVisibility: DEFAULT_MENU_VISIBILITY,
  });
}