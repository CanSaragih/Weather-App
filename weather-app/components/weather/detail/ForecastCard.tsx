import { ForecastItem } from "@/lib/types/weather";
import { addDays, format, isSameDay, startOfDay } from "date-fns";
import WeatherIcon from "../WeatherIcon";

interface ForecastCardProps {
  forecast: ForecastItem[];
  selectedDate?: Date;
}

interface DailyForecast {
  date: Date;
  dt: number;
  temp_max: number;
  temp_min: number;
  weather: ForecastItem["weather"][0];
}

export default function ForecastCard({
  forecast,
  selectedDate = new Date(),
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
        weather: item.weather[0],
      });
    }

    return acc;
  }, []);

  // Filter forecast mulai dari selected date
  const forecastFromSelected = dailyForecast.filter((day) => {
    return day.date >= normalizedSelectedDate;
  });

  // Ambil 5 hari dari selected date
  const displayForecast = forecastFromSelected.slice(0, 5);

  // Calculate global min/max for progress bar
  const allTemps = displayForecast.flatMap((d) => [d.temp_max, d.temp_min]);
  const globalMin = Math.min(...allTemps);
  const globalMax = Math.max(...allTemps);
  const globalRange = globalMax - globalMin;

  // Helper untuk mendapatkan label hari
  const getDayLabel = (date: Date, index: number) => {
    const today = startOfDay(new Date());
    const tomorrow = addDays(today, 1);

    if (isSameDay(date, today)) return "Today";
    if (isSameDay(date, tomorrow)) return "Tomorrow";
    if (isSameDay(date, normalizedSelectedDate) && index === 0)
      return "Selected";

    return format(date, "EEE");
  };

  return (
    <div className="rounded border-2 border-slate-100 bg-white dark:border-border-card-dark-mode dark:bg-card-dark-mode p-6">
      <h2 className="text-lg font-semibold text-blue-950/70 dark:text-slate-300 mb-6">
        Forecast
      </h2>
      <div className="space-y-3">
        {displayForecast.map((day, index) => {
          const dayLabel = getDayLabel(day.date, index);
          const tempRange = day.temp_max - day.temp_min;
          const maxTemp = Math.round(day.temp_max);
          const minTemp = Math.round(day.temp_min);

          const startPercent = ((day.temp_min - globalMin) / globalRange) * 100;
          const widthPercent = (tempRange / globalRange) * 100;

          // Highlight jika selected date
          const isSelected = isSameDay(day.date, normalizedSelectedDate);

          return (
            <div
              key={day.dt}
              className={`flex items-center gap-4 px-2 rounded-md transition-colors duration-300 ${
                isSelected
                  ? "bg-blue-50/60 dark:bg-blue-900/10"
                  : "hover:bg-slate-50 dark:hover:bg-hover-card-dark-mode"
              }`}
            >
              {/* Day & Icon */}
              <div className="flex items-center gap-3 w-28">
                <span
                  className={`text-xs font-medium w-16 ${
                    isSelected
                      ? "text-blue-600/70 dark:text-blue-300/90 font-semibold"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {dayLabel}
                </span>
                <WeatherIcon
                  icon={day.weather.icon}
                  description={day.weather.description}
                  size="sm"
                />
              </div>

              {/* Temperature Bar */}
              <div className="flex-1 flex items-center gap-3">
                {/* Min Temp */}
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 w-7 text-right">
                  {minTemp}°
                </span>

                {/* Progress Bar */}
                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700/40 rounded-sm relative overflow-hidden">
                  <div
                    className={`absolute h-full rounded-sm ${
                      isSelected
                        ? "bg-blue-500/50 dark:bg-blue-300/70"
                        : "bg-slate-400 dark:bg-slate-500/80"
                    }`}
                    style={{
                      left: `${startPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  />
                </div>

                {/* Max Temp */}
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 w-7">
                  {maxTemp}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
