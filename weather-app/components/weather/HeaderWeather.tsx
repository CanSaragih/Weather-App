import { WeatherData } from "@/lib/types/weather";
import WeatherIcon from "./WeatherIcon";

export default function HeaderWeather({ weather }: { weather: WeatherData }) {
  console.log(">>>> INI DATA", weather);

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-4">
        <WeatherIcon
          icon={weather.weather.icon}
          description={weather.weather.description}
          size="xl"
        />
        <h1 className="text-6xl font-bold text-zinc-800 dark:text-zinc-100">
          {weather.city}
          {",  "}
        </h1>
        <h1 className="text-6xl font-bold text-zinc-800 dark:text-zinc-100 mr-2">
          {weather.main.temp}°
        </h1>

        {/* jika hari sekarang gunakan today dan jika tidak hari sekarang hitung dari hari sekarang */}
        <h1 className="text-6xl font-bold text-zinc-400 dark:text-zinc-500">
          Today
        </h1>
      </div>
    </div>
  );
}
