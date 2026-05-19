import { Navigation } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface CurrentLocationButtonProps {
  handleCurrentLocation: () => void;
  isGettingLocation: boolean;
}

export default function CurrentLocationButton({
  handleCurrentLocation,
  isGettingLocation,
}: CurrentLocationButtonProps) {
  return (
    <Button
      onClick={handleCurrentLocation}
      disabled={isGettingLocation}
      variant={"outline"}
      className="w-full justify-start gap-3 h-14 border-2 border-dashed hover:border-orange-500/30 dark:hover:border-orange-400/50 hover:bg-orange-100/60 dark:hover:bg-orange-950/20 transition-all duration-300 cursor-pointer mt-2"
    >
      {isGettingLocation ? (
        <>
          <Spinner className="w-5 h-5 animate-spin text-orange-600 dark:text-orange-400" />
          <span className="text-sm font-medium">
            Getting current location...
          </span>
        </>
      ) : (
        <>
          <div className="flex shrink-0 w-9 h-9 items-center justify-center bg-orange-100 dark:bg-orange-900/30 rounded-full">
            <Navigation className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
              Use current location
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Get weather for your current location
            </p>
          </div>
        </>
      )}
    </Button>
  );
}
