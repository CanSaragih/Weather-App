"use client";

import { City } from "@/lib/types/weather";
import { MapPin } from "lucide-react";

interface SearchResultItemProps {
  city: City;
  onClick: (city: City) => void;
}

export default function SearchResultItem({
  city,
  onClick,
}: SearchResultItemProps) {
  return (
    <button
      onClick={() => onClick(city)}
      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-100/90 dark:hover:bg-zinc-900/70
                 transition-colors duration-300 rounded-lg text-left group cursor-pointer"
    >
      <div
        className="flex shrink-0 w-8 h-8 items-center justify-center bg-orange-100 dark:bg-orange-900/30 
                      rounded-full group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-colors"
      >
        <MapPin className="w-4 h-4 text-orange-600 dark:text-orange-400" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
          {city.name}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {city.country}
        </p>
      </div>

      <div className="text-xs text-zinc-400 dark:text-zinc-500">
        {city.coord.lat.toFixed(2)}, {city.coord.lon.toFixed(2)}
      </div>
    </button>
  );
}
