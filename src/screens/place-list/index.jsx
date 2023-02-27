import { Text, View } from "react-native";

import { styles } from "./styles";
import { useSelector } from "react-redux";

const PlaceList = ({ navigation }) => {
  const places = useSelector((state) => state.places.places);
  return (
    <View style={styles.container}>
      <Text>Place List</Text>
    </View>
  );
};

export default PlaceList;
