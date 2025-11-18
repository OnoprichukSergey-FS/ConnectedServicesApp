export async function fetchWeather(lat: number, lon: number) {
  const apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
  const baseUrl = process.env.EXPO_PUBLIC_OPENWEATHER_BASE_URL;

  if (!apiKey || !baseUrl) {
    throw new Error("Missing API key or base URL");
  }

  const url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to load weather");
  }

  const data = await res.json();

  return {
    name: data.name,
    temp: data.main.temp,
    description: data.weather[0].description,
  };
}
