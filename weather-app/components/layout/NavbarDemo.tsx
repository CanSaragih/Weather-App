"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import SearchBar from "../SearchBar";
import { useWeather } from "@/contexts/WeatherContext";
import { Button } from "../ui/button";

export function NavbarDemo() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Favorites",
      link: "/favorites",
    },
    {
      name: "Maps",
      link: "/",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setWeather, setForecast, setIsLoading } = useWeather();

  if (pathname === "/" || pathname === "/login") {
    return null; // Jangan render Navbar di halaman utama
  }

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="relative z-20 flex items-center gap-4">
            <SearchBar
              onWeatherUpdate={setWeather}
              onForecastUpdate={setForecast}
              onLoadingChange={setIsLoading}
            />
            <AnimatedThemeToggler className="border-gray-200 dark:border-gray-700/70" />
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handleLoginClick}
            >
              Sign In
            </Button>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Sign In
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
