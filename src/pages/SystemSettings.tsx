/**
 * 시스템 설정 페이지
 * 
 * 애플리케이션의 전역 설정 관리
 */

import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../auth/auth-hooks';
import '../styles/global.css';

interface SystemConfig {
  appName: string;
  version: string;
  maintenanceMode: boolean;
  maxUsers: number;
  sessionTimeout: number;
  enableDebug: boolean;
  backupEnabled: boolean;
  lastBackup: string;
}

const SystemSettings: React.FC = memo(() => {
  const navigate = useNavigate();
  const { role } = usePermissions();
  
  console.log('Current user role:', role); // role 사용
  
  const [config, setConfig] = useState<SystemConfig>({
    appName: 'S.G. 💍 MIYU',
    version: '1.0.0',
    maintenanceMode: false,
    maxUsers: 100,
    sessionTimeout: 30,
    enableDebug: import.meta.env.DEV,
    backupEnabled: true,
    lastBackup: '2025-01-09'
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleBack = () => {
    if (hasChanges && !confirm('저장하지 않은 변경사항이 있습니다. 정말 나가시겠습니까?')) {
      return;
    }
    navigate('/admin');
  };

  const handleConfigChange = (key: keyof SystemConfig, value: boolean | string | number) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // 실제 구현에서는 API 호출
    console.log('설정 저장:', config);
    setHasChanges(false);
    alert('설정이 성공적으로 저장되었습니다.');
  };

  const handleReset = () => {
    if (confirm('모든 설정을 기본값으로 되돌리시겠습니까?')) {
      setConfig({
        appName: 'S.G. 💍 MIYU',
        version: '1.0.0',
        maintenanceMode: false,
        maxUsers: 100,
        sessionTimeout: 30,
        enableDebug: false,
        backupEnabled: true,
        lastBackup: '2025-01-09'
      });
      setHasChanges(true);
    }
  };

  const handleBackup = () => {
    if (confirm('시스템 백업을 시작하시겠습니까?')) {
      // 백업 프로세스 시뮬레이션
      const now = new Date().toISOString().split('T')[0];
      setConfig(prev => ({ ...prev, lastBackup: now }));
      alert('백업이 완료되었습니다.');
    }
  };

  const handleExportLogs = () => {
    alert('로그 내보내기 기능 (구현 예정)');
  };

  const handleClearCache = () => {
    if (confirm('시스템 캐시를 삭제하시겠습니까?')) {
      alert('캐시가 성공적으로 삭제되었습니다.');
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
            <h1 className="text-3xl font-bold text-gray-800 font-serif">시스템 설정</h1>
            <p className="text-gray-600">애플리케이션 전역 설정 관리</p>
          </div>
        </div>
        {hasChanges && (
          <div className="flex items-center text-orange-600">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="text-sm font-medium">저장되지 않은 변경사항</span>
          </div>
        )}
      </div>

      {/* 액션 버튼들 */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`px-6 py-2 rounded-lg transition-colors ${
              hasChanges
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            💾 설정 저장
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            🔄 기본값 복원
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 기본 설정 */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 font-serif">기본 설정</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  애플리케이션 이름
                </label>
                <input
                  type="text"
                  value={config.appName}
                  onChange={(e) => handleConfigChange('appName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  버전
                </label>
                <input
                  type="text"
                  value={config.version}
                  onChange={(e) => handleConfigChange('version', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  최대 사용자 수
                </label>
                <input
                  type="number"
                  value={config.maxUsers}
                  onChange={(e) => handleConfigChange('maxUsers', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  세션 타임아웃 (분)
                </label>
                <input
                  type="number"
                  value={config.sessionTimeout}
                  onChange={(e) => handleConfigChange('sessionTimeout', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="5"
                  max="480"
                />
              </div>
            </div>
          </div>

          {/* 시스템 상태 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 font-serif">시스템 상태</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">점검 모드</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.maintenanceMode}
                    onChange={(e) => handleConfigChange('maintenanceMode', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">디버그 모드</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.enableDebug}
                    onChange={(e) => handleConfigChange('enableDebug', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">자동 백업</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.backupEnabled}
                    onChange={(e) => handleConfigChange('backupEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 시스템 관리 */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 font-serif">시스템 관리</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-800">데이터 백업</h3>
                  <p className="text-sm text-gray-600">마지막 백업: {new Date(config.lastBackup).toLocaleDateString('ko-KR')}</p>
                </div>
                <button
                  onClick={handleBackup}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  백업 실행
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-800">로그 내보내기</h3>
                  <p className="text-sm text-gray-600">시스템 로그를 파일로 내보내기</p>
                </div>
                <button
                  onClick={handleExportLogs}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  내보내기
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-800">캐시 삭제</h3>
                  <p className="text-sm text-gray-600">시스템 캐시 데이터 삭제</p>
                </div>
                <button
                  onClick={handleClearCache}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  캐시 삭제
                </button>
              </div>
            </div>
          </div>

          {/* 시스템 정보 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 font-serif">시스템 정보</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">환경:</span>
                <span className="font-mono">{import.meta.env.MODE}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Node.js 버전:</span>
                <span className="font-mono">18.17.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">React 버전:</span>
                <span className="font-mono">18.2.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">빌드 시간:</span>
                <span className="font-mono">{new Date().toLocaleString('ko-KR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">메모리 사용량:</span>
                <span className="font-mono">24.5 MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export { SystemSettings };