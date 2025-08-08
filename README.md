# 웨딩 이벤트 가이드 애플리케이션

## 프로젝트 목적

결혼 과정에서 거쳐가는 각종 이벤트(상견례, 결혼식, 뒷풀이)에서 게스트들에게 **사전 정보 제공**과 **실시간 정보 안내**를 위한 모바일 최적화 웹페이지입니다.

### 핵심 목표
- **📱 모바일 중심**: 게스트들이 휴대폰으로 편리하게 정보 확인
- **⏰ 실시간 정보 제공**: 진행 중인 이벤트의 실시간 안내 및 업데이트
- **🌐 언어 장벽 해결**: 한국어-일본어 다국어 지원으로 국제결혼 지원
- **👥 다세대 접근성**: 고령층부터 젊은 세대까지 모든 게스트가 쉽게 사용

## 주요 기능

- **3가지 모드 지원**: 웨딩, 상견례, 뒷풀이
- **다국어 지원**: 한국어, 일본어 (실시간 언어 전환)
- **반응형 디자인**: 모바일 최적화 및 터치 친화적 인터페이스
- **타입 안전성**: TypeScript + 강화된 타입 시스템
- **실시간 업데이트**: 이벤트 진행 상황에 따른 동적 정보 제공

## 현재 구현된 페이지 (간소화된 라우팅)

### 메인 기능
- **메인 페이지** (`/`) - 네비게이션 허브
- **식사** (`/course`) - 일본 요리 코스 메뉴
- **일정** (`/schedule`) - 중요한 날들과 일정
- **장소** (`/location`) - 아모레볼레 산마르코 정보
- **시간표** (`/program`) - 당일 프로그램 안내

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 설정
`.env` 파일을 생성하고 다음 변수를 설정하세요:

```bash
# 애플리케이션 모드 (wedding | sanggyeonrye | afterparty)
VITE_APP_MODE=wedding

# 기본 언어 (ko | ja)
VITE_DEFAULT_LANGUAGE=ko

# 디버그 모드
VITE_DEBUG=false
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 빌드 및 배포
```bash
# 프로덕션 빌드
npm run build

# GitHub Pages 배포
npm run deploy
```

### 📚 GitHub Pages 배포 설정

이 프로젝트는 **BrowserRouter**를 사용하여 깔끔한 URL을 제공합니다. GitHub Pages에서 SPA(Single Page Application)가 정상 작동하도록 다음 설정이 적용되어 있습니다:

#### 🔧 SPA 리다이렉트 설정
- **`public/404.html`**: 존재하지 않는 경로 접근 시 URL을 인코딩하여 index.html로 리다이렉트
- **`index.html`**: 리다이렉트된 URL 파라미터를 디코딩하여 올바른 경로로 복구
- **`vite.config.ts`**: `base: '/courseMenu/'` 설정으로 GitHub Pages 경로와 일치

#### 📝 작동 원리
1. `/courseMenu/menu/course` 직접 접근
2. GitHub Pages가 404.html 실행
3. 404.html이 URL을 `/?/menu/course` 형태로 리다이렉트
4. index.html이 파라미터를 파싱하여 `/menu/course`로 복구
5. React Router가 정상 라우팅 수행

#### ⚠️ 중요: BrowserRouter 우선 정책
- **HashRouter 사용 금지**: 깔끔한 URL을 위해 BrowserRouter만 사용
- GitHub Pages 배포 시 위의 SPA 리다이렉트 설정 필수 유지
- `spa-github-pages` 방식을 사용한 완전한 BrowserRouter 지원

### 5. 타입 체크 및 린팅
```bash
npm run typecheck
npm run lint
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
