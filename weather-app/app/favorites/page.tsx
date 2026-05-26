"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { Droplet, Loader2, Wind } from "lucide-react";
import ModalAddFavorite from "@/components/ModalAddFavorite";
import { createClient } from "@/lib/supabase/client";
import { WeatherAPI } from "@/lib/api/weather";
import { WeatherData } from "@/lib/types/weather";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

interface FavoriteWithWeather {
  id: string;
  city: string;
  country: string;
  weatherData: WeatherData;
}

export default function FavoritesPage() {
  const router = useRouter();
  const { user, loading } = useAuth(); // ← pakai ini saja untuk cek auth
  const supabase = createClient();
  const [showModal, setShowModal] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteWithWeather[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const fetchFavoritesAndWeather = useCallback(async () => {
    if (!user) return; // ← guard, tidak fetch kalau belum login

    setIsFetching(true);
    try {
      const { data: savedCities, error } = await supabase
        .from("favorites")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (!savedCities || savedCities.length === 0) {
        setFavorites([]);
        return;
      }

      const weatherPromises = savedCities.map(async (savedCity) => {
        try {
          const weather = await WeatherAPI.getWeatherByCoords(
            savedCity.lat,
            savedCity.lon,
          );
          return {
            id: savedCity.id,
            city: savedCity.city_name,
            country: savedCity.country,
            weatherData: weather,
          };
        } catch {
          return null;
        }
      });

      const results = await Promise.all(weatherPromises);
      setFavorites(
        results.filter((item): item is FavoriteWithWeather => item !== null),
      );
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setIsFetching(false);
    }
  }, [user, supabase]); // ← depend on user

  useEffect(() => {
    if (!loading) {
      fetchFavoritesAndWeather();
    }
  }, [loading, fetchFavoritesAndWeather]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("favorites").delete().eq("id", id);
    if (!error) {
      setFavorites((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const handleAddLocationClick = () => {
    console.log("user:", user, "loading:", loading);
    if (!user) {
      router.push("/login?redirectTo=/favorites");
      return;
    }
    setShowModal(true);
  };

  // Loading state (tunggu auth selesai cek)
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-25 md:py-25 md:px-10 xl:py-35 xl:px-20 bg-white dark:bg-dark-mode">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-semibold text-gray-800 dark:text-gray-200">
            Saved Locations
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Real-time cinematic weather data for your favorite locations.
          </p>
        </div>
        <Button
          className="cursor-pointer"
          onClick={handleAddLocationClick}
          disabled={loading}
        >
          <MdOutlineAddLocationAlt size={20} />
          <span className="hidden sm:inline-block ml-2">Add Location</span>
        </Button>
      </div>

      {/* Belum login */}
      {!user ? (
        <div className="mt-20 flex flex-col items-center text-center">
          <p className="text-gray-500 mb-4">
            You need to log in to save favorite locations.
          </p>
        </div>
      ) : isFetching ? (
        <div className="mt-20 flex justify-center items-center">
          <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="mt-12 px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.length === 0 ? (
            <p className="text-gray-500 w-full col-span-4 mt-10">
              You haven &apos;t added any favorite locations yet.
            </p>
          ) : (
            favorites.map((location) => (
              <div
                key={location.id}
                className="bg-gray-100 dark:bg-card-dark-mode hover:bg-gray-50 dark:hover:bg-hover-card-dark-mode border border-slate-200 dark:border-border-card-dark-mode rounded-lg p-6 space-y-4 cursor-pointer transition-colors duration-500 relative group"
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
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(location.id);
                  }}
                >
                  Remove
                </Button>
              </div>
            ))
          )}
        </div>
      )}

      {showModal && (
        <ModalAddFavorite
          modalOpen={showModal}
          setModalOpen={setShowModal}
          onSuccess={fetchFavoritesAndWeather}
        />
      )}
    </div>
  );
}
