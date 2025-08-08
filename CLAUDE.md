# Claude Code 프로젝트 가이드

## 🎯 프로젝트 개요

**웨딩 이벤트 가이드 애플리케이션** - 결혼 관련 이벤트(상견례, 결혼식, 뒷풀이)에서 게스트들에게 사전 정보 제공과 실시간 안내를 위한 모바일 최적화 웹페이지

### 주요 특징
- **모바일 중심 설계**: 게스트들이 휴대폰으로 편리하게 정보 확인
- **다국어 지원**: 한국어-일본어 실시간 언어 전환 (국제결혼 지원)
- **3가지 모드**: 웨딩, 상견례, 뒷풀이 각각의 특화된 기능
- **타입 안전성**: TypeScript + 강화된 타입 시스템

## 🛠️ 기술 스택

- **Frontend**: React 18 + TypeScript + Vite
- **Routing**: React Router v6 (BrowserRouter 우선 정책)
- **Styling**: **모바일 우선 Tailwind CSS** + 최소한의 순수 CSS
- **언어**: TypeScript (엄격한 타입 체크)
- **배포**: GitHub Pages (SPA 지원)

## 🎨 아키텍처 및 디자인

### 컴포넌트 구조
```
src/
├── components/           # 재사용 가능한 컴포넌트
│   ├── common/          # 공통 컴포넌트
│   └── icons/           # 아이콘 컴포넌트
├── pages/               # 페이지 컴포넌트
├── i18n/                # 국제화 시스템
├── config/              # 설정 파일
└── types/               # 타입 정의
```

### 라우팅 정책

**🚨 중요: BrowserRouter 우선 정책**
- **HashRouter 사용 금지**: 깔끔한 URL(/menu/course)을 위해 BrowserRouter만 사용
- GitHub Pages 배포를 위한 SPA 리다이렉트 시스템 구현
- `spa-github-pages` 방식을 통한 완전한 BrowserRouter 지원

### 국제화 시스템
- 타입 안전한 번역 키 시스템
- 네임스페이스 기반 번역 구조
- 실시간 언어 전환 지원
- 환경 변수를 통한 기본 언어 설정

## 🚀 배포 가이드

### GitHub Pages SPA 설정

GitHub Pages에서 BrowserRouter가 정상 작동하도록 다음 설정들이 구현되어 있습니다:

#### 1. SPA 리다이렉트 파일들
```
public/404.html     - 404 에러 시 URL 인코딩 후 index.html로 리다이렉트
index.html          - 리다이렉트 파라미터 디코딩 및 경로 복구
```

#### 2. Vite 설정
```typescript
// vite.config.ts
export default defineConfig({
  base: '/courseMenu/',  // GitHub Pages 경로와 일치
  // ...
})
```

#### 3. 작동 원리
1. `/courseMenu/menu/course` 직접 접근
2. GitHub Pages가 `404.html` 실행
3. `404.html`이 URL을 `/?/menu/course` 형태로 리다이렉트
4. `index.html`이 파라미터를 파싱하여 `/menu/course`로 복구
5. React Router가 정상 라우팅 수행

### 배포 명령어
```bash
npm run build    # 프로덕션 빌드
npm run deploy   # GitHub Pages 자동 배포
```

## 🔧 개발 가이드

### 환경 설정
```bash
# .env 파일 설정
VITE_APP_MODE=wedding           # 애플리케이션 모드
VITE_DEFAULT_LANGUAGE=ko        # 기본 언어
VITE_DEBUG=false               # 디버그 모드
```

### 개발 서버 실행
```bash
npm install    # 의존성 설치
npm run dev    # 개발 서버 실행
```

### 코드 품질 관리
```bash
npm run typecheck  # TypeScript 타입 체크
npm run lint       # ESLint 검사
npm run build      # 프로덕션 빌드 테스트
```

## 📝 중요한 개발 원칙

### 0. 모바일 우선 Tailwind CSS 정책 🎆
- **Tailwind CSS 기본 사용**: 모든 새로운 컴포넌트는 Tailwind CSS로 구현
- **모바일 퍼스트**: `sm:`, `md:`, `lg:` 브레이크포인트 적극 활용
- **긴 클래스 문제 해결**: 외부 라이브러리 없이 순수 CSS + Tailwind 조합
  - `/src/styles/component-styles.css`: 반복되는 긴 클래스를 CSS로 정의
  - `/src/utils/simple-styles.ts`: 기본 스타일 상수들
  - 조건부 스타일은 순수 JavaScript 템플릿 리터럴 사용
- **순수 CSS 사용 기준**: 다음의 경우에만 순수 CSS 사용 허용
  - Tailwind로 구현 불가능한 복잡한 애니메이션
  - 브라우저 호환성을 위한 특수 스타일 (backdrop-filter 등)
  - 복잡한 의사요소 (::before, ::after)
- **단순성 원칙**: clsx 등 외부 스타일 라이브러리 사용 금지

### 1. 라우팅 정책
- **BrowserRouter 우선**: HashRouter 사용 절대 금지
- GitHub Pages 배포 시 SPA 리다이렉트 설정 필수 유지
- 깔끔한 URL 구조 유지 (/menu/course, /wedding/schedule 등)

### 2. 타입 안전성
- 모든 컴포넌트에 명시적 타입 정의
- 번역 키, 라우트 경로 등 문자열 리터럴을 타입으로 관리
- 런타임 에러 방지를 위한 엄격한 타입 체크

### 3. 국제화
- 하드코딩된 텍스트 금지, 모든 텍스트는 i18n 시스템 사용
- 번역 키는 네임스페이스.키 형태로 구조화
- 언어별 텍스트 파일 분리 관리

### 4. 모바일 우선 Tailwind CSS 정책 🎆
- **Tailwind CSS 우선**: 모든 UI 컴포넌트는 모바일 우선 Tailwind 클래스로 구현
- **순수 CSS 최소화**: 필수적이거나 적절한 이유가 있는 경우만 순수 CSS 사용
- **모바일 우선 설계**: 작은 화면부터 시작하여 점진적 확장
- **터치 친화적**: 터치 영역 최적화 및 접근성 고려

## 🐛 트러블슈팅

### GitHub Pages 라우팅 이슈
- **문제**: `No routes matched location` 에러
- **해결**: BrowserRouter + SPA 리다이렉트 시스템 사용 (HashRouter 사용 금지)

### 타입 에러
- **문제**: 번역 키 또는 라우트 타입 오류
- **해결**: 타입 정의 파일 확인 및 업데이트

### 빌드 에러
- **문제**: TypeScript 컴파일 실패
- **해결**: `npm run typecheck`로 타입 에러 확인 및 수정

## 📚 추가 문서

- `README.md`: 기본 설치 및 실행 가이드
- `ARCHITECTURE.md`: 상세한 아키텍처 설명
- `UI-GUIDELINES.md`: UI/UX 가이드라인
- `ACCESSIBILITY.md`: 접근성 가이드라인