import { createSlice } from '@reduxjs/toolkit';
import { ingredientsQuery } from '../middlewares/ingredientsQuery';
import { TIngredient } from '../../utils/types';

type TStateIngredients = {
  isLoading: boolean | null,
  hasError: boolean,
  ingredientsData: TIngredient[],
};

const initialState: TStateIngredients = {
  isLoading: null,
  hasError: false,
  ingredientsData: [],
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(ingredientsQuery.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    })
    builder.addCase(ingredientsQuery.fulfilled, (state, action) => {
      state.ingredientsData = action.payload.data;
      state.isLoading = false;
      state.hasError = false;
    })
    builder.addCase(ingredientsQuery.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    })
  },
});

export default ingredientsSlice.reducer;
