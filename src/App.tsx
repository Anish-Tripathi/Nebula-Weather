import { useState, useEffect } from "react";
import {
  fetchWeather,
  fetchWeatherByCoords,
  getLocationByIP,
} from "./services/weatherService";
import {
  WeatherData,
  SavedLocation,
  ForecastDay as ForecastDayType,
} from "./types/weather";
import { getWeatherBackground } from "./utils/weatherUtils";
import { Cloud, Loader } from "lucide-react";

// Components
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import ForecastDay from "./components/ForecastDay";
import HourlyForecast from "./components/HourlyForecast";
import WeatherDetails from "./components/WeatherDetails";
import WeatherAlerts from "./components/WeatherAlerts";
import WeatherMap from "./components/WeatherMap";
import SavedLocations from "./components/SavedLocations";
import UnitToggle from "./components/UnitToggle";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>(() => {
    const saved = localStorage.getItem("weatherAppLocations");
    return saved ? JSON.parse(saved) : [];
  });

  // Load weather data on initial render
  useEffect(() => {
    const loadInitialWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to get user's location
        const { lat, lon } = await getLocationByIP();
        const data = await fetchWeatherByCoords(lat, lon);
        setWeatherData(data);
      } catch (err) {
        console.error("Error loading initial weather:", err);
        setError(
          "Could not load weather data. Please try searching for a location."
        );

        // Fallback to a default location
        try {
          const data = await fetchWeather("London");
          setWeatherData(data);
        } catch (fallbackErr) {
          console.error("Error loading fallback weather:", fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    loadInitialWeather();
  }, []);

  // Save locations to localStorage when they change
  useEffect(() => {
    localStorage.setItem("weatherAppLocations", JSON.stringify(savedLocations));
  }, [savedLocations]);

  // Handle search
  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeather(query);
      setWeatherData(data);
      setSelectedDay(0);
    } catch (err) {
      console.error("Error searching location:", err);
      setError("Location not found. Please try another search term.");
    } finally {
      setLoading(false);
    }
  };

  // Handle using current location
  const handleUseCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use browser geolocation
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const data = await fetchWeatherByCoords(latitude, longitude);
            setWeatherData(data);
            setSelectedDay(0);
          } catch (err) {
            console.error("Error fetching weather by coords:", err);
            setError("Could not load weather data for your location.");
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError(
            "Could not access your location. Please check your browser permissions."
          );
          setLoading(false);
        }
      );
    } catch (err) {
      console.error("Error using current location:", err);
      setError("Could not determine your location.");
      setLoading(false);
    }
  };

  // Toggle temperature unit
  const toggleUnit = () => {
    setUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  // Add current location to saved locations
  const addCurrentLocation = () => {
    if (!weatherData) return;

    const { location } = weatherData;
    const newLocation: SavedLocation = {
      id: `${location.lat}-${location.lon}`,
      name: location.name,
      lat: location.lat,
      lon: location.lon,
    };

    // Check if already exists
    if (!savedLocations.some((loc) => loc.id === newLocation.id)) {
      setSavedLocations((prev) => [...prev, newLocation]);
    }
  };

  // Remove a saved location
  const removeSavedLocation = (id: string) => {
    setSavedLocations((prev) => prev.filter((loc) => loc.id !== id));
  };

  // Select a saved location
  const selectSavedLocation = async (location: SavedLocation) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherByCoords(location.lat, location.lon);
      setWeatherData(data);
      setSelectedDay(0);
    } catch (err) {
      console.error("Error loading saved location:", err);
      setError("Could not load weather data for the selected location.");
    } finally {
      setLoading(false);
    }
  };

  // Get background based on weather condition
  const bgClass = weatherData
    ? getWeatherBackground(weatherData.current.condition, true)
    : "bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950";

  return (
    <div
      className={`min-h-screen ${bgClass} text-white transition-colors duration-1000`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold flex items-center">
            <Cloud className="h-8 w-8 mr-2 text-purple-400" />
            SkyCast
          </h1>

          <div className="flex items-center space-x-4">
            <UnitToggle unit={unit} onToggle={toggleUnit} />
          </div>
        </header>

        <main className="space-y-6">
          <SearchBar
            onSearch={handleSearch}
            onUseCurrentLocation={handleUseCurrentLocation}
          />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader className="h-12 w-12 text-purple-400 animate-spin" />
              <p className="mt-4 text-slate-300">Loading weather data...</p>
            </div>
          ) : error ? (
            <div className="backdrop-blur-md bg-red-900/30 rounded-2xl p-6 border border-red-500/30 text-center">
              <p className="text-white">{error}</p>
              <p className="text-slate-300 mt-2">
                Please try searching for a different location.
              </p>
            </div>
          ) : weatherData ? (
            <>
              <CurrentWeather
                current={weatherData.current}
                location={weatherData.location}
                unit={unit}
              />

              <div className="backdrop-blur-md bg-slate-900/40 rounded-2xl p-6 border border-slate-700/50 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4">
                  5-Day Forecast
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {weatherData.forecast.forecastday.map((day, index) => (
                    <ForecastDay
                      key={day.date}
                      forecast={day}
                      unit={unit}
                      onSelect={() => setSelectedDay(index)}
                      isSelected={selectedDay === index}
                    />
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-white mb-3">
                    Hourly Forecast
                  </h3>
                  <HourlyForecast
                    hours={weatherData.forecast.forecastday[selectedDay].hour}
                    unit={unit}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WeatherDetails
                  current={weatherData.current}
                  forecast={weatherData.forecast}
                  unit={unit}
                />

                <WeatherMap
                  lat={weatherData.location.lat}
                  lon={weatherData.location.lon}
                />
              </div>

              {weatherData.alerts && weatherData.alerts.length > 0 && (
                <WeatherAlerts alerts={weatherData.alerts} />
              )}

              <SavedLocations
                locations={savedLocations}
                onSelect={selectSavedLocation}
                onRemove={removeSavedLocation}
                onAddCurrent={addCurrentLocation}
              />
            </>
          ) : null}
        </main>

        <footer className="mt-12 pt-6 border-t border-slate-800/50 text-center text-slate-400 text-sm">
          <p>
            SkyCast Weather © 2025 | Designed with a passion for meteorology
          </p>
          <p className="mt-1">Weather data powered by WeatherAPI.com</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
