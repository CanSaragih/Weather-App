import { ForecastItem } from "@/lib/types/weather";
import { format, isSameDay, startOfDay } from "date-fns";
import WeatherIcon from "../WeatherIcon";

interface ForecastCardProps {
  forecast: ForecastItem[];
}

interface DailyForecast {
  date: Date;
  dt: number;
  temp_max: number;
  temp_min: number;
  weather: ForecastItem["weather"][0];
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
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

  return (
    <div className="rounded border-2 border-slate-100 bg-white dark:border-border-card-dark-mode dark:bg-card-dark-mode p-6">
      <h2 className="text-lg font-semibold text-blue-950/70 dark:text-slate-300 mb-6">
        Forecast
      </h2>
      <div className="space-y-3">
        {dailyForecast.slice(0, 5).map((day, index) => {
          const dayName =
            index === 0 ? "Tomorrow" : format(day.date, "EEEE").slice(0, 3);
          const tempRange = day.temp_max - day.temp_min;
          const maxTemp = Math.round(day.temp_max);
          const minTemp = Math.round(day.temp_min);

          // Calculate progress percentage (relative to all forecasts)
          const allTemps = dailyForecast.flatMap((d) => [
            d.temp_max,
            d.temp_min,
          ]);
          const globalMin = Math.min(...allTemps);
          const globalMax = Math.max(...allTemps);
          const globalRange = globalMax - globalMin;

          const startPercent = ((day.temp_min - globalMin) / globalRange) * 100;
          const widthPercent = (tempRange / globalRange) * 100;

          return (
            <div
              key={day.dt}
              className="flex items-center gap-4 px-2 rounded-md hover:bg-slate-50 dark:hover:bg-hover-card-dark-mode transition-colors duration-300"
            >
              {/* Day & Icon */}
              <div className="flex items-center gap-3 w-28">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 w-10">
                  {dayName}
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
                    className="absolute h-full bg-slate-400 dark:bg-slate-500/80 rounded-sm"
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
