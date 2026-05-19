"use client";

import { WeatherData, ForecastData, ForecastItem } from "@/lib/types/weather";
import WeatherDetails from "./WeatherDetails";
import HeaderWeather from "./HeaderWeather";
import { useState } from "react";
import CityInformation from "./CityInformation";
import WeatherIconSituation from "./WeatherIconSituation";
import ForecastCard from "./detail/ForecastCard";

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

  const currentCityWeather = {
    ...weather,
    main: selectedForecast ? selectedForecast.main : weather.main,
    wind: selectedForecast ? selectedForecast.wind : weather.wind,
    weather: selectedForecast ? selectedForecast.weather : weather.weather,
  };

  return (
    <div className="bg-white dark:bg-dark-mode overflow-hidden">
      {/* Header */}
      <div className="pt-20 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center">
        <div className="md:col-span-6 lg:col-span-4">
          <CityInformation weather={currentCityWeather} />
        </div>

        <div className="md:col-span-6 lg:col-span-5 flex justify-center">
          <WeatherIconSituation iconCode={currentCityWeather.weather[0].icon} />
        </div>

        <div className="md:col-span-12 lg:col-span-3 flex justify-center lg:justify-end">
          <div className="w-full max-w-sm lg:max-w-[320px]">
            <ForecastCard
              forecast={forecast?.list ?? []}
              selectedDate={selectedDate}
              onSelect={handleDateSelect}
            />
          </div>
        </div>
      </div>

      {/* Details */}
      {/* <div className="p-6 mt-10">
        <WeatherDetails
          humidity={displayData.main.humidity}
          windSpeed={displayData.wind.speed}
          pressure={displayData.main.pressure}
          visibility={displayData.visibility}
          feelsLike={displayData.main.feels_like}
          forecast={forecast?.list}
          selectedDate={selectedDate}
        />
      </div> */}

      {/* Coordinates (Optional) */}
      {/* <div className="px-6 pb-6">
        <div className="bg-gray-50 dark:bg-card-dark-mode rounded-lg p-3">
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            Coordinates: {weather.coord.lat.toFixed(6)},{" "}
            {weather.coord.lon.toFixed(6)}
          </p>
        </div>
      </div> */}
    </div>
  );
}
