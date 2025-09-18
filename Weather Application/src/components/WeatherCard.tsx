import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Eye, Thermometer } from 'lucide-react';

interface WeatherData {
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

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const getWeatherIcon = (condition: string) => {
    const iconClass = "w-16 h-16 text-white drop-shadow-lg";
    
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return <CloudRain className={iconClass} />;
    }
    if (condition.includes('snow')) {
      return <CloudSnow className={iconClass} />;
    }
    if (condition.includes('cloud')) {
      return <Cloud className={iconClass} />;
    }
    return <Sun className={iconClass} />;
  };

  return (
    <div className="glass-card w-full max-w-md mx-auto p-8 rounded-3xl">
      {/* Location */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-light text-white mb-1">{data.location}</h1>
        <p className="text-white/70 text-sm">{data.country}</p>
      </div>

      {/* Main Weather */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          {getWeatherIcon(data.condition)}
        </div>
        <div className="text-6xl font-thin text-white mb-2">{Math.round(data.temperature)}°</div>
        <p className="text-white/80 text-lg capitalize">{data.condition}</p>
        <p className="text-white/60 text-sm mt-1">Feels like {Math.round(data.feels_like)}°</p>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-item flex items-center space-x-3 p-4 rounded-2xl">
          <Wind className="w-5 h-5 text-white/70" />
          <div>
            <p className="text-white/60 text-xs">Wind</p>
            <p className="text-white text-sm font-medium">{data.wind_speed} km/h</p>
          </div>
        </div>
        
        <div className="glass-item flex items-center space-x-3 p-4 rounded-2xl">
          <Droplets className="w-5 h-5 text-white/70" />
          <div>
            <p className="text-white/60 text-xs">Humidity</p>
            <p className="text-white text-sm font-medium">{data.humidity}%</p>
          </div>
        </div>
        
        <div className="glass-item flex items-center space-x-3 p-4 rounded-2xl">
          <Eye className="w-5 h-5 text-white/70" />
          <div>
            <p className="text-white/60 text-xs">Visibility</p>
            <p className="text-white text-sm font-medium">{data.visibility} km</p>
          </div>
        </div>
        
        <div className="glass-item flex items-center space-x-3 p-4 rounded-2xl">
          <Thermometer className="w-5 h-5 text-white/70" />
          <div>
            <p className="text-white/60 text-xs">UV Index</p>
            <p className="text-white text-sm font-medium">{data.uv_index}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;