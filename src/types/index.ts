export interface MenuItem {
  id: string;
  title: {
    ko: string;
    ja: string;
  };
  description?: {
    ko: string;
    ja: string;
  };
  items: Array<{
    ko: string;
    ja: string;
  }>;
}

export interface MenuCategory {
  id: string;
  icon: string;
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
  href?: string;
}

export type Language = 'ko' | 'ja';