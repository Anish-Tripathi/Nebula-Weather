import { Condition } from '../types/weather';

// Get appropriate background gradient based on weather condition and time
export const getWeatherBackground = (condition: Condition, isDay: boolean): string => {
  const code = condition.code;
  
  // Clear
  if (code === 1000) {
    return isDay
      ? 'bg-gradient-to-br from-blue-800 via-indigo-900 to-purple-900'
      : 'bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950';
  }
  
  // Partly cloudy
  if (code === 1003) {
    return isDay
      ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900'
      : 'bg-gradient-to-br from-gray-900 via-indigo-950 to-blue-950';
  }
  
  // Cloudy
  if (code >= 1006 && code <= 1009) {
    return isDay
      ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900'
      : 'bg-gradient-to-br from-slate-900 via-gray-900 to-blue-950';
  }
  
  // Rainy
  if ((code >= 1063 && code <= 1072) || (code >= 1150 && code <= 1201)) {
    return isDay
      ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-950'
      : 'bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950';
  }
  
  // Snowy
  if (code >= 1210 && code <= 1282) {
    return isDay
      ? 'bg-gradient-to-br from-blue-800 via-indigo-900 to-purple-900'
      : 'bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950';
  }
  
  // Thunderstorm
  if (code >= 1087 && code <= 1087 || code >= 1273 && code <= 1282) {
    return isDay
      ? 'bg-gradient-to-br from-slate-800 via-indigo-900 to-purple-900'
      : 'bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950';
  }
  
  // Default
  return isDay
    ? 'bg-gradient-to-br from-blue-800 via-indigo-900 to-purple-900'
    : 'bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950';
};

// Format temperature based on unit
export const formatTemp = (temp: number, unit: 'C' | 'F'): string => {
  return `${Math.round(temp)}°${unit}`;
};

// Format time from API to readable format
export const formatTime = (time: string): string => {
  const date = new Date(time);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Format date from API to readable format
export const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
};

// Get appropriate icon based on condition code
export const getConditionIcon = (code: number, isDay: boolean): string => {
  // This function would return the appropriate icon path
  // In a real app, we would map each condition code to a specific icon
  return `https://cdn.weatherapi.com/weather/64x64/${isDay ? 'day' : 'night'}/${code}.png`;
};

// Calculate air quality index rating text
export const getAirQualityText = (index: number): { text: string; color: string } => {
  if (index <= 1) return { text: 'Good', color: 'text-green-400' };
  if (index <= 2) return { text: 'Moderate', color: 'text-yellow-400' };
  if (index <= 3) return { text: 'Unhealthy for sensitive groups', color: 'text-orange-400' };
  if (index <= 4) return { text: 'Unhealthy', color: 'text-red-400' };
  if (index <= 5) return { text: 'Very Unhealthy', color: 'text-purple-400' };
  return { text: 'Hazardous', color: 'text-rose-500' };
};

// Format UV index with rating text
export const getUVIndexText = (uv: number): { text: string; color: string } => {
  if (uv <= 2) return { text: 'Low', color: 'text-green-400' };
  if (uv <= 5) return { text: 'Moderate', color: 'text-yellow-400' };
  if (uv <= 7) return { text: 'High', color: 'text-orange-400' };
  if (uv <= 10) return { text: 'Very High', color: 'text-red-400' };
  return { text: 'Extreme', color: 'text-purple-400' };
};