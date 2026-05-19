"use client";

import SpotlightBackground from "@/components/SpothlightBackground";
import WeatherCard from "@/components/weather/WeatherCard";
import WeatherSkeleton from "@/components/weather/WeatherSkeleton";
import { useWeather } from "@/contexts/WeatherContext";

export default function Home() {
  const { weather, forecast, isLoading } = useWeather();

  return (
    <section className="min-h-screen">
      <div className="navbar-hidden">
        {!isLoading && !weather && <SpotlightBackground />}
      </div>

      {!isLoading && weather && (
        <div className="min-h-screen py-25 md:py-25 md:px-10 xl:py-25 xl:px-20 bg-white dark:bg-dark-mode ">
          <div className="mx-auto w-full">
            <WeatherCard weather={weather} forecast={forecast} />
          </div>
        </div>
      )}

      {isLoading && (
        <div className="min-h-screen py-25 md:py-25 md:px-10 xl:py-25 xl:px-20 bg-white dark:bg-dark-mode">
          <div className="mx-auto w-full">
            <WeatherSkeleton />
          </div>
        </div>
      )}
    </section>
  );
}
