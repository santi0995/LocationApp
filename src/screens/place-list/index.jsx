import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { PlaceItem } from "../../components";
import { loadPlaces } from "../../store/place.slice";
import { styles } from "./styles";
import { useEffect } from "react";

const PlaceList = ({ navigation }) => {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.place.places);

  const renderItem = ({ item }) => (
    <PlaceItem
      {...item}
      onSelect={() => navigation.navigate("PlaceDetail", { placeId: item.id })}
    />
  );
  const keyExtractor = (item) => item.id;

  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      style={styles.container}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

export default PlaceList;
