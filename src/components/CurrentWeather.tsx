import React from 'react';
import { Wind, Droplets, Thermometer, Eye } from 'lucide-react';
import { CurrentWeather as CurrentWeatherType, Location, Condition } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import { formatTemp } from '../utils/weatherUtils';

interface CurrentWeatherProps {
  current: CurrentWeatherType;
  location: Location;
  unit: 'C' | 'F';
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ current, location, unit }) => {
  const isDay = true; // This would be determined based on the API response
  
  // Get temperature based on selected unit
  const temp = unit === 'C' ? current.temp_c : current.temp_f;
  const feelsLike = unit === 'C' ? current.feelslike_c : current.feelslike_f;
  
  return (
    <div className="w-full backdrop-blur-md bg-slate-900/40 rounded-2xl p-6 border border-slate-700/50 shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{location.name}</h2>
          <p className="text-slate-300">{location.region}, {location.country}</p>
          <p className="text-slate-400 text-sm mt-1">{new Date(location.localtime).toLocaleString()}</p>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0">
          <WeatherIcon code={current.condition.code} isDay={isDay} size="lg" />
          <div className="ml-4">
            <h1 className="text-5xl font-bold text-white">{formatTemp(temp, unit)}</h1>
            <p className="text-slate-300">{current.condition.text}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 backdrop-blur-sm border border-slate-700/30">
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-slate-300">Feels Like</span>
          </div>
          <p className="text-2xl font-semibold text-white mt-2">{formatTemp(feelsLike, unit)}</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-xl p-4 backdrop-blur-sm border border-slate-700/30">
          <div className="flex items-center">
            <Wind className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-slate-300">Wind</span>
          </div>
          <p className="text-2xl font-semibold text-white mt-2">
            {unit === 'C' ? `${current.wind_kph} km/h` : `${current.wind_mph} mph`}
          </p>
          <p className="text-xs text-slate-400">{current.wind_dir}</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-xl p-4 backdrop-blur-sm border border-slate-700/30">
          <div className="flex items-center">
            <Droplets className="h-5 w-5 text-cyan-400 mr-2" />
            <span className="text-slate-300">Humidity</span>
          </div>
          <p className="text-2xl font-semibold text-white mt-2">{current.humidity}%</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-xl p-4 backdrop-blur-sm border border-slate-700/30">
          <div className="flex items-center">
            <Eye className="h-5 w-5 text-indigo-400 mr-2" />
            <span className="text-slate-300">Visibility</span>
          </div>
          <p className="text-2xl font-semibold text-white mt-2">
            {unit === 'C' ? `${current.vis_km} km` : `${current.vis_miles} mi`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;