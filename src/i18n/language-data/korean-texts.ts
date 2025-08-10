/**
 * 한국어 번역 데이터
 */

export const ko = {
  // 공통 텍스트
  common: {
    restaurantLogoAlt: "레스토랑 로고",
    photoGalleryAlt: "포토 갤러리",
    weddingVenueAlt: "웨딩 베뉴",
    loading: "로딩 중...",
    error: "오류가 발생했습니다",
    retry: "다시 시도",
    close: "닫기",
    open: "열기",
    back: "뒤로",
    next: "다음",
    previous: "이전",
    cancel: "취소",
  },

  // 헤더
  header: {
    // 모드별 메인 타이틀
    mainTitle: {
      wedding: "웨딩 안내",
      sanggyeonrye: "상견례 안내", 
      afterparty: "뒷풀이 안내"
    },
    courseTitle: "코스 요리",
    scheduleWeddingTitle: "일정 & 예식장",
    scheduleMenuTitle: "일정 안내",
    programMenuTitle: "시간표",
    // 모드별 부제목
    subtitle: {
      wedding: "소중한 날을 함께해 주셔서 감사합니다",
      sanggyeonrye: "두 가족이 만나는 뜻깊은 시간입니다",
      afterparty: "즐거운 시간을 함께해요"
    }
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
      title: "식사",
      description:
        "정통 일본 요리의 정수를 담은 특별한 코스 메뉴를 경험해보세요",
      items: "선부, 슌사이, 시루완, 쓰쿠리, 야키모노 등",
    },
    schedule: {
      title: "일정",
      description: "주요 날짜와 일정",
      items: "혼인신고, 상견례, 전촬영, 결혼식 일정",
    },
    location: {
      title: "장소",
      description: "아모레볼레 산마르코",
      items: "위치 정보, 시설, 주소, 연락처, 길안내",
    },
    program: {
      title: "시간표",
      description: "당일 프로그램 안내",
      items: "예식 내용, 진행 순서 안내",
    },
    // 상견례 관련 메뉴
    sanggyeonryeInfo: {
      title: "상견례 정보",
      description: "양가 부모님의 만남에 대한 안내",
      items: "만남 시간, 장소 안내, 준비물"
    },
    sanggyeonryeRestaurant: {
      title: "식당 안내", 
      description: "상견례 장소 정보",
      items: "식당 소개, 위치, 주차 정보"
    },
    // 뒷풀이 관련 메뉴
    afterpartyInfo: {
      title: "뒷풀이 안내",
      description: "식후 파티 정보",
      items: "시간, 장소, 프로그램"
    },
    // 기존 레스토랑 정보
    restaurantInfo: {
      businessHours: "일시: 2025년 8월 11일",
      regularHoliday: "장소: 칸잔소베칸",
      reservation: "문의사항이 있으시면 연락 부탁드립니다",
    },
  },

  // 관리자 관련 텍스트
  admin: {
    dashboard: {
      title: "시스템 관리 대시보드",
      subtitle: "사용자, 메뉴, 시스템 설정을 위한 통합 관리 도구",
      loginUser: "로그인 사용자",
      adminRole: "관리자",
      statusActive: "활성",
      noAccess: "접근 가능한 관리 기능이 없습니다",
      contactAdmin: "관리자 권한을 확인하거나 시스템 관리자에게 문의하세요.",
      systemInfo: "시스템 정보",
      version: "버전:",
      environment: "환경:",
      permissions: "사용자 권한:",
      lastUpdate: "마지막 업데이트:",
    },
    messages: {
      accessDenied: "관리자만 접근 가능한 페이지입니다.",
      confirmExit: "저장하지 않은 변경사항이 있습니다. 정말 나가시겠습니까?",
      saveSuccess: "설정이 성공적으로 저장되었습니다.",
      saveFailed: "설정 저장에 실패했습니다:",
      confirmReset: "모든 설정을 기본값으로 되돌리시겠습니까?",
      menuSaveSuccess: "메뉴 설정이 성공적으로 저장되었습니다.",
      menuSaveFailed: "메뉴 설정 저장에 실패했습니다:",
      menuConfirmReset: "모든 메뉴 설정을 기본값(전체 활성화)으로 되돌리시겠습니까?",
      backupComplete: "백업이 완료되었습니다.",
      confirmDeleteUser: "사용자를 삭제하시겠습니까?",
      confirmDeleteUsers: "명의 사용자를 삭제하시겠습니까?",
      addUserPlanned: "새 사용자 추가 기능 (구현 예정)",
    },
  },

  // 폼 유효성 검사
  validation: {
    email: {
      required: "이메일을 입력해주세요.",
      invalid: "유효한 이메일 형식을 입력해주세요.",
    },
    password: {
      required: "비밀번호를 입력해주세요.",
      minLength: "비밀번호는 3자 이상이어야 합니다.",
    },
    login: {
      failed: "로그인에 실패했습니다.",
    },
    guestLogin: {
      failed: "게스트 로그인에 실패했습니다.",
    },
  },

  // 로그인 폼
  login: {
    title: "로그인",
    subtitle: "계정에 로그인하여 더 많은 기능을 이용하세요",
    email: "이메일",
    password: "비밀번호",
    emailPlaceholder: "example@email.com",
    passwordPlaceholder: "비밀번호를 입력하세요",
    rememberMe: "로그인 상태 유지",
    loginButton: "로그인",
    loggingIn: "로그인 중...",
    guestLogin: "게스트로 로그인",
    demoAccounts: "데모 계정",
  },

  // 인증 상태
  auth: {
    userMenu: "사용자 메뉴 열기",
    logout: "로그아웃",
    loggingOut: "로그아웃 중...",
    loginWindowClose: "로그인 창 닫기",
    permissions: "권한 정보",
    role: "역할:",
  },

  // 메뉴 설정
  menuSettings: {
    title: "메뉴 설정",
    subtitle: "게스트 사용자에게 표시할 메뉴 관리",
    guestDisplay: "게스트 사용자 표시",
    displayed: "표시됨",
    hidden: "숨겨짐",
    show: "표시",
    hide: "숨김",
    mainCategory: "메인",
    enabledMenus: "활성화된 메뉴:",
    saveRequired: "저장 필요",
    saving: "저장 중...",
    saveSettings: "설정 저장",
    resetDefault: "기본값 복원",
    enableAll: "전체 활성화",
    disableAll: "전체 비활성화",
    guideTitle: "메뉴 설정 안내",
    guideItems: [
      "비활성화된 메뉴는 게스트 사용자에게 표시되지 않습니다",
      "관리자는 설정과 관계없이 모든 메뉴에 접근할 수 있습니다",
      "메인 페이지는 항상 표시됩니다",
      "설정 변경 후 반드시 '설정 저장'을 클릭해주세요"
    ],
    guestPreview: "게스트 사용자 메뉴 미리보기",
    alwaysShown: "항상 표시",
  },

  // 사용자 관리
  users: {
    active: "활성",
    inactive: "비활성",
    admin: "관리자",
    guest: "게스트",
    user: "사용자",
  },

  // 사용자 프로필
  profile: {
    name: "이름",
    email: "이메일",
    language: "언어",
    theme: "테마",
  },

  // 위치 페이지
  locationLabels: {
    address: "주소",
    phone: "전화번호",
    website: "웹사이트",
    viewOnGoogleMaps: "구글맵에서 보기",
  },

  // 권한 오류
  permissionError: {
    accessRestricted: "접근이 제한되었습니다",
    debugInfo: "개발자 디버그 정보",
    show: "보기",
    hide: "숨기기",
  },

  // 일정 정보
  schedule: {
    title: "SCHEDULE",
    subtitle: "주요 날짜",
    items: {
      marriageRegistration: {
        date: "2025년 7월 7일",
        event: "혼인신고",
      },
      sanggyeonrye: {
        date: "2025년 8월 11일",
        event: "상견례",
      },
      preWedding: {
        date: "0000년 0월 0일",
        event: "웨딩촬영",
      },
      wedding: {
        date: "2026년 3월 8일",
        event: "결혼식",
      },
    },
  },

  // 왼쪽 페이지 (결혼식 정보)
  leftPage: {
    aboutWedding: {
      title: "예식장 안내",
      locationInfo: {
        title: "예식장 정보",
        dateTime: "2026년 3월 8일(일) 10:30~ 예정",
        locationNameJp: "아모레볼레 산마르코",
        locationNameEn: "amorevole SAN MARCO",
        address: "후쿠오카현 기타큐슈시 몬시구 마츠바라 1-8-12",
        googleMapsUrl: "https://maps.app.goo.gl/4Q6hzjPZEnhTaP5J8",
        phone: "0120-825-305",
        website: "www.amorevole-sanmarco.jp",
        description: "역사적인 건물과 아름다운 정원이 어우러진 클래식한 웨딩홀",
      },
      transportation: {
        title: "교통 정보",
        byCar: {
          title: "자동차 이용시",
          details:
            '🅿️ 주차장: 무료 주차 가능 (50대)\n🛣️ 고속도로: 규슈 자동차도 문사 IC에서 차로 5분\n📍 내비게이션: "아모레볼레 산마르코" 또는 "0120-825-305"\n🚗 고쿠라 시내에서 약 20분\n⚠️ 주말/공휴일 교통체증 주의',
        },
        byTrain: {
          title: "전철 이용시",
          details:
            "🚶 JR 문시코항역에서 도보 10분 (가장 가까운 역)\n🚕 JR 모지역에서 택시 5분 (약 800엔)\n🚕 JR 고쿠라역에서 택시 15분 (약 2,000엔)\n🚆 하카타역에서 약 1시간 (JR 가고시마선)\n💡 추천: 고쿠라역에서 셔틀버스 이용",
        },
        byPlane: {
          title: "항공 이용시",
          details:
            "✈️ 기타큐슈 공항에서 차로 30분\n✈️ 후쿠오카 공항에서 차로 1시간 30분\n🚌 공항버스 + 전철 이용 가능\n💰 택시 요금: 기타큐슈공항~회장 약 6,000엔\n💰 택시 요금: 후쿠오카공항~회장 약 15,000엔\n💡 추천: 공항에서 고쿠라역까지 이동 후 셔틀버스",
        },
        shuttle: {
          title: "셔틀버스 안내",
          details:
            "🚌 고쿠라역 출발: 오전 9:30\n🚌 하카타역 출발: 오전 9:00\n🚌 문시코항역 출발: 오전 9:45\n⏰ 행사 종료 후 각 역으로 셔틀 운행\n📞 셔틀버스 문의: 0120-825-305\n🎫 무료 이용 (사전 예약 필수)",
        },
      },
    },
  },


  // 예식장
  location: {
    title: "예식장 안내",
    facility: {
      title: "시설",
      dateTime: "2026년 3월 8일(일) 10:30~ 예정",
      locationNameJp: "아모레볼레 산마르코",
      locationNameEn: "amorevole SAN MARCO",
      address: "후쿠오카현 기타큐슈시 몬시구 마츠바라 1-8-12",
      googleMapsUrl: "https://maps.app.goo.gl/4Q6hzjPZEnhTaP5J8",
      phone: "0120-825-305",
      website: "www.amorevole-sanmarco.jp",
      description: "역사적인 건물과 아름다운 정원이 어우러진 클래식한 웨딩홀",
    },
    transportation: {
      title: "교통 정보",
      byCar: {
        title: "자동차 이용시",
        details: [
          "🅿️ 주차장: 무료 주차 가능 (50대)",
          "🛣️ 고속도로: 규슈 자동차도 문사 IC에서 차로 5분",
          "📍 내비게이션: \"아모레볼레 산마르코\" 또는 \"0120-825-305\"",
          "🚗 고쿠라 시내에서 약 20분",
          "⚠️ 주말/공휴일 교통체증 주의",
        ],
      },
      byTrain: {
        title: "전철 이용시",
        details: [
          "🚶 JR 문시코항역에서 도보 10분 (가장 가까운 역)",
          "🚕 JR 모지역에서 택시 5분 (약 800엔)",
          "🚕 JR 고쿠라역에서 택시 15분 (약 2,000엔)",
          "🚆 하카타역에서 약 1시간 (JR 가고시마선)",
          "💡 추천: 고쿠라역에서 셔틀버스 이용",
        ],
      },
      byPlane: {
        title: "항공 이용시",
        details: [
          "✈️ 기타큐슈 공항에서 차로 30분",
          "✈️ 후쿠오카 공항에서 차로 1시간 30분",
          "🚌 공항버스 + 전철 이용 가능",
          "💰 택시 요금: 기타큐슈공항~회장 약 6,000엔",
          "💰 택시 요금: 후쿠오카공항~회장 약 15,000엔",
          "💡 추천: 공항에서 고쿠라역까지 이동 후 셔틀버스",
        ],
      },
      shuttle: {
        title: "셔틀버스 안내",
        details: [
          "🚌 고쿠라역 출발: 오전 9:30",
          "🚌 하카타역 출발: 오전 9:00", 
          "🚌 문시코항역 출발: 오전 9:45",
          "⏰ 행사 종료 후 각 역으로 셔틀 운행",
          "📞 셔틀버스 문의: 0120-825-305",
          "🎫 무료 이용 (사전 예약 필수)",
        ],
      },
    },
  },

  // 프로그램
  program: {
    title: "Program",
    subtitle: "11:30 ~ 13:30 예정",
    opening: "1. 시작 인사",
    familyGreeting: "2. 양가 인사",
    photoSession: "3. 기념 촬영",
    toast: "4. 건배",
    dining: "5. 식사·환담",
    quiz: "6. 퀴즈 대회",
    closing: "7. 마무리 인사",
    gardenPhoto: "8. 기념 촬영(정원)",
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
    scrollUp: "맨 위로",
    scrollDown: "맨 아래로",
    toggleAllOpen: "모두 열기",
    toggleAllClose: "모두 닫기",
    home: "홈",
    scrollToTopAria: "맨 위로 스크롤",
    scrollToBottomAria: "맨 아래로 스크롤",
    toggleAllOpenAria: "모든 항목 열기",
    toggleAllCloseAria: "모든 항목 닫기",
    homeAria: "홈으로 이동",
  },
};
