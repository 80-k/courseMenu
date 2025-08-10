/**
 * 사용자 프로필 페이지
 * 
 * 개인 프로필 정보 및 설정 관리
 */

import React, { memo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, usePermissions } from '../auth/auth-hooks';
import type { UserRole } from '../types/auth';
import '../styles/global.css';

interface UserProfileData {
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  joinDate: string;
  lastLogin: string;
  preferences: {
    language: 'ko' | 'ja';
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    emailUpdates: boolean;
  };
}

const UserProfile: React.FC = memo(() => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { permissions, role } = usePermissions();
  
  const [profile, setProfile] = useState<UserProfileData>({
    name: role === 'admin' ? '관리자' : '게스트 사용자',
    email: role === 'admin' ? 'admin@example.com' : 'guest@example.com',
    role: role || 'guest',
    avatar: '',
    joinDate: '2025-01-01',
    lastLogin: new Date().toISOString().split('T')[0],
    preferences: {
      language: 'ko',
      theme: 'light',
      notifications: true,
      emailUpdates: false
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleBack = () => {
    if (hasChanges && !confirm('저장하지 않은 변경사항이 있습니다. 정말 나가시겠습니까?')) {
      return;
    }
    navigate('/');
  };

  const handleProfileChange = (field: string, value: string | boolean | Date) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof UserProfileData] as Record<string, unknown>),
          [child]: value
        }
      }));
    } else {
      setProfile(prev => ({ ...prev, [field]: value }));
    }
    setHasChanges(true);
  };

  const handleSave = () => {
    // 실제 구현에서는 API 호출
    console.log('프로필 저장:', profile);
    setHasChanges(false);
    setIsEditing(false);
    alert('프로필이 성공적으로 업데이트되었습니다.');
  };

  const handleLogout = useCallback(async () => {
    try {
      const result = await logout({
        showConfirmation: true,
        reason: 'user_initiated',
        clearUserData: role === 'admin'
      });
      
      if (result.success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // 오류 발생 시에도 홈으로 이동
      navigate('/');
    }
  }, [logout, navigate, role]);

  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return '관리자';
      case 'guest':
        return '게스트';
      default:
        return '사용자';
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'guest':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="main-container">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={handleBack}
            className="mr-4 p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 font-serif">사용자 프로필</h1>
            <p className="text-gray-600">개인 정보 및 설정 관리</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ✏️ 편집
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setHasChanges(false);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                💾 저장
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 프로필 카드 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-center">
            {/* 아바타 */}
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">
                {profile.name.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* 이름 */}
            {isEditing ? (
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                className="w-full text-center text-xl font-semibold text-gray-800 mb-2 px-2 py-1 border border-gray-300 rounded"
              />
            ) : (
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{profile.name}</h2>
            )}

            {/* 이메일 */}
            <p className="text-gray-600 mb-4">{profile.email}</p>

            {/* 역할 */}
            <div className="mb-6">
              <span className={`px-3 py-1 text-sm font-medium border rounded-full ${getRoleBadgeColor(profile.role)}`}>
                {getRoleDisplayName(profile.role)}
              </span>
            </div>

            {/* 가입 정보 */}
            <div className="space-y-2 text-sm text-gray-600">
              <div>
                <span className="font-medium">가입일:</span>
                <span className="ml-2">{new Date(profile.joinDate).toLocaleDateString('ko-KR')}</span>
              </div>
              <div>
                <span className="font-medium">마지막 로그인:</span>
                <span className="ml-2">{new Date(profile.lastLogin).toLocaleDateString('ko-KR')}</span>
              </div>
            </div>

            {/* 로그아웃 버튼 */}
            <button
              onClick={handleLogout}
              className="w-full mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              🚪 로그아웃
            </button>
          </div>
        </div>

        {/* 설정 및 정보 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 기본 정보 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 font-serif">기본 정보</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-600">{profile.email}</p>
              </div>
            </div>
          </div>

          {/* 환경 설정 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 font-serif">환경 설정</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">언어</label>
                {isEditing ? (
                  <select
                    value={profile.preferences.language}
                    onChange={(e) => handleProfileChange('preferences.language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ko">한국어</option>
                    <option value="ja">日本語</option>
                  </select>
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg">
                    {profile.preferences.language === 'ko' ? '한국어' : '日本語'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">테마</label>
                {isEditing ? (
                  <select
                    value={profile.preferences.theme}
                    onChange={(e) => handleProfileChange('preferences.theme', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="light">밝은 테마</option>
                    <option value="dark">어두운 테마</option>
                    <option value="system">시스템 기본값</option>
                  </select>
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg">
                    {profile.preferences.theme === 'light' ? '밝은 테마' : 
                     profile.preferences.theme === 'dark' ? '어두운 테마' : '시스템 기본값'}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">알림 받기</span>
                {isEditing ? (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.preferences.notifications}
                      onChange={(e) => handleProfileChange('preferences.notifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                ) : (
                  <span className={`px-2 py-1 text-xs rounded ${profile.preferences.notifications ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {profile.preferences.notifications ? '활성화' : '비활성화'}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">이메일 업데이트</span>
                {isEditing ? (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.preferences.emailUpdates}
                      onChange={(e) => handleProfileChange('preferences.emailUpdates', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                ) : (
                  <span className={`px-2 py-1 text-xs rounded ${profile.preferences.emailUpdates ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {profile.preferences.emailUpdates ? '활성화' : '비활성화'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 권한 정보 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 font-serif">권한 정보</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">현재 권한</p>
                <div className="flex flex-wrap gap-2">
                  {permissions.map(permission => (
                    <span key={permission} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                <p>권한 변경은 시스템 관리자에게 문의하세요.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export { UserProfile };