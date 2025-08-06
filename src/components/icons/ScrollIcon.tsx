import React from 'react';

interface ScrollIconProps {
  direction: 'up' | 'down';
  className?: string;
}

export const ScrollIcon: React.FC<ScrollIconProps> = ({ direction, className }) => {
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
        <linearGradient id={`scrollGradient${direction}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      
      {direction === 'up' ? (
        <>
          {/* Scroll up arrow */}
          <path 
            d="M8 2 L4 6 L6 6 L6 14 L10 14 L10 6 L12 6 Z" 
            fill={`url(#scrollGradient${direction})`} 
            opacity="0.9" 
          />
          {/* Additional upward motion lines */}
          <rect x="3" y="1" width="2" height="1" rx="0.5" fill={`url(#scrollGradient${direction})`} opacity="0.6" />
          <rect x="6" y="0.5" width="2" height="1" rx="0.5" fill={`url(#scrollGradient${direction})`} opacity="0.7" />
          <rect x="9" y="1" width="2" height="1" rx="0.5" fill={`url(#scrollGradient${direction})`} opacity="0.6" />
        </>
      ) : (
        <>
          {/* Scroll down arrow */}
          <path 
            d="M8 14 L4 10 L6 10 L6 2 L10 2 L10 10 L12 10 Z" 
            fill={`url(#scrollGradient${direction})`} 
            opacity="0.9" 
          />
          {/* Additional downward motion lines */}
          <rect x="3" y="14" width="2" height="1" rx="0.5" fill={`url(#scrollGradient${direction})`} opacity="0.6" />
          <rect x="6" y="14.5" width="2" height="1" rx="0.5" fill={`url(#scrollGradient${direction})`} opacity="0.7" />
          <rect x="9" y="14" width="2" height="1" rx="0.5" fill={`url(#scrollGradient${direction})`} opacity="0.6" />
        </>
      )}
    </svg>
  );
};