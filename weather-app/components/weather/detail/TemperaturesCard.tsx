"use client";

import { ForecastItem } from "@/lib/types/weather";
import { format, startOfDay, isSameDay } from "date-fns";
import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TemperaturesCardProps {
  forecast?: ForecastItem[];
  selectedDate?: Date;
}

export default function TemperaturesCard({
  forecast,
  selectedDate = new Date(),
}: TemperaturesCardProps) {
  // Filter forecast untuk selected date
  const todayForecast = useMemo(() => {
    if (!forecast) return [];

    const normalizedDate = startOfDay(selectedDate);
    return forecast.filter((item) => {
      const itemDate = startOfDay(new Date(item.dt * 1000));
      return isSameDay(itemDate, normalizedDate);
    });
  }, [forecast, selectedDate]);

  // Prepare data untuk chart
  const chartData = useMemo(() => {
    return todayForecast.map((item) => ({
      time: format(new Date(item.dt * 1000), "HH:mm"),
      temperature: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
    }));
  }, [todayForecast]);

  // Jika tidak ada data
  if (!todayForecast || todayForecast.length === 0) {
    return (
      <div className="border-2 border-slate-100 dark:border-border-card-dark-mode bg-white dark:bg-card-dark-mode p-6 rounded">
        <h2 className="text-lg font-semibold text-blue-950/70 dark:text-slate-300 mb-6">
          Temperatures today
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
          No hourly temperature data available for selected date
        </p>
      </div>
    );
  }

  // Hitung min/max temperature
  const temperatures = todayForecast.map((item) => item.main.temp);
  const minTemp = Math.min(...temperatures);
  const maxTemp = Math.max(...temperatures);

  // Custom Tooltip
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      value: number;
      payload: { time: string; feels_like: number };
    }>;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {payload[0].payload.time}
          </p>
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            {payload[0].value}°C
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Feels like: {payload[0].payload.feels_like}°C
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="border-2 border-slate-100 dark:border-border-card-dark-mode bg-white dark:bg-card-dark-mode p-6 rounded">
      <h2 className="text-lg font-semibold text-blue-950/70 dark:text-slate-300 mb-2">
        Temperatures today
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        <span className="inline-flex items-center gap-1">
          <span className="text-blue-600 dark:text-blue-400">↓</span>
          {Math.round(minTemp)}°
        </span>
        <span className="mx-2">
          <span className="inline-flex items-center gap-1">
            <span className="text-red-600 dark:text-red-400">↑</span>
            {Math.round(maxTemp)}°
          </span>
        </span>
      </p>

      {/* Recharts Area Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="rgb(59, 130, 246)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="rgb(147, 197, 253)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            className="dark:stroke-gray-700"
          />
          <XAxis
            dataKey="time"
            stroke="#9ca3af"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            stroke="#9ca3af"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            tickLine={false}
            domain={["dataMin - 2", "dataMax + 2"]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#3b82f6" }} />
          <Area
            type="monotone"
            dataKey="temperature"
            stroke="#1C4D8D"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorTemp)"
            activeDot={{ r: 6, fill: "#2563eb" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
