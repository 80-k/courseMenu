import React from "react";
import { useI18n } from "../i18n";
import { ASSETS } from "../constants/assets";
import "../styles/global.css";

export const LocationPage: React.FC = () => {
  const { translate } = useI18n();

  return (
    <div className='container'>
      <div className='page-content'>
        <div className='logo-section'>
          <img src={ASSETS.LOGO} alt='Restaurant Logo' className='logo-image' />
        </div>

        <div className='page-layout'>
          <div className="location-section">
            <h2 className="section-title">
              {translate('location.title')}
            </h2>
            
            <div className='location-cards-container'>
            {/* 예식장 정보 카드 */}
            <div className='location-card location-info-card'>
              <div className='card-header'>
                <h3 className='card-title'>
                  <span className='card-icon'>🏛️</span>
                  {translate('leftPage.aboutWedding.locationInfo.title')}
                </h3>
              </div>

              <div className='card-content'>
                <div className='location-main-info'>
                  <p className='date-time'>
                    {translate('leftPage.aboutWedding.locationInfo.dateTime')}
                  </p>
                  <p className='location-name-jp'>
                    {translate('leftPage.aboutWedding.locationInfo.locationNameJp')}
                  </p>
                  <p className='location-name-en'>
                    {translate('leftPage.aboutWedding.locationInfo.locationNameEn')}
                  </p>
                  <p className='location-description'>
                    {translate('leftPage.aboutWedding.locationInfo.description')}
                  </p>
                </div>

                <div className='location-contact-details'>
                  <div className='contact-item'>
                    <span className='contact-icon'>📍</span>
                    <span className='contact-text'>
                      {translate('leftPage.aboutWedding.locationInfo.address')}
                    </span>
                  </div>
                  <div className='contact-item'>
                    <span className='contact-icon'>📞</span>
                    <span className='contact-text'>
                      {translate('leftPage.aboutWedding.locationInfo.phone')}
                    </span>
                  </div>
                  <div className='contact-item'>
                    <span className='contact-icon'>🌐</span>
                    <span className='contact-text'>
                      {translate('leftPage.aboutWedding.locationInfo.website')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 교통 정보 카드 */}
            <div className='location-card transportation-card'>
              <div className='card-header'>
                <h3 className='card-title'>
                  <span className='card-icon'>🚇</span>
                  {translate('leftPage.aboutWedding.transportation.title')}
                </h3>
              </div>

              <div className='card-content'>
                <div className='transportation-grid'>
                  <div className='transport-method'>
                    <div className='transport-header'>
                      <span className='transport-icon'>🚗</span>
                      <h4 className='transport-title'>
                        {translate('leftPage.aboutWedding.transportation.byCar.title')}
                      </h4>
                    </div>
                    <div className='transport-details'>
                      {translate('leftPage.aboutWedding.transportation.byCar.details')
                        .split("\n")
                        .map((line, index) => (
                          <p key={index} className='transport-detail-line'>
                            {line}
                          </p>
                        ))}
                    </div>
                  </div>

                  <div className='transport-method'>
                    <div className='transport-header'>
                      <span className='transport-icon'>🚆</span>
                      <h4 className='transport-title'>
                        {translate('leftPage.aboutWedding.transportation.byTrain.title')}
                      </h4>
                    </div>
                    <div className='transport-details'>
                      {translate('leftPage.aboutWedding.transportation.byTrain.details')
                        .split("\n")
                        .map((line, index) => (
                          <p key={index} className='transport-detail-line'>
                            {line}
                          </p>
                        ))}
                    </div>
                  </div>

                  <div className='transport-method'>
                    <div className='transport-header'>
                      <span className='transport-icon'>✈️</span>
                      <h4 className='transport-title'>
                        {translate('leftPage.aboutWedding.transportation.byPlane.title')}
                      </h4>
                    </div>
                    <div className='transport-details'>
                      {translate('leftPage.aboutWedding.transportation.byPlane.details')
                        .split("\n")
                        .map((line, index) => (
                          <p key={index} className='transport-detail-line'>
                            {line}
                          </p>
                        ))}
                    </div>
                  </div>

                  <div className='transport-method'>
                    <div className='transport-header'>
                      <span className='transport-icon'>🚌</span>
                      <h4 className='transport-title'>
                        {translate('leftPage.aboutWedding.transportation.shuttle.title')}
                      </h4>
                    </div>
                    <div className='transport-details'>
                      {translate('leftPage.aboutWedding.transportation.shuttle.details')
                        .split("\n")
                        .map((line, index) => (
                          <p key={index} className='transport-detail-line'>
                            {line}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
