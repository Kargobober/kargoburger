import { createAsyncThunk } from "@reduxjs/toolkit";
import { config, fetchWithRefresh, handleResponse, tokenCatcher } from "../../utils/api";

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
          // не токен, а код из письма
          token: payload.code,
        }),
      }
    )
      .then(handleResponse);
  }
);

export const changeUserData = createAsyncThunk(
  'auth/changeUserData',
  (payload) => {
    return fetchWithRefresh(
      `${config.baseUrl}/auth/user`,
      {
        headers: {
          ...config.headers,
          authorization: localStorage.getItem('accessToken'),
        },
        method: 'PATCH',
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          password: payload.password,
        }),
      },
      tokenCatcher
    )
  }
);
