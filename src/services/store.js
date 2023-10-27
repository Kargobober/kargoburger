import { configureStore } from "@reduxjs/toolkit";
import ingridientsReducer from "./slices/ingridientsSlice";
import burgerConstructorReducer from './slices/burgerConstructorSlice';

export const store = configureStore({
  reducer: {
    ingridients: ingridientsReducer,
    burgerConstructor: burgerConstructorReducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   getDefaultMiddleware().concat()
  // },
})
