
interface IconProps {
  size?: number;
  className?: string;
}

// 시간표 아이콘 - 클럭과 체크리스트가 결합된 스케줄 아이콘
export const ProgramIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 16l1 1 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 식사 아이콘 - 젓가락과 그릇이 결합된 일본 요리 아이콘
export const CourseIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <ellipse cx="12" cy="16" rx="8" ry="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
    <ellipse cx="12" cy="14" rx="6" ry="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2"/>
    <path d="M8 12c0-2 2-4 4-4s4 2 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 8l1-4M18 8l-1-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6.5 8l1-4M17.5 8l-1-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// 장소 아이콘 - 클래식한 건물과 위치 핀이 결합된 아이콘
export const LocationIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
    <rect x="9" y="7" width="6" height="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M9 7V6a1 1 0 011-1h4a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 9h4M10 10h4" stroke="currentColor" strokeWidth="1"/>
    <circle cx="12" cy="8.5" r="0.5" fill="currentColor"/>
  </svg>
);

// 일정 아이콘 - 달력과 하트가 결합된 특별한 날 아이콘
export const ScheduleIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M16 2v4M8 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 10h18" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 14c-1.5 0-3 1-3 2.5 0 1.5 3 3.5 3 3.5s3-2 3-3.5c0-1.5-1.5-2.5-3-2.5z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2"/>
  </svg>
);

// 아이콘 매핑 객체
export const MenuIcons = {
  PROGRAM: ProgramIcon,
  COURSE: CourseIcon, 
  LOCATION: LocationIcon,
  SCHEDULE: ScheduleIcon,
} as const;

export type MenuIconKey = keyof typeof MenuIcons;