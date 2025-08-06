import React from 'react';

interface ToggleAllIconProps {
  isExpanded: boolean;
  className?: string;
}

export const ToggleAllIcon: React.FC<ToggleAllIconProps> = ({ isExpanded, className }) => {
  if (isExpanded) {
    // Close/Collapse icon - multiple lines collapsing into one
    return (
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <linearGradient id="toggleCloseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
        {/* Multiple lines collapsing to center */}
        <rect x="2" y="3" width="12" height="1.5" rx="0.75" fill="url(#toggleCloseGradient)" opacity="0.9" />
        <rect x="3" y="6" width="10" height="1.5" rx="0.75" fill="url(#toggleCloseGradient)" opacity="0.7" />
        <rect x="4" y="9" width="8" height="1.5" rx="0.75" fill="url(#toggleCloseGradient)" opacity="0.5" />
        <rect x="5" y="12" width="6" height="1.5" rx="0.75" fill="url(#toggleCloseGradient)" opacity="0.3" />
        {/* Arrow pointing up to indicate collapse */}
        <path d="M8 1 L6 3 L10 3 Z" fill="url(#toggleCloseGradient)" opacity="0.8" />
      </svg>
    );
  } else {
    // Open/Expand icon - single line expanding into multiple
    return (
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <linearGradient id="toggleOpenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        {/* Single line expanding to multiple */}
        <rect x="5" y="3" width="6" height="1.5" rx="0.75" fill="url(#toggleOpenGradient)" opacity="0.3" />
        <rect x="4" y="6" width="8" height="1.5" rx="0.75" fill="url(#toggleOpenGradient)" opacity="0.5" />
        <rect x="3" y="9" width="10" height="1.5" rx="0.75" fill="url(#toggleOpenGradient)" opacity="0.7" />
        <rect x="2" y="12" width="12" height="1.5" rx="0.75" fill="url(#toggleOpenGradient)" opacity="0.9" />
        {/* Arrow pointing down to indicate expand */}
        <path d="M8 15 L6 13 L10 13 Z" fill="url(#toggleOpenGradient)" opacity="0.8" />
      </svg>
    );
  }
};