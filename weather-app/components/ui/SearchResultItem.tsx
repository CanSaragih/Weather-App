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
      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 
                 transition-colors rounded-lg text-left group"
    >
      <div
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 
                      rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors"
      >
        <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {city.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {city.country}
        </p>
      </div>

      <div className="text-xs text-gray-400 dark:text-gray-500">
        {city.coord.lat.toFixed(2)}, {city.coord.lon.toFixed(2)}
      </div>
    </button>
  );
}
