import React from 'react';
import { SavedLocation } from '../types/weather';
import { Star, Plus, MapPin, X } from 'lucide-react';

interface SavedLocationsProps {
  locations: SavedLocation[];
  onSelect: (location: SavedLocation) => void;
  onRemove: (id: string) => void;
  onAddCurrent: () => void;
}

const SavedLocations: React.FC<SavedLocationsProps> = ({ 
  locations, 
  onSelect, 
  onRemove,
  onAddCurrent
}) => {
  return (
    <div className="w-full backdrop-blur-md bg-slate-900/40 rounded-2xl p-6 border border-slate-700/50 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Star className="h-5 w-5 text-yellow-400 mr-2" />
          Saved Locations
        </h2>
        
        <button
          onClick={onAddCurrent}
          className="flex items-center text-sm bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Current
        </button>
      </div>
      
      {locations.length === 0 ? (
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30 text-center">
          <p className="text-slate-400">No saved locations yet.</p>
          <p className="text-sm text-slate-500 mt-1">Add your favorite locations to quickly access their weather.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {locations.map((location) => (
            <div 
              key={location.id}
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30 relative group"
            >
              <button
                onClick={() => onRemove(location.id)}
                className="absolute top-1 right-1 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
              
              <div
                onClick={() => onSelect(location)}
                className="flex items-center cursor-pointer"
              >
                <MapPin className="h-5 w-5 text-purple-400 mr-2" />
                <h3 className="text-white font-medium truncate">{location.name}</h3>
              </div>
              
              <p className="text-xs text-slate-400 mt-1">
                Lat: {location.lat.toFixed(2)}, Lon: {location.lon.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedLocations;