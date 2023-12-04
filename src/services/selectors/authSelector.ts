import { RootState } from "../types";

export const getResetPasswordSuccess = (state: RootState) => state.auth.resetPasswordSuccess;
export const getResetPasswordPending = (state: RootState) => state.auth.resetPasswordPending;
export const getResetCodeSuccess = (state: RootState) => state.auth.resetCodeSuccess;

export const getUserSuccess = (state: RootState) => state.auth.userSuccess;
export const getUserPending = (state: RootState) => state.auth.userPending;
export const getUserState = (state: RootState) => state.auth.user;

export const getChangeUserDataSuccess = (state: RootState) => state.auth.changeUserDataSuccess;
export const getChangeUserDataPending = (state: RootState) => state.auth.changeUserDataPending;

export const getLogOutSuccess = (state: RootState) => state.auth.logOutSuccess;
export const getLogOutPending = (state: RootState) => state.auth.logOutPending;

export const getAuthPending = (state: RootState) => state.auth.authPending;

export const getUserFromState = (state: RootState) => state.auth.user;
