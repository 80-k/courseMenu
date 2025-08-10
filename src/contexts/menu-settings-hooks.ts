/**
 * 메뉴 설정 관련 훅과 유틸리티 함수들
 * Fast Refresh 호환성을 위해 MenuSettingsContext에서 분리
 */

import { useContext } from 'react';

// Types imported from MenuSettingsContext
import type { MenuSettingsContextType, MenuSettings } from './MenuSettingsContext';

// Re-export types for convenience
export type { MenuSettings, MenuSettingsContextType };

// Import the context directly - this is safe for Fast Refresh when split properly
import { MenuSettingsContext } from './MenuSettingsContext';

// Hook for using menu settings context
export const useMenuSettings = (): MenuSettingsContextType => {
  const context = useContext(MenuSettingsContext);
  if (!context) {
    throw new Error('useMenuSettings must be used within a MenuSettingsProvider');
  }
  return context;
};

// 메뉴 표시 여부 확인 유틸리티 함수
export const isMenuEnabled = (
  menuId: string, 
  settings: MenuSettings, 
  userRole?: string
): boolean => {
  // 관리자는 모든 메뉴에 접근 가능
  if (userRole === 'admin') {
    return true;
  }

  // 게스트는 설정에 따라 메뉴 접근
  switch (menuId) {
    case 'course':
      return settings.course;
    case 'schedule':
      return settings.schedule;
    case 'location':
      return settings.location;
    case 'program':
      return settings.program;
    case 'home':
      return true; // 홈은 항상 접근 가능
    default:
      return false;
  }
};

// 메뉴 설정 정보
export const MENU_INFO: Record<keyof MenuSettings, {
  id: string;
  name: { ko: string; ja: string };
  description: { ko: string; ja: string };
  icon: string;
}> = {
  course: {
    id: 'course',
    name: {
      ko: '식사',
      ja: '食事'
    },
    description: {
      ko: '정통 일본 요리의 정수를 담은 특별한 코스 메뉴',
      ja: '본격적な日本料理の真髄を込めた特別なコース料리'
    },
    icon: '🍱'
  },
  schedule: {
    id: 'schedule',
    name: {
      ko: '일정',
      ja: '日程'
    },
    description: {
      ko: '주요 날짜와 일정 안내',
      ja: '主要な日付と予定のご案내'
    },
    icon: '📅'
  },
  location: {
    id: 'location',
    name: {
      ko: '장소',
      ja: '会場'
    },
    description: {
      ko: '아모레볼레 산마르코 - 위치와 시설 안내',
      ja: 'アモレヴォレ サンマルコ - 位치와 시설 안내'
    },
    icon: '🏛️'
  },
  program: {
    id: 'program',
    name: {
      ko: '시간표',
      ja: 'タイムテーブル'
    },
    description: {
      ko: '상견례 당일 진행 순서',
      ja: '顔合わせ当일の進行순서'
    },
    icon: '📋'
  }
};