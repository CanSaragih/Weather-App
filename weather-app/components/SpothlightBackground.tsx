"use client";

import { cn } from "@/lib/utils";
import { Spotlight } from "./ui/spotlight";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { useWeather } from "@/contexts/WeatherContext";

export default function SpotlightBackground() {
  const { setIsSearchOpen } = useWeather();

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden bg-black/96 antialiased flex items-center justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:45px_45px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="bg-opacity-50 bg-linear-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-6xl md:text-9xl font-bold text-transparent ">
          Weatherly
        </h1>
        <h3 className="bg-linear-to-b -mt-2 md:-mt-4 xl:-mt-4 from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl md:text-7xl font-bold text-transparent ">
          Made Simple
        </h3>
        <p className="mx-auto mt-6 max-w-xl text-center text-base font-normal text-neutral-300">
          Get real-time weather updates and accurate forecasts for any city
          around the world. Simply search for your location and stay informed
          about current conditions and upcoming weather patterns.
        </p>

        <div className="flex justify-center mt-6">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="cursor-pointer"
            onClick={() => setIsSearchOpen(true)}
          >
            Get Started
          </HoverBorderGradient>
        </div>
      </div>
    </div>
  );
}
