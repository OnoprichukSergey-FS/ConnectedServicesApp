import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import BackButton from "../components/BackButton";

const Video: any = "video";

export default function CameraScreen() {
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (Platform.OS !== "web") return;

    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setError("Camera is not supported in this browser.");
          return;
        }

        stream = await navigator.mediaDevices.getUserMedia({ video: true });

        const node = videoRef.current;

        if (node) {
          node.srcObject = stream;
          await node.play();
          setReady(true);
        }
      } catch (err) {
        console.error("Web camera error:", err);
        setError("Unable to access the camera.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  if (Platform.OS !== "web") {
    return (
      <View style={styles.screen}>
        <BackButton />

        <View style={styles.header}>
          <Text style={styles.badge}>Device Service</Text>
          <Text style={styles.title}>Camera</Text>
          <Text style={styles.subtitle}>
            Mobile fallback screen for camera service documentation.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardIcon}>📷</Text>
          <Text style={styles.cardTitle}>Mobile Preview</Text>
          <Text style={styles.cardText}>
            In this assignment build, the live camera preview is implemented on
            the web version. On mobile, this screen documents that limitation so
            the app stays stable.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <BackButton />

      <View style={styles.header}>
        <Text style={styles.badge}>Device Service</Text>
        <Text style={styles.title}>Camera</Text>
        <Text style={styles.subtitle}>
          Browser camera preview using getUserMedia.
        </Text>
      </View>

      {error ? (
        <View style={styles.card}>
          <Text style={styles.cardIcon}>⚠️</Text>
          <Text style={styles.cardTitle}>Camera unavailable</Text>
          <Text style={styles.cardText}>{error}</Text>
        </View>
      ) : (
        <>
          <View style={styles.cameraShell}>
            {!ready && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#8B7CFF" />
                <Text style={styles.loadingText}>Starting camera...</Text>
              </View>
            )}

            <Video
              ref={videoRef}
              style={styles.video}
              autoPlay
              playsInline
              muted
            />

            <View style={styles.cameraOverlay}>
              <Text style={styles.liveDot}>● LIVE</Text>
              <Text style={styles.overlayText}>Web Camera Feed</Text>
            </View>
          </View>

          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>Service Integration</Text>
            <Text style={styles.noteText}>
              This screen requests camera permission through the browser,
              streams live video using getUserMedia, and safely stops the camera
              when the screen unmounts.
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#070A12",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    paddingTop: 90,
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

  cameraShell: {
    width: "100%",
    maxWidth: 420,
    aspectRatio: 3 / 4,
    backgroundColor: "#000",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#253149",
    overflow: "hidden",
    position: "relative",
  },

  video: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    objectFit: "cover",
  } as any,

  loadingOverlay: {
    position: "absolute",
    zIndex: 10,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#070A12",
  },

  loadingText: {
    color: "#CBD5E1",
    marginTop: 12,
  },

  cameraOverlay: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: "rgba(7,10,18,0.75)",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  liveDot: {
    color: "#FF6B6B",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 4,
  },

  overlayText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  noteCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#0B1220",
    borderWidth: 1,
    borderColor: "#253149",
    borderRadius: 20,
    padding: 18,
    marginTop: 16,
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
