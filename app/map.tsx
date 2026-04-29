import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import BackButton from "../components/BackButton";

type Coords = {
  latitude: number;
  longitude: number;
};

export default function MapScreen() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          if (!isMounted) return;
          setErrorMsg("Location permission was denied.");
          setLoading(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});

        if (!isMounted) return;

        setCoords({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      } catch (err) {
        console.warn("Location error:", err);

        if (!isMounted) return;

        setErrorMsg("Failed to get your current location.");
      } finally {
        if (!isMounted) return;

        setLoading(false);
      }
    };

    loadLocation();

    return () => {
      isMounted = false;
    };
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

  if (errorMsg || !coords) {
    return (
      <View style={styles.screen}>
        <BackButton />

        <View style={styles.card}>
          <Text style={styles.cardIcon}>⚠️</Text>
          <Text style={styles.cardTitle}>Location unavailable</Text>
          <Text style={styles.cardText}>
            {errorMsg || "No coordinates available."}
          </Text>
        </View>
      </View>
    );
  }

  const latitude = coords.latitude.toFixed(4);
  const longitude = coords.longitude.toFixed(4);

  return (
    <View style={styles.screen}>
      <BackButton />

      <View style={styles.header}>
        <Text style={styles.badge}>Location Service</Text>
        <Text style={styles.title}>Map</Text>
        <Text style={styles.subtitle}>
          Live GPS coordinates from the device location service.
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

        <Text style={styles.locationTitle}>Current Location</Text>

        <View style={styles.coordGrid}>
          <CoordCard label="Latitude" value={latitude} />
          <CoordCard label="Longitude" value={longitude} />
        </View>
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>Service Integration</Text>

        <Text style={styles.noteText}>
          {Platform.OS === "web"
            ? "This web preview requests browser location access and displays live GPS coordinates as a map fallback. A production version could connect Google Maps or Mapbox."
            : "This Expo build requests foreground location permission and displays live GPS coordinates. A production version could render an interactive native map."}
        </Text>
      </View>
    </View>
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
    flex: 1,
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
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
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
    letterSpacing: 0.6,
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

  card: {
    width: "100%",
    maxWidth: 460,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#253149",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },

  cardIcon: {
    fontSize: 42,
    marginBottom: 12,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 8,
  },

  cardText: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },
});
