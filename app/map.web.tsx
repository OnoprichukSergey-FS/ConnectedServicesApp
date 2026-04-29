import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import BackButton from "../components/BackButton";
import { getUserLocation } from "../services/locationService";

type Coords = {
  lat: number;
  lon: number;
};

export default function MapWebScreen() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [loading, setLoading] = useState(true);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    const loadLocation = async () => {
      try {
        const location = await getUserLocation();
        setCoords(location);
        setUsedFallback(false);
      } catch (err) {
        console.log("Web location error, using fallback:", err);

        setCoords({
          lat: 28.4898,
          lon: -81.4742,
        });

        setUsedFallback(true);
      } finally {
        setLoading(false);
      }
    };

    loadLocation();
  }, []);

  if (loading) {
    return (
      <View style={styles.screen}>
        <BackButton />
        <ActivityIndicator size="large" color="#8B7CFF" />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  if (!coords) {
    return (
      <View style={styles.screen}>
        <BackButton />
        <Text style={styles.title}>Location unavailable</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <BackButton />

      <View style={styles.header}>
        <Text style={styles.badge}>Location Service</Text>
        <Text style={styles.title}>Map</Text>
        <Text style={styles.subtitle}>
          {usedFallback
            ? "Location permission was unavailable, so this screen is showing fallback coordinates."
            : "Live GPS coordinates from your browser location permission."}
        </Text>
      </View>

      <View style={styles.mapCard}>
        <View style={styles.mapVisual}>
          <View style={styles.gridLineHorizontal} />
          <View style={styles.gridLineVertical} />
          <View style={styles.pinCircle}>
            <Text style={styles.pin}>📍</Text>
          </View>
        </View>

        <Text style={styles.locationTitle}>
          {usedFallback ? "Orlando, FL" : "Current Location"}
        </Text>

        <View style={styles.coordGrid}>
          <CoordCard label="Latitude" value={coords.lat.toFixed(4)} />
          <CoordCard label="Longitude" value={coords.lon.toFixed(4)} />
        </View>
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>Service Integration</Text>
        <Text style={styles.noteText}>
          This web screen uses the same shared location service as Weather. The
          UI uses a custom map-style preview so the project works safely on web
          without requiring Google Maps or Mapbox.
        </Text>
      </View>
    </ScrollView>
  );
}

function CoordCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.coordCard}>
      <Text style={styles.coordLabel}>{label}</Text>
      <Text style={styles.coordValue}>{value}</Text>
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
    letterSpacing: 1.4,
    marginBottom: 10,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "900",
    marginBottom: 8,
  },

  subtitle: {
    color: "#CBD5E1",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 560,
  },

  mapCard: {
    width: "100%",
    maxWidth: 560,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#253149",
    borderRadius: 28,
    padding: 22,
    marginBottom: 16,
  },

  mapVisual: {
    height: 220,
    borderRadius: 22,
    backgroundColor: "#0B1220",
    borderWidth: 1,
    borderColor: "#253149",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    overflow: "hidden",
  },

  gridLineHorizontal: {
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: "rgba(139,124,255,0.18)",
  },

  gridLineVertical: {
    position: "absolute",
    height: "100%",
    width: 1,
    backgroundColor: "rgba(139,124,255,0.18)",
  },

  pinCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "rgba(139,124,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(139,124,255,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  pin: {
    fontSize: 34,
  },

  locationTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 16,
  },

  coordGrid: {
    flexDirection: "row",
    gap: 12,
  },

  coordCard: {
    flex: 1,
    backgroundColor: "#0B1220",
    borderWidth: 1,
    borderColor: "#253149",
    borderRadius: 18,
    padding: 16,
    alignItems: "center",
  },

  coordLabel: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 6,
  },

  coordValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },

  noteCard: {
    width: "100%",
    maxWidth: 560,
    backgroundColor: "#0B1220",
    borderWidth: 1,
    borderColor: "#253149",
    borderRadius: 20,
    padding: 18,
  },

  noteTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 6,
  },

  noteText: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 21,
  },
});
