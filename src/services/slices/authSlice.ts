import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { changeUserData, logOut, resetPassword, sendResetCode } from "../middlewares/authQueries";
import { TUser } from "../../utils/api/types";

type TStateAuth = {
  user: TUser | null;
  registerSuccess: boolean | null;
  registerPending: boolean;
  error: unknown;
  userPending: boolean;
  userSuccess: boolean | null;
  authPending: boolean;
  // ↓ статус успешности отправки кода сброса пароля
  resetCodeSuccess: boolean | 'sended' | null;
  // ↓ статус обработки запросов получения кода сброса И смены пароля
  resetPasswordPending: boolean,
  // ↓ статус успешности изменения пароля
  resetPasswordSuccess: boolean | null;
  changeUserDataPending: boolean,
  changeUserDataSuccess: boolean | null;
  logOutPending: boolean,
  logOutSuccess: boolean | null;
};

const initialState: TStateAuth = {
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
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setEmailOnStorage: (state, action: PayloadAction<string>) => {
      if (state.user === null) {
        state.user = {email: action.payload, name: ''};
      } else {
        state.user.email = action.payload;
      }
    },

    setRegisterPending: (state, action: PayloadAction<boolean>) => {
      state.registerPending = action.payload;
    },
    setRegisterSuccess: (state, action: PayloadAction<boolean | null>) => {
      state.registerSuccess = action.payload;
    },

    setError: (state, action: PayloadAction<unknown>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = initialState.error;
    },

    setUserPending: (state, action: PayloadAction<boolean>) => {
      state.userPending = action.payload;
    },
    setUserSuccess: (state, action: PayloadAction<boolean | null>) => {
      state.userSuccess = action.payload;
    },

    setAuthPending: (state, action: PayloadAction<boolean>) => {
      state.authPending = action.payload;
    },

    setResetPasswordSuccess: (state, action: PayloadAction<boolean | null>) => {
      state.resetPasswordSuccess = action.payload;
    },
    setResetCodeSuccess: (state, action: PayloadAction<boolean | 'sended' | null>) => {
      state.resetCodeSuccess = action.payload;
    },

    setLogOutSuccess: (state, action: PayloadAction<boolean | null>) => {
      state.logOutSuccess = action.payload;
    },

    setChangeUserDataSuccess: (state, action: PayloadAction<boolean | null>) => {
      state.changeUserDataSuccess = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(sendResetCode.pending, (state) => {
      state.resetPasswordPending = true;
      state.resetCodeSuccess = null;
      state.error = '';
    })
    builder.addCase(sendResetCode.fulfilled, (state) => {
      state.resetPasswordPending = false;
      state.resetCodeSuccess = true;
    })
    builder.addCase(sendResetCode.rejected, (state, action) => {
      state.resetPasswordPending = false;
      state.resetCodeSuccess = false;
      state.error = action.payload;
    })

    builder.addCase(resetPassword.pending, (state) => {
      state.resetPasswordPending = true;
      state.resetPasswordSuccess = null;
      state.error = '';
    })
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.resetPasswordPending = false;
      state.resetPasswordSuccess = true;
    })
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.resetPasswordPending = false;
      state.resetPasswordSuccess = false;
      state.error = action.payload;
    })

    builder.addCase(changeUserData.pending, (state) => {
      state.changeUserDataPending = true;
      state.changeUserDataSuccess = null;
      state.error = '';
    })
    builder.addCase(changeUserData.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.changeUserDataPending = false;
      state.changeUserDataSuccess = true;
    })
    builder.addCase(changeUserData.rejected, (state, action) => {
      state.changeUserDataPending = false;
      state.changeUserDataSuccess = false;
      state.error = action.payload;
    })

    builder.addCase(logOut.pending, (state) => {
      state.logOutPending = true;
      state.logOutSuccess = null;
      state.error = '';
    })
    builder.addCase(logOut.fulfilled, (state) => {
      state.logOutPending = false;
      state.logOutSuccess = true;
      state.user = null;
      state.userSuccess = null;
    })
    builder.addCase(logOut.rejected, (state, action) => {
      state.logOutPending = false;
      state.logOutSuccess = false;
      state.error = action.payload;
    })
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
  setLogOutSuccess,
  setChangeUserDataSuccess,
} = authSlice.actions;
export default authSlice.reducer;
