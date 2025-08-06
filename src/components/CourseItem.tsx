import { useState, useRef, useEffect } from 'react';
import type { MenuItem } from '../types';
import { useI18n } from '../i18n';

interface CourseItemProps {
  item: MenuItem;
  isExpanded: boolean;
  onToggle: () => void;
}

export const CourseItem: React.FC<CourseItemProps> = ({
  item,
  isExpanded,
  onToggle,
}) => {
  const { language } = useI18n();
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [item, language, isExpanded]);

  return (
    <div className={`course-item ${!isExpanded ? 'collapsed' : ''}`}>
      <div 
        className="course-header" 
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
        <h2>{item.title[language]}</h2>
        <span className="toggle-icon" aria-hidden="true">▼</span>
      </div>
      <div 
        id={`course-content-${item.id}`}
        className="course-content"
        style={{
          height: isExpanded ? `${contentHeight}px` : '0px',
        }}
        aria-hidden={!isExpanded}
      >
        <div ref={contentRef}>
          {item.description && (
            <p className="description">{item.description[language]}</p>
          )}
          <ul>
            {item.items.map((menuItem, index) => (
              <li key={`${item.id}-${index}`}>
                <span>{menuItem[language]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};