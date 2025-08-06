import React from "react";
import { CourseItem } from "../components/CourseItem";
import { courseMenuData } from "../data/menuData";
import { ASSETS } from "../constants/assets";
import "../styles/global.css";

interface CourseMenuProps {
  isExpanded: (id: string) => boolean;
  toggle: (id: string) => void;
}

export const CourseMenu: React.FC<CourseMenuProps> = ({
  isExpanded,
  toggle,
}) => {
  return (
    <div className='container'>
      <div className='logo-section'>
        <img src={ASSETS.LOGO} alt='Restaurant Logo' className='logo-image' />
      </div>

      <main>
        <div className='course-menu'>
          {courseMenuData.map((item) => (
            <CourseItem
              key={item.id}
              item={item}
              isExpanded={isExpanded(item.id)}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>
      </main>

      <div className='gallery-section'>
        <div className='gallery-container'>
          <img
            src={ASSETS.GALLERY.MAIN_IMAGE}
            alt='Photo Gallery'
            className='gallery-image'
          />
        </div>
      </div>
    </div>
  );
};
