/**
 * 메뉴 설정 관리 페이지
 * 
 * 관리자가 게스트 사용자에게 표시할 메뉴를 제어하는 기능 제공
 */

import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../auth/auth-hooks';
import { useMenuSettings, MENU_INFO, type MenuSettings } from '../contexts/MenuSettingsContext';
import { useI18n } from '../i18n';
import '../styles/global.css';

interface MenuToggleCardProps {
  menuKey: keyof MenuSettings;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const MenuToggleCard: React.FC<MenuToggleCardProps> = memo(({ 
  menuKey, 
  enabled, 
  onChange 
}) => {
  const menuInfo = MENU_INFO[menuKey];

  return (
    <div className={`relative rounded-xl border-2 p-6 transition-all duration-300 ${
      enabled 
        ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50' 
        : 'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      {/* 상태 표시 */}
      <div className="absolute top-4 right-4">
        <div className={`w-3 h-3 rounded-full ${enabled ? 'bg-green-500' : 'bg-gray-400'}`} />
      </div>

      {/* 메뉴 정보 */}
      <div className="mb-4">
        <div className="text-3xl mb-2">{menuInfo.icon}</div>
        <h3 className="text-lg font-semibold text-gray-800 font-serif">
          {menuInfo.name.ko} / {menuInfo.name.ja}
        </h3>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          {menuInfo.description.ko}
        </p>
      </div>

      {/* 토글 스위치 */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          게스트 사용자 표시
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
        </label>
      </div>

      {/* 상태 텍스트 */}
      <div className="mt-3 text-center">
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          enabled 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {enabled ? '표시됨' : '숨겨짐'}
        </span>
      </div>
    </div>
  );
});

const MenuSettingsPage: React.FC = memo(() => {
  const navigate = useNavigate();
  const { role } = usePermissions();
  const { translate } = useI18n();
  const { 
    settings, 
    updateSetting, 
    resetSettings, 
    saveSettings, 
    hasChanges 
  } = useMenuSettings();
  
  const [isSaving, setIsSaving] = useState(false);

  // 관리자가 아닌 경우 접근 차단
  React.useEffect(() => {
    if (role !== 'admin') {
      alert(translate('admin.messages.accessDenied'));
      navigate('/');
      return;
    }
  }, [role, navigate]);

  // 관리자가 아닌 경우 렌더링 차단
  if (role !== 'admin') {
    return null;
  }

  const handleBack = () => {
    if (hasChanges && !confirm(translate('admin.messages.confirmExit'))) {
      return;
    }
    navigate('/admin');
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      saveSettings();
      alert(translate('admin.messages.menuSaveSuccess'));
    } catch (error) {
      alert(translate('admin.messages.menuSaveFailed') + ' ' + (error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm(translate('admin.messages.menuConfirmReset'))) {
      resetSettings();
    }
  };

  const handleToggleAll = (enabled: boolean) => {
    const menuKeys: (keyof MenuSettings)[] = ['course', 'schedule', 'location', 'program'];
    menuKeys.forEach(key => updateSetting(key, enabled));
  };

  const enabledCount = Object.values(settings).filter(Boolean).length;
  const totalCount = Object.keys(settings).length;

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
            <h1 className="text-3xl font-bold text-gray-800 font-serif">{translate('menuSettings.title')}</h1>
            <p className="text-gray-600">{translate('menuSettings.subtitle')}</p>
          </div>
        </div>
        
        {/* 상태 표시 */}
        <div className="text-right">
          <div className="text-sm text-gray-600">
            {translate('menuSettings.enabledMenus')} <span className="font-semibold">{enabledCount}/{totalCount}</span>
          </div>
          {hasChanges && (
            <div className="flex items-center text-orange-600 mt-1">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-xs font-medium">{translate('menuSettings.saveRequired')}</span>
            </div>
          )}
        </div>
      </div>

      {/* 액션 버튼들 */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className={`px-6 py-2 rounded-lg transition-colors ${
              hasChanges && !isSaving
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSaving ? `💾 ${translate('menuSettings.saving')}` : `💾 ${translate('menuSettings.saveSettings')}`}
          </button>
          
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
`🔄 ${translate('menuSettings.resetDefault')}`
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => handleToggleAll(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
{translate('menuSettings.enableAll')}
          </button>
          <button
            onClick={() => handleToggleAll(false)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
{translate('menuSettings.disableAll')}
          </button>
        </div>
      </div>

      {/* 안내 메시지 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
        <div className="flex items-start">
          <div className="text-blue-600 mr-3 mt-0.5">ℹ️</div>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">{translate('menuSettings.guideTitle')}</p>
            <ul className="text-xs space-y-1 text-blue-700">
              {(translate('menuSettings.guideItems') as string[]).map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 메뉴 설정 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {(Object.keys(settings) as (keyof MenuSettings)[]).map(menuKey => (
          <MenuToggleCard
            key={menuKey}
            menuKey={menuKey}
            enabled={settings[menuKey]}
            onChange={(enabled) => updateSetting(menuKey, enabled)}
          />
        ))}
      </div>

      {/* 미리보기 섹션 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 font-serif">{translate('menuSettings.guestPreview')}</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 메인 페이지 (항상 표시) */}
            <div className="bg-white rounded-lg p-3 border-2 border-green-300">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🏠</span>
                <span className="text-sm font-medium">{translate('menuSettings.mainCategory')}</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">{translate('menuSettings.alwaysShown')}</span>
              </div>
            </div>
            
            {/* 설정에 따른 메뉴들 */}
            {(Object.keys(settings) as (keyof MenuSettings)[]).map(menuKey => {
              const menuInfo = MENU_INFO[menuKey];
              const enabled = settings[menuKey];
              
              return (
                <div
                  key={menuKey}
                  className={`rounded-lg p-3 border-2 ${
                    enabled 
                      ? 'bg-white border-green-300' 
                      : 'bg-gray-100 border-gray-300 opacity-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{menuInfo.icon}</span>
                    <span className="text-sm font-medium">{menuInfo.name.ko}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      enabled 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {enabled ? translate('menuSettings.show') : translate('menuSettings.hide')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export { MenuSettingsPage as MenuSettings };