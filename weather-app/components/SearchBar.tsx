"use client";

import { Input } from "./ui/input";
import { IoSearch } from "react-icons/io5";
import { Kbd } from "./ui/kbd";
import { MdKeyboardCommandKey } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import ModalSearch from "./ui/ModalSearch";
import { City, ForecastData, WeatherData } from "@/lib/types/weather";
import { WeatherAPI } from "@/lib/api/weather";
import { useWeather } from "@/contexts/WeatherContext";

interface SearchBarProps {
  onWeatherUpdate: (weather: WeatherData | null) => void;
  onForecastUpdate: (forecast: ForecastData | null) => void;
  onLoadingChange: (loading: boolean) => void;
}

export default function SearchBar({
  onWeatherUpdate,
  onForecastUpdate,
  onLoadingChange,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isSearchOpen, setIsSearchOpen } = useWeather();

  useEffect(() => {
    const handleKeysPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }

      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeysPress);
    return () => {
      window.removeEventListener("keydown", handleKeysPress);
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  const handleCitySelect = async (city: City) => {
    setIsSearchOpen(false);
    onLoadingChange(true);
    try {
      const [weatherData, forecastData] = await Promise.all([
        WeatherAPI.getWeatherByCoords(city.coord.lat, city.coord.lon),
        WeatherAPI.getForecastByCoords(city.coord.lat, city.coord.lon),
      ]);
      onWeatherUpdate(weatherData);
      onForecastUpdate(forecastData);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
      onWeatherUpdate(null);
      onForecastUpdate(null);
    } finally {
      onLoadingChange(false);
    }
  };

  const handleCurrentLocation = async (lat: number, lon: number) => {
    setIsSearchOpen(false);
    onLoadingChange(true);
    try {
      const [weatherData, forecastData] = await Promise.all([
        WeatherAPI.getWeatherByCoords(lat, lon),
        WeatherAPI.getForecastByCoords(lat, lon),
      ]);
      onWeatherUpdate(weatherData);
      onForecastUpdate(forecastData);
    } catch (error) {
      console.log("Failed to fetch weather", error);
      onWeatherUpdate(null);
      onForecastUpdate(null);
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 justify-end max-w-7xl ml-auto">
        <div
          className="relative max-w-md w-full cursor-pointer"
          onClick={() => setIsSearchOpen(true)}
        >
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <Kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <MdKeyboardCommandKey className="size-3" /> K
          </Kbd>
          <Input
            type="search"
            placeholder="Search city..."
            className="pl-10 pr-20 cursor-pointer rounded-full"
            readOnly
          />
        </div>
      </div>

      {/* Modal Search Component */}
      <ModalSearch
        modalOpen={isSearchOpen}
        setModalOpen={setIsSearchOpen}
        inputRef={inputRef}
        onCitySelect={handleCitySelect}
        onCurrentLocation={handleCurrentLocation}
      />
    </>
  );
}
