import { useI18n } from "../i18n";
import { ASSETS } from "../constants/assets";
import "../styles/global.css";

export const LocationPage: React.FC = () => {
  const { translate } = useI18n();

  return (
    <div className="main-container">
      <div className="logo-section">
        <img src={ASSETS.LOGO} alt="Restaurant Logo" className="logo-image" />
      </div>

      <div className="page-layout">
        {/* 페이지 제목 */}
        <div className="text-center mb-8">
          <h1 className="page-title">
            {translate('location.title')}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:gap-10">
          {/* 예식장 정보 카드 */}
          <div className="card-base card-with-gradient-bar">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🏛️</span>
                <h2 className="section-title">
                  {translate('location.facility.title')}
                </h2>
              </div>

              <div className="space-y-6">
                {/* 주요 정보 */}
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-5 border border-primary-100">
                  <div className="text-center space-y-3">
                    <p className="text-lg font-semibold text-primary-700 font-serif">
                      {translate('location.facility.dateTime')}
                    </p>
                    <div className="space-y-2">
                      <p className="text-xl font-bold text-gray-800 font-serif">
                        {translate('location.facility.locationNameJp')}
                      </p>
                      <p className="text-base text-gray-600 italic">
                        {translate('location.facility.locationNameEn')}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed font-serif">
                      {translate('location.facility.description')}
                    </p>
                  </div>
                </div>

                {/* 연락처 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-white/60 rounded-lg border border-gray-200">
                    <span className="text-xl flex-shrink-0 mt-1">📍</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-700 mb-1">주소</p>
                      <p className="text-sm text-gray-600 font-serif leading-relaxed break-words mb-2">
                        {translate('location.facility.address')}
                      </p>
                      <a 
                        href={translate('location.facility.googleMapsUrl')}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <span>🗺️</span>
                        구글맵에서 보기
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-white/60 rounded-lg border border-gray-200">
                    <span className="text-xl flex-shrink-0 mt-1">📞</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-700 mb-1">전화번호</p>
                      <p className="text-sm text-gray-600 font-serif break-all">
                        {translate('location.facility.phone')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-white/60 rounded-lg border border-gray-200">
                    <span className="text-xl flex-shrink-0 mt-1">🌐</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-700 mb-1">웹사이트</p>
                      <p className="text-sm text-gray-600 font-serif break-all">
                        {translate('location.facility.website')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 교통 정보 카드 */}
          <div className="card-base card-with-gradient-bar">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🚇</span>
                <h2 className="section-title">
                  {translate('location.transportation.title')}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 자동차 */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">🚗</span>
                    <h3 className="text-lg font-semibold text-blue-800 font-serif">
                      {translate('location.transportation.byCar.title')}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {translate('location.transportation.byCar.details')
                      .split("\n")
                      .map((line, index) => (
                        <p key={index} className="text-sm text-blue-700 font-serif leading-relaxed">
                          {line}
                        </p>
                      ))}
                  </div>
                </div>

                {/* 기차 */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">🚆</span>
                    <h3 className="text-lg font-semibold text-green-800 font-serif">
                      {translate('location.transportation.byTrain.title')}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {translate('location.transportation.byTrain.details')
                      .split("\n")
                      .map((line, index) => (
                        <p key={index} className="text-sm text-green-700 font-serif leading-relaxed">
                          {line}
                        </p>
                      ))}
                  </div>
                </div>

                {/* 비행기 */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">✈️</span>
                    <h3 className="text-lg font-semibold text-purple-800 font-serif">
                      {translate('location.transportation.byPlane.title')}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {translate('location.transportation.byPlane.details')
                      .split("\n")
                      .map((line, index) => (
                        <p key={index} className="text-sm text-purple-700 font-serif leading-relaxed">
                          {line}
                        </p>
                      ))}
                  </div>
                </div>

                {/* 셔틀버스 */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">🚌</span>
                    <h3 className="text-lg font-semibold text-orange-800 font-serif">
                      {translate('location.transportation.shuttle.title')}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {translate('location.transportation.shuttle.details')
                      .split("\n")
                      .map((line, index) => (
                        <p key={index} className="text-sm text-orange-700 font-serif leading-relaxed">
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
  );
};
