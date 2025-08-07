import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n';
import { ASSETS } from '../constants/assets';
import '../styles/global.css';

export const WeddingInfoPage: React.FC = () => {
  const { translate } = useI18n();
  const navigate = useNavigate();

  // 3초 후 메인 페이지로 리다이렉트
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

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
          
          <div className="about-wedding-section">
            <h2 className="section-title">
              {translate('leftPage.aboutWedding.title')}
            </h2>
            
            <div className="wedding-info">
              <p>{translate('leftPage.aboutWedding.locationInfo.dateTime')}</p>
              <p>{translate('leftPage.aboutWedding.locationInfo.venueNameJp')}</p>
              <p>{translate('leftPage.aboutWedding.locationInfo.venueNameEn')}</p>
              <p>{translate('leftPage.aboutWedding.locationInfo.address')}</p>
              <p>{translate('leftPage.aboutWedding.locationInfo.phone')}</p>
            </div>
            
            <div className="wedding-images">
              <img src={ASSETS.WEDDING.IMAGE_1} alt={translate('common.weddingLocationAlt')} className="wedding-image" />
              <img src={ASSETS.WEDDING.IMAGE_2} alt={translate('common.weddingLocationAlt')} className="wedding-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};