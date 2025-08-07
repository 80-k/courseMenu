import type { MenuCategory } from '../types';
import { useI18n } from '../i18n';
import { CourseIcon, ScheduleIcon, LocationIcon, ProgramIcon } from './icons';

interface NavigationMenuCardProps {
  category: MenuCategory;
  onClick?: () => void;
}

export const NavigationMenuCard: React.FC<NavigationMenuCardProps> = ({
  category,
  onClick,
}) => {
  const { language } = useI18n();

  // 카테고리 ID에 따라 적절한 아이콘 컴포넌트 선택
  const getIconComponent = (categoryId: string) => {
    switch (categoryId) {
      case 'course':
        return <CourseIcon className="w-8 h-8 flex-shrink-0" />;
      case 'schedule':
        return <ScheduleIcon className="w-8 h-8 flex-shrink-0" />;
      case 'location':
        return <LocationIcon className="w-8 h-8 flex-shrink-0" />;
      case 'right':
        return <ProgramIcon className="w-8 h-8 flex-shrink-0" />;
      default:
        return <span className="text-3xl flex-shrink-0">{category.icon}</span>;
    }
  };

  return (
    <div 
      className="menu-category" 
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="menu-card">
        <div className="menu-header">
          <div className="menu-header-left">
            <div className="menu-icon" role="img" aria-label={category.title[language]}>
              {getIconComponent(category.id)}
            </div>
            <h2 className="menu-title">{category.title[language]}</h2>
          </div>
          <div className="menu-arrow">→</div>
        </div>
        <p className="menu-description">{category.description[language]}</p>
        <div className="menu-items">
          <span>{category.items[language]}</span>
        </div>
      </div>
    </div>
  );
};