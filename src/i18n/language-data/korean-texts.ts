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
      description: "앞으로의 일정과 중요한 날",
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

  // 코스 요리
  course: {
    zenpu: {
      title: "선부 (先付) - 애피타이저",
      description: "일본 요리 코스에서 가장 먼저 나오는 작은 요리를 의미",
      items: ["차가운 사사 두부"],
    },
    shunsai: {
      title: "슌사이 (旬彩) - 제철 요리",
      items: [
        "아리아케 해파리, 다진 참마",
        "동아와 미쓰세 닭고기를 사용한 유바지 앙카케",
        "시금치와 팽이버섯 국화 조림",
      ],
    },
    shiruwan: {
      title: "시루완 (汁椀) - 맑은 국",
      items: ["차가운 니멘"],
    },
    tsukuri: {
      title: "쓰쿠리 (造里) - 사시미",
      items: ["한치 활어회 외 2종"],
    },
    yakimono: {
      title: "야키모노 (焼物) - 구이",
      items: ["이사키 매실 된장 구이"],
    },
    agemono: {
      title: "아게모노 (揚物) - 튀김",
      items: ["한치 튀김 또는 소금구이"],
    },
    yosai: {
      title: "요사이 (洋菜) - 서양 요리",
      items: ["와규 로스트 비프와 여름 채소 구이"],
    },
    gohan: {
      title: "고항 (御飯) - 식사",
      items: ["옥수수 가마솥 밥"],
    },
    tomewan: {
      title: "도메완 (留椀) - 마무리 국",
      items: ["아카다시"],
    },
    dessert: {
      title: "디저트 (デザート)",
      items: ["붉은 과육 멜론, 거봉"],
    },
  },

  // 왼쪽 페이지 (일정 & 결혼식 정보)
  leftPage: {
    schedule: {
      title: "SCHEDULE",
      subtitle: "앞으로의 예정",
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
    aboutWedding: {
      title: "예식장 안내",
      locationInfo: {
        title: "예식장 정보",
        dateTime: "2026년 3월 8일(일) 10:30~ 예정",
        locationNameJp: "아모레볼레 산마르코",
        locationNameEn: "amorevole SAN MARCO",
        address: "후쿠오카현 기타큐슈시 몬시구 마츠바라 1-8-12",
        phone: "0120-825-305",
        website: "www.amorevole-sanmarco.jp",
        description: "역사적인 건물과 아름다운 정원이 어우러진 클래식한 웨딩홀",
      },
      transportation: {
        title: "교통 정보",
        byCar: {
          title: "자동차 이용시",
          details:
            '주차장: 무료 주차 가능 (50대)\n고속도로: 규슈 자동차도 문사 IC에서 차로 5분\n내비게이션: "아모레볼레 산마르코"로 검색',
        },
        byTrain: {
          title: "전철 이용시",
          details:
            "JR 문시코항역에서 도보 10분\nJR 모지역에서 택시 5분\nJR 코쿠라역에서 택시 15분\n하카타역에서 약 1시간",
        },
        byPlane: {
          title: "항공 이용시",
          details:
            "기타큐슈 공항에서 차로 30분\n후쿠오카 공항에서 차로 1시간 30분\n공항버스 + 전철 이용 가능",
        },
        shuttle: {
          title: "셔틀버스 안내",
          details:
            "하카타역 출발: 오전 9:00\n코쿠라역 출발: 오전 9:30\n문시코항역 출발: 오전 9:45\n행사 종료 후 각 역으로 셔틀 운행",
        },
      },
    },
  },

  // 오른쪽 페이지 (프로그램)
  rightPage: {
    program: {
      title: "Program",
      subtitle: "11:30 ~ 13:30 예정",
      steps: {
        opening: "1. 시작 인사",
        familyGreeting: "2. 양가 인사",
        photoSession: "3. 기념 촬영",
        toast: "4. 건배",
        dining: "5. 식사·환담",
        quiz: "6. 퀴즈 대회",
        closing: "7. 마무리 인사",
        gardenPhoto: "8. 기념 촬영(정원)",
      },
    },
  },

  // 일정 (기존 호환성)
  schedule: {
    title: "SCHEDULE",
    subtitle: "앞으로의 예정",
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

  // 예식장
  location: {
    title: "예식장 안내",
    facility: {
      title: "시설",
      dateTime: "2026년 3월 8일(일) 10:30~ 예정",
      locationNameJp: "아모레볼레 산마르코",
      locationNameEn: "amorevole SAN MARCO",
      address: "후쿠오카현 기타큐슈시 몬시구 마츠바라 1-8-12",
      phone: "0120-825-305",
      website: "www.amorevole-sanmarco.jp",
      description: "역사적인 건물과 아름다운 정원이 어우러진 클래식한 웨딩홀",
    },
    transportation: {
      title: "교통 정보",
      byCar: {
        title: "자동차 이용시",
        details: [
          "주차장: 무료 주차 가능 (50대)",
          "고속도로: 규슈 자동차도 문사 IC에서 차로 5분",
          '내비게이션: "아모레볼레 산마르코"로 검색',
        ],
      },
      byTrain: {
        title: "전철 이용시",
        details: [
          "JR 문시코항역에서 도보 10분",
          "JR 모지역에서 택시 5분",
          "하카타역에서 약 1시간",
        ],
      },
      byPlane: {
        title: "항공 이용시",
        details: [
          "기타큐슈 공항에서 차로 30분",
          "후쿠오카 공항에서 차로 1시간 30분",
          "공항버스 + 전철 이용 가능",
        ],
      },
      shuttle: {
        title: "셔틀버스 안내",
        details: [
          "하카타역 출발: 오전 9:00",
          "문시코항역 출발: 오전 9:45",
          "행사 종료 후 각 역으로 셔틀 운행",
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
