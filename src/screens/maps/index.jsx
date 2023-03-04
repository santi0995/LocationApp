import MapView, {Marker} from "react-native-maps";
import { Text, TouchableOpacity, View } from "react-native";
import { useLayoutEffect, useState } from "react";

import IonicIcons from '@expo/vector-icons/Ionicons'
import colors from "../../utils/colors";
import { styles } from "./styles";

const Maps = ({ navigation, route }) => {
  const { coords } = route.params 
  const [selectedLocation, setSelectedLocation] = useState(null);
  const initialRegion = {
    latitude: coords?.lat,
    longitude: coords?.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const onHandlerPickedLocation = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    })
  };

  const onHandlerSaveLocation = () => {
    if(selectedLocation) navigation.navigate('NewPlace', {mapLocation: selectedLocation});
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity disabled={!selectedLocation} onPress={onHandlerSaveLocation}>
          <IonicIcons name="md-save-sharp" size={20} color={!selectedLocation ? colors.gray : colors.black} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, onHandlerSaveLocation]);

  return (
    <MapView
    initialRegion={initialRegion}
    onPress={onHandlerPickedLocation}
    style={styles.container}
    minZoomLevel={14}
    >
      {selectedLocation && (
        <Marker 
        title="Ubicación seleccionada"
        coordinate={{
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng,
        }}
        />
      )}

    </MapView>
  );
};

export default Maps;
