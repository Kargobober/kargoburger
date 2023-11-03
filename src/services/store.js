import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredientsSlice";
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import ingredientDetailsReducer from './slices/ingredientDetailsSlice';
import orderDetailsReducer from './slices/orderDetailsSlice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   getDefaultMiddleware().concat()
  // },
})
