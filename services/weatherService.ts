const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export type WeatherData = {
  name: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  main: string;
  description: string;
};

export async function getWeatherByCoords(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Weather API error");
  }

  const data = await res.json();

  return {
    name: data.name,
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    main: data.weather[0].main,
    description: data.weather[0].description,
  };
}
