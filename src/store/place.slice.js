import Place from "../models/places";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  places: [],
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    addPlace: (state, action) => {
      const newPlace = new Place(Date.now().toString(), action.payload.title);
      state.places.psuh(newPlace);
    },
  },
});

export const { addPlace } = placeSlice.actions;

export default placeSlice.reducer;