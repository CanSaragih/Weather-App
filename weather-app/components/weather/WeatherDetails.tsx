import { ForecastItem } from "@/lib/types/weather";
import ForecastCard from "./detail/ForecastCard";
import PrecipitationCard from "./detail/PrecipitationCard";

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
    <div className="grid grid-cols-3 gap-8">
      {/* Forecast */}
      {forecast && forecast.length > 0 && <ForecastCard forecast={forecast} />}

      {/* Precipitation */}
      <PrecipitationCard />
    </div>
  );
}
