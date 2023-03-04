import * as Location from "expo-location";

import { Alert, Button, Text, View } from "react-native";

import MapPreview from "../map-preview/index";
import colors from "../../utils/colors";
import { styles } from "./styles";
import { useState } from "react";

const LocationSelector = ({ onLocation }) => {
  const [pickedLocation, setPickedLocation] = useState(null);

  const verifyPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("No hay permisos para acceder a la ubicación", [{ text: "Ok" }]);
      return false;
    }
    return true;
  };
  const onHandleGetLocation = async () => {
    const isLocationPermission = await verifyPermissions();
    if (!isLocationPermission) return;

    const location = await Location.getCurrentPositionAsync({
      timeout: 5000,
    });

    const { latitude, longitude } = location.coords;

    setPickedLocation({ lat: latitude, lng: longitude });
    onLocation({ lat: latitude, lng: longitude });
  };
  return (
    <View style={styles.container}>
      <MapPreview location={pickedLocation} style={styles.preview}>
        <Text style={styles.text}>No hay ninguna ubicación seleccionada</Text>
      </MapPreview>
      <Button title="Seleccionar ubicación" onPress={onHandleGetLocation} colors={colors.primary} />
      <Button title="Seleccionar desde mapa" onPress={() => {}} colors={colors.secondary} />
    </View>
  );
};

export default LocationSelector;
