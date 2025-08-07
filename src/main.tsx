import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import type { AppMode } from './types/core'

// 동적 메타데이터 설정
function updatePageMetadata() {
  // 환경 변수나 localStorage에서 모드를 가져올 수 있도록 설정
  const mode: AppMode = (import.meta.env.VITE_APP_MODE as AppMode) || 'wedding';
  
  // 제목 업데이트
  const titleMap: Record<AppMode, string> = {
    wedding: '웨딩 메뉴 안내',
    sanggyeonrye: '상견례 메뉴 안내', 
    afterparty: '뒷풀이 메뉴 안내'
  };
  
  document.title = titleMap[mode] || '코스 메뉴 안내';
  
  // 메타 설명 업데이트
  const descriptionMap: Record<AppMode, string> = {
    wedding: '웨딩 행사를 위한 특별한 코스 메뉴를 확인하세요',
    sanggyeonrye: '상견례를 위한 정성스러운 코스 메뉴를 확인하세요',
    afterparty: '뒷풀이를 위한 즐거운 코스 메뉴를 확인하세요'
  };
  
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', descriptionMap[mode] || '코스 메뉴 안내');
}

// 페이지 로드 시 메타데이터 업데이트
updatePageMetadata();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
