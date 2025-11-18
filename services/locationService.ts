import * as Location from "expo-location";

export async function getUserLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Location permission not granted");
  }

  const loc = await Location.getCurrentPositionAsync({});
  return {
    lat: loc.coords.latitude,
    lon: loc.coords.longitude,
  };
}
