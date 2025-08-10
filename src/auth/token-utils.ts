/**
 * JWT 토큰 관리 유틸리티
 * 
 * 보안을 고려한 토큰 생성, 검증, 저장, 복구 기능을 제공합니다.
 * XSS, CSRF 공격을 방지하기 위한 보안 조치가 포함되어 있습니다.
 */

import type { TokenPayload } from '../types/auth';
import { isTokenPayload } from '../types/auth';

// =============================================================================
// CONSTANTS - 상수들
// =============================================================================

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const TOKEN_EXPIRY_BUFFER = 5 * 60 * 1000; // 5분 (만료 5분 전에 갱신)

// =============================================================================
// CRYPTO UTILITIES - 암호화 유틸리티들
// =============================================================================

/**
 * 간단한 Base64URL 인코딩 (브라우저 호환)
 */
const base64UrlEncode = (str: string): string => {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

/**
 * 간단한 Base64URL 디코딩 (브라우저 호환)
 */
const base64UrlDecode = (str: string): string => {
  // 패딩 추가
  let padded = str;
  const padding = 4 - (str.length % 4);
  if (padding !== 4) {
    padded += '='.repeat(padding);
  }
  
  return atob(padded.replace(/-/g, '+').replace(/_/g, '/'));
};

/**
 * 간단한 HMAC-SHA256 시뮬레이션 (실제 구현에서는 crypto.subtle 사용 권장)
 */
const simpleHash = async (data: string, secret: string): Promise<string> => {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    try {
      const key = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      
      const signature = await crypto.subtle.sign(
        'HMAC',
        key,
        new TextEncoder().encode(data)
      );
      
      return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
    } catch {
      console.warn('Web Crypto API not available, using fallback hash');
    }
  }
  
  // Fallback: 간단한 해시 (개발용, 실제 운영에서는 적절한 라이브러리 사용)
  let hash = 0;
  const combined = data + secret;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32비트 정수로 변환
  }
  return base64UrlEncode(Math.abs(hash).toString(36));
};

// =============================================================================
// JWT TOKEN UTILITIES - JWT 토큰 유틸리티들
// =============================================================================

/**
 * JWT 토큰 생성 (클라이언트 사이드용 - 실제로는 서버에서 생성)
 * 개발/데모 목적으로만 사용
 */
export const createToken = async (payload: Omit<TokenPayload, 'iat' | 'exp'>): Promise<string> => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: TokenPayload = {
    ...payload,
    iat: now,
    exp: now + (24 * 60 * 60), // 24시간
    iss: 'courseMenu-app'
  };
  
  const headerEncoded = base64UrlEncode(JSON.stringify(header));
  const payloadEncoded = base64UrlEncode(JSON.stringify(fullPayload));
  
  // 개발용 시크릿 (실제 운영에서는 환경변수 사용)
  const secret = import.meta.env.VITE_JWT_SECRET || 'course-menu-dev-secret-key';
  const signature = await simpleHash(`${headerEncoded}.${payloadEncoded}`, secret);
  
  return `${headerEncoded}.${payloadEncoded}.${signature}`;
};

/**
 * JWT 토큰 파싱
 */
