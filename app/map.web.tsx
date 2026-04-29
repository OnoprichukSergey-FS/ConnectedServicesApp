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

const Iframe: any = "iframe";

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
      } catch {
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

  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_EMBED_KEY;

  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${coords.lat},${coords.lon}&zoom=14&maptype=roadmap`;

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <BackButton />

      <View style={styles.header}>
        <Text style={styles.badge}>Google Maps Service</Text>
        <Text style={styles.title}>Map</Text>
        <Text style={styles.subtitle}>
          {usedFallback
            ? "Showing fallback coordinates because location permission was unavailable."
            : "Live map centered on your browser GPS location."}
        </Text>
      </View>

      <View style={styles.mapCard}>
        {apiKey ? (
          <Iframe
            src={mapUrl}
            style={styles.iframe}
            loading="lazy"
            allowFullScreen
            frameBorder="0"
          />
        ) : (
          <View style={styles.fallbackMap}>
            <Text style={styles.fallbackText}>
              Add EXPO_PUBLIC_GOOGLE_MAPS_EMBED_KEY to show Google Maps.
            </Text>
          </View>
        )}

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
          This screen requests browser location permission, centers a real
          Google Maps embed on the user&apos;s coordinates, and keeps the
          coordinate cards synced with the same location service used by
          Weather.
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
    maxWidth: 620,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#253149",
    borderRadius: 28,
    padding: 22,
    marginBottom: 16,
  },

  iframe: {
    width: "100%",
    height: 320,
    borderRadius: 22,
    marginBottom: 18,
  },

  fallbackMap: {
    height: 320,
    borderRadius: 22,
    backgroundColor: "#0B1220",
    borderWidth: 1,
    borderColor: "#253149",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 18,
  },

  fallbackText: {
    color: "#CBD5E1",
    textAlign: "center",
    fontSize: 14,
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
    maxWidth: 620,
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
