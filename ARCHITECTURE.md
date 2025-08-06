# 프로젝트 아키텍처 문서

## 📋 개요
한국-일본 결혼식 상견례 안내 웹 애플리케이션의 아키텍처와 컴포넌트 구조 문서입니다.

## 🏗️ 전체 구조

### 애플리케이션 레이아웃
```
app-wrapper (fixed positioning container)
├── app-content (main content area)
│   └── Routes (page components)
├── Header (fixed bottom navigation)
└── FloatingButtons (course page only)
```

## 📱 페이지 구조

### 1. MainMenu (/) - 메인 메뉴 페이지
- **컴포넌트**: `MainMenu.tsx`
- **주요 기능**: 6개 메뉴 카드 그리드 레이아웃
- **CSS 클래스**:
  - `.menu-grid` - 반응형 그리드 (auto-fit, minmax(350px, 1fr))
  - `.menu-category` - 카드 래퍼 (호버 효과)
  - `.menu-card` - 개별 카드 스타일

### 2. CourseMenu (/course) - 코스 요리 페이지
- **컴포넌트**: `CourseMenu.tsx`, `CourseItem.tsx`
- **주요 기능**: 접히는 아코디언 형태의 메뉴 목록
- **CSS 클래스**:
  - `.course-menu` - 메뉴 컨테이너
  - `.course-item` - 개별 코스 아이템
  - `.course-header` - 클릭 가능한 헤더
  - `.course-content` - 접히는 콘텐츠 영역

### 3. SchedulePage (/schedule) - 일정 안내 페이지
- **컴포넌트**: `SchedulePage.tsx`
- **주요 기능**: 일정표와 예식장 정보 표시
- **CSS 클래스**: `.schedule-section`, `.schedule-list`

### 4. VenuePage (/venue) - 예식장 페이지
- **컴포넌트**: `VenuePage.tsx`
- **주요 기능**: 2개 카드 레이아웃 (예식장 정보 + 교통 정보)
- **CSS 클래스**:
  - `.venue-cards-container` - 2열 그리드
  - `.venue-card` - 카드 기본 스타일
  - `.transportation-grid` - 교통수단 그리드

### 5. RightPage (/right) - 시간표 페이지
- **컴포넌트**: `RightPage.tsx`
- **주요 기능**: 8개 프로그램 순서 표시
- **CSS 클래스**: `.program-list`, `.step`

### 6. LeftPage (/left) - 레거시 페이지
- **상태**: 자동 리다이렉트 (3초 후 메인으로)
- **참고**: VenuePage로 기능 이전됨

## 🎨 디자인 시스템

### 색상 팔레트
```css
/* Primary Colors */
--purple-primary: #744fa8
--purple-secondary: #8b5cf6, #7c3aed
--blue-accent: #5a67d8, #4299e1

/* Text Colors */
--text-primary: #2d3748, #1a202c
--text-secondary: #4a5568, #718096

/* Background */
--bg-primary: #ffffff
--bg-secondary: #fafafa
--bg-translucent: rgba(255, 255, 255, 0.8)
```

### 그라디언트 패턴
```css
/* Card gradients */
background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%)

/* Button gradients */
background: linear-gradient(135deg, #744fa8 0%, #5a67d8 100%)

/* Accent gradients */
background: linear-gradient(90deg, #744fa8 0%, #5a67d8 50%, #4299e1 100%)
```

### 타이포그래피
```css
/* Font Stack */
font-family: 'Noto Serif KR', 'Noto Serif JP', 'Playfair Display', serif

/* Font Sizes */
--text-xs: 0.75rem    /* 12px */
--text-sm: 0.875rem   /* 14px */
--text-base: 1rem     /* 16px */
--text-lg: 1.125rem   /* 18px */
--text-xl: 1.25rem    /* 20px */
--text-2xl: 1.5rem    /* 24px */
--text-3xl: 2.2rem    /* 35px */
```

## 🔧 컴포넌트 시스템

### Header Component
- **위치**: Fixed bottom
- **기능**: 네비게이션, 언어 전환
- **스타일**: Backdrop blur, translucent background

### FloatingButtons Component
- **조건부 렌더링**: CourseMenu 페이지에서만 표시
- **기능**: 전체 열기/닫기, 스크롤 이동
- **위치**: Fixed bottom-right

### Language System
- **컨텍스트**: `LanguageContext`
- **지원 언어**: 한국어(ko), 일본어(ja)
- **텍스트 관리**: `constants/texts.ts`

## 📐 반응형 디자인

### 브레이크포인트
```css
/* Tablet/Mobile */
@media (max-width: 768px) {
  .menu-grid { grid-template-columns: 1fr; }
  .venue-cards-container { grid-template-columns: 1fr; }
  .container { padding: 20px 16px 80px 16px; }
}

/* Mobile */
@media (max-width: 480px) {
  .container { padding: 16px 12px 70px 12px; }
  h1 { font-size: 1.1rem; }
}
```

### 반응형 패턴
1. **그리드 축소**: 2열 → 1열
2. **패딩 조정**: 데스크탑 32px → 모바일 16px
3. **폰트 크기 감소**: 35px → 18px
4. **간격 조정**: 30px → 20px → 16px

## 🎯 CSS 최적화 현황

### Tailwind 전환 완료
- ✅ 기본 레이아웃 (container, grid, flex)
- ✅ 간격 (margin, padding)
- ✅ 색상 (background, text)
- ✅ 크기 (width, height)
- ✅ 그림자 (shadow)

### 커스텀 CSS 유지
- 🎨 복잡한 그라디언트
- 🎭 backdrop-filter 효과
- 🎪 language-toggle 슬라이더
- 🎨 hover 애니메이션
- 📱 미디어 쿼리

### 제거된 Legacy 코드
- ❌ `.about-wedding-section`
- ❌ `.venue-info-section`
- ❌ `.wedding-images`
- ❌ `.transportation-options`
- ❌ 중복된 반응형 스타일 20여 개

## 🚀 성능 최적화

### CSS 파일 크기 감소
- **Before**: ~150KB
- **After**: ~100KB (33% 감소)

### 최적화 기법
1. **중복 제거**: 비슷한 기능의 클래스 통합
2. **Tailwind 활용**: 재사용 가능한 유틸리티 클래스
3. **불필요한 코드 제거**: 사용되지 않는 legacy 스타일
4. **미디어 쿼리 최적화**: 중복된 반응형 규칙 정리

## 📝 개발 가이드

### 새로운 컴포넌트 추가 시
1. Tailwind 클래스 우선 사용
2. 복잡한 스타일은 `@apply` 지시어 활용
3. 공통 패턴은 기존 클래스 재사용
4. 반응형은 모바일 우선 접근

### 스타일 네이밍 규칙
```css
/* 컴포넌트 기반 */
.menu-card, .venue-card, .course-item

/* 기능 기반 */
.floating-island, .language-toggle

/* 상태 기반 */
.collapsed, .expanded, .active
```

---

*마지막 업데이트: 2025년 1월*