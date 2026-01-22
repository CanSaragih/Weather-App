"use client";

import { WeatherData } from "@/lib/types/weather";
import WeatherIcon from "./WeatherIcon";
import WeatherDetails from "./WeatherDetails";
import { MapPin, Calendar } from "lucide-react";

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-900 p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5" />
              <h2 className="text-2xl font-bold">
                {weather.city}, {weather.country}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <Calendar className="w-4 h-4" />
              <p className="text-sm">{currentDate}</p>
            </div>
          </div>
          <WeatherIcon
            icon={weather.icon}
            description={weather.description}
            size="md"
          />
        </div>

        {/* Temperature */}
        <div className="flex items-end gap-4">
          <div>
            <p className="text-6xl font-bold">{weather.temperature}°</p>
            <p className="text-xl capitalize mt-2">{weather.description}</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-6">
        <WeatherDetails
          humidity={weather.humidity}
          windSpeed={weather.wind_speed}
          pressure={weather.pressure}
          visibility={weather.visibility}
          feelsLike={weather.feels_like}
        />
      </div>

      {/* Coordinates (Optional) */}
      <div className="px-6 pb-6">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            Coordinates: {weather.coord.lat.toFixed(4)},{" "}
            {weather.coord.lon.toFixed(4)}
          </p>
        </div>
      </div>
    </div>
  );
}
