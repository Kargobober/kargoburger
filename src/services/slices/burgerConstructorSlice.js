import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  selectedBun: null,
  selectedProducts: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem: (state, action) => {
      if(action.payload.type === 'bun') {
        state.selectedBun = action.payload;
      } else {
        state.selectedProducts.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter(el => el.extraId !== action.payload);
    },
    moveItem: (state, action) => {
      const { indexFrom, indexTo, ingredient } = action.payload;
      state.selectedProducts.splice(indexFrom, 1);
      state.selectedProducts.splice(indexTo, 0, ingredient);
    },
  },
});

export const { addItem, removeItem, moveItem } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
