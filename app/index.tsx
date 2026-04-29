import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_KEY = "connected-services-logged-in";

export default function Home() {
  const [email, setEmail] = useState("demo@connected.app");
  const [password, setPassword] = useState("password123");
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkSavedLogin();
  }, []);

  const checkSavedLogin = async () => {
    try {
      const savedLogin = await AsyncStorage.getItem(AUTH_KEY);
      if (savedLogin === "true") setLoggedIn(true);
    } catch (err) {
      console.log("Failed to check saved login:", err);
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please enter an email and password.");
      return;
    }

    if (email.trim() !== "demo@connected.app" || password !== "password123") {
      setError("Use demo@connected.app / password123");
      return;
    }

    try {
      await AsyncStorage.setItem(AUTH_KEY, "true");
      setError(null);
      setLoggedIn(true);
    } catch (err) {
      console.log("Failed to save login:", err);
      setError("Could not save login. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_KEY);
      setLoggedIn(false);
      setPassword("password123");
      setEmail("demo@connected.app");
    } catch (err) {
      console.log("Failed to log out:", err);
    }
  };

  if (checkingAuth) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#7C5CFF" />
        <Text style={styles.mutedText}>Checking session...</Text>
      </View>
    );
  }

  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.loginCard}>
          <Text style={styles.badge}>Demo Auth</Text>
          <Text style={styles.title}>Connected Services</Text>
          <Text style={styles.subtitle}>
            Sign in to access weather, camera, location, and profile features.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#94A3B8"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError(null);
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError(null);
            }}
          />

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin}>
            <Text style={styles.primaryText}>Sign In</Text>
          </TouchableOpacity>

          <Text style={styles.helperText}>
            Demo credentials: demo@connected.app / password123
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.dashboard}>
      <Text style={styles.badge}>Connected Services</Text>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>
        A cross-platform app demonstrating API, camera, location, and profile
        screens.
      </Text>

      <View style={styles.grid}>
        <Link href="/weather" asChild>
          <TouchableOpacity style={styles.serviceCard}>
            <Text style={styles.icon}>☁️</Text>
            <Text style={styles.cardTitle}>Weather</Text>
            <Text style={styles.cardText}>
              Fetches live weather data using your current GPS location.
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/camera" asChild>
          <TouchableOpacity style={styles.serviceCard}>
            <Text style={styles.icon}>📷</Text>
            <Text style={styles.cardTitle}>Camera</Text>
            <Text style={styles.cardText}>
              Demonstrates camera access and device permission handling.
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/map" asChild>
          <TouchableOpacity style={styles.serviceCard}>
            <Text style={styles.icon}>📍</Text>
            <Text style={styles.cardTitle}>Location</Text>
            <Text style={styles.cardText}>
              Shows GPS coordinates and location service integration.
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/profile" asChild>
          <TouchableOpacity style={styles.serviceCard}>
            <Text style={styles.icon}>👤</Text>
            <Text style={styles.cardTitle}>Profile</Text>
            <Text style={styles.cardText}>
              Explains the app purpose, tech stack, and portfolio value.
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070A12",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  dashboard: {
    flexGrow: 1,
    backgroundColor: "#070A12",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    paddingVertical: 70,
  },

  loginCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#253149",
    borderRadius: 24,
    padding: 28,
  },

  badge: {
    color: "#8B7CFF",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1.4,
    marginBottom: 10,
    textAlign: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 560,
    marginBottom: 26,
  },

  mutedText: {
    color: "#CBD5E1",
    marginTop: 12,
  },

  input: {
    backgroundColor: "#0B1220",
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#253149",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 12,
  },

  primaryBtn: {
    backgroundColor: "#7C5CFF",
    paddingVertical: 15,
    borderRadius: 14,
    marginTop: 4,
  },

  primaryText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
  },

  error: {
    color: "#FF6B6B",
    marginBottom: 10,
    textAlign: "center",
  },

  helperText: {
    marginTop: 14,
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
  },

  grid: {
    width: "100%",
    maxWidth: 760,
    gap: 16,
  },

  serviceCard: {
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#253149",
    borderRadius: 22,
    padding: 22,
  },

  icon: {
    fontSize: 30,
    marginBottom: 10,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 6,
  },

  cardText: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 21,
  },

  logoutBtn: {
    marginTop: 26,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },

  logoutText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "700",
  },
});
