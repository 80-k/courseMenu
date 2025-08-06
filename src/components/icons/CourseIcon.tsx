import React from 'react';

interface CourseIconProps {
  className?: string;
}

export const CourseIcon: React.FC<CourseIconProps> = ({ className }) => {
  return (
    <svg 
      width="32" 
      height="32" 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="luxuryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="30%" stopColor="#FFD700" />
          <stop offset="70%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#8B7355" />
        </linearGradient>
        <linearGradient id="plateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAFAFA" />
          <stop offset="50%" stopColor="#F5F5F5" />
          <stop offset="100%" stopColor="#E8E8E8" />
        </linearGradient>
        <linearGradient id="foodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <radialGradient id="plateRim" cx="50%" cy="50%" r="50%">
          <stop offset="85%" stopColor="transparent" />
          <stop offset="90%" stopColor="#D4AF37" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#B8860B" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      
      {/* Outer plate with golden rim */}
      <circle cx="16" cy="16" r="15" fill="url(#plateGradient)" />
      <circle cx="16" cy="16" r="15" fill="url(#plateRim)" />
      <circle cx="16" cy="16" r="15" fill="none" stroke="url(#luxuryGradient)" strokeWidth="1.5" />
      
      {/* Inner plate area */}
      <circle cx="16" cy="16" r="12" fill="url(#plateGradient)" />
      <circle cx="16" cy="16" r="12" fill="none" stroke="url(#luxuryGradient)" strokeWidth="0.8" opacity="0.4" />
      
      {/* Artistic food presentation */}
      {/* Main course - elegant oval shape */}
      <ellipse cx="16" cy="15" rx="6" ry="3" fill="url(#foodGradient)" opacity="0.8" />
      
      {/* Sauce drizzle - artistic curves */}
      <path d="M 10 18 Q 12 20 14 18 Q 16 16 18 18 Q 20 20 22 18" 
            stroke="url(#luxuryGradient)" 
            strokeWidth="1.2" 
            fill="none" 
            opacity="0.7" />
      
      {/* Garnish elements */}
      <circle cx="11" cy="21" r="1.2" fill="url(#foodGradient)" opacity="0.6" />
      <circle cx="21" cy="21" r="1.2" fill="url(#foodGradient)" opacity="0.6" />
      <circle cx="13" cy="11" r="0.8" fill="url(#luxuryGradient)" opacity="0.8" />
      <circle cx="19" cy="11" r="0.8" fill="url(#luxuryGradient)" opacity="0.8" />
      
      {/* Microgreens representation */}
      <g opacity="0.7">
        <line x1="14" y1="12" x2="15" y2="10" stroke="url(#foodGradient)" strokeWidth="0.8" />
        <line x1="17" y1="12" x2="18" y2="10" stroke="url(#foodGradient)" strokeWidth="0.8" />
        <circle cx="15" cy="10" r="0.5" fill="url(#foodGradient)" />
        <circle cx="18" cy="10" r="0.5" fill="url(#foodGradient)" />
      </g>
      
      {/* Luxury cutlery with golden accents */}
      {/* Elegant fork */}
      <g transform="translate(2, 4)" opacity="0.9">
        <rect x="0" y="0" width="1.2" height="20" fill="url(#luxuryGradient)" rx="0.6" />
        <rect x="0" y="12" width="1.2" height="8" fill="url(#plateGradient)" rx="0.6" />
        {/* Fork tines */}
        <rect x="-1.5" y="0" width="0.9" height="4" fill="url(#luxuryGradient)" rx="0.45" />
        <rect x="-0.3" y="0" width="0.9" height="4" fill="url(#luxuryGradient)" rx="0.45" />
        <rect x="0.9" y="0" width="0.9" height="4" fill="url(#luxuryGradient)" rx="0.45" />
        <rect x="2.1" y="0" width="0.9" height="4" fill="url(#luxuryGradient)" rx="0.45" />
      </g>
      
      {/* Elegant knife */}
      <g transform="translate(28, 4)" opacity="0.9">
        <rect x="0" y="0" width="1.2" height="20" fill="url(#luxuryGradient)" rx="0.6" />
        <rect x="0" y="12" width="1.2" height="8" fill="url(#plateGradient)" rx="0.6" />
        {/* Blade */}
        <path d="M -0.8 0 L 2 0 L 1.5 5 L -0.3 5 Z" fill="url(#luxuryGradient)" />
      </g>
      
      {/* Decorative dots - like seasoning */}
      <circle cx="8" cy="8" r="0.4" fill="url(#luxuryGradient)" opacity="0.5" />
      <circle cx="24" cy="8" r="0.4" fill="url(#luxuryGradient)" opacity="0.5" />
      <circle cx="8" cy="24" r="0.4" fill="url(#luxuryGradient)" opacity="0.5" />
      <circle cx="24" cy="24" r="0.4" fill="url(#luxuryGradient)" opacity="0.5" />
      
      {/* Fine dining sparkle effects */}
      <g opacity="0.6">
        <path d="M 6 6 L 6.5 7 L 6 8 L 5.5 7 Z" fill="url(#luxuryGradient)" />
        <path d="M 26 6 L 26.5 7 L 26 8 L 25.5 7 Z" fill="url(#luxuryGradient)" />
        <path d="M 6 26 L 6.5 27 L 6 28 L 5.5 27 Z" fill="url(#luxuryGradient)" />
        <path d="M 26 26 L 26.5 27 L 26 28 L 25.5 27 Z" fill="url(#luxuryGradient)" />
      </g>
    </svg>
  );
};