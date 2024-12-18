import React from "react";

interface CurrentWeatherProps {
  data: any;
  onAddFavorite: (city: string) => void;
  favorites: string[];
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  data,
  onAddFavorite,
  favorites,
}) => {
  const isFavorite = favorites.includes(data.name);

  return (
    <div className="bg-blue-50 p-4 rounded-md mb-4 shadow">
      <h2 className="text-xl font-semibold">{data.name}</h2>
      <p className="text-lg">{data.main.temp}°C</p>
      <p className="capitalize">{data.weather[0].description}</p>
      {!isFavorite && (
        <button
          onClick={() => onAddFavorite(data.name)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-2"
        >
          Add to Favorites
        </button>
      )}
    </div>
  );
};

export default CurrentWeather;
