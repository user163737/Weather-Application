import React from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useWeather } from './hooks/useWeather';
import { getBackgroundClass } from './utils/backgroundUtils';

function App() {
  const { data, loading, error, fetchWeather, retry } = useWeather();

  const backgroundClass = data ? getBackgroundClass(data.condition) : 'bg-default';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-1000 ${backgroundClass}`}>
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl">
        <SearchBar onSearch={fetchWeather} loading={loading} />
        
        {loading && <LoadingSpinner />}
        
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={retry}
          />
        )}
        
        {data && !loading && !error && (
          <WeatherCard data={data} />
        )}
      </div>
      
      {/* Footer */}
      <div className="relative z-10 mt-8">
        <p className="text-white/50 text-sm text-center">
          Weather data provided by Open-Meteo
        </p>
      </div>
    </div>
  );
}

export default App;