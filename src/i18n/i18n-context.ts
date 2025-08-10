/**
 * I18n Context definition
 * Separated for Fast Refresh compatibility
 */

import { createContext } from 'react';
import type { I18nContextType } from '../types';

// I18n 컨텍스트 생성
export const I18nContext = createContext<I18nContextType | undefined>(undefined);