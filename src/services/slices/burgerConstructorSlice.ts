import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TIngredientExtraIdCounted } from "../../utils/types";

type TStateBurgerConstructor = {
  selectedBun: TIngredientExtraIdCounted | null;
  // для пустого массива тип через "... | null " описывать не нужно
  selectedProducts: TIngredientExtraIdCounted[];
};

type TMoveItem = {
    indexFrom: number;
    indexTo: number
    ingredient: TIngredientExtraIdCounted;
};

const initialState: TStateBurgerConstructor = {
  selectedBun: null,
  selectedProducts: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TIngredientExtraIdCounted>) => {
      if(action.payload.type === 'bun') {
        state.selectedBun = action.payload;
      } else {
        state.selectedProducts.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.selectedProducts = state.selectedProducts.filter(el => el.extraId !== action.payload);
    },
    moveItem: (state, action: PayloadAction<TMoveItem>) => {
      const { indexFrom, indexTo, ingredient } = action.payload;
      state.selectedProducts.splice(indexFrom, 1);
      state.selectedProducts.splice(indexTo, 0, ingredient);
    },
    resetConstructor: (state) => {
      state.selectedBun = initialState.selectedBun;
      state.selectedProducts = initialState.selectedProducts;
    },
  },
});

export const { addItem, removeItem, moveItem, resetConstructor } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
