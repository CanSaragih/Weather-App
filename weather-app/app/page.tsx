"use client";

import LightRays from "@/components/LightRays";
import { Spotlight } from "@/components/ui/spotlight";
import WeatherCard from "@/components/weather/WeatherCard";
import WeatherSkeleton from "@/components/weather/WeatherSkeleton";
import { useWeather } from "@/contexts/WeatherContext";
import { cn } from "@/lib/utils";

export default function Home() {
  const { weather, forecast, isLoading } = useWeather();

  return (
    <section className="min-h-screen">
      {!isLoading && !weather && (
        <div className="fixed inset-0 w-full h-screen overflow-hidden bg-black/[0.96] antialiased flex items-center justify-center">
          <div
            className={cn(
              "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
              "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
            )}
          />

          <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-60"
            fill="white"
          />
          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <h1 className="bg-opacity-50 bg-linear-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-9xl">
              Weatherly
            </h1>
            <h3 className="bg-linear-to-b -mt-4 from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
              Made Simple
            </h3>
            <p className="mx-auto mt-6 max-w-xl text-center text-base font-normal text-neutral-300">
              Get real-time weather updates and accurate forecasts for any city
              around the world. Simply search for your location and stay
              informed about current conditions and upcoming weather patterns.
            </p>
          </div>
        </div>
      )}

      {!isLoading && weather && (
        <div className="min-h-screen py-20 md:py-25 md:px-10 xl:py-20 xl:px-20 bg-white dark:bg-dark-mode ">
          <div className="mx-auto w-full">
            <WeatherCard weather={weather} forecast={forecast} />
          </div>
        </div>
      )}

      {isLoading && (
        <div className="min-h-screen py-20 md:py-25 md:px-10 xl:py-20 xl:px-20 bg-white dark:bg-dark-mode">
          <div className="mx-auto w-full">
            <WeatherSkeleton />
          </div>
        </div>
      )}
    </section>
  );
}
