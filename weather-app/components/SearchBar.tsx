"use client";

import { Input } from "./ui/input";
import { IoSearch } from "react-icons/io5";
import ThemeToggle from "./ui/ThemeToggle";
import { Kbd } from "./ui/kbd";
import { MdKeyboardCommandKey } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import ModalSearch from "./ui/ModalSearch";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleKeysPress = (e: KeyboardEvent) => {
      // Fix: Pisahkan kondisi Cmd+K dan Escape
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setModalOpen(true);
      }

      if (e.key === "Escape") {
        setModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeysPress);
    return () => {
      window.removeEventListener("keydown", handleKeysPress);
    };
  }, []);

  useEffect(() => {
    if (modalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [modalOpen]);

  return (
    <>
      <div className="fixed top-10 left-0 right-0 px-10 z-40">
        <div className="flex items-center gap-4 justify-end max-w-7xl ml-auto">
          <ThemeToggle />
          <div
            className="relative max-w-md w-full cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <Kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <MdKeyboardCommandKey className="size-3" /> K
            </Kbd>
            <Input
              type="search"
              placeholder="Search city..."
              className="pl-10 pr-16 w-full cursor-pointer"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Modal Search Component */}
      <ModalSearch
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        inputRef={inputRef}
      />
    </>
  );
}
