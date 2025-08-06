import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n';
import { ASSETS } from '../constants/assets';
import '../styles/global.css';

export const WeddingInfoPage: React.FC = () => {
  const { t } = useI18n();
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
              {t('leftPage.schedule.title')}
            </h2>
            <p className="section-subtitle">
              {t('leftPage.schedule.subtitle')}
            </p>
            
            <div className="schedule-list">
              <div className="schedule-item">
                <span className="date">{t('leftPage.schedule.items.marriageRegistration.date')}</span>
                <span className="event">{t('leftPage.schedule.items.marriageRegistration.event')}</span>
              </div>
              <div className="schedule-item">
                <span className="date">{t('leftPage.schedule.items.meeting.date')}</span>
                <span className="event">{t('leftPage.schedule.items.meeting.event')}</span>
              </div>
              <div className="schedule-item">
                <span className="date">{t('leftPage.schedule.items.preWedding.date')}</span>
                <span className="event">{t('leftPage.schedule.items.preWedding.event')}</span>
              </div>
              <div className="schedule-item">
                <span className="date">{t('leftPage.schedule.items.wedding.date')}</span>
                <span className="event">{t('leftPage.schedule.items.wedding.event')}</span>
              </div>
            </div>
          </div>
          
          <div className="about-wedding-section">
            <h2 className="section-title">
              {t('leftPage.aboutWedding.title')}
            </h2>
            
            <div className="wedding-info">
              <p>{t('leftPage.aboutWedding.venueInfo.dateTime')}</p>
              <p>{t('leftPage.aboutWedding.venueInfo.venueNameJp')}</p>
              <p>{t('leftPage.aboutWedding.venueInfo.venueNameEn')}</p>
              <p>{t('leftPage.aboutWedding.venueInfo.address')}</p>
              <p>{t('leftPage.aboutWedding.venueInfo.phone')}</p>
            </div>
            
            <div className="wedding-images">
              <img src={ASSETS.WEDDING.IMAGE_1} alt={t('common.weddingVenueAlt')} className="wedding-image" />
              <img src={ASSETS.WEDDING.IMAGE_2} alt={t('common.weddingVenueAlt')} className="wedding-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};