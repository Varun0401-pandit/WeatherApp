'use client';
import { useEffect } from 'react';

function WeatherModal({ data, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!data || !data.main || !data.weather || data.weather.length === 0)
    return null;

  const getWeatherDescription = (id) => {
    if (id >= 200 && id < 300) return 'ਤੂਫ਼ਾਨ 🌩️';
    if (id >= 300 && id < 400) return 'ਹਲਕੀ ਵਰਖਾ 🌦️';
    if (id >= 500 && id < 600) return 'ਵਰਖਾ 🌧️';
    if (id >= 600 && id < 700) return 'ਬਰਫ਼ਬਾਰੀ ❄️';
    if (id >= 700 && id < 800) return 'ਧੁੰਦ 🌫️';
    if (id === 800) return 'ਸਾਫ਼ ਆਕਾਸ਼ ☀️';
    if (id > 800) return 'ਬਦਲੀ ☁️';
    return 'ਅਣਜਾਣ ਮੌਸਮ 🌤️';
  };

  const getWeatherIcon = (id) => {
    if (id >= 200 && id < 300) return '⛈️';
    if (id >= 300 && id < 400) return '🌦️';
    if (id >= 500 && id < 600) return '🌧️';
    if (id >= 600 && id < 700) return '❄️';
    if (id >= 700 && id < 800) return '🌫️';
    if (id === 800) return '☀️';
    if (id > 800) return '☁️';
    return '🌤️';
  };

  const city = data.name || 'Unknown';
  const country = data.sys?.country || '';
  const temperature = data.main?.temp?.toFixed(1) || 'N/A';
  const humidity = data.main?.humidity ?? 'N/A';
  const windSpeed = data.wind?.speed ?? 'N/A';
  const timezoneOffset = data.timezone ?? 0;
  const weatherId = data.weather?.[0]?.id ?? 0;
  const description = data.weather?.[0]?.description ?? 'N/A';

  const utcTime = new Date();
  const localTime = new Date(utcTime.getTime() + timezoneOffset * 1000);
  const formattedTime = localTime.toUTCString();

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title">
              {city}, {country}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body text-center py-4">
            <p className="text-muted mb-3">{formattedTime}</p>
            <div className="mb-4" style={{ fontSize: '80px' }}>
              {getWeatherIcon(weatherId)}
            </div>
            <h2 className="display-4 fw-bold text-primary mb-2">
              {temperature}°C
            </h2>
            <p className="fs-5 text-dark mb-1">
              {getWeatherDescription(weatherId)}
            </p>
            <p className="text-muted mb-4">({description})</p>

            <div className="row mb-4">
              <div className="col-6">
                <p className="text-muted mb-1">ਨਮੀ</p>
                <p className="fs-5 fw-semibold">{humidity}%</p>
              </div>
              <div className="col-6">
                <p className="text-muted mb-1">ਹਵਾ ਦੀ ਗਤੀ</p>
                <p className="fs-5 fw-semibold">{windSpeed} km/h</p>
              </div>
            </div>
          </div>

          <div className="modal-footer border-0">
            <button
              type="button"
              className="btn btn-primary btn-lg w-100 fw-semibold"
              onClick={onClose}
            >
              ਬੰਦ ਕਰੋ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherModal;
