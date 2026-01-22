"use client";

import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Kbd } from "./kbd";
import { useEffect } from "react";

export default function ToggelButton() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeysPress = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === "d" &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey
      ) {
        const target = e.target as HTMLElement;
        const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(
          target.tagName,
        );
        if (!isTyping) {
          e.preventDefault();
          setTheme(theme === "light" ? "dark" : "light");
        }
      }
    };
    window.addEventListener("keydown", handleKeysPress);
    return () => {
      window.removeEventListener("keydown", handleKeysPress);
    };
  }, [theme, setTheme]);

  return (
    <div className="flex items-center border border-gray-200 dark:border-gray-700/70 rounded-md ">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <MdDarkMode className="h-10 w-10 absolute rotate-100 scale-0 dark:rotate-0 dark:scale-100" />
            <MdLightMode className="h-10 w-10 rotate-0 scale-100 dark:rotate-100 dark:scale-0" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="pr-1.5">
          <div className="flex items-center gap-2">
            Toggle Theme <Kbd>D</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
