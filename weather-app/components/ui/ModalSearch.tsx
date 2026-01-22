"use client";

import { IoSearch } from "react-icons/io5";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Input } from "./input";
import { City } from "@/lib/types/weather";
import { useEffect, useState } from "react";
import { WeatherAPI } from "@/lib/api/weather";
import { Loader2 } from "lucide-react";
import SearchResultItem from "./SearchResultItem";
import { FiLoader } from "react-icons/fi";
interface ModalSearchProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onCitySelect?: (city: City) => void;
}

export default function ModalSearch({
  modalOpen,
  setModalOpen,
  inputRef,
  onCitySelect,
}: ModalSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    }
  }, [modalOpen]);

  const handleCityClick = (city: City) => {
    onCitySelect?.(city);
    setModalOpen(false);
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="sm:max-w-[500px] max-h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Search City</DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="relative">
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Type city name..."
            className="pl-10 w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
          )}
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto min-h-[200px] max-h-[400px]">
          {/* Empty State */}
          {!query && !isLoading && results.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <IoSearch className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Start typing to search for a city
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center py-8">
                <p className="text-sm text-red-500 dark:text-red-400">
                  {error}
                </p>
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
                <FiLoader className="w-8 h-8 text-gray-700 dark:text-gray-400 animate-spin mx-auto mb-2" />
                {/* <p className="text-sm text-gray-500 dark:text-gray-400">
                  Searching cities...
                </p> */}
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
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
