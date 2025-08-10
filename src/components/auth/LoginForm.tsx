/**
 * 로그인 폼 컴포넌트
 * 
 * 사용자 인증을 위한 로그인 폼을 제공합니다.
 * 입력 검증, 에러 처리, 로딩 상태 관리를 포함합니다.
 */

import React, { useState, useCallback } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useI18n } from '../../i18n';
import type { LoginCredentials } from '../../types/auth';

// =============================================================================
// COMPONENT PROPS - 컴포넌트 Props
// =============================================================================

interface LoginFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
  showRememberMe?: boolean;
  showGuestLogin?: boolean;
}

// =============================================================================
// VALIDATION UTILITIES - 검증 유틸리티들
// =============================================================================

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const validateEmail = (email: string, translate: (key: string) => string): string | undefined => {
  if (!email.trim()) return translate('validation.email.required');
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return translate('validation.email.invalid');
  
  return undefined;
};

const validatePassword = (password: string, translate: (key: string) => string): string | undefined => {
  if (!password) return translate('validation.password.required');
  if (password.length < 3) return translate('validation.password.minLength');
  
  return undefined;
};

// =============================================================================
// LOGIN FORM COMPONENT - 로그인 폼 컴포넌트
// =============================================================================

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onCancel,
  className = '',
  showRememberMe = true,
  showGuestLogin = true
}) => {
  // State
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Auth hook
  const { login, error: authError, clearError } = useAuth();
  const { translate } = useI18n();

  // =============================================================================
  // EVENT HANDLERS - 이벤트 핸들러들
  // =============================================================================

  /**
   * 입력 필드 변경 핸들러
   */
  const handleInputChange = useCallback((field: keyof LoginCredentials) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = field === 'rememberMe' ? event.target.checked : event.target.value;
      
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));

      // 에러 클리어
      if (errors[field as keyof FormErrors]) {
        setErrors(prev => ({
          ...prev,
          [field]: undefined
        }));
      }
      
      if (authError) {
        clearError();
      }
    }, [errors, authError, clearError]);

  /**
   * 폼 검증
   */
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    const emailError = validateEmail(formData.email, translate);
    if (emailError) newErrors.email = emailError;
    
    const passwordError = validatePassword(formData.password, translate);
    if (passwordError) newErrors.password = passwordError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, translate]);

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});

    try {
      await login(formData);
      onSuccess?.();
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : translate('validation.login.failed')
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, login, onSuccess]);

  /**
   * 게스트 로그인 핸들러
   */
  const handleGuestLogin = useCallback(async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      await login({
        email: 'guest@example.com',
        password: 'guest123',
        rememberMe: false
      });
      onSuccess?.();
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : translate('validation.guestLogin.failed')
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [login, onSuccess]);

  // =============================================================================
  // RENDER - 렌더링
  // =============================================================================

  const displayError = errors.general || authError;

  return (
    <div className={`bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-lg p-6 md:p-8 ${className}`}>
      {/* 헤더 */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 font-serif">{translate('login.title')}</h2>
        <p className="text-gray-600 text-sm">{translate('login.subtitle')}</p>
      </div>

      {/* 에러 메시지 */}
      {displayError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {displayError}
        </div>
      )}

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 이메일 입력 */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {translate('login.email')}
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
            placeholder={translate('login.emailPlaceholder')}
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        {/* 비밀번호 입력 */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            {translate('login.password')}
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange('password')}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
              errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
            placeholder={translate('login.passwordPlaceholder')}
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
          )}
        </div>

        {/* 로그인 상태 유지 */}
        {showRememberMe && (
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleInputChange('rememberMe')}
              disabled={isSubmitting}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:cursor-not-allowed"
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
              {translate('login.rememberMe')}
            </label>
          </div>
        )}

        {/* 로그인 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-primary-600 disabled:hover:to-secondary-600"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
{translate('login.loggingIn')}
            </span>
          ) : (
translate('login.loginButton')
          )}
        </button>
      </form>

      {/* 게스트 로그인 및 취소 버튼 */}
      <div className="mt-4 space-y-2">
        {showGuestLogin && (
          <button
            type="button"
            onClick={handleGuestLogin}
            disabled={isSubmitting}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
{translate('login.guestLogin')}
          </button>
        )}
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="w-full text-gray-600 py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-200 hover:text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
{translate('common.cancel')}
          </button>
        )}
      </div>

      {/* 데모 계정 안내 */}
      <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-2">{translate('login.demoAccounts')}</h4>
        <div className="text-xs text-blue-700 space-y-1">
          <div>
            <strong>{translate('users.admin')}:</strong> admin@example.com / admin123
          </div>
          <div>
            <strong>{translate('users.guest')}:</strong> guest@example.com / guest123
          </div>
        </div>
      </div>
    </div>
  );
};