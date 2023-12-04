import { createAsyncThunk } from "@reduxjs/toolkit";
import { config, fetchWithRefresh, handleResponse, tokenCatcher } from "../../utils/api/api";
import {
  TRequestChangeUserData,
  TRequestPasswordForgot,
  TRequestPasswordReset,
  TResponseChangeUserData,
  TResponseLogOut,
  TResponsePasswordForgot,
  TResponsePasswordReset
} from "../../utils/api/types";

export const sendResetCode = createAsyncThunk(
  'auth/sendResetCode',
  (payload: TRequestPasswordForgot) => {
    return fetch(
      `${config.baseUrl}/password-reset`,
      {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
        }),
      }
    )
      .then(handleResponse<TResponsePasswordForgot>);
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  (payload: TRequestPasswordReset) => {
    return fetch(
      `${config.baseUrl}/password-reset/reset`,
      {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify(payload),
      }
    )
      .then(handleResponse<TResponsePasswordReset>);
  }
);

export const changeUserData = createAsyncThunk(
  'auth/changeUserData',
  (payload: TRequestChangeUserData) => {
    return fetchWithRefresh<TResponseChangeUserData>(
      `${config.baseUrl}/auth/user`,
      {
        headers: {
          ...config.headers,
          authorization: localStorage.getItem('accessToken')!,
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

export const logOut = createAsyncThunk(
  'auth/logOut',
  () => {
    return fetch(
      `${config.baseUrl}/auth/logout`,
      {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify({
          token: localStorage.getItem('refreshToken'),
        }),
      }
    )
      .then(handleResponse<TResponseLogOut>);
  }
);
