import { configureStore } from "@reduxjs/toolkit";
import ingridientsReducer from "./slices/ingridientsSlice";

export const store = configureStore({
  reducer: {
    ingridients: ingridientsReducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   getDefaultMiddleware().concat()
  // },
})
