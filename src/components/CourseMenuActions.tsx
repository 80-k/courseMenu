import { useI18n } from '../i18n';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { ToggleAllIcon, ScrollIcon } from './icons';

interface CourseMenuActionsProps {
  allExpanded: boolean;
  onToggleAll: () => void;
}

export const CourseMenuActions: React.FC<CourseMenuActionsProps> = ({
  allExpanded,
  onToggleAll,
}) => {
  const { translate } = useI18n();
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

  // 스크롤 버튼 텍스트 결정
  const getScrollButtonText = () => {
    if (isAtBottom) {
      // 맨 아래에 있으면 '맨 위로' 버튼 표시
      return translate('floating.scrollUp');
    }
    // 그 외에는 '맨 아래로' 버튼 표시
    return translate('floating.scrollDown');
  };

  const getToggleAllText = () => {
    if (allExpanded) {
      return translate('floating.toggleAllClose');
    }
    return translate('floating.toggleAllOpen');
  };

  return (
    <div className="floating-island">
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