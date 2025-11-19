import React from "react";
import { View, Text, StyleSheet } from "react-native";

type MapProps = {
  style?: any;
  children?: React.ReactNode;
};

const MapView: React.FC<MapProps> = ({ style, children }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Map (Web Preview)</Text>
      <Text style={styles.text}>
        The interactive map is only available on the mobile app.
      </Text>
      {children}
    </View>
  );
};

export const Marker: React.FC<{ coordinate?: any }> = () => null;

export default MapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});
