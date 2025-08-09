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
    wedding: 'S.G. 💍 MIYU',
    sanggyeonrye: 'S.G. 💍 MIYU', 
    afterparty: 'S.G. 💍 MIYU'
  };
  
  document.title = titleMap[mode] || 'S.G. 💍 MIYU';
  
  // 메타 설명 업데이트
  const descriptionMap: Record<AppMode, string> = {
    wedding: 'S.G.와 MIYU의 특별한 상견례 - 정통 일본 요리와 함께하는 소중한 만남의 시간',
    sanggyeonrye: 'S.G.와 MIYU의 특별한 상견례 - 정통 일본 요리와 함께하는 소중한 만남의 시간',
    afterparty: 'S.G.와 MIYU의 특별한 상견례 - 정통 일본 요리와 함께하는 소중한 만남의 시간'
  };
  
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', descriptionMap[mode] || 'S.G.와 MIYU의 특별한 상견례 - 정통 일본 요리와 함께하는 소중한 만남의 시간');
}

// 페이지 로드 시 메타데이터 업데이트
updatePageMetadata();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
