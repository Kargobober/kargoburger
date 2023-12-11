import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductsTypeList } from "../../utils/types";

type TIngredientDetail = {
  _id: string;
  name: string;
  type?: ProductsTypeList;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price?: number;
  image: string;
  image_mobile?: string;
  image_large?: string;
  __v?: number;
  qty?: number;
  extraId?: string;
};

export type TStateIngredientDetail = {
  ingredient: TIngredientDetail;
  isFilled: boolean;
};

const initialState: TStateIngredientDetail = {
  ingredient: {
    _id: '',
    name: '',
    type: undefined,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: 'URL',
    image_mobile: 'URL',
    image_large: 'URL',
    __v: 0,
    qty: 0,
    extraId: '',
  },
  isFilled: false,
};
// Pick<TStateIngredientDetail, 'ingredient'>
export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setInfo: (state, action: PayloadAction<TIngredientDetail>) => {
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
