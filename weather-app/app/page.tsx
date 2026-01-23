"use client";

import WeatherCard from "@/components/weather/WeatherCard";
import WeatherSkeleton from "@/components/weather/WeatherSkeleton";
import { useWeather } from "@/contexts/WeatherContext";

export default function Home() {
  const { weather, isLoading } = useWeather();

  return (
    <section className="min-h-screen py-20 px-4 md:py-25 md:px-10 xl:py-20 xl:px-20 bg-white dark:bg-dark-mode transition-colors duration-500">
      {/* Weather Display */}
      <div className="mx-auto w-full">
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
