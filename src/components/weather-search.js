import { useState } from 'react';

function WeatherSearch({
  onSearch,
  loading,
  error,
  onGetWeather,
  setLocationMode,
  locationMode,
}) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
  };

  const handleGetWeather = () => {
    setLocationMode(true); // 👈 hide search UI
    onGetWeather();
  };

  return (
    <div className="text-center">
      <form onSubmit={handleSubmit} className="mb-3">
        {/* 🔹 Hide these when locationMode is true */}
        {!locationMode && (
          <>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="ਸ਼ਹਿਰ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={loading}
            />

            <button
              type="submit"
              className="btn btn-primary w-100 fw-semibold"
              disabled={loading}
            >
              {loading ? 'ਖੋਜ جاري ਹੈ...' : 'ਮੌਸਮ ਖੋਜੋ'}
            </button>
          </>
        )}

        {/* 📍 Location button always visible */}
        <button
          type="button"
          className="btn btn-primary w-100 fw-semibold"
          style={{
            position: 'relative',
            marginTop: locationMode ? '0' : '10px',
          }}
          onClick={handleGetWeather}
          disabled={loading}
        >
          {loading ? 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...' : 'ਮੌਜੂਦਾ ਸਥਾਨ ਤੋਂ ਮੌਸਮ ਲਵੋ'}
        </button>
      </form>

      {error && <p className="text-danger fw-semibold">{error}</p>}
    </div>
  );
}

export default WeatherSearch;
