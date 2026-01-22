import { IoSearch } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Input } from "./input";
import { Button } from "./button";

interface ModalSearchProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export default function ModalSearch({
  modalOpen,
  setModalOpen,
  inputRef,
}: ModalSearchProps) {
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search City</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Type city name..."
            className="pl-10 w-full"
          />
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Start typing to search for a city...
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
