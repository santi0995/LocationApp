import { Button, ScrollView, Text, TextInput, View } from "react-native";

import { ImageSelector } from '../../components'
import { addPlace } from "../../store/place.slice";
import colors from "../../utils/colors";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { useState } from "react";

const NewPlace = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null)
  const dispatch = useDispatch();

  const onHandlerSubmit = () => {
    dispatch(addPlace({ title, image }));
    navigation.goBack();
  };
  const onHandlerChange = (text) => {
    setTitle(text);
  };

  const onImage = (uri) => {
    setImage(uri);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Lugar</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe el nombre del lugar"
          onChangeText={onHandlerChange}
          value={title}
        />
        <ImageSelector onImage={onImage} />
        <Button
          disabled={title.length === 0}
          color={colors.primary}
          title="Guardar"
          onPress={onHandlerSubmit}
        />
      </View>
    </ScrollView>
  );
};

export default NewPlace;
