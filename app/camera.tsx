import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import BackButton from "../components/BackButton";

const Video: any = "video";

export default function CameraScreen() {
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (Platform.OS !== "web") {
      return;
    }

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
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  if (Platform.OS !== "web") {
    return (
      <View style={styles.center}>
        <BackButton />
        <Text style={styles.title}>Camera</Text>
        <Text style={styles.message}>
          In this assignment build, the live camera preview is implemented on
          the web version of the app. On mobile, this screen documents that
          limitation so the app stays stable.
        </Text>
      </View>
    );
  }

  // Web version with real camera preview
  return (
    <View style={styles.webContainer}>
      <BackButton />
      <Text style={styles.title}>Camera (Web)</Text>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <Video
            ref={videoRef}
            style={styles.video}
            autoPlay
            playsInline
            muted
          />
          <Text style={styles.message}>
            This preview uses the browser camera via getUserMedia. In a full
            version, you could add QR scanning or photo capture here.
          </Text>
          {!ready && (
            <Text style={styles.subtle}>Waiting for camera to start…</Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  center: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  video: {
    width: "100%",
    maxWidth: 400,
    aspectRatio: 3 / 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#000",
  },
  message: {
    marginTop: 16,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  subtle: {
    marginTop: 8,
    fontSize: 12,
    color: "#888",
  },
  error: {
    marginTop: 16,
    fontSize: 14,
    color: "red",
    textAlign: "center",
  },
});
