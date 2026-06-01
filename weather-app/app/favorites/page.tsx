"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { Loader2 } from "lucide-react";
import ModalAddFavorite from "@/components/ModalAddFavorite";
import { createClient } from "@/lib/supabase/client";
import { WeatherAPI } from "@/lib/api/weather";
import { WeatherData } from "@/lib/types/weather";
import { useAuth } from "@/hooks/useAuth";
import CityFavoriteCard from "@/components/favorite/CItyFavoriteCard";
import { EmptyState } from "@/components/favorite/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonFavoriteCard from "@/components/favorite/SkeletonFavoriteCard";
import ModalLogin from "@/components/ModalLogin";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface FavoriteWithWeather {
  id: string;
  city: string;
  country: string;
  weatherData: WeatherData;
}

export default function FavoritesPage() {
  const supabase = useMemo(() => createClient(), []);

  const { user, loading } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteWithWeather[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchFavoritesAndWeather = useCallback(async () => {
    if (!user) return;

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
  }, [user, supabase]);

  useEffect(() => {
    if (!loading) {
      if (user) {
        fetchFavoritesAndWeather();
      }
      setShowLoginModal(!user);
    }
  }, [loading, user, fetchFavoritesAndWeather]);

  const handleDelete = async (id: string) => {
    const previous = favorites;
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));

    const { error } = await supabase.from("favorites").delete().eq("id", id);

    if (error) {
      setFavorites(previous);
      toast.error("Failed to delete favorite. Please try again.");
    } else {
      toast.success("Favorite deleted successfully!");
    }
  };

  const handleAddLocationClick = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setShowModal(true);
  };

  // Loading state (tunggu auth selesai cek)
  if (loading) {
    return (
      <div className="min-h-screen py-25 px-4 md:py-25 md:px-10 xl:py-35 xl:px-20 bg-white dark:bg-dark-mode">
        {/* <div className="flex items-center justify-between">
          <div className="space-y-4">
            <Skeleton className="h-12 w-64 bg-gray-200 dark:bg-zinc-800" />
            <Skeleton className="h-5 w-80 bg-gray-200 dark:bg-zinc-800" />
          </div>
          <Skeleton className="h-10 w-36 rounded-md bg-gray-200 dark:bg-zinc-800" />
        </div>

        <SkeletonFavoriteCard /> */}
        <div className="flex items-center justify-center">
          <Spinner className="h-6 w-6 md:h-8 md:w-8  text-zinc-300" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-25 md:py-25 md:px-10 xl:py-35 xl:px-20 bg-white dark:bg-dark-mode">
      {user && favorites.length > 0 && (
        <div className="flex items-center justify-between px-4 md:px-0">
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
      )}

      {isFetching ? (
        <SkeletonFavoriteCard />
      ) : favorites.length === 0 ? (
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
        <div className="px-4 mt-8 md:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CityFavoriteCard favorites={favorites} handleDelete={handleDelete} />
        </div>
      )}

      {showModal && (
        <ModalAddFavorite
          modalOpen={showModal}
          setModalOpen={setShowModal}
          onSuccess={fetchFavoritesAndWeather}
        />
      )}

      {/* modal login  */}
      {showLoginModal && (
        <ModalLogin
          modalOpen={showLoginModal}
          setModalOpen={setShowLoginModal}
        />
      )}
    </div>
  );
}
