import { Droplet, Wind } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { SlOptionsVertical } from "react-icons/sl";

interface CityFavoriteCardProps {
  favorites: {
    id: string;
    city: string;
    country: string;
    weatherData: {
      main: {
        temp: number;
        humidity: number;
      };
      weather: {
        description: string;
        icon: string;
      }[];
      wind: {
        speed: number;
      };
    };
  }[];
  handleDelete: (id: string) => void;
}

export default function CityFavoriteCard({
  favorites,
  handleDelete,
}: CityFavoriteCardProps) {
  return (
    <>
      {favorites.map((location) => (
        <div
          key={location.id}
          className="bg-gray-100 dark:bg-card-dark-mode hover:bg-gray-50 dark:hover:bg-hover-card-dark-mode border border-slate-200 dark:border-border-card-dark-mode rounded-lg p-6 space-y-4 transition-colors duration-500 relative group"
        >
          <div className="flex items-center justify-between">
            <div className="flex-col items-start w-3/4 overflow-hidden">
              <h2 className="text-2xl font-medium text-zinc-800 dark:text-zinc-200 truncate">
                {location.city}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1 uppercase tracking-wide truncate">
                {location.country}
              </p>
            </div>
            <Image
              src={`http://openweathermap.org/img/wn/${location.weatherData.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              width={64}
              height={64}
            />
          </div>

          <div className="flex items-center justify-center font-semibold text-5xl py-4 text-zinc-800 dark:text-zinc-300">
            {Math.round(location.weatherData.main.temp)}°
          </div>
          <p className="text-center text-sm capitalize text-gray-500">
            {location.weatherData.weather[0].description}
          </p>

          <div className="flex flex-row gap-10 items-center justify-between px-2 pt-2">
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <Wind size={18} />
              <span className="text-base">
                {Math.round(location.weatherData.wind.speed * 3.6)} km/h
              </span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <Droplet size={18} />
              <span className="text-base">
                {location.weatherData.main.humidity}%
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 transition-opacity text-zinc-600 dark:text-zinc-400 opacity-0 group-hover:opacity-100 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(location.id);
            }}
          >
            <SlOptionsVertical />
          </Button>
        </div>
      ))}
    </>
  );
}
