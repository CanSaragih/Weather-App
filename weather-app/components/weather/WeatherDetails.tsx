import { Droplets, Wind, Gauge, Eye } from "lucide-react";
import ForecastCard from "./ForecastCard";
import { ForecastItem } from "@/lib/types/weather";

interface WeatherDetailsProps {
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  feelsLike: number;
  forecast?: ForecastItem[];
}

export default function WeatherDetails({
  humidity,
  windSpeed,
  pressure,
  visibility,
  feelsLike,
  forecast,
}: WeatherDetailsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Forecast */}
      {forecast && forecast.length > 0 && <ForecastCard forecast={forecast} />}
    </div>
  );
}
