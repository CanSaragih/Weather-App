import { ForecastItem } from "@/lib/types/weather";
import { format, addDays, startOfDay, isSameDay } from "date-fns";

interface ComparisonCardProps {
  forecast: ForecastItem[];
  selectedDate?: Date;
}

interface DayComparison {
  label: string;
  date: Date;
  temp_min: number;
  temp_max: number;
}

export default function ComparisonCard({
  forecast,
  selectedDate = new Date(),
}: ComparisonCardProps) {
  // Group forecast by date
  const dailyForecast = forecast.reduce((acc: DayComparison[], item) => {
    const date = startOfDay(new Date(item.dt * 1000));
    const existing = acc.find((i) => isSameDay(new Date(i.date), date));

    if (existing) {
      existing.temp_max = Math.max(existing.temp_max, item.main.temp_max);
      existing.temp_min = Math.min(existing.temp_min, item.main.temp_min);
    } else {
      acc.push({
        label: "",
        date: date,
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
      });
    }

    return acc;
  }, []);

  // Cari index dari selected date
  const selectedIndex = dailyForecast.findIndex((day) =>
    isSameDay(day.date, startOfDay(selectedDate)),
  );

  // Ambil 3 hari: selected date sebagai center, yesterday, tomorrow
  const yesterday = addDays(selectedDate, -1);
  const tomorrow = addDays(selectedDate, 1);

  // Filter dan sort berdasarkan selected date
  let comparisonDays: DayComparison[] = [];

  // Cari yesterday
  const yesterdayData = dailyForecast.find((day) =>
    isSameDay(day.date, yesterday),
  );
  if (yesterdayData) {
    comparisonDays.push({ ...yesterdayData, label: "Yesterday" });
  }

  // Cari selected date (Today)
  const todayData = dailyForecast.find((day) =>
    isSameDay(day.date, startOfDay(selectedDate)),
  );
  if (todayData) {
    comparisonDays.push({ ...todayData, label: "Today" });
  }

  // Cari tomorrow
  const tomorrowData = dailyForecast.find((day) =>
    isSameDay(day.date, tomorrow),
  );
  if (tomorrowData) {
    comparisonDays.push({ ...tomorrowData, label: "Tomorrow" });
  }

  // Jika tidak ada cukup data, ambil 3 hari berturut-turut dari selected
  if (comparisonDays.length < 3 && selectedIndex >= 0) {
    comparisonDays = dailyForecast
      .slice(selectedIndex, selectedIndex + 3)
      .map((day, idx) => {
        if (idx === 0) return { ...day, label: "Today" };
        if (idx === 1) return { ...day, label: "Tomorrow" };
        return { ...day, label: format(day.date, "EEEE") };
      });
  }

  // Fallback: ambil 3 hari pertama
  if (comparisonDays.length === 0) {
    comparisonDays = dailyForecast.slice(0, 3).map((day, idx) => {
      if (idx === 0) return { ...day, label: "Today" };
      if (idx === 1) return { ...day, label: "Tomorrow" };
      return { ...day, label: format(day.date, "EEEE") };
    });
  }

  // Calculate global min/max for progress bar
  const allTemps = comparisonDays.flatMap((d) => [d.temp_max, d.temp_min]);
  const globalMin = Math.min(...allTemps);
  const globalMax = Math.max(...allTemps);
  const globalRange = globalMax - globalMin;

  // Generate comparison insight
  const getInsight = () => {
    if (comparisonDays.length < 2) return "Not enough data for comparison.";

    const day1 = comparisonDays[0];
    const day2 = comparisonDays[1];

    const tempDiff = Math.abs(day2.temp_max - day1.temp_max);

    if (day2.temp_max > day1.temp_max) {
      return `The maximum temperature will increase by ${tempDiff.toFixed(1)}° from ${day1.label} to ${day2.label}.`;
    } else if (day2.temp_max < day1.temp_max) {
      return `The maximum temperature will decrease by ${tempDiff.toFixed(1)}° from ${day1.label} to ${day2.label}.`;
    } else {
      return `The maximum temperature will remain the same between ${day1.label} and ${day2.label}.`;
    }
  };

  return (
    <div className="border-2 border-slate-100 bg-white dark:border-border-card-dark-mode dark:bg-card-dark-mode p-6 rounded">
      <h2 className="text-lg font-semibold text-blue-950/70 dark:text-slate-300 mb-6">
        Comparison by day
      </h2>

      <div className="space-y-6">
        {comparisonDays.map((day) => {
          const tempRange = day.temp_max - day.temp_min;
          const minTemp = Math.round(day.temp_min);
          const maxTemp = Math.round(day.temp_max);

          const startPercent = ((day.temp_min - globalMin) / globalRange) * 100;
          const widthPercent = (tempRange / globalRange) * 100;

          return (
            <div key={day.date.toISOString()} className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-zinc-800 dark:text-zinc-300">
                  {day.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-400 dark:text-zinc-400/90">
                    {minTemp}°
                  </span>
                  <span className="text-sm text-zinc-600 dark:text-zinc-300/90">
                    {maxTemp}°
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-full relative overflow-hidden">
                <div
                  className="absolute h-full bg-linear-to-r from-blue-300/60 to-blue-500/60 rounded-full"
                  style={{
                    left: `${startPercent}%`,
                    width: `${widthPercent}%`,
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* Insight */}
        <div className="pt-4 border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-300/90">
            {getInsight()}
          </p>
        </div>
      </div>
    </div>
  );
}
