import React from "react";
import { useI18n } from "../i18n";
import { ASSETS } from "../constants/assets";
import "../styles/global.css";

export const VenuePage: React.FC = () => {
  const { translate } = useI18n();

  return (
    <div className='container'>
      <div className='page-content'>
        <div className='logo-section'>
          <img src={ASSETS.LOGO} alt='Restaurant Logo' className='logo-image' />
        </div>

        <div className='page-layout'>
          <div className='venue-cards-container'>
            {/* 예식장 정보 카드 */}
            <div className='venue-card venue-info-card'>
              <div className='card-header'>
                <h3 className='card-title'>
                  <span className='card-icon'>🏛️</span>
                  {translate('leftPage.aboutWedding.venueInfo.title')}
                </h3>
              </div>

              <div className='card-content'>
                <div className='venue-main-info'>
                  <p className='date-time'>
                    {translate('leftPage.aboutWedding.venueInfo.dateTime')}
                  </p>
                  <p className='venue-name-jp'>
                    {translate('leftPage.aboutWedding.venueInfo.venueNameJp')}
                  </p>
                  <p className='venue-name-en'>
                    {translate('leftPage.aboutWedding.venueInfo.venueNameEn')}
                  </p>
                  <p className='venue-description'>
                    {translate('leftPage.aboutWedding.venueInfo.description')}
                  </p>
                </div>

                <div className='venue-contact-details'>
                  <div className='contact-item'>
                    <span className='contact-icon'>📍</span>
                    <span className='contact-text'>
                      {translate('leftPage.aboutWedding.venueInfo.address')}
                    </span>
                  </div>
                  <div className='contact-item'>
                    <span className='contact-icon'>📞</span>
                    <span className='contact-text'>
                      {translate('leftPage.aboutWedding.venueInfo.phone')}
                    </span>
                  </div>
                  <div className='contact-item'>
                    <span className='contact-icon'>🌐</span>
                    <span className='contact-text'>
                      {translate('leftPage.aboutWedding.venueInfo.website')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 교통 정보 카드 */}
            <div className='venue-card transportation-card'>
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
  );
};
