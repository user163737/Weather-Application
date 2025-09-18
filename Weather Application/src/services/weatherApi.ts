export interface WeatherResponse {
  location: string;
  country: string;
  temperature: number;
  condition: string;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  visibility: number;
  uv_index: number;
}

export interface GeocodingResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export const geocodeLocation = async (location: string): Promise<GeocodingResult> => {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`
  );
  
  if (!response.ok) {
    throw new Error('Failed to find location');
  }
  
  const data = await response.json();
  
  if (!data.results || data.results.length === 0) {
    throw new Error('Location not found');
  }
  
  const result = data.results[0];
  return {
    name: result.name,
    country: result.country,
    latitude: result.latitude,
    longitude: result.longitude,
  };
};

export const fetchWeatherData = async (latitude: number, longitude: number): Promise<WeatherResponse> => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,uv_index&daily=weather_code&timezone=auto`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  const data = await response.json();
  const current = data.current;
  
  // Weather code mapping (simplified)
  const getConditionFromCode = (code: number): string => {
    if (code === 0) return 'clear sky';
    if (code <= 3) return 'partly cloudy';
    if (code <= 48) return 'foggy';
    if (code <= 67) return 'rainy';
    if (code <= 77) return 'snowy';
    if (code <= 82) return 'rainy';
    if (code <= 86) return 'snowy';
    if (code <= 99) return 'thunderstorm';
    return 'unknown';
  };

  return {
    location: '',
    country: '',
    temperature: current.temperature_2m,
    condition: getConditionFromCode(current.weather_code),
    feels_like: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    wind_speed: Math.round(current.wind_speed_10m * 3.6), // Convert m/s to km/h
    visibility: 10, // Open-Meteo doesn't provide visibility, using default
    uv_index: current.uv_index || 0,
  };
};

export const getWeatherByLocation = async (location: string): Promise<WeatherResponse> => {
  const geoData = await geocodeLocation(location);
  const weatherData = await fetchWeatherData(geoData.latitude, geoData.longitude);
  
  return {
    ...weatherData,
    location: geoData.name,
    country: geoData.country,
  };
};
export const searchCities = async (query: string): Promise<GeocodingResult[]> => {
  if (query.length < 2) return [];
  
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
  );
  
  if (!response.ok) {
    return [];
  }
  
  const data = await response.json();
  
  if (!data.results) {
    return [];
  }
  
  return data.results.map((result: any) => ({
    name: result.name,
    country: result.country,
    latitude: result.latitude,
    longitude: result.longitude,
  }));
};