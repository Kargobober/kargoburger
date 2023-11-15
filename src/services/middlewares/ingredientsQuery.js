import { createAsyncThunk } from '@reduxjs/toolkit';
import { config, handleResponse } from '../../utils/api';

export const ingredientsQuery = createAsyncThunk(
  'ingredients/get',
  (param1, thunkAPI) => {
    return fetch(`${config.baseUrl}/ingredients`)
      .then(handleResponse);
  }
);
