import { City, WeatherData } from "../types/weather";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org";

interface GeocodingResponse {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export class WeatherAPI {
  /**
   * Search cities by name
   */
  static async searchCities(query: string): Promise<City[]> {
    if (!query || query.length < 2) {
      return [];
    }

    try {
      const response = await fetch(
        `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`,
      );

      if (!response.ok) {
        throw new Error("Failed to search cities");
      }

      const data = await response.json();

      return data.map((item: GeocodingResponse) => ({
        id: item.lat + item.lon, // Unique ID from coordinates
        name: item.name,
        country: item.country,
        coord: {
          lat: item.lat,
          lon: item.lon,
        },
      }));
    } catch (error) {
      console.error("Error searching cities:", error);
      throw error;
    }
  }

  /**
   * Get current weather by city name
   */
  static async getCurrentWeather(city: string): Promise<WeatherData> {
    try {
      const response = await fetch(
        `${BASE_URL}/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      return {
        coord: {
          lat: data.coord.lat,
          lon: data.coord.lon,
        },
        weather: {
          main: data.weather[0].main,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        },
        base: data.base,
        main: {
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          sea_level: data.main.sea_level,
          grnd_level: data.main.grnd_level,
        },
        visibility: data.visibility,
        wind: {
          speed: data.wind.speed,
          deg: data.wind.deg,
        },
        clouds: data.clouds.all,
        sys: {
          type: data.sys.type,
          id: data.sys.id,
          country: data.sys.country,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
        },
        timezone: data.timezone,
        id: data.id,
        city: data.name,
        cod: data.cod,
      };
    } catch (error) {
      console.error("Error getting weather:", error);
      throw error;
    }
  }

  /**
   * Get current weather by coordinates
   */
  static async getWeatherByCoords(
    lat: number,
    lon: number,
  ): Promise<WeatherData> {
    try {
      const response = await fetch(
        `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      );

      if (!response.ok) {
        throw new Error("Failed to get weather data");
      }

      const data = await response.json();

      return {
        coord: {
          lat: data.coord.lat,
          lon: data.coord.lon,
        },
        weather: {
          main: data.weather[0].main,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        },
        base: data.base,
        main: {
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          sea_level: data.main.sea_level,
          grnd_level: data.main.grnd_level,
        },
        visibility: data.visibility,
        wind: {
          speed: data.wind.speed,
          deg: data.wind.deg,
        },
        clouds: data.clouds.all,
        sys: {
          type: data.sys.type,
          id: data.sys.id,
          country: data.sys.country,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
        },
        timezone: data.timezone,
        id: data.id,
        city: data.name,
        cod: data.cod,
      };
    } catch (error) {
      console.error("Error getting weather by coords:", error);
      throw error;
    }
  }
}
