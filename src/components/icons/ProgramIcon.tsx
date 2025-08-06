// 당일 일정을 위한 우아한 시간표 아이콘
export const ProgramIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg 
    className={className} 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 시계 외부 링 */}
    <circle 
      cx="32" 
      cy="32" 
      r="28" 
      stroke="url(#programGradient)" 
      strokeWidth="2" 
      fill="none" 
      opacity="0.3"
    />
    
    {/* 시계 페이스 */}
    <circle 
      cx="32" 
      cy="32" 
      r="22" 
      fill="url(#programGradient)" 
      opacity="0.9"
    />
    
    {/* 내부 원 */}
    <circle 
      cx="32" 
      cy="32" 
      r="18" 
      fill="white" 
      opacity="0.9"
    />
    
    {/* 시간 마커들 */}
    <circle cx="32" cy="16" r="1.5" fill="url(#programGradient)"/>
    <circle cx="46" cy="32" r="1.5" fill="url(#programGradient)"/>
    <circle cx="32" cy="48" r="1.5" fill="url(#programGradient)"/>
    <circle cx="18" cy="32" r="1.5" fill="url(#programGradient)"/>
    
    {/* 시계 바늘 */}
    <rect 
      x="31" 
      y="20" 
      width="2" 
      height="12" 
      rx="1" 
      fill="url(#programGradient)"
    />
    <rect 
      x="31" 
      y="25" 
      width="2" 
      height="9" 
      rx="1" 
      fill="url(#programGradient)" 
      transform="rotate(90 32 32)"
    />
    
    {/* 중앙 점 */}
    <circle cx="32" cy="32" r="2" fill="url(#programGradient)"/>
    
    {/* 장식적 리본 */}
    <path 
      d="M20 12 Q32 8 44 12 Q40 16 32 14 Q24 16 20 12 Z" 
      fill="url(#programGradient)" 
      opacity="0.4"
    />
    
    {/* 스케줄 라인들 */}
    <rect x="8" y="20" width="12" height="1" rx="0.5" fill="url(#programGradient)" opacity="0.6"/>
    <rect x="8" y="24" width="10" height="1" rx="0.5" fill="url(#programGradient)" opacity="0.6"/>
    <rect x="8" y="28" width="8" height="1" rx="0.5" fill="url(#programGradient)" opacity="0.6"/>
    
    <rect x="44" y="36" width="12" height="1" rx="0.5" fill="url(#programGradient)" opacity="0.6"/>
    <rect x="46" y="40" width="10" height="1" rx="0.5" fill="url(#programGradient)" opacity="0.6"/>
    <rect x="48" y="44" width="8" height="1" rx="0.5" fill="url(#programGradient)" opacity="0.6"/>
    
    {/* 그라디언트 정의 */}
    <defs>
      <linearGradient id="programGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="50%" stopColor="#744fa8" />
        <stop offset="100%" stopColor="#5a67d8" />
      </linearGradient>
    </defs>
  </svg>
);