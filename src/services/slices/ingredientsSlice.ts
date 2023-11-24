import { createSlice } from '@reduxjs/toolkit';
import { ingredientsQuery } from '../middlewares/ingredientsQuery';

const initialState = {
  isLoading: null,
  hasError: false,
  ingredientsData: [],
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: {
    [ingredientsQuery.pending.type]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [ingredientsQuery.fulfilled.type]: (state, action) => {
      state.ingredientsData = action.payload.data;
      state.isLoading = false;
      state.hasError = false;
    },
    [ingredientsQuery.rejected.type]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export default ingredientsSlice.reducer;
