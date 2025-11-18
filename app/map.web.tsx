import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackButton from "../components/BackButton";

export default function MapWebScreen() {
  return (
    <View style={styles.container}>
      <BackButton />

      <View style={styles.content}>
        <Text style={styles.title}>Map (Web Preview)</Text>

        <Text style={styles.coords}>Lat: 28.4898</Text>
        <Text style={styles.coords}>Lon: -81.4742</Text>

        <Text style={styles.info}>
          The interactive map is only available on the mobile app.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  coords: {
    fontSize: 15,
    marginTop: 2,
  },
  info: {
    marginTop: 16,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});
