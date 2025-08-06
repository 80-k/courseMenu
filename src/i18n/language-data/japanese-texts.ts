/**
 * 일본어 번역 데이터
 */

export const ja = {
  // 공통 텍스트
  common: {
    restaurantLogoAlt: "レストランロゴ",
    photoGalleryAlt: "フォトギャラリー",
    weddingVenueAlt: "ウェディング会場",
    loading: "読み込み中...",
    error: "エラーが発生しました",
    retry: "再試行",
    close: "閉じる",
    open: "開く",
    back: "戻る",
    next: "次へ",
    previous: "前へ",
  },

  // 헤더
  header: {
    mainTitle: "顔合わせご案内",
    courseTitle: "コース料理",
    scheduleWeddingTitle: "スケジュール & 式場",
    scheduleMenuTitle: "日程案内",
    programMenuTitle: "タイムテーブル",
  },

  // 언어 선택
  language: {
    korean: "한국어",
    japanese: "日本語",
    english: "English",
  },

  // 메인 메뉴
  menu: {
    course: {
      title: "食事",
      description:
        "本格的な日本料理の真髄を込めた特別なコース料理をお楽しみください",
      items: "先付、旬彩、汁椀、造里、焼物など",
    },
    schedule: {
      title: "日程",
      description: "今後の予定と大切な日",
      items: "入籍、顔合わせ、前撮り、結婚式日程",
    },
    venue: {
      title: "会場",
      description: "アモレヴォレ サンマルコ",
      items: "位置情報、施設案内、住所、連絡先",
    },
    program: {
      title: "タイムテーブル",
      description: "当日のプログラムのご案内",
      items: "進行順序と内容",
    },
    restaurantInfo: {
      businessHours: "日時: 2025年8月11日",
      regularHoliday: "会場: 観山荘別館",
      reservation: "ご不明な点がございましたらお気軽にお尋ねください",
    },
  },

  // 코스 요리
  course: {
    zenpu: {
      title: "先付 (ぜんぷ) - アペタイザー",
      description: "日本料理のコースで最初に出される小さな料理を意味",
      items: ["冷たい笹豆腐"],
    },
    shunsai: {
      title: "旬彩 (しゅんさい) - 旬の料理",
      items: [
        "有明海クラゲ、擦りおろした山芋",
        "冬瓜とみつせ鶏を使った湯葉地あんかけ",
        "ほうれん草とえのき茸の菊花煮",
      ],
    },
    shiruwan: {
      title: "汁椀 (しるわん) - 澄まし汁",
      items: ["冷たいにゅうめん"],
    },
    tsukuri: {
      title: "造里 (つくり) - 刺身",
      items: ["ハンチ活き造り他2種"],
    },
    yakimono: {
      title: "焼物 (やきもの) - 焼き物",
      items: ["イサキ梅味噌焼き"],
    },
    agemono: {
      title: "揚物 (あげもの) - 揚げ物",
      items: ["ハンチの天ぷらまたは塩焼き"],
    },
    yosai: {
      title: "洋菜 (ようさい) - 洋食",
      items: ["和牛ローストビーフと夏野菜グリル"],
    },
    gohan: {
      title: "御飯 (ごはん) - 食事",
      items: ["とうもろこし釜炊きご飯"],
    },
    tomewan: {
      title: "留椀 (とめわん) - 締めの汁",
      items: ["赤だし"],
    },
    dessert: {
      title: "デザート",
      items: ["赤肉メロン、巨峰"],
    },
  },

  // 左ページ (スケジュール & 結婚式情報)
  leftPage: {
    schedule: {
      title: "SCHEDULE",
      subtitle: "今後の予定",
      items: {
        marriageRegistration: {
          date: "令和7年7月7日",
          event: "入籍",
        },
        meeting: {
          date: "令和7年8月11日",
          event: "顔合わせ",
        },
        preWedding: {
          date: "令和0年0月0日",
          event: "前撮り",
        },
        wedding: {
          date: "令和8年3月8日",
          event: "結婚式",
        },
      },
    },
    aboutWedding: {
      title: "式場のご案内",
      venueInfo: {
        title: "式場情報",
        dateTime: "2026年3月8日(日)10:30〜予定",
        venueNameJp: "アモーレヴォレ サンマルコ",
        venueNameEn: "amorevole SAN MARCO",
        address: "福岡県北九州市門司区松原1-8-12",
        phone: "0120-825-305",
        website: "www.amorevole-sanmarco.jp",
        description:
          "歴史的建造物と美しい庭園が調和したクラシックなウェディングホール",
      },
      transportation: {
        title: "交通情報",
        byCar: {
          title: "お車でお越しの場合",
          details:
            "駐車場：無料駐車場完備（50台）\n高速道路：九州自動車道 門司ICより車で5分\nカーナビ：「アモーレヴォレ サンマルコ」で検索",
        },
        byTrain: {
          title: "電車でお越しの場合",
          details:
            "JR門司港駅より徒歩10分\nJR門司駅よりタクシー5分\nJR小倉駅よりタクシー15分\n博多駅より約1時間",
        },
        byPlane: {
          title: "飛行機でお越しの場合",
          details:
            "北九州空港より車で30分\n福岡空港より車で1時間30分\n空港バス＋電車でのアクセス可能",
        },
        shuttle: {
          title: "シャトルバス案内",
          details:
            "博多駅発：午前9:00\n小倉駅発：午前9:30\n門司港駅発：午前9:45\n式終了後、各駅へシャトル運行",
        },
      },
    },
  },

  // 右ページ (プログラム)
  rightPage: {
    program: {
      title: "Program",
      subtitle: "11:30 ~ 13:30 予定",
      steps: {
        opening: "1. はじめの挨拶",
        familyGreeting: "2. 両家挨拶",
        photoSession: "3. 記念撮影",
        toast: "4. 乾杯",
        dining: "5. 会食・歓談",
        quiz: "6. クイズ大会",
        closing: "7. 結びの挨拶",
        gardenPhoto: "8. 記念撮影(庭園)",
      },
    },
  },

  // 일정 (기존 호환성)
  schedule: {
    title: "SCHEDULE",
    subtitle: "今後の予定",
    marriageRegistration: {
      date: "令和7年7月7日",
      event: "入籍",
    },
    meeting: {
      date: "令和7年8月11日",
      event: "顔合わせ",
    },
    preWedding: {
      date: "令和0年0月0日",
      event: "前撮り",
    },
    wedding: {
      date: "令和8年3月8日",
      event: "結婚式",
    },
  },

  // 예식장
  venue: {
    title: "式場のご案内",
    facility: {
      title: "施設",
      dateTime: "2026年3月8日(日)10:30〜予定",
      venueNameJp: "アモーレヴォレ サンマルコ",
      venueNameEn: "amorevole SAN MARCO",
      address: "福岡県北九州市門司区松原1-8-12",
      phone: "0120-825-305",
      website: "www.amorevole-sanmarco.jp",
      description:
        "歴史的建造物と美しい庭園が調和したクラシックなウェディングホール",
    },
    transportation: {
      title: "交通情報",
      byCar: {
        title: "お車でお越しの場合",
        details: [
          "駐車場：無料駐車場完備（50台）",
          "高速道路：九州自動車道 門司ICより車で5分",
          "カーナビ：「アモーレヴォレ サンマルコ」で検索",
        ],
      },
      byTrain: {
        title: "電車でお越しの場合",
        details: [
          "JR門司港駅より徒歩10分",
          "JR門司駅よりタクシー5分",
          "博多駅より約1時間",
        ],
      },
      byPlane: {
        title: "飛行機でお越しの場合",
        details: [
          "北九州空港より車で30分",
          "福岡空港より車で1時間30分",
          "空港バス＋電車でのアクセス可能",
        ],
      },
      shuttle: {
        title: "シャトルバス案内",
        details: [
          "博多駅発：午前9:00",
          "門司港駅発：午前9:45",
          "式終了後、各駅へシャトル運行",
        ],
      },
    },
  },

  // 프로그램
  program: {
    title: "Program",
    subtitle: "11:30 ~ 13:30 予定",
    opening: "1. はじめの挨拶",
    familyGreeting: "2. 両家挨拶",
    photoSession: "3. 記念撮影",
    toast: "4. 乾杯",
    dining: "5. 会食・歓談",
    quiz: "6. クイズ大会",
    closing: "7. 結びの挨拶",
    gardenPhoto: "8. 記念撮影(庭園)",
  },

  // UI 요소
  ui: {
    menuIcon: "🍱",
    scheduleIcon: "📅",
    venueIcon: "🏛️",
    programIcon: "📋",
  },

  // 플로팅 버튼
  floating: {
    scrollUp: "一番上へ",
    scrollDown: "一番下へ",
    toggleAllOpen: "すべて 開く",
    toggleAllClose: "すべて 閉じる",
    scrollToTopAria: "一番上へスクロール",
    scrollToBottomAria: "一番下へスクロール",
    toggleAllOpenAria: "すべての項目を開く",
    toggleAllCloseAria: "すべての項目を閉じる",
  },
};
