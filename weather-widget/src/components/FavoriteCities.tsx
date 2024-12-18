import React from "react";

interface FavoriteCitiesProps {
  favorites: string[];
  onSelectCity: (city: string) => void;
  onRemoveFavorite: (city: string) => void;
}

const FavoriteCities: React.FC<FavoriteCitiesProps> = ({
  favorites,
  onSelectCity,
  onRemoveFavorite,
}) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Favorite Cities</h3>
      <ul>
        {favorites.map((city) => (
          <li key={city} className="flex justify-between items-center mb-2">
            <span>{city}</span>
            <div>
              <button
                onClick={() => onSelectCity(city)}
                className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
              >
                View
              </button>
              <button
                onClick={() => onRemoveFavorite(city)}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteCities;
