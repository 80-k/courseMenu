import { useNavigate } from 'react-router-dom';
import { NavigationMenuCard } from '../components/NavigationMenuCard';
import { useI18n } from '../i18n';
import { getMenuItemsWithTranslations } from '../data/dynamic-menu-config';
import { LEGACY_ROUTE_MAPPING } from '../config/application-routes';
import { FeatureGate } from '../components/common/FeatureGates';
import { ASSETS } from '../constants/assets';
import type { MenuCategory } from '../types';
import '../styles/global.css';

export const MainMenu: React.FC = () => {
  const { language, translate } = useI18n();
  const navigate = useNavigate();

  // 현재 설정에 따라 표시할 메뉴 항목들 가져오기
  const availableMenuItems = getMenuItemsWithTranslations(language);

  const navigateToMenuPage = (menuItemId: string, targetUrl?: string) => {
    if (targetUrl) {
      navigate(targetUrl);
    } else {
      // 레거시 라우트 처리
      const legacyRoute = LEGACY_ROUTE_MAPPING[`/${menuItemId}` as keyof typeof LEGACY_ROUTE_MAPPING];
      if (legacyRoute) {
        navigate(legacyRoute);
      } else {
        navigate(`/${menuItemId}`);
      }
    }
  };

  return (
    <div className="container">
        <div className="logo-section">
          <img 
            src={ASSETS.LOGO} 
            alt="Restaurant Logo" 
            className="logo-image"
          />
        </div>
        
        <main>
          <div className="menu-grid">
            {availableMenuItems.map(menuItem => (
              <NavigationMenuCard
                key={menuItem.id}
                category={menuItem as unknown as MenuCategory}
                onClick={() => navigateToMenuPage(menuItem.id, menuItem.href)}
              />
            ))}
          </div>
        </main>

        <FeatureGate feature="showSchedule">
          <footer>
            <div className="restaurant-info">
              <p>{translate('menu.restaurantInfo.businessHours')}</p>
              <p>{translate('menu.restaurantInfo.regularHoliday')}</p>
              <p>{translate('menu.restaurantInfo.reservation')}</p>
            </div>
          </footer>
        </FeatureGate>
    </div>
  );
};