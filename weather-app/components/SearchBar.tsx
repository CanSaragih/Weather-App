import { Input } from "./ui/input";
import { IoSearch } from "react-icons/io5";
import ThemeToggle from "./ui/ThemeToggle";

export default function SearchBar() {
  return (
    <div className="fixed top-10 left-0 right-0 px-10">
      <div className="flex items-center gap-4 justify-end max-w-7xl ml-auto">
        <ThemeToggle />
        <div className="relative max-w-md w-full">
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="search"
            placeholder="search city.."
            className="pl-10 w-full"
          />
        </div>
      </div>
    </div>
  );
}
