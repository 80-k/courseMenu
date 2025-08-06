// 예식장 메뉴를 위한 우아한 교회/성당 아이콘
export const VenueIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg 
    className={className} 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 메인 건물 */}
    <rect 
      x="18" 
      y="30" 
      width="28" 
      height="24" 
      rx="2" 
      fill="url(#venueGradient)" 
      opacity="0.9"
    />
    
    {/* 지붕 */}
    <path 
      d="M14 30 L32 16 L50 30 L46 30 L32 20 L18 30 Z" 
      fill="url(#venueGradient)"
    />
    
    {/* 종탑 */}
    <rect 
      x="28" 
      y="10" 
      width="8" 
      height="16" 
      rx="1" 
      fill="url(#venueGradient)"
    />
    
    {/* 십자가 */}
    <rect x="31" y="6" width="2" height="8" rx="1" fill="url(#venueGradient)"/>
    <rect x="29" y="8" width="6" height="2" rx="1" fill="url(#venueGradient)"/>
    
    {/* 큰 창문 (스테인드글라스 스타일) */}
    <path 
      d="M32 40 A6 6 0 0 1 26 34 A6 6 0 0 1 32 28 A6 6 0 0 1 38 34 A6 6 0 0 1 32 40 Z" 
      fill="white" 
      opacity="0.8"
    />
    <circle cx="32" cy="34" r="4" fill="url(#venueGradient)" opacity="0.3"/>
    
    {/* 출입문 */}
    <path 
      d="M28 54 L28 44 A4 4 0 0 1 36 44 L36 54 Z" 
      fill="url(#venueGradient)" 
      opacity="0.7"
    />
    
    {/* 문 손잡이 */}
    <circle cx="34" cy="49" r="1" fill="white" opacity="0.8"/>
    
    {/* 측면 창문들 */}
    <rect x="20" y="36" width="3" height="6" rx="1.5" fill="white" opacity="0.6"/>
    <rect x="20" y="44" width="3" height="6" rx="1.5" fill="white" opacity="0.6"/>
    <rect x="41" y="36" width="3" height="6" rx="1.5" fill="white" opacity="0.6"/>
    <rect x="41" y="44" width="3" height="6" rx="1.5" fill="white" opacity="0.6"/>
    
    {/* 장식적 나뭇잎 */}
    <ellipse cx="16" cy="50" rx="2" ry="3" fill="url(#venueGradient)" opacity="0.4" transform="rotate(-20 16 50)"/>
    <ellipse cx="48" cy="50" rx="2" ry="3" fill="url(#venueGradient)" opacity="0.4" transform="rotate(20 48 50)"/>
    
    {/* 그라디언트 정의 */}
    <defs>
      <linearGradient id="venueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#744fa8" />
        <stop offset="50%" stopColor="#5a67d8" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);