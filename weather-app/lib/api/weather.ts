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
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        pressure: data.main.pressure,
        visibility: data.visibility,
        coord: {
          lat: data.coord.lat,
          lon: data.coord.lon,
        },
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
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        pressure: data.main.pressure,
        visibility: data.visibility,
        coord: {
          lat: data.coord.lat,
          lon: data.coord.lon,
        },
      };
    } catch (error) {
      console.error("Error getting weather by coords:", error);
      throw error;
    }
  }
}
