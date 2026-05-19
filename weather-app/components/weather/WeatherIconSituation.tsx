import Image from "next/image";

interface WeatherIconSituationProps {
  iconCode?: string;
}

export default function WeatherIconSituation({
  iconCode,
}: WeatherIconSituationProps) {
  const getIconPath = (code?: string) => {
    switch (code) {
      case "01d": // Clear sky (day)
        return "/icon/Sun.png";
      case "01n": // Clear sky (night)
        return "/icon/Moon.png";
      case "02d": // Few clouds (day)
        return "/icon/sun clouds.png";
      case "02n": // Few clouds (night)
        return "/icon/Moon clouds.png";
      case "03d":
      case "04d": // Scattered/Broken clouds (day)
        return "/icon/sun clouds-2.png";
      case "03n":
      case "04n": // Scattered/Broken clouds (night)
        return "/icon/Moon,stars and cloud.png";
      case "09d":
      case "09n": // Shower rain
        return "/icon/rain.png";
      case "10d": // Rain (day)
        return "/icon/sun rain.png";
      case "10n": // Rain (night)
        return "/icon/moon and rain.png";
      case "11d":
      case "11n": // Thunderstorm
        return "/icon/Thunder.png";
      // Tambahkan kondisi cuaca ekstrem seperti salju (13d/n) atau kabut (50d/n) jika punya iconnya,
      // sementara ini defaultnya mengarah ke awan biasa jika tidak ada.
      default:
        return "/icon/sun clouds.png";
    }
  };

  const imagePath = getIconPath(iconCode);

  return (
    <div className="flex items-start justify-center">
      <Image
        src={imagePath}
        width={410}
        height={100}
        alt="Weather icon"
        priority
      />
    </div>
  );
}
