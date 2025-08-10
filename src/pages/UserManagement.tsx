/**
 * 사용자 관리 페이지
 * 
 * 사용자 계정 및 권한 관리 기능 제공
 */

import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../auth/auth-hooks';
import type { UserRole } from '../types/auth';
import '../styles/global.css';

interface User {
  id: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

// 데모 사용자 데이터
const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2025-01-09',
    createdAt: '2025-01-01'
  },
  {
    id: '2', 
    email: 'guest@example.com',
    role: 'guest',
    status: 'active',
    lastLogin: '2025-01-08',
    createdAt: '2025-01-05'
  },
  {
    id: '3',
    email: 'user@example.com', 
    role: 'guest',
    status: 'inactive',
    lastLogin: '2025-01-01',
    createdAt: '2025-01-03'
  }
];

const UserManagement: React.FC = memo(() => {
  const navigate = useNavigate();
  const { role } = usePermissions();
  
  console.log('Current user role:', role); // role 사용
  const [users, setUsers] = useState<User[]>(DEMO_USERS);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  const handleBack = () => {
    navigate('/admin');
  };

  const handleUserToggle = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleStatusToggle = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'guest':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 border-green-300'
      : 'bg-gray-100 text-gray-800 border-gray-300';
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
            <h1 className="text-3xl font-bold text-gray-800 font-serif">사용자 관리</h1>
            <p className="text-gray-600">시스템 사용자 계정 및 권한 관리</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">총 사용자:</span>
          <span className="font-semibold text-gray-800">{users.length}명</span>
        </div>
      </div>

      {/* 액션 버튼들 */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => alert('새 사용자 추가 기능 (구현 예정)')}
          >
            <span className="mr-2">➕</span>
            새 사용자 추가
          </button>
          {selectedUsers.size > 0 && (
            <button 
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              onClick={() => {
                if (confirm(`${selectedUsers.size}명의 사용자를 삭제하시겠습니까?`)) {
                  setUsers(users.filter(user => !selectedUsers.has(user.id)));
                  setSelectedUsers(new Set());
                }
              }}
            >
              <span className="mr-2">🗑️</span>
              선택된 사용자 삭제
            </button>
          )}
        </div>
        <div className="text-sm text-gray-500">
          {selectedUsers.size > 0 && `${selectedUsers.size}명 선택됨`}
        </div>
      </div>

      {/* 사용자 테이블 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedUsers.size === users.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(new Set(users.map(u => u.id)));
                      } else {
                        setSelectedUsers(new Set());
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  사용자
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  역할
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  마지막 로그인
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  가입일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedUsers.has(user.id)}
                      onChange={() => handleUserToggle(user.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-semibold">
                          {user.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.email}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                      className={`px-2 py-1 text-xs font-medium border rounded ${getRoleColor(user.role)}`}
                      disabled={user.id === '1'} // admin 사용자는 역할 변경 불가
                    >
                      <option value="guest">Guest</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleStatusToggle(user.id)}
                      className={`px-2 py-1 text-xs font-medium border rounded ${getStatusColor(user.status)}`}
                      disabled={user.id === '1'} // admin 사용자는 상태 변경 불가
                    >
                      {user.status === 'active' ? '활성' : '비활성'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastLogin).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => alert(`사용자 ${user.email} 편집 (구현 예정)`)}
                    >
                      편집
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => {
                        if (confirm(`사용자 ${user.email}를 삭제하시겠습니까?`)) {
                          setUsers(users.filter(u => u.id !== user.id));
                        }
                      }}
                      disabled={user.id === '1'} // admin 사용자는 삭제 불가
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 통계 정보 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">활성 사용자</h3>
          <p className="text-3xl font-bold text-green-600">
            {users.filter(u => u.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">관리자</h3>
          <p className="text-3xl font-bold text-red-600">
            {users.filter(u => u.role === 'admin').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">게스트</h3>
          <p className="text-3xl font-bold text-blue-600">
            {users.filter(u => u.role === 'guest').length}
          </p>
        </div>
      </div>
    </div>
  );
});

export { UserManagement };