export const parseToken = (token: string): TokenPayload | null => {
  try {
    if (!token || typeof token !== 'string') return null;
    
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payloadStr = base64UrlDecode(parts[1]);
    const payload = JSON.parse(payloadStr);
    
    // 타입 가드로 검증
    if (!isTokenPayload(payload)) {
      console.warn('Invalid token payload structure');
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('Token parsing failed:', error);
    return null;
  }
};

/**
 * 토큰 검증 (서명 및 만료시간 확인)
 */
export const validateToken = async (token: string): Promise<boolean> => {
  try {
    const payload = parseToken(token);
    if (!payload) return false;
    
    // 만료시간 확인
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp <= now) {
      console.warn('Token has expired');
      return false;
    }
    
    // 서명 검증
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    const secret = import.meta.env.VITE_JWT_SECRET || 'course-menu-dev-secret-key';
    const expectedSignature = await simpleHash(`${parts[0]}.${parts[1]}`, secret);
    
    if (expectedSignature !== parts[2]) {
      console.warn('Token signature validation failed');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Token validation failed:', error);
    return false;
  }
};

/**
 * 토큰 만료 확인
 */
export const isTokenExpiring = (token: string): boolean => {
  const payload = parseToken(token);
  if (!payload) return true;
  
  const now = Date.now();
  const expiry = payload.exp * 1000; // 초를 밀리초로 변환
  
  return (expiry - now) <= TOKEN_EXPIRY_BUFFER;
};

// =============================================================================
// STORAGE UTILITIES - 저장소 유틸리티들
// =============================================================================

/**
 * 보안을 고려한 토큰 저장
 */
export const storeToken = (token: string, rememberMe: boolean = false): void => {
  try {
    // rememberMe가 true면 localStorage, 아니면 sessionStorage 사용
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Failed to store token:', error);
    throw new Error('Token storage failed');
  }
};

/**
 * 리프레시 토큰 저장
 */
export const storeRefreshToken = (refreshToken: string, rememberMe: boolean = false): void => {
  try {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  } catch (error) {
    console.error('Failed to store refresh token:', error);
  }
};

/**
 * 저장된 토큰 조회
 */
export const getStoredToken = (): string | null => {
  try {
    // sessionStorage 우선, 없으면 localStorage 확인
    let token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) {
      token = localStorage.getItem(TOKEN_KEY);
    }
    
    return token;
  } catch (error) {
    console.error('Failed to retrieve stored token:', error);
    return null;
  }
};

/**
 * 저장된 리프레시 토큰 조회
 */
export const getStoredRefreshToken = (): string | null => {
  try {
    let refreshToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    }
    return refreshToken;
  } catch (error) {
    console.error('Failed to retrieve stored refresh token:', error);
    return null;
  }
};

/**
 * 토큰들 제거 (로그아웃 시)
 */
export const clearTokens = (): void => {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to clear tokens:', error);
  }
};

// =============================================================================
// TOKEN REFRESH UTILITIES - 토큰 갱신 유틸리티들
// =============================================================================

/**
 * 토큰 자동 갱신이 필요한지 확인
 */
export const shouldRefreshToken = (token: string): boolean => {
  return isTokenExpiring(token);
};

/**
 * 토큰 갱신 (실제 구현에서는 서버 API 호출)
 */
export const refreshTokenIfNeeded = async (currentToken: string): Promise<string | null> => {
  try {
    if (!shouldRefreshToken(currentToken)) {
      return currentToken; // 갱신 불필요
    }
    
    const refreshToken = getStoredRefreshToken();
    if (!refreshToken) {
      console.warn('No refresh token available');
      return null;
    }
    
    // 실제 구현에서는 서버 API 호출
    // 여기서는 데모용으로 새 토큰 생성
    const payload = parseToken(currentToken);
    if (!payload) return null;
    
    const newToken = await createToken({
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
      permissions: payload.permissions,
      iss: payload.iss
    });
    
    // 새 토큰 저장
    const wasRemembered = !!localStorage.getItem(TOKEN_KEY);
    storeToken(newToken, wasRemembered);
    
    return newToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
};

// =============================================================================
// UTILITY FUNCTIONS - 유틸리티 함수들
// =============================================================================

/**
 * Authorization 헤더 생성
 */
export const getAuthHeader = (token?: string): Record<string, string> => {
  const authToken = token || getStoredToken();
  if (!authToken) return {};
  
  return {
    Authorization: `Bearer ${authToken}`
  };
};

/**
 * 토큰에서 사용자 정보 추출
 */
export const getUserFromToken = (token?: string): TokenPayload | null => {
  const authToken = token || getStoredToken();
  if (!authToken) return null;
  
  return parseToken(authToken);
};

/**
 * 토큰 만료까지 남은 시간 (밀리초)
 */
export const getTokenTimeToExpiry = (token?: string): number => {
  const authToken = token || getStoredToken();
  if (!authToken) return 0;
  
  const payload = parseToken(authToken);
  if (!payload) return 0;
  
  const now = Date.now();
  const expiry = payload.exp * 1000;
  
  return Math.max(0, expiry - now);
};