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
  },
});

export const { addItem } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
