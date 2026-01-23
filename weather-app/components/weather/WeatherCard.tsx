"use client";

import { WeatherData } from "@/lib/types/weather";
import WeatherIcon from "./WeatherIcon";
import WeatherDetails from "./WeatherDetails";
import { MapPin, Calendar } from "lucide-react";
import { formatDate } from "@/helpers/formatDate";
import { getCountryName } from "@/helpers/countryName";
import HeaderWeather from "./HeaderWeather";

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="bg-white dark:bg-dark-mode overflow-hidden">
      {/* Header */}
      <div className="py-2">
        <HeaderWeather weather={weather} />
        {/* <div className="flex flex-col items-center mb-12 space-y-1">
          <h3 className="text-lg">{getCountryName(weather.sys.country)}</h3>
          <h1 className="text-3xl">{weather.city}</h1>
          <div className="flex items-center">
            <h1 className="text-6xl font-bold">{weather.main.temp}°</h1>
            <WeatherIcon
              icon={weather.weather.icon}
              description={weather.weather.description}
              size="sm"
            />
          </div>
          <h3 className="text-lg capitalize">{weather.weather.description}</h3>
          <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium">
            <span>H: {weather.main.temp_max}°</span>
            <span>L: {weather.main.temp_min}°</span>
          </div>
        </div> */}
      </div>

      {/* Header */}
      <div className="p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5" />
              <h2 className="text-2xl font-bold">
                {weather.city}, {weather.sys.country}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <Calendar className="w-4 h-4" />
              <p className="text-sm">{formatDate()}</p>
            </div>
          </div>
          <WeatherIcon
            icon={weather.weather.icon}
            description={weather.weather.description}
            size="md"
          />
        </div>

        {/* Temperature */}
        <div className="flex items-end gap-4">
          <div>
            <p className="text-6xl font-bold">{weather.main.temp}°</p>
            <p className="text-xl capitalize mt-2">
              {weather.weather.description}
            </p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-6">
        <WeatherDetails
          humidity={weather.main.humidity}
          windSpeed={weather.wind.speed}
          pressure={weather.main.pressure}
          visibility={weather.visibility}
          feelsLike={weather.main.feels_like}
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
