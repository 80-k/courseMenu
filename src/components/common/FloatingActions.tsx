import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { ToggleAllIcon, ScrollIcon, HomeIcon } from '../icons';

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
  const { isAtBottom, scrollToTop, scrollToBottom } = useScrollPosition();

  const handleScrollClick = (e: React.MouseEvent) => {
    // 클릭 애니메이션 효과
    const button = e.currentTarget as HTMLButtonElement;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
    
    if (isAtBottom) {
      scrollToTop();
    } else {
      scrollToBottom();
    }
  };

  const handleHomeClick = () => {
    navigate(homeRoute);
  };

  // 스크롤 버튼 텍스트 결정
  const getScrollButtonText = () => {
    if (isAtBottom) {
      return translate('floating.scrollUp');
    }
    return translate('floating.scrollDown');
  };

  const getToggleAllText = () => {
    if (allExpanded) {
      return translate('floating.toggleAllClose');
    }
    return translate('floating.toggleAllOpen');
  };

  const renderActionButtons = () => {
    if (actionType === 'toggle') {
      return (
        <button 
          className={`toggle-all-btn ${!allExpanded ? 'all-collapsed' : ''}`}
          onClick={onToggleAll}
          aria-label={allExpanded ? translate('floating.toggleAllCloseAria') : translate('floating.toggleAllOpenAria')}
        >
          <span className="toggle-all-icon">
            <ToggleAllIcon isExpanded={allExpanded} />
          </span>
          <span className="toggle-all-text">
            {getToggleAllText()}
          </span>
        </button>
      );
    }

    if (actionType === 'home') {
      return (
        <button 
          className="home-btn"
          onClick={handleHomeClick}
          aria-label={translate('floating.homeAria')}
        >
          <span className="home-icon">
            <HomeIcon />
          </span>
          <span className="home-text">
            {translate('floating.home')}
          </span>
        </button>
      );
    }

    // actionType === 'home-and-toggle'
    return (
      <>
        <button 
          className="home-btn"
          onClick={handleHomeClick}
          aria-label={translate('floating.homeAria')}
        >
          <span className="home-icon">
            <HomeIcon />
          </span>
          <span className="home-text">
            {translate('floating.home')}
          </span>
        </button>
        <button 
          className={`toggle-all-btn ${!allExpanded ? 'all-collapsed' : ''}`}
          onClick={onToggleAll}
          aria-label={allExpanded ? translate('floating.toggleAllCloseAria') : translate('floating.toggleAllOpenAria')}
        >
          <span className="toggle-all-icon">
            <ToggleAllIcon isExpanded={allExpanded} />
          </span>
          <span className="toggle-all-text">
            {getToggleAllText()}
          </span>
        </button>
      </>
    );
  };

  return (
    <div className="floating-island">
      {renderActionButtons()}
      
      <button 
        className={`scroll-btn ${isAtBottom ? 'scroll-up' : ''}`}
        onClick={handleScrollClick}
        aria-label={isAtBottom ? translate('floating.scrollToTopAria') : translate('floating.scrollToBottomAria')}
      >
        <span className="scroll-btn-icon">
          <ScrollIcon direction={isAtBottom ? 'up' : 'down'} />
        </span>
        <span className="scroll-btn-text">{getScrollButtonText()}</span>
      </button>
    </div>
  );
};