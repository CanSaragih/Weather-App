export interface City {
  id: number;
  name: string;
  country: string;
  coord: {
    lat: number;
    lon: number;
  };
}

export interface WeatherData {
  coord: {
    lat: number;
    lon: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  };
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  city: string;
  cod: number;
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  };
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  dt_text: string;
  icon: string;
}

export interface ForecastData {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
    coord: {
      lat: number;
      lon: number;
    };
    sunrise: number;
    sunset: number;
  };
}
