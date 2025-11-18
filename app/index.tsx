import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Link } from "expo-router";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError("Please enter an email and password.");
      return;
    }

    setError(null);
    setLoggedIn(true);
  };

  // --- LOGIN UI ---
  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Connected Services App</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.helperText}>
          For this assignment, you can use any email/password.
        </Text>
      </View>
    );
  }

  // --- MAIN MENU
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connected Services App</Text>
      <Text style={styles.subtitle}>Choose a feature</Text>

      <Link href="/weather" asChild>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Weather</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/camera" asChild>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Camera</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/map" asChild>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Map</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginBottom: 6,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    color: "#555",
  },
  input: {
    width: "100%",
    maxWidth: 360,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  btn: {
    width: "100%",
    maxWidth: 360,
    paddingVertical: 14,
    backgroundColor: "#333",
    marginVertical: 6,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  error: {
    color: "red",
    marginBottom: 8,
    textAlign: "center",
    width: "100%",
    maxWidth: 360,
  },
  helperText: {
    marginTop: 8,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    maxWidth: 360,
  },
});
