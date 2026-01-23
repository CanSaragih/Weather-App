"use client";

import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/weather/WeatherCard";
import WeatherSkeleton from "@/components/weather/WeatherSkeleton";
import { WeatherData } from "@/lib/types/weather";
import { useState } from "react";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="min-h-screen p-4 bg-white dark:bg-dark-mode transition-colors">
      <SearchBar onWeatherUpdate={setWeather} onLoadingChange={setIsLoading} />

      {/* Weather Display */}
      <div className="max-w-7xl mx-auto mt-32">
        {isLoading && <WeatherSkeleton />}

        {!isLoading && weather && <WeatherCard weather={weather} />}

        {!isLoading && !weather && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🌤️</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Welcome to Weather App
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Search for a city to see the weather forecast
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
