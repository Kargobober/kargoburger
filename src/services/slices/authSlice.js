import { createSlice } from "@reduxjs/toolkit";
import { changeUserData, logOut, resetPassword, sendResetCode } from "../middlewares/authQueries";

const initialState = {
  // имя и адрес почты, пароль не сохранять!
  user: null,
  registerSuccess: null,
  registerPending: false,
  error: '',
  userPending: false,
  userSuccess: null,
  authPending: false,
  // ↓ статус успешности отправки кода сброса пароля
  resetCodeSuccess: null,
  // ↓ статус обработки запросов получения кода сброса И смены пароля
  resetPasswordPending: false,
  // ↓ статус успешности изменения пароля
  resetPasswordSuccess: null,
  changeUserDataPending: false,
  changeUserDataSuccess: null,
  logOutPending: false,
  logOutSuccess: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setEmailOnStorage: (state, action) => {
      state.user = { email: action.payload };
    },

    setRegisterPending: (state, action) => {
      state.registerPending = action.payload;
    },
    setRegisterSuccess: (state, action) => {
      state.registerSuccess = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = initialState.error;
    },

    setUserPending: (state, action) => {
      state.userPending = action.payload;
    },
    setUserSuccess: (state, action) => {
      state.userSuccess = action.payload;
    },

    setAuthPending: (state, action) => {
      state.authPending = action.payload;
    },

    setResetPasswordSuccess: (state, action) => {
      state.resetPasswordSuccess = action.payload;
    },
    setResetCodeSuccess: (state, action) => {
      state.resetCodeSuccess = action.payload;
    },
  },
  extraReducers: {
    [sendResetCode.pending.type]: (state) => {
      state.resetPasswordPending = true;
      state.resetCodeSuccess = null;
      state.error = '';
    },
    [sendResetCode.fulfilled.type]: (state) => {
      state.resetPasswordPending = false;
      state.resetCodeSuccess = true;
    },
    [sendResetCode.rejected.type]: (state, action) => {
      state.resetPasswordPending = false;
      state.resetCodeSuccess = false;
      state.error = action.payload;
    },

    [resetPassword.pending.type]: (state) => {
      state.resetPasswordPending = true;
      state.resetPasswordSuccess = null;
      state.error = '';
    },
    [resetPassword.fulfilled.type]: (state) => {
      state.resetPasswordPending = false;
      state.resetPasswordSuccess = true;
    },
    [resetPassword.rejected.type]: (state, action) => {
      state.resetPasswordPending = false;
      state.resetPasswordSuccess = false;
      state.error = action.payload;
    },

    [changeUserData.pending.type]: (state) => {
      state.changeUserDataPending = true;
      state.changeUserDataSuccess = null;
      state.error = '';
    },
    [changeUserData.fulfilled.type]: (state, action) => {
      state.user = action.payload.user;
      state.changeUserDataPending = false;
      state.changeUserDataSuccess = true;
    },
    [changeUserData.rejected.type]: (state, action) => {
      state.changeUserDataPending = false;
      state.changeUserDataSuccess = false;
      state.error = action.payload;
    },

    [logOut.pending.type]: (state) => {
      state.logOutPending = true;
      state.logOutSuccess = null;
      state.error = '';
    },
    [logOut.fulfilled.type]: (state) => {
      state.logOutPending = false;
      state.logOutSuccess = true;
      state.user = null;
      state.userSuccess = null;
    },
    [logOut.rejected.type]: (state, action) => {
      state.logOutPending = false;
      state.logOutSuccess = false;
      state.error = action.payload;
    },
  },
});

export const {
  setUser,
  setEmailOnStorage,
  setRegisterPending,
  setRegisterSuccess,
  setError,
  clearError,
  setUserPending,
  setUserSuccess,
  setAuthPending,
  setResetPasswordSuccess,
  setResetCodeSuccess,
} = authSlice.actions;
export default authSlice.reducer;
