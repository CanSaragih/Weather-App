"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input2";
import { Button } from "./ui/button";
import { Loader2, LocateFixedIcon } from "lucide-react";
import { WeatherAPI } from "@/lib/api/weather";
import { City } from "@/lib/types/weather";
import { createClient } from "@/lib/supabase/client";

interface ModalAddFavoriteProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  onSuccess: () => void;
}

export default function ModalAddFavorite({
  modalOpen,
  setModalOpen,
  onSuccess,
}: ModalAddFavoriteProps) {
  const router = useRouter();
  const supabase = createClient();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      setIsLoading(true);
      try {
        const results = await WeatherAPI.searchCities(query);
        setSuggestions(results);
      } catch (error) {
        console.error("Error searching cities", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchCities, 500);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleAddFavorite = async (city: City) => {
    setIsSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setModalOpen(false);
        router.push("/login?redirectTo=/favorites");
        return;
      }

      const { error } = await supabase.from("favorites").insert({
        user_id: user.id,
        city_name: city.name,
        country: city.country,
        lat: city.coord.lat,
        lon: city.coord.lon,
      });

      if (error) {
        if (error.code === "23505") {
          alert("City already in favorites!");
        } else {
          throw error;
        }
      } else {
        setQuery("");
        setModalOpen(false);
        onSuccess();
      }
    } catch (error) {
      console.error("Error saving favorite:", error);
      alert(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent>
        <DialogTitle className="text-2xl text-shadow-neutral-800 dark:text-neutral-200 font-bold mb-2">
          Add Favorite Location
        </DialogTitle>

        <div className="space-y-4">
          <div className="relative mt-4">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <Input
              type="search"
              placeholder="Search for a city..."
              className="pl-10 py-5 w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-start mt-4 h-64 overflow-y-auto pr-2">
            <span className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 uppercase tracking-wide">
              {isLoading ? "Searching..." : "Suggestions"}
            </span>

            <div className="mt-2 w-full flex flex-col gap-2">
              {suggestions.map((suggestion) => (
                <div
                  key={`${suggestion.coord.lat}-${suggestion.coord.lon}`}
                  className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-900/80 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-zinc-100 dark:bg-zinc-600/30 rounded-md p-2 text-[#ffc07a]">
                      <LocateFixedIcon size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-black dark:text-white">
                        {suggestion.name}
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {suggestion.country}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="h-10 w-10 cursor-pointer rounded-full shrink-0"
                    onClick={() => handleAddFavorite(suggestion)}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <IoMdAdd />
                    )}
                  </Button>
                </div>
              ))}

              {!isLoading && query.length >= 2 && suggestions.length === 0 && (
                <p className="text-zinc-500 text-sm mt-4 text-center">
                  No cities found.
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
