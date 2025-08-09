import { memo } from 'react';
import type { CourseMenuItem, LocalizedText } from '../types';
import { useI18n } from '../i18n';

interface CourseItemProps {
  item: CourseMenuItem;
  isExpanded: boolean;
  onToggle: () => void;
}

export const CourseItem: React.FC<CourseItemProps> = memo(({
  item,
  isExpanded,
  onToggle,
}) => {
  const { language } = useI18n();

  return (
    <div className="course-item-card">
      <div 
        className="course-item-header"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={`course-content-${item.id}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <h2 className="course-item-title">{item.title[language]}</h2>
        <span className={`course-item-arrow ${!isExpanded ? 'collapsed' : ''}`} aria-hidden="true">▼</span>
      </div>
      <div 
        id={`course-content-${item.id}`}
        className={`course-item-content ${isExpanded ? 'expanded' : 'collapsed'}`}
        aria-hidden={!isExpanded}
      >
        <div className={`course-item-content-inner ${isExpanded ? 'expanded' : 'collapsed'}`}>
          {item.description && (
            <p className="course-item-description">{item.description[language]}</p>
          )}
          <ul className="course-item-list">
            {item.items.map((menuItem: LocalizedText, index: number) => (
              <li key={`${item.id}-${index}`} className="course-item-list-item">
                <span>{menuItem[language]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});