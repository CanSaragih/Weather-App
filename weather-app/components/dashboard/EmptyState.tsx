import { Compass, Search } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { TbCurrentLocationFilled } from "react-icons/tb";
import { useWeather } from "@/contexts/WeatherContext";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { WeatherAPI } from "@/lib/api/weather";

export default function EmptyState() {
  const { setIsSearchOpen, setWeather, setForecast, setIsLoading, isLoading } =
    useWeather();

  const {
    isGettingLocation,
    locationError,
    fetchCurrentLocation,
    resetLocationError,
  } = useCurrentLocation();

  const handleCurrentLocation = () => {
    fetchCurrentLocation(async (lat, lon) => {
      try {
        setIsLoading(true);

        const [weatherData, forecastData] = await Promise.all([
          WeatherAPI.getWeatherByCoords(lat, lon),
          WeatherAPI.getForecastByCoords(lat, lon),
        ]);

        setWeather(weatherData);
        setForecast(forecastData);
      } catch (error) {
        console.error("Error fetching current location weather data:", error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="grow flex flex-col items-center justify-center pt-18 px-6">
      <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-12">
        {/* Cinematic Illustration */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#00d2ff]/10 blur-[80px] rounded-full animate-pulse"></div>
          <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden border border-[#00d2ff]/20 bg-black/5 dark:bg-[#141414]/60 backdrop-blur-[20px] shadow-[0_0_40px_rgba(165,231,255,0.2)]">
            <Image
              alt="Atmospheric Cloud Illustration"
              className="absolute w-full h-full object-cover opacity-60 dark:opacity-80 mix-blend-lighten pointer-events-none"
              src="/bg/cloud.png"
              width={384}
              height={384}
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Compass
                className="w-32 h-32 text-[#00d2ff]/40"
                strokeWidth={1}
              />
            </div>
          </div>
        </div>

        {/* Typography Content */}
        <div className="space-y-4 max-w-7xl">
          <h2 className="text-4xl md:text-[52px] md:leading-14 font-semibold tracking-tight text-gray-900 dark:text-[#e5e2e1]">
            Start Your Atmospheric Journey
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-[#bbc9cf] max-w-lg mx-auto">
            Search for a city to see cinematic weather data and real-time
            precision. Access high-fidelity atmospheric insights through our
            dashboard.
          </p>
        </div>

        {/* Central Search Action */}
        <div className="w-full max-w-xl group">
          <div
            className="relative flex items-center px-6 py-5 rounded-full border border-gray-200 dark:border-white/20 hover:border-[#a5e7ff]/50 transition-all duration-500 shadow-xl bg-white/50 dark:bg-[#141414]/60 backdrop-blur-[20px]"
            onClick={(e) => {
              e.preventDefault();
              setIsSearchOpen(true);
            }}
          >
            <Search className="text-gray-400 dark:text-[#bbc9cf] group-focus-within:text-[#a5e7ff] transition-colors w-6 h-6" />
            <input
              className="grow bg-transparent border-none focus:ring-0 text-gray-900 dark:text-[#e5e2e1] placeholder-gray-500 dark:placeholder-[#bbc9cf]/50 ml-4 outline-none font-medium"
              placeholder="Enter city or region..."
              type="text"
            />
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg border border-gray-200 dark:border-white/5 bg-gray-100 dark:bg-white/5">
              <span className="text -[10px] font-bold text-gray-500 dark:text-[#bbc9cf]">
                ⌘
              </span>
              <span className="text-[10px] font-bold text-gray-500 dark:text-[#bbc9cf]">
                K
              </span>
            </div>
          </div>

          {/* button get current location */}
          <Button
            variant="outline"
            className="mt-6 cursor-pointer rounded-full "
            onClick={handleCurrentLocation}
            disabled={isGettingLocation || isLoading}
          >
            <div className="flex items-center gap-2 text-sm font-medium text-neutral-800 dark:text-neutral-300">
              <TbCurrentLocationFilled />
              Use Current Location
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
