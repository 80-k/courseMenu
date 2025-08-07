import React from 'react';
import { useI18n } from '../i18n';
import { ASSETS } from '../constants/assets';
import '../styles/global.css';

export const SchedulePage: React.FC = () => {
  const { translate } = useI18n();

  return (
    <div className="container">
      <div className="page-content">
        <div className="logo-section">
          <img 
            src={ASSETS.LOGO} 
            alt="Restaurant Logo" 
            className="logo-image"
          />
        </div>
        
        <div className="page-layout">
          <div className="schedule-section">
            <h2 className="section-title">
              {translate('leftPage.schedule.title')}
            </h2>
            <p className="section-subtitle">
              {translate('leftPage.schedule.subtitle')}
            </p>
            
            <div className="schedule-list">
              <div className="schedule-item">
                <span className="date">{translate('leftPage.schedule.items.marriageRegistration.date')}</span>
                <span className="event">{translate('leftPage.schedule.items.marriageRegistration.event')}</span>
              </div>
              <div className="schedule-item">
                <span className="date">{translate('leftPage.schedule.items.sanggyeonrye.date')}</span>
                <span className="event">{translate('leftPage.schedule.items.sanggyeonrye.event')}</span>
              </div>
              <div className="schedule-item">
                <span className="date">{translate('leftPage.schedule.items.preWedding.date')}</span>
                <span className="event">{translate('leftPage.schedule.items.preWedding.event')}</span>
              </div>
              <div className="schedule-item">
                <span className="date">{translate('leftPage.schedule.items.wedding.date')}</span>
                <span className="event">{translate('leftPage.schedule.items.wedding.event')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};