"use client";

import { ForecastData, WeatherData } from "@/lib/types/weather";
import { createContext, useContext, useState, ReactNode } from "react";

interface WeatherContextType {
  weather: WeatherData | null;
  forecast: ForecastData | null;
  isLoading: boolean;
  isSearchOpen: boolean;
  setWeather: (weather: WeatherData | null) => void;
  setForecast: (forecast: ForecastData | null) => void;
  setIsLoading: (loading: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        forecast,
        isLoading,
        isSearchOpen,
        setWeather,
        setForecast,
        setIsLoading,
        setIsSearchOpen,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within WeatherProvider");
  }
  return context;
}
