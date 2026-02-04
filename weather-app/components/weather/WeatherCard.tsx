"use client";

import { WeatherData, ForecastData, ForecastItem } from "@/lib/types/weather";
import WeatherDetails from "./WeatherDetails";
import HeaderWeather from "./HeaderWeather";
import { useState } from "react";

interface WeatherCardProps {
  weather: WeatherData;
  forecast?: ForecastData | null;
}

export default function WeatherCard({ weather, forecast }: WeatherCardProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedForecast, setSelectedForecast] = useState<ForecastItem | null>(
    null,
  );

  const handleDateSelect = (date: Date, item: ForecastItem) => {
    setSelectedDate(date);
    setSelectedForecast(item);
  };

  // Data yang akan ditampilkan
  const displayData = selectedForecast || {
    main: weather.main,
    wind: weather.wind,
    visibility: weather.visibility,
  };

  return (
    <div className="bg-white dark:bg-dark-mode overflow-hidden">
      {/* Header */}
      <div className="py-2">
        <HeaderWeather
          weather={weather}
          forecast={forecast?.list}
          selectedDate={selectedDate}
          selectedForecast={selectedForecast}
          onDateSelect={handleDateSelect}
        />
      </div>

      {/* Details */}
      <div className="p-6">
        <WeatherDetails
          humidity={displayData.main.humidity}
          windSpeed={displayData.wind.speed}
          pressure={displayData.main.pressure}
          visibility={displayData.visibility}
          feelsLike={displayData.main.feels_like}
          forecast={forecast?.list}
          selectedDate={selectedDate}
        />
      </div>

      {/* Coordinates (Optional) */}
      <div className="px-6 pb-6">
        <div className="bg-gray-50 dark:bg-card-dark-mode rounded-dlg p-3">
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            Coordinates: {weather.coord.lat.toFixed(6)},{" "}
            {weather.coord.lon.toFixed(6)}
          </p>
        </div>
      </div>
    </div>
  );
}
