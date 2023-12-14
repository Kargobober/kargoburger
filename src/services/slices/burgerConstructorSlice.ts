import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TIngredientCounted, TIngredientExtraIdCounted } from "../../utils/types";
import { getUniqId } from "../../utils/utils";

export type TStateBurgerConstructor = {
  selectedBun: TIngredientExtraIdCounted | null;
  // для пустого массива тип через "... | null " описывать не нужно
  selectedProducts: TIngredientExtraIdCounted[];
};

type TMoveItem = {
    indexFrom: number;
    indexTo: number
    ingredient: TIngredientExtraIdCounted;
};

export const initialState: TStateBurgerConstructor = {
  selectedBun: null,
  selectedProducts: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TIngredientExtraIdCounted>) => {
        if(action.payload.type === 'bun') {
          state.selectedBun = action.payload;
        } else {
          state.selectedProducts.push(action.payload);
        }
      },
      prepare: (card: TIngredientCounted) => {
        return { payload: {...card, extraId: getUniqId()} };
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
