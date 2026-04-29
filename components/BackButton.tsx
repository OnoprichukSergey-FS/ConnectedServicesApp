import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function BackButton() {
  return (
    <TouchableOpacity style={styles.back} onPress={() => router.replace("/")}>
      <Text style={styles.text}>← Dashboard</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  back: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 20,
    backgroundColor: "rgba(0,0,0,0.65)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});
