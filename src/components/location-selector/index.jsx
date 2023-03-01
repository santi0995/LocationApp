import * as Location from "expo-location";

import { Alert, Button, Text, View } from "react-native";

import colors from "../../utils/colors";
import { styles } from "./styles";
import { useState } from "react";

const LocationSelector = ({ onLocation }) => {
  const [pickedLocation, setPickedLocation] = useState(null);

  const verifyPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("No hay permisos para acceder a la ubicación");
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
      <View style={styles.preview}>
        {!pickedLocation ? (
          <Text>No hay ubicación seleccionada</Text>
        ) : (
          <Text>{`latitud: ${pickedLocation.lat} , longitude: ${pickedLocation.lng}`}</Text>
        )}
      </View>
      <Button title="Seleccionar ubicación" onPress={onHandleGetLocation} colors={colors.primary} />
    </View>
  );
};

export default LocationSelector;
