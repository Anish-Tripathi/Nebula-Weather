import React from 'react';
import { Map } from 'lucide-react';

interface WeatherMapProps {
  lat: number;
  lon: number;
}

const WeatherMap: React.FC<WeatherMapProps> = ({ lat, lon }) => {
  // Calculate position for the marker overlay (simplified)
  // Converting latitude (-90 to 90) and longitude (-180 to 180) to percentage positions
  const xPercent = ((lon + 180) / 360) * 100;
  const yPercent = ((90 - lat) / 180) * 100;

  return (
    <div className="w-full backdrop-blur-md bg-slate-900/40 rounded-2xl p-6 border border-slate-700/50 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center">
        <Map className="h-5 w-5 text-blue-400 mr-2" />
        Weather Map
      </h2>
      
      <div className="relative h-64 md:h-96 bg-slate-800/70 rounded-xl overflow-hidden border border-slate-700/30">
        {/* World map image placeholder */}
        <div className="absolute inset-0 bg-slate-800">
          <img 
            src="https://3.bp.blogspot.com/-1OrTFTRXYAc/V-dyae4LC1I/AAAAAAAA5j4/awVKBuYhgLshSzNQm3l92HUnYvpsrbO6wCLcB/s1600/Forecasts.jpg" 
            alt="World Map" 
            className="w-full h-full object-cover opacity-70"
          />
          
          {/* Location marker overlay */}
          <div 
            className="absolute w-4 h-4 rounded-full bg-blue-500 transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: `${xPercent}%`, 
              top: `${yPercent}%`,
              boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.3)'
            }}
          ></div>
        </div>
        
        <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm p-2 rounded-lg text-white text-sm border border-slate-700/30">
          <p>Lat: {lat.toFixed(2)} | Lon: {lon.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;