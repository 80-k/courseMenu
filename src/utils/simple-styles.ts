/**
 * 순수 JavaScript/TypeScript를 사용한 간단한 스타일 유틸리티
 * 외부 라이브러리 없이 클래스 조합과 조건부 스타일링 처리
 */

// 1. 가장 단순한 클래스 조합 함수 - clsx 대체
export const joinClasses = (...classes: (string | undefined | false | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// 2. 조건부 클래스 헬퍼
export const conditionalClass = (condition: boolean, trueClass: string, falseClass?: string): string => {
  return condition ? trueClass : (falseClass || '');
};

// 3. 여러 조건 처리
export const multiConditional = (conditions: Record<string, boolean>): string => {
  return Object.entries(conditions)
    .filter(([, condition]) => condition)
    .map(([className]) => className)
    .join(' ');
};

// 4. 베이스 + 변형 패턴 (가장 실용적)
export const variantClass = (base: string, variants: Record<string, boolean>): string => {
  const activeVariants = Object.entries(variants)
    .filter(([, isActive]) => isActive)
    .map(([className]) => className)
    .join(' ');
  
  return `${base} ${activeVariants}`.trim();
};

// 실제 사용 예시를 위한 미리 정의된 스타일 조합
export const COMPONENT_STYLES = {
  // 컨테이너 스타일들
  container: {
    main: "max-w-6xl mx-auto bg-white/80 min-h-screen shadow-2xl px-4 py-6 pb-32 md:px-8 md:py-10 md:pb-40 backdrop-blur-sm",
    logoSection: "flex justify-center items-center py-3 mb-3 border-b border-gray-200/30 md:py-5 md:mb-5",
    pageLayout: "flex flex-col gap-8 mt-5 md:gap-10 md:mt-8"
  },

  // 카드 스타일들
  card: {
    base: "bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-md relative overflow-hidden transition-all duration-400 ease-cubic-bezier",
    hover: "hover:-translate-y-2 hover:shadow-xl hover:border-gray-300",
    content: "p-6 md:p-8",
    // 그라디언트 바는 CSS에서 처리 (::before 사용)
  },

  // 텍스트 스타일들
  text: {
    pageTitle: "text-2xl font-semibold text-gray-800 mb-2 tracking-wider font-serif md:text-3xl",
    sectionTitle: "text-xl font-semibold -tracking-wide leading-tight font-serif text-left m-0 md:text-2xl",
    body: "text-gray-700 text-sm leading-relaxed md:text-base",
    highlight: "text-primary-600 font-medium font-serif"
  },

  // 레이아웃 스타일들
  layout: {
    menuGrid: "grid grid-cols-1 gap-5 my-6 md:grid-cols-2 lg:grid-cols-2 md:gap-8 md:my-10",
    spaceBetween: "flex justify-between items-center",
    flexCenter: "flex justify-center items-center"
  },

  // 이미지 스타일들
  image: {
    logo: "max-w-16 h-auto object-contain opacity-90 transition-all duration-300 filter drop-shadow-lg hover:opacity-100 hover:scale-105 md:max-w-24"
  }
} as const;

// 타입 안전을 위한 헬퍼
type StyleCategory = keyof typeof COMPONENT_STYLES;
type StyleName<T extends StyleCategory> = keyof typeof COMPONENT_STYLES[T];

export const getStyle = <T extends StyleCategory>(
  category: T, 
  name: StyleName<T>
): string => {
  return COMPONENT_STYLES[category][name] as string;
};