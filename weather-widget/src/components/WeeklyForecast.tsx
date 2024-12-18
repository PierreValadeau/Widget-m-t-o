import React from "react";

interface WeeklyForecastProps {
  data: any[];
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {data.map((day, index) => (
        <div key={index} className="bg-white shadow rounded-lg p-4 text-center">
          <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
          <p className="font-bold">{day.temp.day}°C</p>
          <p className="capitalize">{day.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecast;
