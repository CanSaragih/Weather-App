import { Input } from "./ui/input";
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
  return (
    <div className="fixed top-10 right-15 max-w-sm w-full">
      <div className="relative ">
        <IoSearch className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5" />
        <Input type="search" placeholder="search city.." className="pl-10" />
      </div>
    </div>
  );
}
