'use client';

import { useState } from 'react';
import './App.css';
import WeatherModal from './components/weather-modal';
import WeatherSearch from './components/weather-search';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationMode, setLocationMode] = useState(false);

  const apiKey = '8c00c6bf7d7387d1e873d762f94bf70d'; // put your real key here

  const handleSearch = async (city) => {
    if (!city.trim()) {
      setError('⚠️ ਕਿਰਪਾ ਕਰਕੇ ਸ਼ਹਿਰ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ।');
      setWeatherData(null);
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      console.log('Varun ka data: ', data);

      if (response.ok) {
        setWeatherData(data); // ✅ Pass full API object
      } else {
        setError('❌ City not found.');
      }
    } catch (err) {
      setError('⚠️ Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Lat:', latitude, 'Lon:', longitude);

        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch weather data');
          }

          const data = await response.json();
          setWeatherData(data);
        } catch (err) {
          setError('⚠️ ਕਿਰਪਾ ਕਰਕੇ ਸ਼ਹਿਰ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ।: ' + err.message);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError('Unable to retrieve location: ' + err.message);
        setLoading(false);
      }
    );
  };

  const closeModel = () => {
    setLocationMode(false);
    setWeatherData(null);
  };

  return (
    <div className="app-container d-flex align-items-center justify-content-center min-vh-100">
      <div style={{ width: '100%', maxWidth: '500px', padding: '20px' }}>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary mb-2">ਮੌਸਮ</h1>
          <p className="text-muted fs-5">ਆਪਣੇ ਸਥਾਨ ਦਾ ਮੌਸਮ ਜਾਣੋ</p>
        </div>

        <WeatherSearch
          onSearch={handleSearch}
          onGetWeather={getWeatherByLocation}
          loading={loading}
          error={error}
          setLocationMode={setLocationMode}
          locationMode={locationMode}
        />

        {weatherData && (
          <WeatherModal data={weatherData} onClose={closeModel} />
        )}
      </div>
    </div>
  );
}

export default App;
