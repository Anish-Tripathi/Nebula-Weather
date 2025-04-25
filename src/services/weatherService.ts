import { WeatherData } from '../types/weather';

const API_KEY = '175ddf043cf94ccba73170654252504'; // Replace with your actual API key
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeather = async (location: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=5&aqi=yes&alerts=yes`
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || response.statusText || 'Weather data not available';
      throw new Error(`Weather API Error: ${errorMessage} (${response.status})`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    // Validate coordinates
    if (!isValidLatitude(lat) || !isValidLongitude(lon)) {
      throw new Error('Invalid coordinates provided');
    }

    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=5&aqi=yes&alerts=yes`
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || response.statusText || 'Weather data not available';
      throw new Error(`Weather API Error: ${errorMessage} (${response.status})`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getLocationByIP = async (): Promise<{ lat: number; lon: number }> => {
  try {
    const response = await fetch(`${BASE_URL}/ip.json?key=${API_KEY}&q=auto:ip`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || response.statusText || 'Location data not available';
      throw new Error(`Weather API Error: ${errorMessage} (${response.status})`);
    }
    
    const data = await response.json();
    
    if (!isValidLatitude(data.lat) || !isValidLongitude(data.lon)) {
      throw new Error('Invalid coordinates received from IP lookup');
    }
    
    return { lat: data.lat, lon: data.lon };
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
};

// Utility functions to validate coordinates
function isValidLatitude(lat: number): boolean {
  return typeof lat === 'number' && !isNaN(lat) && lat >= -90 && lat <= 90;
}

function isValidLongitude(lon: number): boolean {
  return typeof lon === 'number' && !isNaN(lon) && lon >= -180 && lon <= 180;
}