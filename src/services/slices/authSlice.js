import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../middlewares/authActions";

const initialState = {
  // имя и адрес почты, пароль не сохранять!
  user: null,
  registerSuccess: null,
  registerPending: null,
  error: '',
  userPending: null,
  userSuccess: null,
  authPending: null,
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
} = authSlice.actions;
export default authSlice.reducer;
