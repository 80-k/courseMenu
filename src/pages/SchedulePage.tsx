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
          <div className="schedule-section">
            <h2 className="page-title">
              {translate('leftPage.schedule.title')}
            </h2>
            <p className="text-base text-gray-600 mb-6 italic font-serif md:text-lg md:mb-8">
              {translate('leftPage.schedule.subtitle')}
            </p>
            
            <div className="schedule-list">
              <div className="schedule-item">
                <span className="schedule-date">{translate('leftPage.schedule.items.marriageRegistration.date')}</span>
                <span className="schedule-event">{translate('leftPage.schedule.items.marriageRegistration.event')}</span>
              </div>
              <div className="schedule-item">
                <span className="schedule-date">{translate('leftPage.schedule.items.sanggyeonrye.date')}</span>
                <span className="schedule-event">{translate('leftPage.schedule.items.sanggyeonrye.event')}</span>
              </div>
              <div className="schedule-item">
                <span className="schedule-date">{translate('leftPage.schedule.items.preWedding.date')}</span>
                <span className="schedule-event">{translate('leftPage.schedule.items.preWedding.event')}</span>
              </div>
              <div className="schedule-item">
                <span className="schedule-date">{translate('leftPage.schedule.items.wedding.date')}</span>
                <span className="schedule-event">{translate('leftPage.schedule.items.wedding.event')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};