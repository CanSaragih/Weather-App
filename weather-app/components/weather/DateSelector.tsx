"use client";

import { ForecastItem } from "@/lib/types/weather";
import { format, isSameDay, startOfDay } from "date-fns";

interface DateSelectorProps {
  forecast: ForecastItem[];
  selectedDate: Date;
  onDateSelect: (date: Date, item: ForecastItem) => void;
}

export default function DateSelector({
  forecast,
  selectedDate,
  onDateSelect,
}: DateSelectorProps) {
  // Group forecast by date (ambil 1 item pertama per hari)
  const dailyForecast = forecast.reduce((acc: ForecastItem[], item) => {
    const date = startOfDay(new Date(item.dt * 1000));
    const exists = acc.find((i) => isSameDay(new Date(i.dt * 1000), date));

    if (!exists) {
      acc.push(item);
    }

    return acc;
  }, []);

  console.log("Daily forecast:", dailyForecast);

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {dailyForecast.slice(0, 7).map((item) => {
        const date = new Date(item.dt * 1000);
        const isSelected = isSameDay(date, selectedDate);

        return (
          <button
            key={item.dt}
            onClick={() => onDateSelect(date, item)}
            className={`flex flex-col items-center justify-center min-w-[48px] h-[48px] rounded-full transition-all shrink-0
              ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            <span className="text-xs font-medium">
              {format(date, "EEE").toLowerCase().charAt(0)}
            </span>
            <span className="text-sm font-bold">{format(date, "d")}</span>
          </button>
        );
      })}
    </div>
  );
}
