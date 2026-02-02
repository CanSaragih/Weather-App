"use client";

import Link from "next/link";
import { RiMenuUnfold4Line } from "react-icons/ri";
import ToggelButton from "../ui/ThemeToggle";
import { Button } from "../ui/button";
import SearchBar from "../SearchBar";
import { useWeather } from "@/contexts/WeatherContext";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";

// export default function Navbar() {
//   const { setWeather, setForecast, setIsLoading } = useWeather();

//   const handleReset = () => {
//     setWeather(null);
//     setForecast(null);
//     setIsLoading(false);
//   };

//   return (
{
  /* <nav className="fixed top-0 w-full bg-white dark:bg-dark-mode shadow-md dark:shadow-black/20 h-15 md:h-18 xl:h-20 px-4 md:px-8 lg:px-16 z-50">
  <div className="flex items-center justify-between h-full">
    <div className="text-zinc-800 dark:text-zinc-100 flex items-center">
      <Link href="/">
        <button
          onClick={handleReset}
          className="text-lg font-semibold cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors duration-300"
        >
          Weatherly
        </button>
      </Link>
    </div>
    <div className="flex items-center gap-4 text-zinc-800 dark:text-zinc-100">
      <SearchBar
        onWeatherUpdate={setWeather}
        onForecastUpdate={setForecast}
        onLoadingChange={setIsLoading}
      />
      {/* <ToggelButton /> */
}

//       <AnimatedThemeToggler className="border-gray-200 dark:border-gray-700/70 rounded-md" />
//       <Button
//         variant="ghost"
//         size="icon-lg"
//         className="cursor-pointer border border-gray-200 dark:border-gray-700/70 rounded-md p-2"
//       >
//         <RiMenuUnfold4Line className="hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer transition-colors duration-300" />
//       </Button>
//     </div>
//   </div>
// </nav>; */}
//   );
// }

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { setWeather, setForecast, setIsLoading } = useWeather();

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <SearchBar
          onWeatherUpdate={setWeather}
          onForecastUpdate={setForecast}
          onLoadingChange={setIsLoading}
        />
        <AnimatedThemeToggler className="border-gray-200 dark:border-gray-700/70" />
        {/* <Button
          variant="ghost"
          size="icon-lg"
          className="cursor-pointer border border-gray-200 dark:border-gray-700/70 rounded-md p-2"
        >
          <RiMenuUnfold4Line className="hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer transition-colors duration-300" />
        </Button> */}
      </Menu>
    </div>
  );
}
