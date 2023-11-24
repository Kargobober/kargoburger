import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredient: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: 'URL',
    image_mobile: 'URL',
    image_large: 'URL',
    __v: 0,
  },
  isFilled: false,
};

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setInfo: (state, action) => {
      Object.assign(state.ingredient, action.payload);
      state.isFilled = true;
    },
    clearInfo: (state) => {
      Object.assign(state, initialState);
    }
  },
});

export const { setInfo, clearInfo } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
