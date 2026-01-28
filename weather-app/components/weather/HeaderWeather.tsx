import { WeatherData, ForecastItem } from "@/lib/types/weather";
import WeatherIcon from "./WeatherIcon";
import { format, isToday } from "date-fns";
import DateSelector from "./DateSelector";

interface HeaderWeatherProps {
  weather: WeatherData;
  forecast?: ForecastItem[];
  selectedDate?: Date;
  selectedForecast?: ForecastItem | null;
  onDateSelect?: (date: Date, item: ForecastItem) => void;
}

export default function HeaderWeather({
  weather,
  forecast,
  selectedDate = new Date(),
  selectedForecast,
  onDateSelect,
}: HeaderWeatherProps) {
  // Data yang akan ditampilkan (forecast jika ada, atau weather current)
  const displayData = selectedForecast
    ? {
        weather: selectedForecast.weather[0],
        main: selectedForecast.main,
      }
    : {
        weather: weather.weather[0],
        main: weather.main,
      };

  const displayCity = weather.city;
  const isCurrentDay = isToday(selectedDate);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <WeatherIcon
            icon={displayData.weather.icon}
            description={displayData.weather.description}
            size="xl"
          />
          <h1 className="text-6xl font-bold text-zinc-800 dark:text-zinc-100">
            {displayCity},{" "}
          </h1>
          <h1 className="text-6xl font-bold text-zinc-800 dark:text-zinc-100 mr-2">
            {Math.round(displayData.main.temp)}°
          </h1>

          <h1 className="text-6xl font-bold text-zinc-400/60 dark:text-zinc-500/50">
            {isCurrentDay ? "Today" : format(selectedDate, "MMM d")}
          </h1>
        </div>

        {/* Date Selector */}
        {forecast && forecast.length > 0 && onDateSelect && (
          <DateSelector
            forecast={forecast}
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
          />
        )}
      </div>
    </div>
  );
}
