import Link from "next/link";
import { RiMenuUnfold4Line } from "react-icons/ri";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-dark-mode shadow-md dark:shadow-black/20 h-16 px-4 md:px-8 lg:px-16 z-50">
      <div className="flex items-center justify-between h-full">
        <div className="text-zinc-100 flex items-center">
          <Link href="/">
            <button className="text-lg font-semibold cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors duration-300">
              Weather
            </button>
          </Link>
        </div>
        <div className="flex items-center gap-2 ml-4 text-zinc-800 dark:text-zinc-100">
          <span>Menu</span>
          <RiMenuUnfold4Line className="w-6 h-6 ml-2 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer transition-colors duration-300" />
        </div>
      </div>
    </nav>
  );
}
