# 🗺️ 라우트 경로 정리 (Route Map)

## 📋 현재 라우트 구조 개요

### **기본 정보**
- **베이스 URL**: `/courseMenu` (GitHub Pages)
- **라우터**: BrowserRouter (HashRouter 사용 금지)
- **모드별 접근 제어**: wedding, sanggyeonrye, afterparty

---

## 🚀 **활성 라우트** (현재 구현됨)

### **1. 메인 페이지**
| 경로 | 컴포넌트 | 한국어 제목 | 일본어 제목 | 사용 모드 |
|------|----------|-------------|-------------|-----------|
| `/` | MainMenu | 메인 | メイン | 전체 |

### **2. 코스 메뉴**
| 경로 | 컴포넌트 | 한국어 제목 | 일본어 제목 | 사용 모드 |
|------|----------|-------------|-------------|-----------|
| `/menu/course` | CourseMenu | 코스 요리 | コース料理 | wedding, sanggyeonrye |

### **3. 웨딩 관련 페이지**
| 경로 | 컴포넌트 | 한국어 제목 | 일본어 제목 | 사용 모드 |
|------|----------|-------------|-------------|-----------|
| `/wedding/schedule` | SchedulePage | 일정 안내 | 日程案内 | wedding |
| `/wedding/location` | LocationPage | 장소 안내 | 会場のご案内 | wedding |
| `/wedding/info` | WeddingInfoPage | 웨딩 정보 | ウェディング情報 | wedding |

### **4. 이벤트 프로그램**
| 경로 | 컴포넌트 | 한국어 제목 | 일본어 제목 | 사용 모드 |
|------|----------|-------------|-------------|-----------|
| `/event/program` | EventProgramPage | 프로그램 | プログラム | wedding, afterparty |

---

## 🔄 **레거시 리다이렉트** (하위 호환성)

### **자동 리다이렉트 매핑**
| 구 경로 | 새 경로 | 상태 |
|---------|---------|------|
| `/course` | `/menu/course` | ✅ 활성 |
| `/left` | `/wedding/info` | ✅ 활성 |
| `/right` | `/event/program` | ✅ 활성 |
| `/schedule` | `/wedding/schedule` | ✅ 활성 |
| `/location` | `/wedding/location` | ✅ 활성 |

---

## ⚠️ **미구현 라우트** (설정됨/컴포넌트 없음)

### **상견례 관련**
| 경로 | 컴포넌트 | 한국어 제목 | 일본어 제목 | 상태 |
|------|----------|-------------|-------------|------|
| `/sanggyeonrye/info` | SanggyeonryeInfoPage | 상견례 안내 | 顔合わせのご案内 | 🔄 미구현 |
| `/sanggyeonrye/restaurant` | SanggyeonryeRestaurantPage | 식당 안내 | レストランのご案内 | 🔄 미구현 |

### **뒷풀이 관련**
| 경로 | 컴포넌트 | 한국어 제목 | 일본어 제목 | 상태 |
|------|----------|-------------|-------------|------|
| `/afterparty/info` | AfterpartyInfoPage | 뒷풀이 안내 | アフターパーティーのご案内 | 🔄 미구현 |

---

## 🎯 **플로팅 액션 버튼 매핑**

| 페이지 경로 | 액션 타입 | 표시 버튼 |
|-------------|-----------|-----------|
| `/menu/course` | home-and-toggle | 홈 + 모두열기/닫기 |
| `/wedding/location` | home | 홈 |
| `/wedding/schedule` | home | 홈 |
| `/event/program` | home | 홈 |

---

## 🌐 **실제 접근 URL 예시**

### **GitHub Pages 배포 환경**
- **베이스**: `https://username.github.io/courseMenu`
- **메인**: `https://username.github.io/courseMenu/`
- **코스**: `https://username.github.io/courseMenu/menu/course`
- **일정**: `https://username.github.io/courseMenu/wedding/schedule`

### **로컬 개발 환경**
- **베이스**: `http://localhost:5173/courseMenu`
- **메인**: `http://localhost:5173/courseMenu/`
- **코스**: `http://localhost:5173/courseMenu/menu/course`

---

## 🔧 **라우팅 설정 특징**

### **1. SPA 지원 (GitHub Pages)**
- `404.html`: 모든 라우트를 index.html로 리다이렉트
- `index.html`: URL 파라미터 복구 후 React Router로 처리
- **결과**: 직접 URL 접근 가능 (예: `/menu/course` 직접 접근)

### **2. 모드별 가시성 제어**
```typescript
export const ROUTES = {
  SCHEDULE: {
    path: '/wedding/schedule',
    visibleInModes: ['wedding'], // wedding 모드에서만 접근 가능
    // ...
  }
}
```

### **3. 타입 안전 라우팅**
```typescript
type RoutePath = '/menu/course' | '/wedding/schedule' | ... // 자동 생성
```

---

## 📊 **라우트 상태 요약**

| 상태 | 개수 | 라우트 |
|------|------|--------|
| ✅ **구현 완료** | 6개 | HOME, COURSE_MENU, SCHEDULE, LOCATION, PROGRAM, WEDDING_INFO |
| 🔄 **미구현** | 3개 | SANGGYEONRYE_INFO, AFTERPARTY_INFO, SANGGYEONRYE_RESTAURANT |
| 🔀 **리다이렉트** | 5개 | /course, /left, /right, /schedule, /location |

---

## 🚨 **중요 정책**

### **1. BrowserRouter 우선 정책**
- ❌ **HashRouter 사용 금지**
- ✅ **깔끔한 URL 구조** (예: `/menu/course`)
- ✅ **GitHub Pages SPA 지원** 구현

### **2. 레거시 호환성**
- 기존 `/course`, `/left` 등은 자동 리다이렉트
- 사용자가 북마크한 구 URL도 정상 동작

### **3. 확장성**
- 새로운 모드나 페이지 추가 시 `ROUTES` 객체만 수정
- 타입 안전성 자동 보장

---

이 라우트 구조는 **모바일 우선 설계**와 **다국어 지원**을 완벽히 지원하며, GitHub Pages에서 BrowserRouter가 정상 작동하도록 최적화되어 있습니다.