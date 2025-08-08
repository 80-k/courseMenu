import type { MenuCategory } from '../types';
import { useI18n } from '../i18n';
import { MenuIcons, type MenuIconKey } from './icons/MenuIcons';

interface NavigationMenuCardProps {
  category: MenuCategory;
  onClick?: () => void;
}

export const NavigationMenuCard: React.FC<NavigationMenuCardProps> = ({
  category,
  onClick,
}) => {
  const { language } = useI18n();

  // 라우트 경로에 따라 적절한 SVG 아이콘 컴포넌트 선택
  const getIconComponent = (categoryId: string) => {
    // 라우트 경로를 아이콘 키로 매핑
    const pathToIconKey: Record<string, MenuIconKey> = {
      '/program': 'PROGRAM',
      '/course': 'COURSE', 
      '/location': 'LOCATION',
      '/schedule': 'SCHEDULE',
    };
    
    const iconKey = pathToIconKey[categoryId];
    if (iconKey && MenuIcons[iconKey]) {
      const IconComponent = MenuIcons[iconKey];
      return <IconComponent size={32} className="text-primary-600 group-hover:text-secondary-600 transition-colors duration-300" />;
    }
    
    // 폴백: 기본 이모지 아이콘
    return <span className="text-3xl flex-shrink-0">{category.icon}</span>;
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
            <div className="flex-shrink-0" role="img" aria-label={category.title[language]}>
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