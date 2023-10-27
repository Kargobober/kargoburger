import { createSlice } from '@reduxjs/toolkit';
import { ingridientsQuery } from '../middlewares/ingridientsQuery';

const initialState = {
  isLoading: false,
  hasError: false,
  ingridientsData: [],
}

export const ingridientsSlice = createSlice({
  name: 'ingridients',
  initialState,
  reducers: {},
  extraReducers: {
    [ingridientsQuery.pending.type]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [ingridientsQuery.fulfilled.type]: (state, action) => {
      state.ingridientsData = action.payload.data;
      state.isLoading = false;
      state.hasError = false;
    },
    [ingridientsQuery.rejected.type]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export default ingridientsSlice.reducer;
