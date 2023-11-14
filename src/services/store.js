import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredientsSlice";
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import ingredientDetailsReducer from './slices/ingredientDetailsSlice';
import orderDetailsReducer from './slices/orderDetailsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
    auth: authReducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   getDefaultMiddleware().concat()
  // },
})
