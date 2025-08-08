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
    <div className='max-w-6xl mx-auto bg-white/80 min-h-screen shadow-2xl px-4 py-6 pb-32 md:px-8 md:py-10 md:pb-40 backdrop-blur-sm'>
      <div className='flex justify-center items-center py-3 mb-3 border-b border-gray-200/30 md:py-5 md:mb-5'>
        <img src={ASSETS.LOGO} alt='Restaurant Logo' className='max-w-16 h-auto object-contain opacity-90 transition-all duration-300 filter drop-shadow-lg hover:opacity-100 hover:scale-105 md:max-w-24' />
      </div>

      <main>
        <div className='grid gap-5 pb-20 md:gap-6 md:pb-32'>
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

      <div className='bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-md md:p-8'>
        <div className='flex justify-center'>
          <img
            src={ASSETS.GALLERY.MAIN_IMAGE}
            alt='Photo Gallery'
            className='max-w-full h-auto rounded-xl shadow-lg'
          />
        </div>
      </div>
    </div>
  );
};
