import type { CourseMenuItem, MenuCategory } from "../types";

export const courseMenuData: CourseMenuItem[] = [
  {
    id: "zenpu",
    title: {
      ko: "선부 (先付) - 전채 요리",
      ja: "先付",
    },
    description: {
      ko: "일본 요리 코스에서 가장 먼저 나오는 작은 요리를 의미",
      ja: "",
    },
    items: [
      {
        ko: "차가운 사사 두부",
        ja: "冷たい笹豆腐",
      },
    ],
    enabled: true,
    visibleInModes: ["wedding", "sanggyeonrye"],
  },
  {
    id: "shunsai",
    title: {
      ko: "슌사이 (旬彩) - 제철 요리",
      ja: "旬彩",
    },
    items: [
      {
        ko: "아리아케 해파리, 다진 참마",
        ja: "有明クラゲと叩き長芋",
      },
      {
        ko: "동아와 미쓰세 닭고기를 사용한 유바지 앙카케",
        ja: "冬瓜とみつせ鶏友地あんかけ",
      },
      {
        ko: "시금치와 팽이버섯 국화 조림",
        ja: "ほうれん草とえのき茸菊花浸し",
      },
    ],
    enabled: true,
    visibleInModes: ["wedding", "sanggyeonrye"],
  },
  {
    id: "shiruwan",
    title: {
      ko: "시루완 (汁椀) - 맑은 국",
      ja: "汁椀",
    },
    items: [
      {
        ko: "차가운 니멘",
        ja: "冷やし煮麺",
      },
    ],
    enabled: true,
    visibleInModes: ["wedding", "sanggyeonrye"],
  },
  {
    id: "tsukuri",
    title: {
      ko: "쓰쿠리 (造里) - 활어회",
      ja: "造里",
    },
    items: [
      {
        ko: "활어회 한치 외 2종",
        ja: "やり烏賊活き造り他2種",
      },
    ],
    enabled: true,
    visibleInModes: ["wedding", "sanggyeonrye"],
  },
  {
    id: "yakimono",
    title: {
      ko: "야키모노 (焼物) - 구이",
      ja: "焼物",
    },
    items: [
      {
        ko: "이사키 매실 된장 구이",
        ja: "イサキ梅味噌焼き",
      },
    ],
    enabled: true,
    visibleInModes: ["wedding", "sanggyeonrye"],
  },
  {
    id: "agemono",
    title: {
      ko: "아게모노 (揚物) - 튀김",
      ja: "揚物",
    },
    items: [
      {
        ko: "한치 튀김 또는 소금구이",
        ja: "あとつくりの烏賊の天ぷら又は塩焼き",
      },
    ],
    enabled: true,
    visibleInModes: ["wedding", "sanggyeonrye"],
  },
  {
    id: "yosai",
    title: {
      ko: "요사이 (洋菜) - 서양 요리",
      ja: "洋菜",
    },
    items: [
      {
        ko: "와규 로스트 비프와 여름 채소 구이",
        ja: "黒毛和牛ローストビーフと夏野菜グリル",
      },
    ],
    enabled: true,
    visibleInModes: ["wedding", "sanggyeonrye"],
  },
  {
    id: "gohan",
    title: {
      ko: "고항 (御飯) - 쌀밥",
      ja: "御飯",
    },
    items: [
      {
        ko: "옥수수 가마솥 밥",
        ja: "もろこし釜飯",
      },
    ],
    enabled: true,
    visibleInModes: ["wedding", "sanggyeonrye"],
  },
  {
    id: "tomewan",
    title: {
      ko: "도메완 (留椀) - 마무리 국",
      ja: "留椀",
    },
    items: [
      {
        ko: "아카다시",
        ja: "赤だし",
      },
    ],
    enabled: true,
    visibleInModes: ["wedding", "sanggyeonrye"],
  },
  {
    id: "dessert",
    title: {
      ko: "디저트",
      ja: "デザート",
    },
    items: [
      {
        ko: "붉은 과육 멜론, 거봉",
        ja: "赤肉メロン、巨峰",
      },
    ],
    enabled: true,
    visibleInModes: ["wedding", "sanggyeonrye"],
  },
];

export const menuCategories: MenuCategory[] = [
  {
    id: "course",
    icon: "🍱",
    title: {
      ko: "코스 요리",
      ja: "コース料理",
    },
    description: {
      ko: "정통 일본 요리의 정수를 담은 특별한 코스 메뉴를 경험해보세요",
      ja: "本格的な日本料理の真髄を込めた特別なコース料理をお楽しみください",
    },
    items: {
      ko: "선부, 슌사이, 시루완, 쓰쿠리, 야키모노 등",
      ja: "先付、旬彩、汁椀、造里、焼物など",
    },
    href: "/course",
  },
  {
    id: "schedule",
    icon: "📅",
    title: {
      ko: "일정",
      ja: "日程",
    },
    description: {
      ko: "주요 날짜와 일정",
      ja: "今後の予定と大切な日",
    },
    items: {
      ko: "혼인신고, 상견례, 전촬영, 결혼식 일정",
      ja: "入籍、顔合わせ、前撮り、結婚式日程",
    },
    href: "/schedule",
  },
  {
    id: "location",
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
    href: "/location",
  },
  {
    id: "right",
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
    href: "/right",
  },
];
