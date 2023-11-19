import { createAsyncThunk } from "@reduxjs/toolkit";
import { config, handleResponse } from "../../utils/api";



export const postOrder = createAsyncThunk(
  'order/post',
  (payload, thunkAPI) => {
    return fetch(
      `${config.baseUrl}/orders`,
      {
        headers: {
          ...config.headers,
          authorization: localStorage.getItem('accessToken'),
        },
        method: 'POST',
        body: JSON.stringify({
          ingredients: payload,
        }),
      }
    )
      .then(handleResponse);
  }
);
