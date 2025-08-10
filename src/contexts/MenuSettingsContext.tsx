/**
 * 메뉴 설정 컨텍스트
 * 
 * 관리자가 게스트 사용자에게 보여줄 메뉴를 제어할 수 있는 기능 제공
 */

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// 메뉴 설정 타입 정의
export interface MenuSettings {
  course: boolean;      // 식사 메뉴
  schedule: boolean;    // 일정 메뉴  
  location: boolean;    // 장소 메뉴
  program: boolean;     // 시간표 메뉴
}

// 기본 메뉴 설정 (모든 메뉴 활성화)
const DEFAULT_MENU_SETTINGS: MenuSettings = {
  course: true,
  schedule: true,
  location: true,
  program: true
};

// 컨텍스트 타입 정의
interface MenuSettingsContextType {
  settings: MenuSettings;
  updateSetting: (menu: keyof MenuSettings, enabled: boolean) => void;
  resetSettings: () => void;
  saveSettings: () => void;
  loadSettings: () => void;
  hasChanges: boolean;
}

// 컨텍스트 생성
const MenuSettingsContext = createContext<MenuSettingsContextType | undefined>(undefined);

// 로컬 스토리지 키
const STORAGE_KEY = 'courseMenu_menuSettings';

// Provider 컴포넌트
interface MenuSettingsProviderProps {
  children: ReactNode;
}

export const MenuSettingsProvider: React.FC<MenuSettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<MenuSettings>(DEFAULT_MENU_SETTINGS);
  const [originalSettings, setOriginalSettings] = useState<MenuSettings>(DEFAULT_MENU_SETTINGS);
  const [hasChanges, setHasChanges] = useState(false);

  // 컴포넌트 마운트 시 설정 로드
  useEffect(() => {
    loadSettings();
  }, []);

  // 설정 변경 감지
  useEffect(() => {
    const changed = JSON.stringify(settings) !== JSON.stringify(originalSettings);
    setHasChanges(changed);
  }, [settings, originalSettings]);

  // 개별 메뉴 설정 업데이트
  const updateSetting = (menu: keyof MenuSettings, enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      [menu]: enabled
    }));
  };

  // 설정 초기화
  const resetSettings = () => {
    setSettings(DEFAULT_MENU_SETTINGS);
  };

  // 설정 저장
  const saveSettings = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setOriginalSettings({ ...settings });
      setHasChanges(false);
      console.log('Menu settings saved:', settings);
    } catch (error) {
      console.error('Failed to save menu settings:', error);
      throw new Error('메뉴 설정 저장에 실패했습니다.');
    }
  };

  // 설정 로드
  const loadSettings = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedSettings = JSON.parse(saved) as MenuSettings;
        
        // 유효성 검사
        const validSettings: MenuSettings = {
          course: typeof parsedSettings.course === 'boolean' ? parsedSettings.course : DEFAULT_MENU_SETTINGS.course,
          schedule: typeof parsedSettings.schedule === 'boolean' ? parsedSettings.schedule : DEFAULT_MENU_SETTINGS.schedule,
          location: typeof parsedSettings.location === 'boolean' ? parsedSettings.location : DEFAULT_MENU_SETTINGS.location,
          program: typeof parsedSettings.program === 'boolean' ? parsedSettings.program : DEFAULT_MENU_SETTINGS.program
        };
        
        setSettings(validSettings);
        setOriginalSettings(validSettings);
        console.log('Menu settings loaded:', validSettings);
      } else {
        // 저장된 설정이 없으면 기본값 사용
        setSettings(DEFAULT_MENU_SETTINGS);
        setOriginalSettings(DEFAULT_MENU_SETTINGS);
      }
    } catch (error) {
      console.error('Failed to load menu settings:', error);
      // 오류 발생 시 기본값으로 복구
      setSettings(DEFAULT_MENU_SETTINGS);
      setOriginalSettings(DEFAULT_MENU_SETTINGS);
    }
  };

  const value: MenuSettingsContextType = {
    settings,
    updateSetting,
    resetSettings,
    saveSettings,
    loadSettings,
    hasChanges
  };

  return (
    <MenuSettingsContext.Provider value={value}>
      {children}
    </MenuSettingsContext.Provider>
  );
};

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
export const MENU_INFO = {
  course: {
    id: 'course',
    name: {
      ko: '식사',
      ja: '食事'
    },
    description: {
      ko: '정통 일본 요리의 정수를 담은 특별한 코스 메뉴',
      ja: '本格的な日本料理の真髄を込めた特別なコース料理'
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
      ja: '主要な日付と予定のご案内'
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
      ja: '顔合わせ当日の進행順서'
    },
    icon: '📋'
  }
} as const;