"use client";

import { Input } from "./ui/input";
import { IoSearch } from "react-icons/io5";
import ThemeToggle from "./ui/ThemeToggle";
import { Kbd } from "./ui/kbd";
import { MdKeyboardCommandKey } from "react-icons/md";
import { useEffect, useRef } from "react";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeysPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && !e.ctrlKey && e.metaKey) {
        const target = e.target as HTMLElement;
        const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(
          target.tagName,
        );
        if (!isTyping) {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeysPress);
    return () => {
      window.removeEventListener("keydown", handleKeysPress);
    };
  }, []);

  return (
    <div className="fixed top-10 left-0 right-0 px-10">
      <div className="flex items-center gap-4 justify-end max-w-7xl ml-auto">
        <ThemeToggle />
        <div className="relative max-w-md w-full">
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Kbd className="absolute right-3 top-1/2 -translate-y-1/2">
            <MdKeyboardCommandKey className="size-3" /> K
          </Kbd>
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search city..."
            className="pl-10 pr-16 w-full"
          />
        </div>
      </div>
    </div>
  );
}
