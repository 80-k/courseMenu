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
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl overflow-hidden transition-all duration-400 ease-cubic-bezier shadow-md hover:-translate-y-1 hover:shadow-xl hover:border-gray-300 relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-primary-600 before:via-secondary-600 before:to-blue-500 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100">
      <div 
        className="flex justify-between items-center p-5 cursor-pointer transition-colors duration-300 bg-gradient-to-br from-white/80 to-gray-50/80 hover:from-primary-600/3 hover:to-secondary-600/3 md:p-7"
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
        <h2 className="text-gray-800 text-xl font-semibold m-0 -tracking-wide leading-tight font-serif md:text-2xl">{item.title[language]}</h2>
        <span className={`text-primary-600 text-lg font-bold transition-all duration-300 ease-cubic-bezier bg-gradient-to-br from-primary-600 to-secondary-600 bg-clip-text text-transparent ${
          !isExpanded ? '-rotate-90' : ''
        }`} aria-hidden="true">▼</span>
      </div>
      <div 
        id={`course-content-${item.id}`}
        className="overflow-hidden transition-all duration-400 ease-cubic-bezier bg-gradient-to-br from-white/60 to-gray-50/60"
        style={{
          height: isExpanded ? `${contentHeight}px` : '0px',
          paddingTop: isExpanded ? '0px' : '0px',
          paddingBottom: isExpanded ? '0px' : '0px',
          opacity: isExpanded ? 1 : 0,
        }}
        aria-hidden={!isExpanded}
      >
        <div ref={contentRef} className={`${isExpanded ? 'p-5 md:p-7' : 'p-0'} transition-all duration-400`}>
          {item.description && (
            <p className="italic text-gray-600 mb-5 text-sm leading-relaxed font-serif md:text-base md:mb-6">{item.description[language]}</p>
          )}
          <ul className="list-none p-0 m-0">
            {item.items.map((menuItem: LocalizedText, index: number) => (
              <li key={`${item.id}-${index}`} className="py-2 px-0 pl-6 relative text-gray-700 leading-7 text-sm font-normal border-l-2 border-transparent transition-all duration-200 hover:bg-primary-600/2 hover:border-primary-600/20 hover:translate-x-0.5 font-serif md:text-base md:py-3 md:pl-7 before:content-['●'] before:bg-gradient-to-br before:from-primary-600 before:to-secondary-600 before:bg-clip-text before:text-transparent before:font-bold before:absolute before:left-2 before:text-xs before:top-3 md:before:top-4">
                <span>{menuItem[language]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};