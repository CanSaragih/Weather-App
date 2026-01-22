import { Droplets, Wind, Gauge, Eye } from "lucide-react";

interface WeatherDetailsProps {
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  feelsLike: number;
}

export default function WeatherDetails({
  humidity,
  windSpeed,
  pressure,
  visibility,
  feelsLike,
}: WeatherDetailsProps) {
  const details = [
    {
      icon: Droplets,
      label: "Humidity",
      value: `${humidity}%`,
      color: "text-blue-500",
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${windSpeed} m/s`,
      color: "text-cyan-500",
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: `${pressure} hPa`,
      color: "text-purple-500",
    },
    {
      icon: Eye,
      label: "Visibility",
      value: `${(visibility / 1000).toFixed(1)} km`,
      color: "text-green-500",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Feels Like */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          Feels like
        </p>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">
          {feelsLike}°C
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        {details.map((detail) => {
          const Icon = detail.icon;
          return (
            <div
              key={detail.label}
              className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${detail.color}`} />
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {detail.label}
                </p>
              </div>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {detail.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
