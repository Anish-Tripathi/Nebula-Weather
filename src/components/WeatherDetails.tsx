import React from 'react';
import { CurrentWeather, Forecast } from '../types/weather';
import { Sun, Moon, Droplets, Wind, Thermometer, CloudRain, Gauge, CloudSnow } from 'lucide-react';
import { getAirQualityText, getUVIndexText } from '../utils/weatherUtils';

interface WeatherDetailsProps {
  current: CurrentWeather;
  forecast: Forecast;
  unit: 'C' | 'F';
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ current, forecast, unit }) => {
  const today = forecast.forecastday[0];
  const uv = getUVIndexText(current.uv);
  const airQuality = current.air_quality 
    ? getAirQualityText(current.air_quality["us-epa-index"])
    : { text: 'Unknown', color: 'text-gray-400' };
  
  return (
    <div className="w-full backdrop-blur-md bg-slate-900/40 rounded-2xl p-6 border border-slate-700/50 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Weather Details</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
          <div className="flex items-center">
            <Sun className="h-5 w-5 text-amber-400 mr-2" />
            <span className="text-slate-300">Sunrise</span>
          </div>
          <p className="text-lg font-semibold text-white mt-2">{today.astro.sunrise}</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
          <div className="flex items-center">
            <Moon className="h-5 w-5 text-blue-300 mr-2" />
            <span className="text-slate-300">Sunset</span>
          </div>
          <p className="text-lg font-semibold text-white mt-2">{today.astro.sunset}</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
          <div className="flex items-center">
            <CloudRain className="h-5 w-5 text-cyan-400 mr-2" />
            <span className="text-slate-300">Precipitation</span>
          </div>
          <p className="text-lg font-semibold text-white mt-2">
            {unit === 'C' ? `${current.precip_mm} mm` : `${current.precip_in} in`}
          </p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
          <div className="flex items-center">
            <Gauge className="h-5 w-5 text-orange-400 mr-2" />
            <span className="text-slate-300">Pressure</span>
          </div>
          <p className="text-lg font-semibold text-white mt-2">
            {unit === 'C' ? `${current.pressure_mb} mb` : `${current.pressure_in} in`}
          </p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
          <div className="flex items-center">
            <Sun className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-slate-300">UV Index</span>
          </div>
          <div className="flex items-center mt-2">
            <p className="text-lg font-semibold text-white">{current.uv}</p>
            <p className={`text-sm ml-2 ${uv.color}`}>({uv.text})</p>
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
          <div className="flex items-center">
            <Wind className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-slate-300">Wind Gust</span>
          </div>
          <p className="text-lg font-semibold text-white mt-2">
            {unit === 'C' 
              ? `${today.hour[0].gust_kph} km/h` 
              : `${today.hour[0].gust_mph} mph`}
          </p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30 col-span-2">
          <div className="flex items-center">
            <Droplets className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-slate-300">Air Quality</span>
          </div>
          <div className="flex items-center mt-2">
            <p className="text-lg font-semibold text-white">
              {current.air_quality ? current.air_quality["us-epa-index"] : 'N/A'}
            </p>
            <p className={`text-sm ml-2 ${airQuality.color}`}>({airQuality.text})</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;