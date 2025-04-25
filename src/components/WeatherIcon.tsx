import React from 'react';
import { Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, Sun, Moon, Wind, CloudFog } from 'lucide-react';

interface WeatherIconProps {
  code: number;
  isDay: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, isDay, size = 'md' }) => {
  const sizeClass = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  }[size];

  const sizePixels = {
    sm: 24,
    md: 48,
    lg: 64,
  }[size];

  // Map weather codes to appropriate icons
  const getWeatherIcon = () => {
    // Clear
    if (code === 1000) {
      return isDay ? <Sun size={sizePixels} className="text-yellow-400" /> : <Moon size={sizePixels} className="text-gray-300" />;
    }
    // Partly cloudy
    else if (code === 1003) {
      return isDay ? 
        <div className="relative">
          <Sun size={sizePixels} className="text-yellow-400" />
          <Cloud size={sizePixels * 0.8} className="text-gray-300 absolute bottom-0 right-0" />
        </div> : 
        <div className="relative">
          <Moon size={sizePixels} className="text-gray-300" />
          <Cloud size={sizePixels * 0.8} className="text-gray-300 absolute bottom-0 right-0" />
        </div>;
    }
    // Cloudy
    else if (code >= 1006 && code <= 1009) {
      return <Cloud size={sizePixels} className="text-gray-400" />;
    }
    // Mist/Fog
    else if (code >= 1030 && code <= 1147) {
      return <CloudFog size={sizePixels} className="text-gray-400" />;
    }
    // Rain
    else if ((code >= 1150 && code <= 1201) || (code >= 1240 && code <= 1246)) {
      return <CloudRain size={sizePixels} className="text-blue-400" />;
    }
    // Snow
    else if ((code >= 1204 && code <= 1237) || (code >= 1249 && code <= 1264)) {
      return <CloudSnow size={sizePixels} className="text-blue-200" />;
    }
    // Thunder
    else if (code >= 1273 && code <= 1282) {
      return <CloudLightning size={sizePixels} className="text-yellow-500" />;
    }
    // Drizzle
    else if (code >= 1150 && code <= 1153) {
      return <CloudDrizzle size={sizePixels} className="text-blue-300" />;
    }
    // Wind
    else if (code === 1117) {
      return <Wind size={sizePixels} className="text-gray-500" />;
    }
    // Default
    return <Cloud size={sizePixels} className="text-gray-400" />;
  };

  return (
    <div className={`${sizeClass} flex items-center justify-center animate-pulse-slow`}>
      {getWeatherIcon()}
    </div>
  );
};

export default WeatherIcon;