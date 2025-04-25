import React from 'react';

interface UnitToggleProps {
  unit: 'C' | 'F';
  onToggle: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="flex items-center">
      <span className={`text-sm ${unit === 'C' ? 'text-white font-medium' : 'text-slate-400'}`}>°C</span>
      <button
        onClick={onToggle}
        className="relative inline-flex h-6 w-12 mx-2 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-700 transition-colors duration-200 ease-in-out focus:outline-none"
      >
        <span 
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            unit === 'F' ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
      <span className={`text-sm ${unit === 'F' ? 'text-white font-medium' : 'text-slate-400'}`}>°F</span>
    </div>
  );
};

export default UnitToggle;