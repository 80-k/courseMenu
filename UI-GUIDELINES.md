# UI/UX 가이드라인 (UI/UX Guidelines)

## 🎨 디자인 철학

웨딩 이벤트 가이드 애플리케이션은 **"간결함 속의 따뜻함"**을 추구합니다. 중요한 순간에 게스트들이 쉽고 빠르게 정보에 접근할 수 있도록, 불필요한 복잡성을 제거하면서도 웨딩의 특별한 분위기를 전달합니다.

## 📱 모바일 우선 설계 원칙

### 1. 터치 친화적 인터페이스

#### 터치 영역 기준
- **최소 터치 영역**: 44px × 44px (iOS 기준)
- **권장 터치 영역**: 48px × 48px (편안한 터치)
- **고령층 고려**: 56px × 56px (주요 액션 버튼)
- **간격**: 터치 영역 간 최소 8px 여백

#### 엄지 존 (Thumb Zone) 최적화
```css
/* 하단 네비게이션 - 엄지가 가장 쉽게 닿는 영역 */
.bottom-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
}

/* 주요 액션 버튼 위치 */
.primary-actions {
  position: fixed;
  bottom: 100px;
  right: 16px;
  z-index: 90;
}
```

### 2. 원핸드 사용성 (One-Hand Usability)

#### 네비게이션 구조
- **하단 탭바**: 주요 기능들을 하단에 배치
- **스와이프 제스처**: 페이지 간 쉬운 이동
- **뒤로가기**: 상단 좌측에 명확한 뒤로가기 버튼

#### 콘텐츠 계층 구조
```
상단 (어려운 영역)
├─ 상태바 정보 (시간, 언어 표시)
├─ 페이지 제목
└─ 부가 정보

중간 (편안한 영역)
├─ 주요 콘텐츠
├─ 핵심 정보
└─ 이미지/시각적 요소

하단 (쉬운 영역)
├─ 주요 액션 버튼
├─ 네비게이션 탭
└─ 플로팅 액션 버튼
```

## 🎯 실시간 정보 표시 패턴

### 1. 상태 표시 시스템

#### 진행 상황 표시
```tsx
// 현재 진행 상황 컴포넌트 예시
interface ProgressStatusProps {
  currentEvent: string;
  nextEvent: string;
  timeRemaining: number;
}

const ProgressStatus: React.FC<ProgressStatusProps> = ({
  currentEvent,
  nextEvent,
  timeRemaining
}) => (
  <div className="progress-status">
    <div className="current-event">
      <span className="status-indicator pulsing"></span>
      <h3>현재 진행중</h3>
      <p>{currentEvent}</p>
    </div>
    
    <div className="next-event">
      <span className="countdown">{formatTime(timeRemaining)}</span>
      <p>다음: {nextEvent}</p>
    </div>
  </div>
);
```

#### 실시간 업데이트 알림
- **Gentle Animation**: 부드러운 색상 변화로 업데이트 표시
- **Sound Control**: 사용자 선택에 따른 알림음 제어
- **Visual Priority**: 중요한 업데이트는 더 뚜렷한 시각적 표시

### 2. 시간 중심 정보 구조

#### 타임라인 뷰
```css
.timeline {
  position: relative;
  padding: 0 20px;
}

.timeline-item {
  position: relative;
  padding: 16px 0 16px 40px;
  border-left: 2px solid #e5e7eb;
}

.timeline-item.current {
  border-left-color: #10b981;
}

.timeline-item.current::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 20px;
  width: 10px;
  height: 10px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}
```

## 🌍 다국어 UI 패턴

### 1. 언어 전환 인터페이스

#### 언어 토글 버튼
```tsx
const LanguageToggle: React.FC = () => (
  <button 
    className="language-toggle"
    aria-label="언어 변경"
    onClick={toggleLanguage}
  >
    <div className="flag-indicator">
      {currentLanguage === 'ko' ? '🇰🇷' : '🇯🇵'}
    </div>
    <span>{currentLanguage === 'ko' ? '한국어' : '日本語'}</span>
    <ChevronDownIcon className="chevron" />
  </button>
);
```

#### 언어별 텍스트 최적화
- **한국어**: 세로 읽기 고려한 줄 간격 (line-height: 1.6)
- **일본어**: 히라가나/가타카나 혼재 시 가독성 (letter-spacing: 0.05em)
- **숫자 표기**: 현지 관습에 맞는 날짜/시간 형식

### 2. 텍스트 길이 대응

#### 동적 레이아웃
```css
/* 텍스트 길이에 따른 유연한 레이아웃 */
.flexible-text-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 60px;
}

.text-content {
  word-break: keep-all;
  overflow-wrap: break-word;
  hyphens: auto;
}

/* 일본어 특화 스타일 */
[lang="ja"] .text-content {
  line-height: 1.7;
  letter-spacing: 0.05em;
}
```

## 🎨 시각적 디자인 시스템

### 1. 색상 팔레트

#### 기본 색상 체계
```css
:root {
  /* Primary Colors - 웨딩 테마 */
  --color-primary-rose: #f43f5e;
  --color-primary-gold: #f59e0b;
  --color-primary-blush: #fdf2f8;
  
  /* Neutral Colors - 가독성 우선 */
  --color-neutral-900: #111827;
  --color-neutral-700: #374151;
  --color-neutral-500: #6b7280;
  --color-neutral-100: #f3f4f6;
  --color-white: #ffffff;
  
  /* Status Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}
```

#### 대비 안전 색상 조합
```css
/* 고대비 텍스트 조합 */
.high-contrast-text {
  color: var(--color-neutral-900);
  background: var(--color-white);
}

/* 접근성 체크된 컬러 조합 */
.accessible-button {
  background: var(--color-primary-rose);
  color: var(--color-white);
  /* 대비비: 4.5:1 이상 확보 */
}
```

### 2. 타이포그래피

#### 글자 크기 계층
```css
/* 모바일 타이포그래피 스케일 */
.text-xs { font-size: 12px; line-height: 16px; } /* 부가 정보 */
.text-sm { font-size: 14px; line-height: 20px; } /* 일반 텍스트 */
.text-base { font-size: 16px; line-height: 24px; } /* 기본 크기 */
.text-lg { font-size: 18px; line-height: 28px; } /* 강조 텍스트 */
.text-xl { font-size: 20px; line-height: 28px; } /* 제목 */
.text-2xl { font-size: 24px; line-height: 32px; } /* 주요 제목 */
.text-3xl { font-size: 30px; line-height: 36px; } /* 페이지 제목 */

/* 고령층 친화적 크기 */
@media (min-width: 768px) {
  .elderly-friendly {
    font-size: 18px;
    line-height: 32px;
  }
}
```

### 3. 간격 시스템

#### 일관된 여백 체계
```css
/* 8px 기반 간격 시스템 */
.space-1 { margin: 4px; }   /* 0.25rem */
.space-2 { margin: 8px; }   /* 0.5rem */
.space-3 { margin: 12px; }  /* 0.75rem */
.space-4 { margin: 16px; }  /* 1rem */
.space-6 { margin: 24px; }  /* 1.5rem */
.space-8 { margin: 32px; }  /* 2rem */
.space-12 { margin: 48px; } /* 3rem */
```

## 🔄 인터랙션 패턴

### 1. 피드백 시스템

#### 터치 피드백
```css
/* 터치 시 시각적 피드백 */
.interactive-element {
  transition: all 0.15s ease-out;
  transform-origin: center;
}

.interactive-element:active {
  transform: scale(0.96);
  opacity: 0.8;
}

/* 햅틱 피드백 (JavaScript) */
const hapticFeedback = () => {
  if (navigator.vibrate) {
    navigator.vibrate(50); // 50ms 진동
  }
};
```

#### 로딩 상태 표시
```tsx
const LoadingStates = {
  Skeleton: () => (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-4 rounded mb-2"></div>
      <div className="bg-gray-300 h-4 rounded w-3/4"></div>
    </div>
  ),
  
  Spinner: () => (
    <div className="flex justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
};
```

### 2. 제스처 지원

#### 스와이프 네비게이션
```typescript
// React Hook 예시
const useSwipeNavigation = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) onSwipeLeft();
    if (isRightSwipe) onSwipeRight();
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
```

## 📊 실시간 데이터 시각화

### 1. 진행률 표시

#### 프로그레스 바
```tsx
interface ProgressBarProps {
  current: number;
  total: number;
  label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, label }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="progress-container">
      <div className="progress-header">
        <span>{label}</span>
        <span>{current}/{total}</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
```

### 2. 실시간 카운트다운

#### 시간 표시 컴포넌트
```tsx
const CountdownTimer: React.FC<{ targetTime: Date }> = ({ targetTime }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  return (
    <div className="countdown-display">
      <div className="time-unit">
        <span className="time-value">{timeLeft.hours}</span>
        <span className="time-label">시간</span>
      </div>
      <div className="time-separator">:</div>
      <div className="time-unit">
        <span className="time-value">{timeLeft.minutes}</span>
        <span className="time-label">분</span>
      </div>
    </div>
  );
};
```

## 🚨 에러 및 예외 상황 처리

### 1. 친화적 에러 메시지

#### 에러 상태 컴포넌트
```tsx
const ErrorState: React.FC<{ 
  error: string;
  onRetry?: () => void;
  showRetry?: boolean;
}> = ({ error, onRetry, showRetry = true }) => (
  <div className="error-state">
    <div className="error-icon">😔</div>
    <h3>앗, 문제가 발생했어요</h3>
    <p>{error}</p>
    {showRetry && onRetry && (
      <button onClick={onRetry} className="retry-button">
        다시 시도하기
      </button>
    )}
  </div>
);
```

### 2. 오프라인 상태 처리

#### 네트워크 상태 표시
```tsx
const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="offline-banner">
      <WifiOffIcon />
      <span>인터넷 연결을 확인해주세요</span>
    </div>
  );
};
```

## 📏 반응형 디자인 가이드라인

### 1. 브레이크포인트

#### 디바이스 기반 브레이크포인트
```css
/* Mobile First 접근 */
/* 기본: 320px 이상 (모바일) */

/* 큰 모바일 */
@media (min-width: 375px) {
  .container { padding: 0 20px; }
}

/* 태블릿 세로 */
@media (min-width: 768px) {
  .container { max-width: 640px; margin: 0 auto; }
}

/* 태블릿 가로 */
@media (min-width: 1024px) {
  .desktop-hidden { display: none; }
}
```

### 2. 컴포넌트 적응성

#### 카드 레이아웃 반응형
```css
.card-grid {
  display: grid;
  gap: 16px;
  padding: 16px;
}

/* 모바일: 1열 */
@media (max-width: 767px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

/* 태블릿: 2열 */
@media (min-width: 768px) and (max-width: 1023px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    padding: 24px;
  }
}
```

## ⚠️ 필수 UI 요구사항

### 🎯 헤더 반투명 처리 (CRITICAL)

**절대 변경 금지 사항 - 헤더는 반드시 반투명 처리되어야 합니다**

#### 기본 요구사항
```css
header, .app-header {
  /* 필수: 반투명 배경 */
  background: rgba(255, 255, 255, 0.75);
  
  /* 필수: 블러 효과로 뒤 내용과 구분 */
  backdrop-filter: blur(25px) saturate(180%);
  -webkit-backdrop-filter: blur(25px) saturate(180%);
  
  /* 필수: 고정 위치로 스크롤해도 항상 표시 */
  position: fixed;
  bottom: 0;
  z-index: 9999;
  
  /* 필수: 뒤 내용이 스크롤될 때 덮지 않음 */
  pointer-events: auto;
}
```

#### 반투명 처리 이유
1. **컨텐츠 가시성**: 스크롤 시 뒤 내용이 헤더에 완전히 가려지지 않음
2. **시각적 계층**: 헤더와 본문 콘텐츠의 명확한 구분
3. **사용성 향상**: 네비게이션 컨텍스트 유지하며 콘텐츠 확인 가능
4. **디자인 일관성**: 모던 웹앱의 표준 패턴 준수

#### 절대 금지사항
```css
/* ❌ 절대 사용 금지 - 불투명 배경 */
header {
  background: #ffffff; /* 완전 불투명 */
  background: rgb(255, 255, 255); /* 완전 불투명 */
}

/* ❌ 절대 사용 금지 - backdrop-filter 제거 */
header {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}
```

#### 올바른 투명도 값
- **배경 투명도**: `rgba(255, 255, 255, 0.75)` (75% 불투명, 25% 투명)
- **블러 강도**: `blur(25px)` (적당한 블러로 뒤 내용과 구분)
- **채도**: `saturate(180%)` (색상 대비 향상)

**⚠️ 주의**: 헤더 스타일을 수정할 때는 반드시 이 요구사항을 확인하고 준수해야 합니다.

---

이 UI/UX 가이드라인을 통해 모든 게스트가 편리하고 직관적으로 웨딩 정보에 접근할 수 있는 사용자 경험을 제공합니다.