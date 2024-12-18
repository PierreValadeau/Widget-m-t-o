import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeeklyForecast from "./components/WeeklyForecast";
import FavoriteCities from "./components/FavoriteCities";

const App: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [weeklyForecast, setWeeklyForecast] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const fetchWeatherData = async (city: string) => {
    const apiKey = "YOUR_API_KEY"; // Remplace par ta clé API
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`;

    try {
      // Fetch météo actuelle
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();
      setCurrentWeather(weatherData);

      // Fetch prévisions
      const { lat, lon } = weatherData.coord;
      const forecastResponse = await fetch(
        forecastUrl.replace("{lat}", lat).replace("{lon}", lon)
      );
      const forecastData = await forecastResponse.json();
      setWeeklyForecast(forecastData.daily.slice(1, 8));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const addFavorite = (city: string) => {
    if (!favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const removeFavorite = (city: string) => {
    const updatedFavorites = favorites.filter((fav) => fav !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="min-h-screen bg-blue-100 p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Weather Widget</h1>
        <SearchBar onSearch={fetchWeatherData} />
        {currentWeather && (
          <CurrentWeather
            data={currentWeather}
            onAddFavorite={addFavorite}
            favorites={favorites}
          />
        )}
        {weeklyForecast.length > 0 && <WeeklyForecast data={weeklyForecast} />}
        <FavoriteCities
          favorites={favorites}
          onSelectCity={fetchWeatherData}
          onRemoveFavorite={removeFavorite}
        />
      </div>
    </div>
  );
};

export default App;

