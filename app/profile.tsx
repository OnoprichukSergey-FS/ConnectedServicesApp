import { View, Text, StyleSheet } from "react-native";
import BackButton from "../components/BackButton";

export default function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <BackButton />

      <View style={styles.header}>
        <Text style={styles.badge}>Developer Profile</Text>
        <Text style={styles.title}>Sergey</Text>
        <Text style={styles.subtitle}>
          Demo user profile for the Connected Services App.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Project Purpose</Text>
        <Text style={styles.cardText}>
          This app demonstrates how a cross-platform React Native application
          can connect to real-world services like weather APIs, camera access,
          and location permissions.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tech Stack</Text>
        <Text style={styles.cardText}>
          • React Native with Expo{"\n"}• Expo Router{"\n"}• TypeScript{"\n"}•
          AsyncStorage demo authentication{"\n"}• OpenWeatherMap API{"\n"}•
          Browser Camera API{"\n"}• Expo Location Services
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Portfolio Value</Text>
        <Text style={styles.cardText}>
          This project shows API integration, service-based architecture,
          permission handling, responsive UI design, and platform-aware
          development.
        </Text>
      </View>
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

  card: {
    width: "100%",
    maxWidth: 560,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#253149",
    borderRadius: 24,
    padding: 20,
    marginBottom: 14,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
  },

  cardText: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 22,
  },
});
