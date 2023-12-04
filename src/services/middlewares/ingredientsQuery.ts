import { createAsyncThunk } from '@reduxjs/toolkit';
import { config, handleResponse } from '../../utils/api/api';
import { TResponseIngredients } from '../../utils/api/types';

export const ingredientsQuery = createAsyncThunk(
  'ingredients/get',
  () => {
    return fetch(`${config.baseUrl}/ingredients`)
      .then(handleResponse<TResponseIngredients>);
  }
);
