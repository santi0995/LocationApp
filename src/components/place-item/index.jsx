import { Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./style";

const PlaceItem = ({ id, title, image, onSelect }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceItem;
