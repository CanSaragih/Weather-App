import { useState } from "react";

export const useCurrentLocation = () => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");

  const fetchCurrentLocation = (
    onSuccess: (lat: number, lon: number) => void,
  ) => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setIsGettingLocation(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setIsGettingLocation(false);

        if (onSuccess) {
          onSuccess(latitude, longitude);
        }
      },
      (error) => {
        setIsGettingLocation(false);
        setLocationError("Failed to get location.");

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError(
              "Permission denied. Please allow location access.",
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setLocationError("The request to get your location timed out.");
            break;
          default:
            setLocationError(
              "An unknown error occurred while fetching location.",
            );
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  const resetLocationError = () => {
    setLocationError("");
    setIsGettingLocation(false);
  };

  return {
    isGettingLocation,
    locationError,
    fetchCurrentLocation,
    resetLocationError,
  };
};
