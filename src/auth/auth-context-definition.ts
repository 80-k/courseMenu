/**
 * 인증 컨텍스트 정의
 * Fast Refresh 호환을 위해 컨텍스트만 별도 파일로 분리
 */

import { createContext } from 'react';
import type { AuthContextType } from '../types/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);