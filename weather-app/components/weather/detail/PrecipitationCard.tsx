import { CloudRain, Cloud, Snowflake } from "lucide-react";
import { ForecastItem } from "@/lib/types/weather";
import { addDays } from "date-fns";

interface PrecipitationCardProps {
  forecast: ForecastItem[];
}

export default function PrecipitationCard({
  forecast,
}: PrecipitationCardProps) {
  const now = new Date();
  const next24Hours = addDays(now, 1);
  const nextWeek = addDays(now, 7);

  // Filter untuk 24 jam terakhir (gunakan current weather)
  const last24Hours = forecast[0];

  // Filter untuk 24 jam ke depan
  const next24HoursForecast = forecast.filter((item) => {
    const itemDate = new Date(item.dt * 1000);
    return itemDate <= next24Hours;
  });

  // Filter untuk minggu depan
  const nextWeekForecast = forecast.filter((item) => {
    const itemDate = new Date(item.dt * 1000);
    return itemDate > next24Hours && itemDate <= nextWeek;
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
  const hasRainLast24 = last24Hours?.weather[0]?.main
    .toLowerCase()
    .includes("rain");
  const hasRainNext24 = next24HoursForecast.some((item) =>
    item.weather[0].main.toLowerCase().includes("rain"),
  );
  const hasSnowNextWeek = nextWeekForecast.some((item) =>
    item.weather[0].main.toLowerCase().includes("snow"),
  );

  return (
    <div className="border-2 border-gray-100 bg-white dark:border-border-card-dark-mode dark:bg-card-dark-mode p-6 rounded">
      <h2 className="font-semibold text-lg text-blue-950/70 dark:text-slate-300 mb-6">
        Weather Conditions
      </h2>

      <div className="space-y-6">
        {/* Last 24 Hours */}
        <div>
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-2">
            Last 24 Hours
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
              {getWeatherIcon(last24Hours?.weather[0]?.main || "Clear")}
              <span className="font-medium">
                {last24Hours?.weather[0]?.main || "No data"}
              </span>
            </div>
            <span className="text-sm font-semibold text-blue-700/70 dark:text-blue-300/90">
              {hasRainLast24 ? "Rain detected" : "No rain"}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* Next 24 Hours */}
        <div>
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-2">
            Next 24 Hours
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
              {getWeatherIcon(
                next24HoursForecast[0]?.weather[0]?.main || "Clear",
              )}
              <span className="font-medium">
                {next24HoursForecast[0]?.weather[0]?.main || "Clear"}
              </span>
            </div>
            <span className="text-sm font-semibold text-blue-700/70 dark:text-blue-300/90">
              {hasRainNext24 ? "Rain expected" : "No rain"}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* Next Week */}
        <div>
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-2">
            Next Week
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
              {hasSnowNextWeek ? (
                <Snowflake className="w-5 h-5" />
              ) : (
                <Cloud className="w-5 h-5" />
              )}
              <span className="font-medium">
                {hasSnowNextWeek ? "Snow" : "Normal conditions"}
              </span>
            </div>
            <span className="text-sm font-semibold text-blue-700/70 dark:text-blue-300/90">
              {hasSnowNextWeek ? "Snow expected" : "No precipitation"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
