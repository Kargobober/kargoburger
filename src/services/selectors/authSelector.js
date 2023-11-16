export const getResetPasswordSuccess = (state) => state.auth.resetPasswordSuccess;
export const getResetPasswordPending = (state) => state.auth.resetPasswordPending;
export const getResetCodeSuccess = (state) => state.auth.resetCodeSuccess;

export const getUserSuccess = (state) => state.auth.userSuccess;
export const getUserPending = (state) => state.auth.userPending;
export const getUserState = (state) => state.auth.user;

export const getChangeUserDataSuccess = (state) => state.auth.changeUserDataSuccess;
export const getChangeUserDataPending = (state) => state.auth.changeUserDataPending;

export const getLogOutSuccess = (state) => state.auth.logOutSuccess;
export const getLogOutPending = (state) => state.auth.logOutPending;

export const getAuthPending = (state) => state.auth.authPending;

export const getUserFromState = (state) => state.auth.user;
