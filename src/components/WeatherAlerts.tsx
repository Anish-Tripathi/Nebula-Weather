import React, { useState } from 'react';
import { Alert } from '../types/weather';
import { AlertTriangle, X } from 'lucide-react';

interface WeatherAlertsProps {
  alerts?: Alert[];
}

const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts }) => {
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  
  if (!alerts || alerts.length === 0) {
    return null;
  }
  
  // Get severity color
  const getSeverityColor = (severity: string): string => {
    switch (severity.toLowerCase()) {
      case 'extreme':
        return 'bg-red-600/70';
      case 'severe':
        return 'bg-orange-600/70';
      case 'moderate':
        return 'bg-yellow-600/70';
      case 'minor':
        return 'bg-blue-600/70';
      default:
        return 'bg-indigo-600/70';
    }
  };
  
  return (
    <div className="w-full backdrop-blur-md bg-slate-900/40 rounded-2xl p-6 border border-slate-700/50 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center">
        <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
        Weather Alerts ({alerts.length})
      </h2>
      
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div 
            key={index}
            className={`${getSeverityColor(alert.severity)} backdrop-blur-sm border border-white/10 rounded-xl p-4 transition-all duration-300`}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-white">{alert.event}</h3>
              <button 
                onClick={() => setExpandedAlert(expandedAlert === alert.event ? null : alert.event)}
                className="text-white/70 hover:text-white"
              >
                {expandedAlert === alert.event ? <X size={16} /> : '+'}
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                {alert.severity}
              </span>
              <span className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                Until {new Date(alert.expires).toLocaleString()}
              </span>
            </div>
            
            {expandedAlert === alert.event && (
              <div className="mt-3 text-white/90 text-sm border-t border-white/10 pt-3 space-y-2">
                <p>{alert.desc}</p>
                {alert.instruction && (
                  <div>
                    <p className="font-semibold mt-2">Instructions:</p>
                    <p>{alert.instruction}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlerts;