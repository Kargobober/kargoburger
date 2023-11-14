import { createAsyncThunk } from "@reduxjs/toolkit";
import { config, handleResponse } from "../../utils/api";

export const sendResetCode = createAsyncThunk(
  'auth/sendResetCode',
  (payload) => {
    return fetch(
      `${config.baseUrl}/password-reset`,
      {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify({
          email: payload,
        }),
      }
    )
      .then(handleResponse);
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  (payload) => {
    return fetch(
      `${config.baseUrl}/password-reset/reset`,
      {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify({
          password: payload.password,
          token: payload.code,
        }),
      }
    )
      .then(handleResponse);
  }
)
