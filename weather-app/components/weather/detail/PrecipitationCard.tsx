import { CloudRain, Cloud, Snowflake } from "lucide-react";
import { ForecastItem } from "@/lib/types/weather";
import { addDays, subDays, startOfDay, isSameDay, isToday } from "date-fns";

interface PrecipitationCardProps {
  forecast: ForecastItem[];
  selectedDate?: Date;
}

export default function PrecipitationCard({
  forecast,
  selectedDate = new Date(),
}: PrecipitationCardProps) {
  const normalizedSelectedDate = startOfDay(selectedDate);
  const todayDate = startOfDay(new Date());

  // Cek apakah selected date adalah hari ini
  const isSelectedToday = isSameDay(normalizedSelectedDate, todayDate);

  // Definisikan range tanggal berdasarkan selected date
  const previousDay = subDays(normalizedSelectedDate, 1);
  const nextDay = addDays(normalizedSelectedDate, 1);
  const nextWeekEnd = addDays(normalizedSelectedDate, 7);

  // Filter untuk "Previous Day" (1 hari sebelum selected date)
  const previousDayForecast = forecast.filter((item) => {
    const itemDate = startOfDay(new Date(item.dt * 1000));
    return isSameDay(itemDate, previousDay);
  });

  // Filter untuk "Selected Day"
  const selectedDayForecast = forecast.filter((item) => {
    const itemDate = startOfDay(new Date(item.dt * 1000));
    return isSameDay(itemDate, normalizedSelectedDate);
  });

  // Filter untuk "Next Day"
  const nextDayForecast = forecast.filter((item) => {
    const itemDate = startOfDay(new Date(item.dt * 1000));
    return isSameDay(itemDate, nextDay);
  });

  // Filter untuk "Next Week" (7 hari dari selected date)
  const nextWeekForecast = forecast.filter((item) => {
    const itemDate = startOfDay(new Date(item.dt * 1000));
    return itemDate > normalizedSelectedDate && itemDate <= nextWeekEnd;
  });

  // Helper untuk mendapatkan icon berdasarkan weather
  const getWeatherIcon = (weatherMain: string) => {
    if (weatherMain.toLowerCase().includes("rain")) {
      return <CloudRain className="w-5 h-5" />;
    }
    if (weatherMain.toLowerCase().includes("snow")) {
      return <Snowflake className="w-5 h-5" />;
    }
    return <Cloud className="w-5 h-5" />;
  };

  // Cek apakah ada hujan/salju
  const hasRainPreviousDay = previousDayForecast.some((item) =>
    item.weather[0].main.toLowerCase().includes("rain"),
  );
  const hasRainSelectedDay = selectedDayForecast.some((item) =>
    item.weather[0].main.toLowerCase().includes("rain"),
  );
  const hasRainNextDay = nextDayForecast.some((item) =>
    item.weather[0].main.toLowerCase().includes("rain"),
  );
  const hasSnowNextWeek = nextWeekForecast.some((item) =>
    item.weather[0].main.toLowerCase().includes("snow"),
  );
  const hasRainNextWeek = nextWeekForecast.some((item) =>
    item.weather[0].main.toLowerCase().includes("rain"),
  );

  // Data untuk ditampilkan
  const previousDayData = previousDayForecast[0] || null;
  const selectedDayData = selectedDayForecast[0] || null;
  const nextDayData = nextDayForecast[0] || null;
  const nextWeekData =
    nextWeekForecast.find(
      (item) =>
        item.weather[0].main.toLowerCase().includes("snow") ||
        item.weather[0].main.toLowerCase().includes("rain"),
    ) || nextWeekForecast[0];

  return (
    <div className="border-2 border-gray-100 bg-white dark:border-border-card-dark-mode dark:bg-card-dark-mode p-6 rounded">
      <h2 className="font-semibold text-lg text-blue-950/70 dark:text-slate-300 mb-6">
        Weather Conditions
      </h2>

      <div className="space-y-6">
        {/* Previous Day (hanya tampil jika ada data) */}
        {previousDayData && (
          <>
            <div>
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-2">
                Previous Day
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                  {getWeatherIcon(previousDayData.weather[0].main)}
                  <span className="font-medium">
                    {previousDayData.weather[0].main}
                  </span>
                </div>
                <span className="text-sm font-semibold text-blue-700/70 dark:text-blue-300/90">
                  {hasRainPreviousDay ? "Rain detected" : "No rain"}
                </span>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700"></div>
          </>
        )}

        {/* Selected Day / Current Day */}
        <div>
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-2">
            {isSelectedToday ? "Current Day" : "Selected Day"}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
              {selectedDayData ? (
                <>
                  {getWeatherIcon(selectedDayData.weather[0].main)}
                  <span className="font-medium">
                    {selectedDayData.weather[0].main}
                  </span>
                </>
              ) : (
                <>
                  <Cloud className="w-5 h-5" />
                  <span className="font-medium">No forecast data</span>
                </>
              )}
            </div>
            <span className="text-sm font-semibold text-blue-700/70 dark:text-blue-300/90">
              {selectedDayData && hasRainSelectedDay
                ? "Rain expected"
                : "No rain"}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* Next Day */}
        {nextDayData && (
          <>
            <div>
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-2">
                Next Day
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                  {getWeatherIcon(nextDayData.weather[0].main)}
                  <span className="font-medium">
                    {nextDayData.weather[0].main}
                  </span>
                </div>
                <span className="text-sm font-semibold text-blue-700/70 dark:text-blue-300/90">
                  {hasRainNextDay ? "Rain expected" : "No rain"}
                </span>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700"></div>
          </>
        )}

        {/* Next Week (7 hari dari selected date) */}
        <div>
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-2">
            Next Week
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
              {nextWeekData ? (
                <>
                  {getWeatherIcon(nextWeekData.weather[0].main)}
                  <span className="font-medium">
                    {hasSnowNextWeek
                      ? "Snow"
                      : hasRainNextWeek
                        ? "Rain"
                        : nextWeekData.weather[0].main}
                  </span>
                </>
              ) : (
                <>
                  <Cloud className="w-5 h-5" />
                  <span className="font-medium">Normal conditions</span>
                </>
              )}
            </div>
            <span className="text-sm font-semibold text-blue-700/70 dark:text-blue-300/90">
              {hasSnowNextWeek
                ? "Snow expected"
                : hasRainNextWeek
                  ? "Rain expected"
                  : "No precipitation"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
