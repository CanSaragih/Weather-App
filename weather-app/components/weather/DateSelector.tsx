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

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {dailyForecast.slice(0, 7).map((item) => {
        const date = new Date(item.dt * 1000);
        const isSelected = isSameDay(date, selectedDate);

        return (
          <>
            <div className="flex flex-col items-center gap-2">
              <span
                className={`text-xs font-medium ${isSelected ? "text-zinc-400 dark:text-zinc-500" : "text-zinc-500 dark:text-zinc-400"}`}
              >
                {format(date, "EEE").toLowerCase().charAt(0)}
              </span>
              <button
                key={item.dt}
                onClick={() => onDateSelect(date, item)}
                className={`min-w-10 h-10 rounded-full transition-all shrink-0 cursor-pointer duration-300
                ${isSelected ? "bg-slate-400/80 dark:bg-slate-600 text-white" : "bg-slate-100 dark:bg-slate-700/60 text-zinc-600 dark:text-zinc-200 hover:bg-gray-200 dark:hover:bg-gray-600/70"}`}
              >
                <span className="text-md font-bold">{format(date, "d")}</span>
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
}
