import React from 'react';

interface HomeIconProps {
  className?: string;
}

export const HomeIcon: React.FC<HomeIconProps> = ({ className }) => {
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ 
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transformOrigin: 'center' 
      }}
    >
      <defs>
        <linearGradient id="homeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" />
        </linearGradient>
      </defs>
      
      {/* House base */}
      <path 
        d="M3 7 L8 2 L13 7 L13 13 L10 13 L10 10 L6 10 L6 13 L3 13 Z" 
        fill="currentColor" 
        opacity="0.9" 
      />
      
      {/* Roof highlight */}
      <path 
        d="M8 2 L3 7 L3.5 7 L8 2.5 L12.5 7 L13 7 Z" 
        fill="currentColor" 
        opacity="0.7"
      />
      
      {/* Door */}
      <rect 
        x="7" 
        y="10" 
        width="2" 
        height="3" 
        fill="currentColor" 
        opacity="0.5"
        rx="0.5"
      />
      
      {/* Door knob */}
      <circle 
        cx="8.3" 
        cy="11.5" 
        r="0.3" 
        fill="currentColor" 
        opacity="0.8"
      />
      
      {/* Chimney */}
      <rect 
        x="10.5" 
        y="3.5" 
        width="1.5" 
        height="3" 
        fill="currentColor" 
        opacity="0.6"
        rx="0.2"
      />
      
      {/* Window */}
      <rect 
        x="4.5" 
        y="8.5" 
        width="1.5" 
        height="1.5" 
        fill="currentColor" 
        opacity="0.4"
        rx="0.2"
      />
      
      {/* Window cross */}
      <line 
        x1="5.25" 
        y1="8.5" 
        x2="5.25" 
        y2="10" 
        stroke="currentColor" 
        strokeWidth="0.2"
        opacity="0.6"
      />
      <line 
        x1="4.5" 
        y1="9.25" 
        x2="6" 
        y2="9.25" 
        stroke="currentColor" 
        strokeWidth="0.2"
        opacity="0.6"
      />
    </svg>
  );
};