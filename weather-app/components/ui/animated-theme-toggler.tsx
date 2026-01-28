"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Kbd } from "./kbd";

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export const AnimatedThemeToggler = ({
  className,
  duration = 500,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", newTheme ? "dark" : "light");
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }, [isDark, duration]);

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
          toggleTheme();
        }
      }
    };
    window.addEventListener("keydown", handleKeysPress);
    return () => {
      window.removeEventListener("keydown", handleKeysPress);
    };
  }, [toggleTheme]);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex items-center border border-gray-200 dark:border-gray-700/70 rounded-md ">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={buttonRef}
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            className={cn("cursor-pointer", className)}
            {...props}
          >
            {isDark ? <Sun /> : <Moon />}
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
};
