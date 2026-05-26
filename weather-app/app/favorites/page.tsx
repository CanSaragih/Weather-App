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
import CityFavoriteCard from "@/components/favorite/CItyFavoriteCard";
import { EmptyState } from "@/components/favorite/EmptyState";

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
        <EmptyState
          icon="IconMapPin"
          label="Saved locations"
          title="Sign in to save cities"
          description="Keep track of weather across your favorite places. Sign in to get started."
          action={{
            label: "Sign in",
            variant: "outline",
            onClick: () => router.push("/login?redirectTo=/favorites"),
          }}
        />
      ) : isFetching ? (
        <div className="mt-20 flex justify-center items-center">
          <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="mt-12 px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.length === 0 ? (
            <EmptyState
              icon="IconMapPin"
              label="No locations yet"
              title="Add your first city"
              description="Search for a city and save it here to see its weather at a glance."
              action={{
                label: "+ Add location",
                variant: "outline",
                onClick: () => setShowModal(true),
              }}
            />
          ) : (
            <CityFavoriteCard
              favorites={favorites}
              handleDelete={handleDelete}
            />
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
