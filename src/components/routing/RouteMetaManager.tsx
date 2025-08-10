/**
 * 라우트 메타데이터 관리 컴포넌트
 * 
 * 라우트별로 페이지 제목, 메타 태그들을 동적으로 업데이트합니다.
 */

import React from 'react';
import type { RouteConfig } from '../../config/routes';

// =============================================================================
// ROUTE METADATA MANAGER - 라우트 메타데이터 관리
// =============================================================================

interface RouteMetaManagerProps {
  route: RouteConfig;
}

export const RouteMetaManager: React.FC<RouteMetaManagerProps> = ({ route }) => {
  React.useEffect(() => {
    // 페이지 제목 설정
    document.title = `${route.title.ko} - S.G. 💍 MIYU`;
    
    // 메타 태그 업데이트
    const updateMetaTag = (name: string, content: string) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };
    
    // 설명 메타 태그
    updateMetaTag('description', route.description.ko);
    
    // 키워드 메타 태그
    if (route.meta?.keywords) {
      updateMetaTag('keywords', route.meta.keywords.join(', '));
    }
    
    // robots 메타 태그
    if (route.meta?.robots) {
      updateMetaTag('robots', route.meta.robots);
    }
    
    // author 메타 태그
    if (route.meta?.author) {
      updateMetaTag('author', route.meta.author);
    }
    
    // Open Graph 태그들
    updateMetaTag('og:title', route.title.ko);
    updateMetaTag('og:description', route.description.ko);
    updateMetaTag('og:type', 'website');
    
  }, [route]);
  
  return null; // 렌더링할 내용 없음
};