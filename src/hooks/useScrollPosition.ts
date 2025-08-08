import { useState, useEffect, useCallback } from 'react';

export const useScrollPosition = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // PC와 모바일 모두 호환되는 스크롤 엘리먼트 사용
    const scrollElement = document.scrollingElement || document.documentElement || document.body;
    const documentHeight = scrollElement.scrollHeight;
    
    // 스크롤 가능한 콘텐츠가 있는지 먼저 확인
    if (documentHeight <= windowHeight) {
      setIsAtBottom(false);
      return;
    }
    
    // 맨 위에 있는지 확인 (스크롤이 거의 0에 가까움)
    const isAtTop = scrollTop <= 10;
    
    // 맨 아래에 있는지 확인 (스크롤이 끝까지 도달)
    const isAtBottomNow = scrollTop + windowHeight >= documentHeight - 20;
    
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
    // PC와 모바일 모두 호환되는 안정적인 스크롤 방법
    const scrollElement = document.scrollingElement || document.documentElement || document.body;
    const documentHeight = scrollElement.scrollHeight;
    const windowHeight = window.innerHeight;
    
    // 최대 스크롤 가능 위치 계산 (PC에서 더 정확함)
    const maxScrollTop = Math.max(0, documentHeight - windowHeight);
    
    // 두 가지 방법 동시 사용으로 호환성 극대화
    window.scrollTo({ 
      top: maxScrollTop, 
      behavior: 'smooth' 
    });
    
    // 추가로 scrollIntoView도 사용 (더 확실한 방법)
    setTimeout(() => {
      const lastElement = document.body.lastElementChild;
      if (lastElement) {
        lastElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }, 100);
  }, []);

  return {
    isAtBottom,
    scrollToTop,
    scrollToBottom,
  };
};