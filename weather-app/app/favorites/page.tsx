import { Button } from "@/components/ui/button";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { TiWeatherDownpour } from "react-icons/ti";
import { Droplet, Wind } from "lucide-react";

export default function FavoritesPage() {
  const dummyLocations = [
    {
      id: 1,
      city: "London",
      name: "United Kingdom",
      icon: <TiWeatherDownpour />,
      speed: "10 km/h",
      humanity: "80%",
      temperature: "25°C",
    },
    {
      id: 2,
      city: "Tokyo",
      name: "Japan",
      icon: <TiWeatherDownpour />,
      speed: "10 km/h",
      humanity: "80%",
      temperature: "18°C",
    },
    {
      id: 3,
      city: "New York",
      name: "USA",
      icon: <TiWeatherDownpour />,
      speed: "10 km/h",
      humanity: "80%",
      temperature: "22°C",
    },
    {
      id: 4,
      city: "Sydney",
      name: "Australia",
      icon: <TiWeatherDownpour />,
      speed: "10 km/h",
      humanity: "80%",
      temperature: "20°C",
    },
  ];
  return (
    <div className="min-h-screen py-25 md:py-25 md:px-10 xl:py-35 xl:px-20 bg-white dark:bg-dark-mode">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-semibold text-gray-800 dark:text-gray-200">
            Saved Locations
          </h1>
          <p className=" text-gray-600 dark:text-gray-400 mt-3">
            Real-time time cinematic weather data for your favorite locations,
            all in one place.
          </p>
        </div>
        <Button className="cursor-pointer">
          <MdOutlineAddLocationAlt
            size={20}
            className="text-gray-600 dark:text-gray-800"
          />
          Add Location
        </Button>
      </div>

      {/* content */}
      <div className="mt-12 px-4 md:px-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyLocations.map((location) => (
          <div
            key={location.id}
            className="bg-gray-100 dark:bg-card-dark-mode hover:bg-gray-50 dark:hover:bg-hover-card-dark-mode border border-slate-200 dark:border-border-card-dark-mode rounded-lg p-6 space-y-4 cursor-pointer transition-colors duration-500"
          >
            <div className="flex items-center justify-between">
              <div className="flex-col items-start">
                <h2 className="text-2xl font-medium text-zinc-800 dark:text-zinc-200">
                  {location.city}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mt-2 uppercase tracking-wide">
                  {location.name}
                </p>
              </div>
              <span className="text-[#FFCF5E] mt-1 text-4xl">
                {location.icon}
              </span>
            </div>

            <div className="flex items-center justify-center font-semibold text-3xl py-6 text-zinc-600 dark:text-zinc-300">
              {location.temperature}°
            </div>

            <div className="flex flex-row gap-10 items-center justify-between px-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                  <Wind size={18} />
                  <span className=" text-base">{location.speed || 0}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <Droplet size={18} />
                  <span className="text-base">{location.humanity || 0}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
