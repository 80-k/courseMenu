// 예정 메뉴를 위한 우아한 캘린더 아이콘
export const ScheduleIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg 
    className={className} 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 캘린더 베이스 */}
    <rect 
      x="12" 
      y="16" 
      width="40" 
      height="36" 
      rx="4" 
      fill="url(#scheduleGradient)" 
      opacity="0.9"
    />
    
    {/* 캘린더 상단 */}
    <rect 
      x="12" 
      y="16" 
      width="40" 
      height="8" 
      rx="4" 
      fill="url(#scheduleGradient)"
    />
    
    {/* 스프링 홀 */}
    <circle cx="20" cy="12" r="2" fill="none" stroke="url(#scheduleGradient)" strokeWidth="1.5"/>
    <circle cx="32" cy="12" r="2" fill="none" stroke="url(#scheduleGradient)" strokeWidth="1.5"/>
    <circle cx="44" cy="12" r="2" fill="none" stroke="url(#scheduleGradient)" strokeWidth="1.5"/>
    
    {/* 스프링 */}
    <rect x="19" y="8" width="2" height="8" rx="1" fill="url(#scheduleGradient)" opacity="0.7"/>
    <rect x="31" y="8" width="2" height="8" rx="1" fill="url(#scheduleGradient)" opacity="0.7"/>
    <rect x="43" y="8" width="2" height="8" rx="1" fill="url(#scheduleGradient)" opacity="0.7"/>
    
    {/* 날짜 표시 - 특별한 날들 */}
    <circle cx="20" cy="32" r="3" fill="white" opacity="0.9"/>
    <text x="20" y="35" textAnchor="middle" fontSize="6" fill="url(#scheduleGradient)" fontWeight="bold">7</text>
    
    <circle cx="32" cy="38" r="3" fill="white" opacity="0.9"/>
    <text x="32" y="41" textAnchor="middle" fontSize="6" fill="url(#scheduleGradient)" fontWeight="bold">8</text>
    
    <circle cx="44" cy="44" r="3" fill="white" opacity="0.9"/>
    <text x="44" y="47" textAnchor="middle" fontSize="6" fill="url(#scheduleGradient)" fontWeight="bold">3</text>
    
    {/* 장식적 하트 */}
    <path 
      d="M24 28c0-1.5 1.5-2.5 3-1.5s3 0 3-1.5c0-1.5-1.5-2.5-3-2.5s-3 1-3 2.5c0 1.5 1.5 2.5 3 3.5s3 2 3 3.5z" 
      fill="url(#scheduleGradient)" 
      opacity="0.3"
    />
    
    {/* 그라디언트 정의 */}
    <defs>
      <linearGradient id="scheduleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9333ea" />
        <stop offset="50%" stopColor="#744fa8" />
        <stop offset="100%" stopColor="#5a67d8" />
      </linearGradient>
    </defs>
  </svg>
);