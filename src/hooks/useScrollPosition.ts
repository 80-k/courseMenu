import { useState, useEffect, useCallback } from 'react';

export const useScrollPosition = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // 스크롤 가능한 콘텐츠가 있는지 먼저 확인
    if (documentHeight <= windowHeight) {
      setIsAtBottom(false);
      return;
    }
    
    // 맨 위에 있는지 확인 (스크롤이 거의 0에 가까움)
    const isAtTop = scrollTop <= 10;
    
    // 맨 아래에 있는지 확인 (스크롤이 끝까지 도달)
    const isAtBottomNow = scrollTop + windowHeight >= documentHeight - 10;
    
    // 맨 위에 있으면 '맨 아래로' 버튼, 맨 아래에 있으면 '맨 위로' 버튼
    if (isAtTop) {
      setIsAtBottom(false); // '맨 아래로' 버튼 표시
    } else if (isAtBottomNow) {
      setIsAtBottom(true);  // '맨 위로' 버튼 표시
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // 초기 체크
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  }, []);

  const scrollToBottom = useCallback(() => {
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const maxScrollTop = documentHeight - windowHeight;
    
    window.scrollTo({ 
      top: maxScrollTop, 
      behavior: 'smooth' 
    });
  }, []);

  return {
    isAtBottom,
    scrollToTop,
    scrollToBottom,
  };
};