"use client";

import { ForecastData, WeatherData } from "@/lib/types/weather";
import { createContext, useContext, useState, ReactNode } from "react";

interface WeatherContextType {
  weather: WeatherData | null;
  forecast: ForecastData | null;
  isLoading: boolean;
  setWeather: (weather: WeatherData | null) => void;
  setForecast: (forecast: ForecastData | null) => void;
  setIsLoading: (loading: boolean) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        forecast,
        isLoading,
        setWeather,
        setForecast,
        setIsLoading,
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
