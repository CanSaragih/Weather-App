"use client";

import { Button } from "../ui/button";
import SearchBar from "../SearchBar";
import { useWeather } from "@/contexts/WeatherContext";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { useState } from "react";
import { Menu } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { weather, isLoading, setWeather, setForecast, setIsLoading } =
    useWeather();

  const showNavbar = weather || isLoading;

  const handleReset = () => {
    setWeather(null);
    setForecast(null);
    setIsLoading(false);
  };

  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50",
        showNavbar ? "opacity-100" : "opacity-0 pointer-events-none",
        className,
      )}
    >
      <Menu setActive={setActive}>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer"
          onClick={handleReset}
        >
          <Image src="/logo.png" alt="Weatherly Logo" width={50} height={40} />
        </Button>
        <SearchBar
          onWeatherUpdate={setWeather}
          onForecastUpdate={setForecast}
          onLoadingChange={setIsLoading}
        />
        <AnimatedThemeToggler className="border-gray-200 dark:border-gray-700/70" />
      </Menu>
    </div>
  );
}
