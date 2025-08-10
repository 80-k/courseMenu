import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { translateForAriaLabel } from '../../i18n/translation-string-helpers';
import { ToggleAllIcon, HomeIcon } from '../icons';
import { TAILWIND_Z_INDEX } from '../../constants/z-index';

type ActionType = 'toggle' | 'home' | 'home-and-toggle';

interface FloatingActionsProps {
  /** 액션 타입 - 'toggle'은 모두 열기/닫기, 'home'은 홈 버튼, 'home-and-toggle'은 둘 다 */
  actionType: ActionType;
  /** toggle 또는 home-and-toggle 타입일 때 사용 - 모든 항목이 열려있는지 여부 */
  allExpanded?: boolean;
  /** toggle 또는 home-and-toggle 타입일 때 사용 - 모두 열기/닫기 핸들러 */
  onToggleAll?: () => void;
  /** 홈 버튼의 대상 경로 (기본값: '/') */
  homeRoute?: string;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  actionType,
  allExpanded = false,
  onToggleAll,
  homeRoute = '/',
}) => {
  const { translate } = useI18n();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate(homeRoute);
  };

  const handleToggleAllClick = () => {
    if (onToggleAll) {
      onToggleAll();
    }
  };

  const getToggleAllText = () => {
    if (allExpanded) {
      return translate('floating.toggleAllClose');
    }
    return translate('floating.toggleAllOpen');
  };

  const renderActionButtons = () => {
    const baseButtonClass = `
      group flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl
      text-white font-medium shadow-lg backdrop-blur-sm
      border transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
      hover:scale-105 hover:-translate-y-0.5 hover:shadow-xl
      active:scale-95 active:duration-150
      touch-manipulation select-none
    `;

    if (actionType === 'toggle') {
      return (
        <button 
          className={`
            ${baseButtonClass}
            ${allExpanded 
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-500/30 hover:shadow-blue-500/30' 
              : 'bg-gradient-to-r from-indigo-600 to-indigo-700 border-indigo-500/30 hover:shadow-indigo-500/30'
            }
          `}
          onClick={handleToggleAllClick}
          aria-label={allExpanded ? translateForAriaLabel(translate('floating.toggleAllCloseAria')) : translateForAriaLabel(translate('floating.toggleAllOpenAria'))}
        >
          <span className={`flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${!allExpanded ? '-rotate-90' : ''}`}>
            <ToggleAllIcon isExpanded={allExpanded} />
          </span>
          <span className="text-xs md:text-sm font-medium whitespace-nowrap">
            {getToggleAllText()}
          </span>
        </button>
      );
    }

    const homeButton = (
      <button 
        className={`
          ${baseButtonClass}
          bg-gradient-to-r from-indigo-600 to-purple-600
          border-indigo-500/30 hover:shadow-indigo-500/30
        `}
        onClick={handleHomeClick}
        aria-label={translateForAriaLabel(translate('floating.homeAria'))}
      >
        <span className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
          <HomeIcon />
        </span>
        <span className="text-xs md:text-sm font-medium whitespace-nowrap">
          {translate('floating.home')}
        </span>
      </button>
    );

    if (actionType === 'home') {
      return homeButton;
    }

    // actionType === 'home-and-toggle'
    return (
      <>
        {homeButton}
        <button 
          className={`
            ${baseButtonClass}
            ${allExpanded 
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-500/30 hover:shadow-blue-500/30' 
              : 'bg-gradient-to-r from-indigo-600 to-indigo-700 border-indigo-500/30 hover:shadow-indigo-500/30'
            }
          `}
          onClick={handleToggleAllClick}
          aria-label={allExpanded ? translateForAriaLabel(translate('floating.toggleAllCloseAria')) : translateForAriaLabel(translate('floating.toggleAllOpenAria'))}
        >
          <span className={`flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${!allExpanded ? '-rotate-90' : ''}`}>
            <ToggleAllIcon isExpanded={allExpanded} />
          </span>
          <span className="text-xs md:text-sm font-medium whitespace-nowrap">
            {getToggleAllText()}
          </span>
        </button>
      </>
    );
  };

  return (
    <div 
      className={`fixed right-3 md:right-4 ${TAILWIND_Z_INDEX.FLOATING_ACTIONS} flex flex-col gap-2 md:gap-3 animate-fade-in`}
      style={{
        bottom: 'var(--header-height, 90px)',
        transform: 'translateY(50%)'
      }}
    >
      {renderActionButtons()}
    </div>
  );
};