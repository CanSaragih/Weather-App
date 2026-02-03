import { ForecastItem } from "@/lib/types/weather";
import ForecastCard from "./detail/ForecastCard";
import PrecipitationCard from "./detail/PrecipitationCard";
import ComparisionCard from "./detail/ComparisonCard";

interface WeatherDetailsProps {
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  feelsLike: number;
  forecast?: ForecastItem[];
  selectedDate?: Date;
}

export default function WeatherDetails({
  humidity,
  windSpeed,
  pressure,
  visibility,
  feelsLike,
  forecast,
  selectedDate,
}: WeatherDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 ">
      {/* Forecast */}
      {forecast && forecast.length > 0 && <ForecastCard forecast={forecast} />}

      {/* Precipitation */}
      {forecast && forecast.length > 0 && (
        <PrecipitationCard forecast={forecast} selectedDate={selectedDate} />
      )}

      {/* Comparison by day*/}
      {forecast && forecast.length > 0 && (
        <ComparisionCard forecast={forecast} selectedDate={selectedDate} />
      )}
    </div>
  );
}
