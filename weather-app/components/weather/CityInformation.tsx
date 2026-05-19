import { WeatherData } from "@/lib/types/weather";
import { Droplet, Wind } from "lucide-react";
import { MdOutlineLocationOn } from "react-icons/md";

interface CityInformationProps {
  weather: WeatherData;
}

export default function CityInformation({ weather }: CityInformationProps) {
  return (
    <div className="px-6">
      <div className="flex items-center gap-2 mb-4">
        <MdOutlineLocationOn
          size={26}
          className="text-zinc-500 dark:text-zinc-400"
        />
        <h1 className="text-base text-zinc-400 dark:text-zinc-500 font-medium">
          {weather.city}, {weather.sys?.country}
        </h1>
      </div>
      <div className="flex flex-row items-start text-zinc-800 dark:text-zinc-100">
        <h1 className="text-[160px] leading-none font-extralight">
          {Math.round(weather.main?.temp || 0)}
        </h1>
        <span className="text-5xl font-light mt-3">°</span>
        <span className="text-3xl font-medium mt-6">C</span>
      </div>

      <div className="mt-2">
        <h2 className="text-[45px] font-light tracking-wide text-zinc-600 dark:text-zinc-400 capitalize">
          {weather.weather[0]?.description || "Unknown"}
        </h2>
      </div>

      <div className="flex flex-row gap-10 items-center mt-14">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
            <Wind size={24} />
            <p className=" text-base ">Wind</p>
          </div>
          <span className="text-zinc-800 dark:text-zinc-100 text-3xl">
            {weather.wind?.speed || 0} km/h
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <Droplet size={24} />
            <p className="text-base">Humidity</p>
          </div>
          <span className="text-zinc-800 dark:text-zinc-100 text-3xl">
            {weather.main?.humidity || 0}%
          </span>
        </div>
      </div>
    </div>
  );
}
