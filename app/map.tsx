// app/map.tsx
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
      <View style={styles.center}>
        <BackButton />
        <ActivityIndicator />
        <Text style={styles.message}>Getting your location…</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <BackButton />
        <Text style={styles.title}>Map</Text>
        <Text style={styles.error}>{errorMsg}</Text>
      </View>
    );
  }

  if (!coords) {
    return (
      <View style={styles.center}>
        <BackButton />
        <Text style={styles.title}>Map</Text>
        <Text style={styles.error}>No coordinates available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <BackButton />
      <Text style={styles.title}>Map • Current Location</Text>

      <Text style={styles.coords}>Lat: {coords.latitude.toFixed(4)}</Text>
      <Text style={styles.coords}>Lon: {coords.longitude.toFixed(4)}</Text>

      <Text style={styles.message}>
        {Platform.OS === "web"
          ? "The interactive map (Google / Mapbox) is not enabled in this web build. This screen uses your live GPS location as the map fallback."
          : "An interactive map is not enabled in this Expo build. This screen shows your live GPS location as a fallback view."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  coords: {
    fontSize: 16,
    marginTop: 4,
  },
  message: {
    marginTop: 16,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  error: {
    marginTop: 16,
    fontSize: 14,
    color: "red",
    textAlign: "center",
  },
});
