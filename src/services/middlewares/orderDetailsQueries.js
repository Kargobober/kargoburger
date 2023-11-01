import { createAsyncThunk } from "@reduxjs/toolkit";
import { config, handleResponse } from "../../utils/api";
import { handleError } from "../../utils/utils";



export const postOrder = createAsyncThunk(
  'order/post',
  (payload, thunkAPI) => {
    return fetch(
      `${config.baseUrl}/orders`,
      {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify({
          ingredients: payload,
        }),
      })
      .then(handleResponse);
  }
);
