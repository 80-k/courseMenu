import { useI18n } from '../i18n';
import { ToggleAllIcon } from './icons';

interface CourseMenuActionsProps {
  allExpanded: boolean;
  onToggleAll: () => void;
}

export const CourseMenuActions: React.FC<CourseMenuActionsProps> = ({
  allExpanded,
  onToggleAll,
}) => {
  const { translate } = useI18n();

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
    </div>
  );
};