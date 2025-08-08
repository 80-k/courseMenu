// Image Assets Constants
// 모든 이미지 경로를 중앙에서 관리합니다.

// Logo
import logoImage from '../assets/logo.png';

// Background
import backgroundImage from '../assets/background.jpeg';

// Wedding Images
import weddingImage1 from '../assets/3.png';
import weddingImage2 from '../assets/4.png';

// Gallery
import galleryImage from '../assets/gallery-image.png';

export const ASSETS = {
  // 로고
  LOGO: logoImage,
  
  // 배경 이미지
  BACKGROUND: backgroundImage,
  
  // 웨딩 관련 이미지
  WEDDING: {
    IMAGE_1: weddingImage1,
    IMAGE_2: weddingImage2,
  },
  
  // 갤러리
  GALLERY: {
    MAIN_IMAGE: galleryImage,
  },
} as const;

// 타입 안전성을 위한 타입 정의
export type AssetKey = keyof typeof ASSETS;
export type WeddingAssetKey = keyof typeof ASSETS.WEDDING;
export type GalleryAssetKey = keyof typeof ASSETS.GALLERY;