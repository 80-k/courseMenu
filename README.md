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

## 모드별 기능

### 웨딩 모드 (`wedding`)
- 코스 요리 메뉴
- 일정 안내
- 예식장 정보
- 시간표/프로그램
- 웨딩 정보

### 상견례 모드 (`sanggyeonrye`)
- 코스 요리 메뉴
- 상견례 정보
- 식당 안내

### 뒷풀이 모드 (`afterparty`)
- 시간표/프로그램
- 뒷풀이 안내

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
