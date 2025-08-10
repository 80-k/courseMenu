import React, { useState } from "react";
import { useI18n } from "../i18n";
import { translateToString } from "../i18n/translation-string-helpers";
import { ASSETS } from "../constants/assets";
import "../styles/global.css";

interface ProgramStepProps {
  stepId: string;
  isActive: boolean;
  text: string;
  onClick: (stepId: string) => void;
}

const ProgramStep: React.FC<ProgramStepProps> = ({ stepId, isActive, text, onClick }) => (
  <div 
    className={`group p-4 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary-300 ${isActive ? 'ring-2 ring-primary-500 bg-gradient-to-r from-primary-100 to-secondary-100' : ''}`}
    onClick={() => onClick(stepId)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(stepId);
      }
    }}
  >
    <div className="flex items-center">
      <span className="font-medium text-primary-800 group-hover:text-primary-900">
        {text}
      </span>
    </div>
  </div>
);

export const EventProgramPage: React.FC = () => {
  const { translate } = useI18n();
  
  // 현재 진행 중인 항목을 추적하는 상태
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  
  // 항목 클릭 핸들러
  const handleStepClick = (stepId: string) => {
    // 현재 진행 중인 항목과 같으면 선택 해제, 다르면 해당 항목으로 설정
    setCurrentStep(prev => prev === stepId ? null : stepId);
  };

  // 프로그램 스텝 목록
  const programSteps = [
    { id: 'opening', key: 'program.opening' },
    { id: 'familyGreeting', key: 'program.familyGreeting' },
    { id: 'photoSession', key: 'program.photoSession' },
    { id: 'toast', key: 'program.toast' },
    { id: 'dining', key: 'program.dining' },
    { id: 'quiz', key: 'program.quiz' },
    { id: 'closing', key: 'program.closing' },
    { id: 'gardenPhoto', key: 'program.gardenPhoto' },
  ];

  return (
    <div className="main-container">
      <div className="logo-section">
        <img src={ASSETS.LOGO} alt="Restaurant Logo" className="logo-image" />
      </div>

      <div className="page-layout">
        <div className="program-section">
          <h2 className="page-title">
            {translate('program.title')}
          </h2>
          <p className="text-base text-gray-600 mb-6 italic font-serif md:text-lg md:mb-8">
            {translate('program.subtitle')}
          </p>
          
          <div className="space-y-3">
            {programSteps.map((step) => (
              <ProgramStep
                key={step.id}
                stepId={step.id}
                isActive={currentStep === step.id}
                text={translateToString(translate(step.key))}
                onClick={handleStepClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
