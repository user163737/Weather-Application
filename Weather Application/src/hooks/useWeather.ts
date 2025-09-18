import { useState, useEffect } from 'react';
import { WeatherResponse, getWeatherByLocation } from '../services/weatherApi';

export const useWeather = () => {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await getWeatherByLocation(location);
      setData(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const retry = () => {
    if (data?.location) {
      fetchWeather(data.location);
    }
  };

  // Load default location on mount
  useEffect(() => {
    fetchWeather('Chittoor');
  }, []);

  return {
    data,
    loading,
    error,
    fetchWeather,
    retry,
  };
};