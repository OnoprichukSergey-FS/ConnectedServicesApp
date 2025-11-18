import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import BackButton from "../components/BackButton";

const API_KEY = "697e62891c6ac5d1675c5098c559d7c2";
const CITY = "Orlando";
const STATE = "FL";

export default function WeatherScreen() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setErrorMsg(null);

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${STATE},US&appid=${API_KEY}&units=imperial`;

        const res = await fetch(url);
        const json = await res.json();

        if (!res.ok) {
          console.log("Weather API error:", json);
          throw new Error(json.message || "Weather request failed");
        }

        setData(json);
      } catch (e: any) {
        console.log("Weather fetch error:", e);
        setErrorMsg(e.message || "Failed to load weather.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <BackButton />
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (errorMsg || !data || !data.main) {
    return (
      <View style={styles.container}>
        <BackButton />
        <Text style={styles.error}>Failed to load weather.</Text>
        {errorMsg && <Text style={styles.helper}>{errorMsg}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton />

      <Text style={styles.title}>Weather – Orlando, FL</Text>

      <Text style={styles.temp}>{Math.round(data.main.temp)}°F</Text>
      <Text style={styles.condition}>{data.weather[0].description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  title: { fontSize: 22, marginBottom: 10, fontWeight: "600" },
  temp: { fontSize: 48, marginBottom: 10, fontWeight: "bold" },
  condition: {
    fontSize: 18,
    color: "#555",
    textTransform: "capitalize",
  },
  error: {
    color: "red",
    fontSize: 16,
    marginTop: 16,
    textAlign: "center",
  },
  helper: {
    marginTop: 4,
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    paddingHorizontal: 24,
  },
});
