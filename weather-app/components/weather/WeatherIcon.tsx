import Image from "next/image";

interface WeatherIconProps {
  icon: string;
  description: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function WeatherIcon({
  icon,
  description,
  size = "md",
}: WeatherIconProps) {
  const sizeConfig = {
    sm: { width: 48, height: 48 },
    md: { width: 80, height: 80 },
    lg: { width: 128, height: 128 },
    xl: { width: 256, height: 256 },
  };

  const { width, height } = sizeConfig[size];

  return (
    <Image
      src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
      alt={"Weather icon: " + description}
      width={width}
      height={height}
      className="object-contain"
      unoptimized // Karena external image
    />
  );
}
