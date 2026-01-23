"use client";

import { Input } from "./ui/input";
import { IoSearch } from "react-icons/io5";
import { Kbd } from "./ui/kbd";
import { MdKeyboardCommandKey } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import ModalSearch from "./ui/ModalSearch";
import { City, WeatherData } from "@/lib/types/weather";
import { WeatherAPI } from "@/lib/api/weather";

interface SearchBarProps {
  onWeatherUpdate: (weather: WeatherData | null) => void;
  onLoadingChange: (loading: boolean) => void;
}

export default function SearchBar({
  onWeatherUpdate,
  onLoadingChange,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleKeysPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setModalOpen(true);
      }

      if (e.key === "Escape") {
        setModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeysPress);
    return () => {
      window.removeEventListener("keydown", handleKeysPress);
    };
  }, []);

  useEffect(() => {
    if (modalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [modalOpen]);

  const handleCitySelect = async (city: City) => {
    onLoadingChange(true);
    try {
      const weatherData = await WeatherAPI.getWeatherByCoords(
        city.coord.lat,
        city.coord.lon,
      );
      onWeatherUpdate(weatherData);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
      onWeatherUpdate(null);
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 justify-end max-w-7xl ml-auto">
        <div
          className="relative max-w-md w-full cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <Kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <MdKeyboardCommandKey className="size-3" /> K
          </Kbd>
          <Input
            type="search"
            placeholder="Search city..."
            className="pl-10 pr-20 cursor-pointer"
            readOnly
          />
        </div>
      </div>

      {/* Modal Search Component */}
      <ModalSearch
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        inputRef={inputRef}
        onCitySelect={handleCitySelect}
      />
    </>
  );
}
