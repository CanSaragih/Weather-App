"use client";

import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { Button } from "./button";

export default function ToggelButton() {
  const { setTheme } = useTheme();

  return (
    <div className="flex items-center border border-gray-200 dark:border-gray-700/70 rounded-md ">
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer"
        onClick={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
      >
        <MdDarkMode className="h-10 w-10 absolute rotate-100 scale-0 dark:rotate-0 dark:scale-100" />
        <MdLightMode className="h-10 w-10 rotate-0 scale-100 dark:rotate-100 dark:scale-0" />
      </Button>
    </div>
  );
}
