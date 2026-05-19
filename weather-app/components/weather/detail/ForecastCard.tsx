import { ForecastItem } from "@/lib/types/weather";
import { isSameDay, startOfDay } from "date-fns";
import WeatherIcon from "../WeatherIcon";
import { getDayLabel } from "@/helpers/dayLabel";

interface ForecastCardProps {
  forecast: ForecastItem[];
  selectedDate?: Date;
  onSelect?: (date: Date, item: ForecastItem) => void;
}

interface DailyForecast {
  date: Date;
  dt: number;
  temp_max: number;
  temp_min: number;
  temp: number;
  weather: ForecastItem["weather"][0];
  originalItem?: ForecastItem;
}

export default function ForecastCard({
  forecast,
  selectedDate = new Date(),
  onSelect,
}: ForecastCardProps) {
  const normalizedSelectedDate = startOfDay(selectedDate);

  const dailyForecast = forecast.reduce((acc: DailyForecast[], item) => {
    const date = startOfDay(new Date(item.dt * 1000));
    const existing = acc.find((i) => isSameDay(new Date(i.date), date));

    if (existing) {
      // Update min/max temps
      existing.temp_max = Math.max(existing.temp_max, item.main.temp_max);
      existing.temp_min = Math.min(existing.temp_min, item.main.temp_min);
    } else {
      // Add new day
      acc.push({
        date: date,
        dt: item.dt,
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        temp: item.main.temp,
        weather: item.weather[0],
        originalItem: item,
      });
    }

    return acc;
  }, []);

  const displayForecast = dailyForecast.slice(0, 6);

  return (
    <div className="rounded-[1.5rem] border-2 border-slate-100 bg-white dark:border-border-card-dark-mode dark:bg-[#1C1C1E] p-4">
      <div className="space-y-4">
        {displayForecast.map((day) => {
          const dayLabel = getDayLabel(day.date);
          const temp = Math.round(day.temp);

          const isSelected = isSameDay(day.date, normalizedSelectedDate);

          return (
            <div
              key={day.dt}
              onClick={() =>
                onSelect &&
                day.originalItem &&
                onSelect(day.date, day.originalItem)
              }
              className={`relative cursor-pointer flex items-center justify-between px-3 py-1 rounded-lg transition-colors duration-300 ${
                isSelected
                  ? "bg-transparent rounded-none"
                  : "hover:bg-slate-50 dark:hover:bg-hover-card-dark-mode"
              }`}
            >
              {/* Left Highlight Gradient Background */}
              {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-xs bg-linear-to-b from-[#FF9900] to-[#FFCF5E]" />
              )}
              {/* Day & Icon section */}
              <div className="flex items-center gap-4 pl-2">
                <WeatherIcon
                  icon={day.weather.icon}
                  description={day.weather.description}
                  size="sm"
                />
                <div className="flex flex-col items-start">
                  <span className="text-[15px] font-semibold text-zinc-800 dark:text-zinc-100">
                    {dayLabel}
                  </span>
                  <span className="capitalize text-[13px] text-zinc-500 dark:text-zinc-400">
                    {day.weather.description}
                  </span>
                </div>
              </div>
              {/* Temperature section */}
              <div>
                <span className="text-[18px] font-medium text-zinc-800 dark:text-zinc-300">
                  {temp}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
