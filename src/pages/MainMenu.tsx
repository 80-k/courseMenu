import { useNavigate } from 'react-router-dom';
import { NavigationMenuCard } from '../components/NavigationMenuCard';
import { useI18n } from '../i18n';
import { getNavigationRoutes } from '../config/routes';
import { FeatureGate } from '../components/common/FeatureGates';
import { ASSETS } from '../constants/assets';
import type { MenuCategory } from '../types';
import { COMPONENT_STYLES } from '../utils/simple-styles';
import '../styles/global.css';

export const MainMenu: React.FC = () => {
  const { translate } = useI18n();
  const navigate = useNavigate();

  // 간단한 라우트 정보 가져오기
  const navigationRoutes = getNavigationRoutes();

  const navigateToMenuPage = (path: string) => {
    navigate(path);
  };

  // 타입 안전성 개선: RouteConfig를 MenuCategory로 안전하게 변환
  const createMenuCategory = (route: typeof navigationRoutes[0]): MenuCategory => ({
    id: route.path,
    icon: route.icon,
    title: route.title,
    description: route.description,
    items: route.items
  });

  return (
    <div className={COMPONENT_STYLES.container.main}>
        <div className={COMPONENT_STYLES.container.logoSection}>
          <img 
            src={ASSETS.LOGO} 
            alt="Restaurant Logo" 
            className={COMPONENT_STYLES.image.logo}
          />
        </div>
        
        <main>
          <div className={COMPONENT_STYLES.layout.menuGrid}>
            {navigationRoutes.map(route => (
              <NavigationMenuCard
                key={route.path}
                category={createMenuCategory(route)}
                onClick={() => navigateToMenuPage(route.path)}
              />
            ))}
          </div>
        </main>

        <FeatureGate feature="showSchedule">
          <footer className="border-t-2 border-gray-200 pt-6 mt-6 md:pt-10 md:mt-10">
            <div className="text-center text-gray-600 text-sm leading-8 bg-gradient-to-br from-primary-50/30 to-secondary-50/30 p-5 rounded-xl border border-gray-200/60 md:p-8 md:text-base">
              <p className="mb-2 font-serif">{translate('menu.restaurantInfo.businessHours')}</p>
              <p className="mb-2 font-serif">{translate('menu.restaurantInfo.regularHoliday')}</p>
              <p className="font-serif">{translate('menu.restaurantInfo.reservation')}</p>
            </div>
          </footer>
        </FeatureGate>
    </div>
  );
};