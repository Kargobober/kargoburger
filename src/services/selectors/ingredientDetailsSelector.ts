import { RootState } from "../types";

export const getIngredientDetailsStatus = (state: RootState) => state.ingredientDetails.isFilled;
export const getIngredientDetails = (state: RootState) => state.ingredientDetails.ingredient;
