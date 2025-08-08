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
      className="navigation-card group" 
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
      <div className="navigation-card-inner">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex-shrink-0 text-2xl leading-none md:text-3xl" role="img" aria-label={category.title[language]}>
              {getIconComponent(category.id)}
            </div>
            <h2 className="section-title">{category.title[language]}</h2>
          </div>
          <div className="card-arrow">→</div>
        </div>
        <p className="text-gray-600 text-base leading-relaxed mb-5 font-normal text-center flex-grow md:text-lg md:mb-6">
          {category.description[language]}
        </p>
        <div className="text-gray-700 text-sm leading-relaxed mb-5 p-3 bg-primary-600/5 rounded-xl border-l-3 border-primary-600/30 text-center md:text-base md:p-4 md:mb-6">
          <span>{category.items[language]}</span>
        </div>
      </div>
    </div>
  );
};