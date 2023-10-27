import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from '../../utils/api';

export const ingredientsQuery = createAsyncThunk(
  'ingredients/get',
  async (param1, thunkAPI) => {
    const response = await fetch(
      `${config.baseUrl}/ingredients`,
      {
        headers: config.headers,
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return response.json().then(err => Promise.reject(err.message));
    }
  }
);
