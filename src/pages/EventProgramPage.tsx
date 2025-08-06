import React, { useState } from "react";
import { useI18n } from "../i18n";
import { ASSETS } from "../constants/assets";
import "../styles/global.css";

export const EventProgramPage: React.FC = () => {
  const { t } = useI18n();
  
  // 현재 진행 중인 항목을 추적하는 상태
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  
  // 항목 클릭 핸들러
  const handleStepClick = (stepId: string) => {
    // 현재 진행 중인 항목과 같으면 선택 해제, 다르면 해당 항목으로 설정
    setCurrentStep(prev => prev === stepId ? null : stepId);
  };

  return (
    <div className='container'>
      <div className='page-content'>
        <div className='logo-section'>
          <img src={ASSETS.LOGO} alt='Restaurant Logo' className='logo-image' />
        </div>

        <div className='page-layout'>
          <div className='program-section'>
            <h2 className='section-title'>
              {t('rightPage.program.title')}
            </h2>
            <p className='section-subtitle'>
              {t('rightPage.program.subtitle')}
            </p>

            <div className='program-list'>
              <div 
                className={`step ${currentStep === 'opening' ? 'current' : ''}`}
                onClick={() => handleStepClick('opening')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStepClick('opening');
                  }
                }}
              >
                <span className="step-text">{t('rightPage.program.steps.opening')}</span>
              </div>
              <div 
                className={`step ${currentStep === 'familyGreeting' ? 'current' : ''}`}
                onClick={() => handleStepClick('familyGreeting')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStepClick('familyGreeting');
                  }
                }}
              >
                <span className="step-text">{t('rightPage.program.steps.familyGreeting')}</span>
              </div>
              <div 
                className={`step ${currentStep === 'photoSession' ? 'current' : ''}`}
                onClick={() => handleStepClick('photoSession')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStepClick('photoSession');
                  }
                }}
              >
                <span className="step-text">{t('rightPage.program.steps.photoSession')}</span>
              </div>
              <div 
                className={`step ${currentStep === 'toast' ? 'current' : ''}`}
                onClick={() => handleStepClick('toast')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStepClick('toast');
                  }
                }}
              >
                <span className="step-text">{t('rightPage.program.steps.toast')}</span>
              </div>
              <div 
                className={`step ${currentStep === 'dining' ? 'current' : ''}`}
                onClick={() => handleStepClick('dining')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStepClick('dining');
                  }
                }}
              >
                <span className="step-text">{t('rightPage.program.steps.dining')}</span>
              </div>
              <div 
                className={`step ${currentStep === 'quiz' ? 'current' : ''}`}
                onClick={() => handleStepClick('quiz')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStepClick('quiz');
                  }
                }}
              >
                <span className="step-text">{t('rightPage.program.steps.quiz')}</span>
              </div>
              <div 
                className={`step ${currentStep === 'closing' ? 'current' : ''}`}
                onClick={() => handleStepClick('closing')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStepClick('closing');
                  }
                }}
              >
                <span className="step-text">{t('rightPage.program.steps.closing')}</span>
              </div>
              <div 
                className={`step ${currentStep === 'gardenPhoto' ? 'current' : ''}`}
                onClick={() => handleStepClick('gardenPhoto')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStepClick('gardenPhoto');
                  }
                }}
              >
                <span className="step-text">{t('rightPage.program.steps.gardenPhoto')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
