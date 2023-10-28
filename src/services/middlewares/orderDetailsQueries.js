import { createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../../utils/api";



export const postOrder = createAsyncThunk(
  'order/post',
  async (payload, thunkAPI) => {
    const response = await fetch(
      `${config.baseUrl}/orders`,
      {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify({
          iQQQngredients: payload,
        }),
      }
    );
    if(response.ok) {
      const data = await response.json();
      return data;
    } else {
      return response.json().then(err => Promise.reject(err.message));
    }
  }
)
