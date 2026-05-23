"use client"; // Tambahkan ini karena kita akan mengambil data dari context

import { useWeather } from "@/contexts/WeatherContext";
import WeatherCard from "@/components/weather/WeatherCard";
import WeatherSkeleton from "@/components/weather/WeatherSkeleton";

export default function DashboardPage() {
  const { weather, forecast, isLoading } = useWeather();
  return (
    <div className="min-h-screen py-25 md:py-25 md:px-10 xl:py-25 xl:px-20 bg-white dark:bg-dark-mode">
      <div className="mx-auto w-full">
        {/* Tampilkan Loading ketika fetch API berjalan */}
        {isLoading && <WeatherSkeleton />}

        {/* Jika belum ada data dan sedang tidak loading, Anda dapat mengarahkan opsi kosong */}
        {!isLoading && !weather && (
          <div className="text-center mt-20">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Silakan cari kota pada Navbar untuk melihat detail cuaca di sini.
            </p>
          </div>
        )}

        {/* Tampilkan data cuaca setelah berhasil di get */}
        {!isLoading && weather && (
          <WeatherCard weather={weather} forecast={forecast} />
        )}
      </div>
    </div>
  );
}
