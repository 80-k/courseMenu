import React from 'react';
import { useI18n } from '../i18n';
import { ASSETS } from '../constants/assets';
import '../styles/global.css';

export const SchedulePage: React.FC = () => {
  const { translate } = useI18n();

  return (
    <div className="main-container">
      <div className="min-h-[calc(100vh-80px)]">
        <div className="logo-section">
          <img 
            src={ASSETS.LOGO} 
            alt="Restaurant Logo" 
            className="logo-image"
          />
        </div>
        
        <div className="page-layout">
          <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-md md:p-8">
            <h2 className="page-title">
              {translate('leftPage.schedule.title')}
            </h2>
            <p className="text-base text-gray-600 mb-6 italic font-serif md:text-lg md:mb-8">
              {translate('leftPage.schedule.subtitle')}
            </p>
            
            <div className="flex flex-col gap-5">
              <div className="space-between schedule-item">
                <span className="schedule-date">{translate('leftPage.schedule.items.marriageRegistration.date')}</span>
                <span className="text-base text-gray-700 font-serif md:text-lg">{translate('leftPage.schedule.items.marriageRegistration.event')}</span>
              </div>
              <div className="space-between schedule-item">
                <span className="schedule-date">{translate('leftPage.schedule.items.sanggyeonrye.date')}</span>
                <span className="text-base text-gray-700 font-serif md:text-lg">{translate('leftPage.schedule.items.sanggyeonrye.event')}</span>
              </div>
              <div className="space-between schedule-item">
                <span className="schedule-date">{translate('leftPage.schedule.items.preWedding.date')}</span>
                <span className="text-base text-gray-700 font-serif md:text-lg">{translate('leftPage.schedule.items.preWedding.event')}</span>
              </div>
              <div className="space-between schedule-item">
                <span className="schedule-date">{translate('leftPage.schedule.items.wedding.date')}</span>
                <span className="text-base text-gray-700 font-serif md:text-lg">{translate('leftPage.schedule.items.wedding.event')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};