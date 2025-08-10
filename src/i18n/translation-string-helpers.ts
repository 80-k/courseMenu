/**
 * 번역 문자열 처리를 위한 헬퍼 함수들
 */

/**
 * 번역 결과를 문자열로 안전하게 변환
 */
export const translateToString = (result: string | string[]): string => {
  if (typeof result === 'string') {
    return result;
  }
  if (Array.isArray(result) && result.length > 0) {
    return result[0]; // 배열의 첫 번째 요소 반환
  }
  return ''; // 빈 문자열 반환 (기본값)
};

/**
 * aria-label을 위한 안전한 번역 함수
 */
export const translateForAriaLabel = (result: string | string[]): string => {
  return translateToString(result);
};

/**
 * placeholder를 위한 안전한 번역 함수  
 */
export const translateForPlaceholder = (result: string | string[]): string => {
  return translateToString(result);
};

/**
 * title을 위한 안전한 번역 함수
 */
export const translateForTitle = (result: string | string[]): string => {
  return translateToString(result);
};