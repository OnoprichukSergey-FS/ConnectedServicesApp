import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import BackButton from "../components/BackButton";
import { getUserLocation } from "../services/locationService";
import { getWeatherByCoords, WeatherData } from "../services/weatherService";

export default function WeatherScreen() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        setErrorMsg(null);

        const location = await getUserLocation();

        const weather = await getWeatherByCoords(location.lat, location.lon);

        setData(weather);
      } catch (e: any) {
        console.log("Weather error:", e);
        setErrorMsg(e.message || "Failed to load weather.");
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, []);

  const getWeatherIcon = () => {
    if (!data) return "🌤️";

    const main = data.main.toLowerCase();

    if (main.includes("cloud")) return "☁️";
    if (main.includes("rain")) return "🌧️";
    if (main.includes("clear")) return "☀️";
    if (main.includes("storm")) return "⛈️";
    if (main.includes("mist") || main.includes("fog")) return "🌫️";

    return "🌤️";
  };

  if (loading) {
    return (
      <View style={styles.screen}>
        <BackButton />
        <ActivityIndicator size="large" color="#8B7CFF" />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  if (errorMsg || !data) {
    return (
      <View style={styles.screen}>
        <BackButton />

        <View style={styles.card}>
          <Text style={styles.errorTitle}>Weather unavailable</Text>
          <Text style={styles.errorText}>
            Could not load weather from your current location.
          </Text>
          {errorMsg && <Text style={styles.helper}>{errorMsg}</Text>}
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <BackButton />

      <View style={styles.header}>
        <Text style={styles.badge}>Live GPS + API Service</Text>
        <Text style={styles.title}>Weather</Text>
        <Text style={styles.subtitle}>
          Real-time weather from your location.
        </Text>
      </View>

      <View style={styles.weatherCard}>
        <Text style={styles.weatherIcon}>{getWeatherIcon()}</Text>
        <Text style={styles.location}>{data.name}</Text>
        <Text style={styles.temp}>{Math.round(data.temp)}°F</Text>
        <Text style={styles.condition}>{data.description}</Text>
      </View>

      <View style={styles.statsGrid}>
        <InfoCard
          label="Feels Like"
          value={`${Math.round(data.feelsLike)}°F`}
        />
        <InfoCard label="Humidity" value={`${data.humidity}%`} />
        <InfoCard label="Wind" value={`${Math.round(data.windSpeed)} mph`} />
      </View>
    </ScrollView>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: "#070A12",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    paddingTop: 90,
  },

  loadingText: {
    color: "#CBD5E1",
    marginTop: 14,
  },

  header: {
    alignItems: "center",
    marginBottom: 24,
  },

  badge: {
    color: "#8B7CFF",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 10,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "900",
  },

  subtitle: {
    color: "#CBD5E1",
    fontSize: 15,
    textAlign: "center",
  },

  weatherCard: {
    width: "100%",
    maxWidth: 560,
    backgroundColor: "#111827",
    borderRadius: 28,
    padding: 30,
    alignItems: "center",
    marginBottom: 16,
  },

  weatherIcon: { fontSize: 48 },
  location: { color: "#CBD5E1", fontSize: 16 },
  temp: { color: "#FFFFFF", fontSize: 72, fontWeight: "900" },
  condition: { color: "#94A3B8", fontSize: 18 },

  statsGrid: {
    width: "100%",
    maxWidth: 560,
    flexDirection: "row",
    gap: 12,
  },

  infoCard: {
    flex: 1,
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 16,
    alignItems: "center",
  },

  infoLabel: { color: "#94A3B8", fontSize: 12 },
  infoValue: { color: "#FFFFFF", fontSize: 18, fontWeight: "900" },

  card: {
    backgroundColor: "#111827",
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
  },

  errorTitle: { color: "#FFFFFF", fontSize: 20 },
  errorText: { color: "#CBD5E1" },
  helper: { color: "#94A3B8", fontSize: 12 },
});
