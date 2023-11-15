import { createSlice } from "@reduxjs/toolkit";
import { changeUserData, resetPassword, sendResetCode } from "../middlewares/authQueries";

const initialState = {
  // имя и адрес почты, пароль не сохранять!
  user: null,
  registerSuccess: null,
  registerPending: false,
  error: '',
  userPending: false,
  userSuccess: null,
  authPending: false,
  resetPasswordPending: false,
  resetPasswordSuccess: null,
  changeUserDataPending: false,
  changeUserDataSuccess: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
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
  },
  extraReducers: {
    [sendResetCode.pending.type]: (state) => {
      state.resetPasswordPending = true;
      state.resetPasswordSuccess = null;
      state.error = '';
    },
    [sendResetCode.fulfilled.type]: (state) => {
      state.resetPasswordPending = false;
      state.resetPasswordSuccess = true;
    },
    [sendResetCode.rejected.type]: (state, action) => {
      state.resetPasswordPending = false;
      state.resetPasswordSuccess = false;
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
  },
});

export const {
  setUser,
  setRegisterPending,
  setRegisterSuccess,
  setError,
  clearError,
  setUserPending,
  setUserSuccess,
  setAuthPending,
  setResetPasswordSuccess,
} = authSlice.actions;
export default authSlice.reducer;
