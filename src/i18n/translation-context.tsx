/**
 * 다국어 시스템 컨텍스트
 */

import { createContext } from 'react';
import type { I18nContextType } from './types';

// 컨텍스트 생성
export const I18nContext = createContext<I18nContextType | undefined>(undefined);