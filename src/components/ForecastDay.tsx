import React from 'react';
import { ForecastDay as ForecastDayType } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import { formatDate, formatTemp } from '../utils/weatherUtils';

interface ForecastDayProps {
  forecast: ForecastDayType;
  unit: 'C' | 'F';
  onSelect: () => void;
  isSelected: boolean;
}

const ForecastDay: React.FC<ForecastDayProps> = ({ forecast, unit, onSelect, isSelected }) => {
  const maxTemp = unit === 'C' ? forecast.day.maxtemp_c : forecast.day.maxtemp_f;
  const minTemp = unit === 'C' ? forecast.day.mintemp_c : forecast.day.mintemp_f;
  
  return (
    <div 
      className={`backdrop-blur-sm rounded-xl p-4 cursor-pointer transition-all duration-200 
        ${isSelected 
          ? 'bg-purple-900/50 border border-purple-500/50 shadow-lg shadow-purple-900/20' 
          : 'bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50'}`}
      onClick={onSelect}
    >
      <p className="text-sm font-medium text-center text-slate-300">{formatDate(forecast.date)}</p>
      
      <div className="flex flex-col items-center my-2">
        <WeatherIcon 
          code={forecast.day.condition.code} 
          isDay={true} 
          size="sm" 
        />
        <p className="text-xs text-center text-slate-400 mt-1 line-clamp-1">
          {forecast.day.condition.text}
        </p>
      </div>
      
      <div className="flex justify-center gap-2">
        <span className="text-xs text-white">{formatTemp(maxTemp, unit)}</span>
        <span className="text-xs text-slate-400">{formatTemp(minTemp, unit)}</span>
      </div>
      
      <div className="mt-2 text-center">
        <div className="flex items-center justify-center gap-1">
          <span className="text-xs text-cyan-400">{forecast.day.daily_chance_of_rain}%</span>
          <span className="text-xs text-slate-500">rain</span>
        </div>
      </div>
    </div>
  );
};

export default ForecastDay;