"use client";

import { Dialog, DialogContent } from "./dialog";
import CurrentLocationButton from "../weather/ButtonCurrentLocation";
import SearchResultItem from "./SearchResultItem";
import { WeatherAPI } from "@/lib/api/weather";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { City } from "@/lib/types/weather";
import { Spinner } from "./spinner";
import { Input } from "./input2";
import { Kbd } from "./kbd";
interface ModalSearchProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  onCitySelect?: (city: City) => void;
  onCurrentLocation?: (lat: number, lon: number) => void;
}

export default function ModalSearch({
  modalOpen,
  setModalOpen,
  onCitySelect,
  onCurrentLocation,
}: ModalSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [error, setError] = useState("");
  const [locationError, setLocationError] = useState("");

  // Debounced search
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (query.length < 2) {
        setResults([]);
        setError("");
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const cities = await WeatherAPI.searchCities(query);
        setResults(cities);

        if (cities.length === 0) {
          setError("No cities found. Try another search term.");
        }
      } catch (err) {
        setError("Failed to search cities. Please try again.");
        setResults([]);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delaySearch);
  }, [query]);

  // Reset state when modal closes
  useEffect(() => {
    if (!modalOpen) {
      setQuery("");
      setResults([]);
      setError("");
      setLocationError("");
      setIsGettingLocation(false);
    }
  }, [modalOpen]);

  const handleCityClick = (city: City) => {
    onCitySelect?.(city);
    setModalOpen(false);
  };

  const handleCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setIsGettingLocation(true);
    setLocationError("");
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setIsGettingLocation(false);
        setModalOpen(false);
        setTimeout(() => {
          onCurrentLocation?.(latitude, longitude);
        }, 100);
      },
      (error) => {
        setIsGettingLocation(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError(
              "Permission denied. Please allow location access.",
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setLocationError("The request to get your location timed out.");
            break;
          default:
            setLocationError(
              "An unknown error occurred while fetching location.",
            );
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="flex flex-col">
        <div className="space-y-6">
          <div className="mt-6">
            <CurrentLocationButton
              handleCurrentLocation={handleCurrentLocation}
              isGettingLocation={isGettingLocation}
            />
          </div>

          {/* location error */}
          {locationError && (
            <div className="text-center py-2">
              <Kbd className="text-xs text-zinc-600 bg-zinc-800/10 dark:bg-zinc-500/20">
                {locationError}
              </Kbd>
            </div>
          )}

          {/* Divider */}
          <div className="relative flex justify-center text-xs">
            <span className=" text-zinc-500 dark:text-zinc-400">
              or search city
            </span>
          </div>

          {/* Search Input */}
          <div className="relative">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <Input
              type="search"
              placeholder="Search for a city..."
              className="pl-10 py-5 w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto">
          {!query && !isLoading && results.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Start typing to search for a city
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !locationError && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center py-8">
                <Kbd className="text-sm text-red-600 dark:text-red-500/80d">
                  {error}
                </Kbd>
              </div>
            </div>
          )}

          {/* Results List */}
          {results.length > 0 && (
            <div className="space-y-1">
              {results.map((city) => (
                <SearchResultItem
                  key={city.id}
                  city={city}
                  onClick={handleCityClick}
                />
              ))}
            </div>
          )}

          {/* Loading State */}
          {isLoading && results.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center py-8">
                <Spinner className="w-8 h-8 text-zinc-700 dark:text-zinc-400 animate-spin mx-auto mb-2" />
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="pt-3 border-t border-zinc-200/70 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
            {results.length > 0 && `${results.length} cities found`}
            {query &&
              results.length === 0 &&
              !isLoading &&
              !error &&
              "No results"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
