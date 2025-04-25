import React, { useRef } from 'react';
import { Hour } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import { formatTime, formatTemp } from '../utils/weatherUtils';

interface HourlyForecastProps {
  hours: Hour[];
  unit: 'C' | 'F';
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hours, unit }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="relative w-full">
      <button 
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-slate-800/80 hover:bg-slate-700/80 rounded-full p-1 text-white transition-colors"
      >
        ‹
      </button>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 py-4 px-2 hide-scrollbar snap-x"
      >
        {hours.map((hour, index) => {
          const temp = unit === 'C' ? hour.temp_c : hour.temp_f;
          const time = formatTime(hour.time);
          const now = new Date();
          const hourTime = new Date(hour.time);
          const isCurrentHour = now.getHours() === hourTime.getHours() && 
                                now.getDate() === hourTime.getDate() &&
                                now.getMonth() === hourTime.getMonth();
          
          return (
            <div 
              key={index}
              className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl backdrop-blur-sm snap-start
                ${isCurrentHour 
                  ? 'bg-purple-900/50 border border-purple-500/50' 
                  : 'bg-slate-800/30 border border-slate-700/30'}`}
            >
              <p className="text-sm font-medium text-slate-300">
                {isCurrentHour ? 'Now' : time}
              </p>
              
              <WeatherIcon 
                code={hour.condition.code} 
                isDay={true} 
                size="sm" 
              />
              
              <p className="text-lg font-semibold text-white mt-1">
                {formatTemp(temp, unit)}
              </p>
              
              <p className="text-xs text-cyan-400">
                {hour.chance_of_rain}%
              </p>
            </div>
          );
        })}
      </div>
      
      <button 
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-slate-800/80 hover:bg-slate-700/80 rounded-full p-1 text-white transition-colors"
      >
        ›
      </button>
    </div>
  );
};

export default HourlyForecast;