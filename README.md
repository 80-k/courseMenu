# 코스 메뉴 애플리케이션

결혼식, 상견례, 뒷풀이 등 다양한 행사에서 사용할 수 있는 다국어 지원 코스 메뉴 애플리케이션입니다.

## 주요 기능

- **3가지 모드 지원**: 웨딩, 상견례, 뒷풀이
- **다국어 지원**: 한국어, 일본어
- **반응형 디자인**: 모바일 최적화
- **타입 안전성**: TypeScript + 강화된 타입 시스템

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

## 환경 설정

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```bash
# 애플리케이션 모드 (wedding | sanggyeonrye | afterparty)
VITE_APP_MODE=wedding

# 기본 언어 (ko | ja)
VITE_DEFAULT_LANGUAGE=ko

# 디버그 모드
VITE_DEBUG=false
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
