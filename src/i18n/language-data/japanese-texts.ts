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
    cancel: "キャンセル",
  },

  // 헤더
  header: {
    // 모드별 메인 타이틀
    mainTitle: {
      wedding: "ウェディングご案内",
      sanggyeonrye: "顔合わせご案内",
      afterparty: "アフターパーティーご案内",
    },
    courseTitle: "コース料理",
    scheduleWeddingTitle: "スケジュール & 式場",
    scheduleMenuTitle: "日程案内",
    programMenuTitle: "タイムテーブル",
    // 모드별 부제목
    subtitle: {
      wedding: "大切な日を一緒にお祝いいただき、ありがとうございます",
      sanggyeonrye: "ご両家の出会いの記念すべき時間です",
      afterparty: "楽しい時間をご一緒しましょう",
    },
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
      description: "主要な日付と予定",
      items: "入籍、顔合わせ、前撮り、結婚式日程",
    },
    location: {
      title: "会場",
      description: "結婚式場のご案内(アモレヴォレ サンマルコ）",
      items: "位置情報、施設案内、住所、連絡先",
    },
    program: {
      title: "タイムテーブル",
      description: "当日のプログラムのご案内",
      items: "進行順序と内容",
    },
    // 상견례 관련 메뉴
    sanggyeonryeInfo: {
      title: "顔合わせ情報",
      description: "ご両家の出会いに関するご案内",
      items: "お会いする時間、会場案内、準備物",
    },
    sanggyeonryeRestaurant: {
      title: "レストランのご案内",
      description: "顔合わせ会場の情報",
      items: "レストラン紹介、アクセス、駐車場情報",
    },
    // 뒷풀이 관련 메뉴
    afterpartyInfo: {
      title: "アフターパーティーご案内",
      description: "お食事後のパーティー情報",
      items: "時間、会場、プログラム",
    },
    // 기존 레스토랑 정보
    restaurantInfo: {
      businessHours: "日時: 2025年8月11日",
      regularHoliday: "会場: 観山荘別館",
      reservation: "ご不明な点がございましたらお気軽にお尋ねください",
    },
  },

  // 管理者関連テキスト
  admin: {
    dashboard: {
      title: "システム管理ダッシュボード",
      subtitle: "ユーザー、メニュー、システム設定のための統合管理ツール",
      loginUser: "ログインユーザー",
      adminRole: "管理者",
      statusActive: "アクティブ",
      noAccess: "アクセス可能な管理機能がありません",
      contactAdmin: "管理者権限を確認するか、システム管理者にお問い合わせください。",
      systemInfo: "システム情報",
      version: "バージョン:",
      environment: "環境:",
      permissions: "ユーザー権限:",
      lastUpdate: "最終更新:",
    },
    messages: {
      accessDenied: "管理者のみアクセス可能なページです。",
      confirmExit: "保存されていない変更があります。本当に終了しますか？",
      saveSuccess: "設定が正常に保存されました。",
      saveFailed: "設定の保存に失敗しました:",
      confirmReset: "すべての設定をデフォルト値に戻しますか？",
      menuSaveSuccess: "メニュー設定が正常に保存されました。",
      menuSaveFailed: "メニュー設定の保存に失敗しました:",
      menuConfirmReset: "すべてのメニュー設定をデフォルト値（全て有効）に戻しますか？",
      backupComplete: "バックアップが完了しました。",
      confirmDeleteUser: "ユーザーを削除しますか？",
      confirmDeleteUsers: "人のユーザーを削除しますか？",
      addUserPlanned: "新規ユーザー追加機能（実装予定）",
    },
  },

  // フォームバリデーション
  validation: {
    email: {
      required: "メールアドレスを入力してください。",
      invalid: "有効なメールアドレス形式を入力してください。",
    },
    password: {
      required: "パスワードを入力してください。",
      minLength: "パスワードは3文字以上である必要があります。",
    },
    login: {
      failed: "ログインに失敗しました。",
    },
    guestLogin: {
      failed: "ゲストログインに失敗しました。",
    },
  },

  // ログインフォーム
  login: {
    title: "ログイン",
    subtitle: "アカウントにログインしてより多くの機能をご利用ください",
    email: "メールアドレス",
    password: "パスワード",
    emailPlaceholder: "example@email.com",
    passwordPlaceholder: "パスワードを入力してください",
    rememberMe: "ログイン状態を保持",
    loginButton: "ログイン",
    loggingIn: "ログイン中...",
    guestLogin: "ゲストでログイン",
    demoAccounts: "デモアカウント",
  },

  // 認証状態
  auth: {
    userMenu: "ユーザーメニューを開く",
    logout: "ログアウト",
    loggingOut: "ログアウト中...",
    loginWindowClose: "ログインウィンドウを閉じる",
    permissions: "権限情報",
    role: "役割:",
  },

  // メニュー設定
  menuSettings: {
    title: "メニュー設定",
    subtitle: "ゲストユーザーに表示するメニュー管理",
    guestDisplay: "ゲストユーザー表示",
    displayed: "表示中",
    hidden: "非表示",
    show: "表示",
    hide: "非表示",
    mainCategory: "メイン",
    enabledMenus: "有効なメニュー:",
    saveRequired: "保存が必要",
    saving: "保存中...",
    saveSettings: "設定保存",
    resetDefault: "デフォルトに戻す",
    enableAll: "全て有効化",
    disableAll: "全て無効化",
    guideTitle: "メニュー設定ガイド",
    guideItems: [
      "無効化されたメニューはゲストユーザーに表示されません",
      "管理者は設定に関係なく全てのメニューにアクセスできます",
      "メインページは常に表示されます",
      "設定変更後は必ず'設定保存'をクリックしてください"
    ],
    guestPreview: "ゲストユーザーメニュープレビュー",
    alwaysShown: "常に表示",
  },

  // ユーザー管理
  users: {
    active: "アクティブ",
    inactive: "非アクティブ",
    admin: "管理者",
    guest: "ゲスト",
    user: "ユーザー",
  },

  // ユーザープロファイル
  profile: {
    name: "名前",
    email: "メールアドレス",
    language: "言語",
    theme: "テーマ",
  },

  // 位置ページ
  locationLabels: {
    address: "住所",
    phone: "電話番号",
    website: "ウェブサイト",
    viewOnGoogleMaps: "Googleマップで表示",
  },

  // 権限エラー
  permissionError: {
    accessRestricted: "アクセスが制限されています",
    debugInfo: "開発者デバッグ情報",
    show: "表示",
    hide: "非表示",
  },

  // スケジュール情報
  schedule: {
    title: "SCHEDULE",
    subtitle: "主要な日付",
    items: {
      marriageRegistration: {
        date: "令和7年7月7日",
        event: "入籍",
      },
      sanggyeonrye: {
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

  // 左ページ (結婚式情報)
  leftPage: {
    aboutWedding: {
      title: "式場のご案内",
      locationInfo: {
        title: "式場情報",
        dateTime: "2026年3月8日(日)10:30〜予定",
        locationNameJp: "アモーレヴォレ サンマルコ",
        locationNameEn: "amorevole SAN MARCO",
        address: "福岡県北九州市門司区松原1-8-12",
        googleMapsUrl: "https://maps.app.goo.gl/4Q6hzjPZEnhTaP5J8",
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
            "🅿️ 駐車場：無料駐車場完備（50台）\n🛣️ 高速道路：九州自動車道 門司ICより車で5分\n📍 カーナビ：「アモーレヴォレ サンマルコ」または「0120-825-305」\n🚗 小倉市内より約20分\n⚠️ 土日祝日は交通渋滞にご注意",
        },
        byTrain: {
          title: "電車でお越しの場合",
          details:
            "🚶 JR門司港駅より徒歩10分（最寄駅）\n🚕 JR門司駅よりタクシー5分（約800円）\n🚕 JR小倉駅よりタクシー15分（約2,000円）\n🚆 博多駅より約1時間（JR鹿児島線）\n💡 おすすめ：小倉駅からシャトルバスご利用",
        },
        byPlane: {
          title: "飛行機でお越しの場合",
          details:
            "✈️ 北九州空港より車で30分\n✈️ 福岡空港より車で1時間30分\n🚌 空港バス＋電車でのアクセス可能\n💰 タクシー料金：北九州空港〜会場 約6,000円\n💰 タクシー料金：福岡空港〜会場 約15,000円\n💡 おすすめ：空港から小倉駅まで移動後シャトルバス",
        },
        shuttle: {
          title: "シャトルバス案内",
          details:
            "🚌 小倉駅発：午前9:30\n🚌 博多駅発：午前9:00\n🚌 門司港駅発：午前9:45\n⏰ 式終了後、各駅へシャトル運行\n📞 シャトルバスお問い合わせ：0120-825-305\n🎫 無料ご利用（事前予約必須）",
        },
      },
    },
  },


  // 예식장
  location: {
    title: "式場のご案内",
    facility: {
      title: "施設",
      dateTime: "2026年3月8日(日)10:30〜予定",
      locationNameJp: "アモーレヴォレ サンマルコ",
      locationNameEn: "amorevole SAN MARCO",
      address: "福岡県北九州市門司区松原1-8-12",
      googleMapsUrl: "https://maps.app.goo.gl/4Q6hzjPZEnhTaP5J8",
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
          "🅿️ 駐車場：無料駐車場完備（50台）",
          "🛣️ 高速道路：九州自動車道 門司ICより車で5分",
          "📍 カーナビ：「アモーレヴォレ サンマルコ」または「0120-825-305」",
          "🚗 小倉市内より約20分",
          "⚠️ 土日祝日は交通渋滞にご注意",
        ],
      },
      byTrain: {
        title: "電車でお越しの場合",
        details: [
          "🚶 JR門司港駅より徒歩10分（最寄駅）",
          "🚕 JR門司駅よりタクシー5分（約800円）",
          "🚕 JR小倉駅よりタクシー15分（約2,000円）",
          "🚆 博多駅より約1時間（JR鹿児島線）",
          "💡 おすすめ：小倉駅からシャトルバスご利用",
        ],
      },
      byPlane: {
        title: "飛行機でお越しの場合",
        details: [
          "✈️ 北九州空港より車で30分",
          "✈️ 福岡空港より車で1時間30分",
          "🚌 空港バス＋電車でのアクセス可能",
          "💰 タクシー料金：北九州空港〜会場 約6,000円",
          "💰 タクシー料金：福岡空港〜会場 約15,000円",
          "💡 おすすめ：空港から小倉駅まで移動後シャトルバス",
        ],
      },
      shuttle: {
        title: "シャトルバス案内",
        details: [
          "🚌 小倉駅発：午前9:30",
          "🚌 博多駅発：午前9:00",
          "🚌 門司港駅発：午前9:45",
          "⏰ 式終了後、各駅へシャトル運行",
          "📞 シャトルバスお問い合わせ：0120-825-305",
          "🎫 無料ご利用（事前予約必須）",
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
    locationIcon: "🏛️",
    programIcon: "📋",
  },

  // 플로팅 버튼
  floating: {
    scrollUp: "一番上へ",
    scrollDown: "一番下へ",
    toggleAllOpen: "すべて 開く",
    toggleAllClose: "すべて 閉じる",
    home: "ホーム",
    scrollToTopAria: "一番上へスクロール",
    scrollToBottomAria: "一番下へスクロール",
    toggleAllOpenAria: "すべての項目を開く",
    toggleAllCloseAria: "すべての項目を閉じる",
    homeAria: "ホームへ移動",
  },
};
