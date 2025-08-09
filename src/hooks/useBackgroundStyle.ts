import { useEffect } from 'react';

/**
 * 배경 스타일을 관리하는 커스텀 훅
 * @param backgroundImageUrl 배경 이미지 URL
 */
export const useBackgroundStyle = (backgroundImageUrl: string) => {
  useEffect(() => {
    // 배경 스타일 적용
    const styles = {
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    };

    Object.assign(document.body.style, styles);

    // 컴포넌트가 언마운트될 때 정리 (선택적)
    return () => {
      // 필요한 경우 배경 스타일 리셋
      // Object.keys(styles).forEach(key => {
      //   document.body.style.removeProperty(key);
      // });
    };
  }, [backgroundImageUrl]);
};