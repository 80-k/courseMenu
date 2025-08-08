import { useState, useRef, useEffect } from 'react';
import type { CourseMenuItem, LocalizedText } from '../types';
import { useI18n } from '../i18n';

interface CourseItemProps {
  item: CourseMenuItem;
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

  // const styles = useCourseItemStyles(isExpanded); // TODO: 나중에 적용

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
        className="course-item-content"
        style={{
          height: isExpanded ? `${contentHeight}px` : '0px',
          paddingTop: isExpanded ? '0px' : '0px',
          paddingBottom: isExpanded ? '0px' : '0px',
          opacity: isExpanded ? 1 : 0,
        }}
        aria-hidden={!isExpanded}
      >
        <div ref={contentRef} className={`course-item-content-inner ${isExpanded ? 'expanded' : 'collapsed'}`}>
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
};