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
  city: string;
  country: string;
  temperature: number;
  feels_like: number;
  description: string;
  icon: string;
  humidity: number;
  wind_speed: number;
  pressure: number;
  visibility: number;
  coord: {
    lat: number;
    lon: number;
  };
}
