import { testError, testErrorExtra, testUserUtil } from '../../utils/test';
import authReducer, {
  authInitialState,
  clearError,
  setAuthPending,
  setChangeUserDataSuccess,
  setEmailOnStorage,
  setError,
  setLogOutSuccess,
  setRegisterPending,
  setRegisterSuccess,
  setResetCodeSuccess,
  setResetPasswordSuccess,
  setUser,
  setUserPending,
  setUserSuccess } from './authSlice';

const testUser = {
  name: 'Kargobober',
  email: 'example@mail.com',
};

const authStateWithFullishUser = {
  ...authInitialState,
  user: {
    name: 'MyExistingName',
    email: 'myOldMail@oldness.com',
  },
};

describe('Testing reducers in authSlice', () => {
  test('Testing setUser', () => {
    expect(authReducer(authInitialState, setUser(testUser))).toEqual({
      ...authInitialState,
      user: testUser,
    });

    expect(authReducer(undefined, setUser(testUser))).toEqual({
      ...authInitialState,
      user: testUser,
    });
  });


  test('Testing setEmailOnStorage when user nullish', () => {
    expect(authReducer(authInitialState, setEmailOnStorage('anotherMail@mail.com'))).toEqual({
      ...authInitialState,
      user: {email: 'anotherMail@mail.com', name: ''}
    });
  });


  test('Testing setEmailOnStorage when user fullish', () => {
    expect(authReducer(authStateWithFullishUser, setEmailOnStorage('anotherMail@mail.com'))).toEqual({
      ...authStateWithFullishUser,
      user: { ...authStateWithFullishUser.user, email: 'anotherMail@mail.com' }
    });
  });


  test('Testing setRegisterPending', () => {
    expect(authReducer(authInitialState, setRegisterPending(true))).toEqual({
      ...authInitialState,
      registerPending: true,
    });

    expect(authReducer(authInitialState, setRegisterPending(false))).toEqual({
      ...authInitialState,
      registerPending: false,
    });

    expect(authReducer(undefined, setRegisterPending(true))).toEqual({
      ...authInitialState,
      registerPending: true,
    });

    expect(authReducer(undefined, setRegisterPending(false))).toEqual({
      ...authInitialState,
      registerPending: false,
    });
  });


  test('Testing setRegisterSuccess', () => {
    expect(authReducer(authInitialState, setRegisterSuccess(true))).toEqual({
      ...authInitialState,
      registerSuccess: true,
    });

    expect(authReducer(authInitialState, setRegisterSuccess(false))).toEqual({
      ...authInitialState,
      registerSuccess: false,
    });

    expect(authReducer(authInitialState, setRegisterSuccess(null))).toEqual({
      ...authInitialState,
      registerSuccess: null,
    });

    expect(authReducer(undefined, setRegisterSuccess(true))).toEqual({
      ...authInitialState,
      registerSuccess: true,
    });

    expect(authReducer(undefined, setRegisterSuccess(false))).toEqual({
      ...authInitialState,
      registerSuccess: false,
    });

    expect(authReducer(undefined, setRegisterSuccess(null))).toEqual({
      ...authInitialState,
      registerSuccess: null,
    });
  });


  test('Testing setError', () => {
    expect(authReducer(authInitialState, setError(testError))).toEqual({
      ...authInitialState,
      error: testError,
    });

    expect(authReducer(undefined, setError(testError))).toEqual({
      ...authInitialState,
      error: testError,
    });
  });


  test('Testing clearError', () => {
    expect(authReducer({...authInitialState, error: 'There is some error!'}, clearError()))
      .toEqual(authInitialState);

    expect(authReducer(undefined, clearError())).toEqual(authInitialState);
  });


  test('Testing setUserPending', () => {
    expect(authReducer(authInitialState, setUserPending(true))).toEqual({
      ...authInitialState,
      userPending: true,
    });

    expect(authReducer(authInitialState, setUserPending(false))).toEqual({
      ...authInitialState,
      userPending: false,
    });

    expect(authReducer(undefined, setUserPending(true))).toEqual({
      ...authInitialState,
      userPending: true,
    });

    expect(authReducer(undefined, setUserPending(false))).toEqual({
      ...authInitialState,
      userPending: false,
    });
  });


  test('Testing setUserSuccess', () => {
    expect(authReducer(authInitialState, setUserSuccess(true))).toEqual({
      ...authInitialState,
      userSuccess: true,
    });

    expect(authReducer(authInitialState, setUserSuccess(false))).toEqual({
      ...authInitialState,
      userSuccess: false,
    });

    expect(authReducer(authInitialState, setUserSuccess(null))).toEqual({
      ...authInitialState,
      userSuccess: null,
    });

    expect(authReducer(undefined, setUserSuccess(true))).toEqual({
      ...authInitialState,
      userSuccess: true,
    });

    expect(authReducer(undefined, setUserSuccess(false))).toEqual({
      ...authInitialState,
      userSuccess: false,
    });

    expect(authReducer(undefined, setUserSuccess(null))).toEqual({
      ...authInitialState,
      userSuccess: null,
    });
  });


  test('Testing setAuthPending', () => {
    expect(authReducer(authInitialState, setAuthPending(true))).toEqual({
      ...authInitialState,
      authPending: true,
    });

    expect(authReducer(authInitialState, setAuthPending(false))).toEqual({
      ...authInitialState,
      authPending: false,
    });

    expect(authReducer(authInitialState, setAuthPending(null))).toEqual({
      ...authInitialState,
      authPending: null,
    });

    expect(authReducer(undefined, setAuthPending(true))).toEqual({
      ...authInitialState,
      authPending: true,
    });

    expect(authReducer(undefined, setAuthPending(false))).toEqual({
      ...authInitialState,
      authPending: false,
    });

    expect(authReducer(undefined, setAuthPending(null))).toEqual({
      ...authInitialState,
      authPending: null,
    });
  });


  test('Testing setResetPasswordSuccess', () => {
    expect(authReducer(authInitialState, setResetPasswordSuccess(true))).toEqual({
      ...authInitialState,
      resetPasswordSuccess: true,
    });

    expect(authReducer(authInitialState, setResetPasswordSuccess(false))).toEqual({
      ...authInitialState,
      resetPasswordSuccess: false,
    });

    expect(authReducer(authInitialState, setResetPasswordSuccess(null))).toEqual({
      ...authInitialState,
      resetPasswordSuccess: null,
    });

    expect(authReducer(undefined, setResetPasswordSuccess(true))).toEqual({
      ...authInitialState,
      resetPasswordSuccess: true,
    });

    expect(authReducer(undefined, setResetPasswordSuccess(false))).toEqual({
      ...authInitialState,
      resetPasswordSuccess: false,
    });

    expect(authReducer(undefined, setResetPasswordSuccess(null))).toEqual({
      ...authInitialState,
      resetPasswordSuccess: null,
    });
  });


  test('Testing setResetCodeSuccess', () => {
    expect(authReducer(authInitialState, setResetCodeSuccess(true))).toEqual({
      ...authInitialState,
      resetCodeSuccess: true,
    });

    expect(authReducer(authInitialState, setResetCodeSuccess(false))).toEqual({
      ...authInitialState,
      resetCodeSuccess: false,
    });

    expect(authReducer(authInitialState, setResetCodeSuccess('sended'))).toEqual({
      ...authInitialState,
      resetCodeSuccess: 'sended',
    });

    expect(authReducer(authInitialState, setResetCodeSuccess(null))).toEqual({
      ...authInitialState,
      resetCodeSuccess: null,
    });

    expect(authReducer(undefined, setResetCodeSuccess(true))).toEqual({
      ...authInitialState,
      resetCodeSuccess: true,
    });

    expect(authReducer(undefined, setResetCodeSuccess(false))).toEqual({
      ...authInitialState,
      resetCodeSuccess: false,
    });

    expect(authReducer(undefined, setResetCodeSuccess('sended'))).toEqual({
      ...authInitialState,
      resetCodeSuccess: 'sended',
    });

    expect(authReducer(undefined, setResetCodeSuccess(null))).toEqual({
      ...authInitialState,
      resetCodeSuccess: null,
    });
  });


  test('Testing setLogOutSuccess', () => {
    expect(authReducer(authInitialState, setLogOutSuccess(true))).toEqual({
      ...authInitialState,
      logOutSuccess: true,
    });

    expect(authReducer(authInitialState, setLogOutSuccess(false))).toEqual({
      ...authInitialState,
      logOutSuccess: false,
    });

    expect(authReducer(authInitialState, setLogOutSuccess(null))).toEqual({
      ...authInitialState,
      logOutSuccess: null,
    });

    expect(authReducer(undefined, setLogOutSuccess(true))).toEqual({
      ...authInitialState,
      logOutSuccess: true,
    });

    expect(authReducer(undefined, setLogOutSuccess(false))).toEqual({
      ...authInitialState,
      logOutSuccess: false,
    });

    expect(authReducer(undefined, setLogOutSuccess(null))).toEqual({
      ...authInitialState,
      logOutSuccess: null,
    });
  });


  test('Testing setChangeUserDataSuccess', () => {
    expect(authReducer(authInitialState, setChangeUserDataSuccess(true))).toEqual({
      ...authInitialState,
      changeUserDataSuccess: true,
    });

    expect(authReducer(authInitialState, setChangeUserDataSuccess(false))).toEqual({
      ...authInitialState,
      changeUserDataSuccess: false,
    });

    expect(authReducer(authInitialState, setChangeUserDataSuccess(null))).toEqual({
      ...authInitialState,
      changeUserDataSuccess: null,
    });

    expect(authReducer(undefined, setChangeUserDataSuccess(true))).toEqual({
      ...authInitialState,
      changeUserDataSuccess: true,
    });

    expect(authReducer(undefined, setChangeUserDataSuccess(false))).toEqual({
      ...authInitialState,
      changeUserDataSuccess: false,
    });

    expect(authReducer(undefined, setChangeUserDataSuccess(null))).toEqual({
      ...authInitialState,
      changeUserDataSuccess: null,
    });
  });
});

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

describe('Testing extra reducers in authSlice', () => {
  test('Testing sendResetCode, pending', () => {
    expect(authReducer(authInitialState, {
      type: 'auth/sendResetCode/pending'
    })).toEqual({
      ...authInitialState,
      resetPasswordPending: true,
      resetCodeSuccess: null,
    });

    expect(authReducer(undefined, {
      type: 'auth/sendResetCode/pending',
    })).toEqual({
      ...authInitialState,
      resetPasswordPending: true,
      resetCodeSuccess: null,
    });
  });

  test('Testing sendResetCode, fulfilled', () => {
    expect(authReducer(authInitialState, {
      type: 'auth/sendResetCode/fulfilled',
    })).toEqual({
      ...authInitialState,
      resetPasswordPending: false,
      resetCodeSuccess: true,
    });

    expect(authReducer(undefined, {
      type: 'auth/sendResetCode/fulfilled',
    })).toEqual({
      ...authInitialState,
      resetPasswordPending: false,
      resetCodeSuccess: true,
    });
  });

  test('Testing sendResetCode, rejected', () => {
    expect(authReducer(authInitialState, {
      type: 'auth/sendResetCode/rejected',
      payload: testError
    })).toEqual({
      ...authInitialState,
      resetPasswordPending: false,
      resetCodeSuccess: false,
      error: testError,
    });

    expect(authReducer(undefined, {
      type: 'auth/sendResetCode/rejected',
      payload: testError
    })).toEqual({
      ...authInitialState,
      resetPasswordPending: false,
      resetCodeSuccess: false,
      error: testError,
    });
  });


  test('Testing resetPassword, pending', () => {
    expect(authReducer(authInitialState, {
      type: 'auth/resetPassword/pending',
    })).toEqual({
      ...authInitialState,
      resetPasswordPending: true,
      resetPasswordSuccess: null,
    });

    expect(authReducer(undefined, {
      type: 'auth/resetPassword/pending',
    })).toEqual({
      ...authInitialState,
      resetPasswordPending: true,
      resetPasswordSuccess: null,
    });
  });

  test('Testing resetPassword, fulfilled', () => {
    expect(authReducer(authInitialState, {
      type: 'auth/resetPassword/fulfilled',
    })).toEqual({
      ...authInitialState,
      resetPasswordPending: false,
      resetPasswordSuccess: true,
    });

    expect(authReducer(undefined, {
      type: 'auth/resetPassword/fulfilled',
    })).toEqual({
      ...authInitialState,
      resetPasswordPending: false,
      resetPasswordSuccess: true,
    });
  });

  test('Testing resetPassword, rejected', () => {
    expect(authReducer(authInitialState, {
      type: 'auth/resetPassword/rejected',
      payload: testError
    })).toEqual({
      ...authInitialState,
      resetPasswordPending: false,
      resetPasswordSuccess: false,
      error: testError,
    });

    expect(authReducer(undefined, {
      type: 'auth/resetPassword/rejected',
      payload: testError
    })).toEqual({
      ...authInitialState,
      resetPasswordPending: false,
      resetPasswordSuccess: false,
      error: testError,
    });
  });


  test('Testing changeUserData, pending', () => {
    expect(authReducer(authInitialState, {
      type: 'auth/changeUserData/pending',
    })).toEqual({
      ...authInitialState,
      changeUserDataPending: true,
      changeUserDataSuccess: null,
    });

    expect(authReducer(undefined, {
      type: 'auth/changeUserData/pending',
    })).toEqual({
      ...authInitialState,
      changeUserDataPending: true,
      changeUserDataSuccess: null,
    });
  });

  test('Testing changeUserData, fulfilled', () => {
    expect(authReducer(authInitialState, {
      type: 'auth/changeUserData/fulfilled',
      payload: {success: true, user: testUserUtil}
    })).toEqual({
      ...authInitialState,
      changeUserDataPending: false,
      changeUserDataSuccess: true,
      user: testUserUtil,
    });

    expect(authReducer(undefined, {
      type: 'auth/changeUserData/fulfilled',
      payload: {success: true, user: {name: 'AbobaI', email: 'abobaI@abo.baI'}}
    })).toEqual({
      ...authInitialState,
      changeUserDataPending: false,
      changeUserDataSuccess: true,
      user: {name: 'AbobaI', email: 'abobaI@abo.baI'},
    });
  });

  test('Testing changeUserData, rejected', () => {
    expect(authReducer(authInitialState, {
      type: 'auth/changeUserData/rejected',
      payload: testError
    })).toEqual({
      ...authInitialState,
      changeUserDataPending: false,
      changeUserDataSuccess: false,
      error: testError,
    });

    expect(authReducer(undefined, {
      type: 'auth/changeUserData/rejected',
      payload: testError
    })).toEqual({
      ...authInitialState,
      changeUserDataPending: false,
      changeUserDataSuccess: false,
      error: testError,
    });
  });


  test('Testing logOut, pending', () => {
    expect(authReducer(authInitialState, {
      type: 'auth/logOut/pending',
    })).toEqual({
      ...authInitialState,
      logOutPending: true,
      logOutSuccess: null,
    });

    expect(authReducer(undefined, {
      type: 'auth/logOut/pending',
    })).toEqual({
      ...authInitialState,
      logOutPending: true,
      logOutSuccess: null,
    });
  });

  test('Testing logOut, fulfilled', () => {
    expect(authReducer(authInitialState, {
      type: 'auth/logOut/fulfilled',
    })).toEqual({
      ...authInitialState,
      logOutPending: false,
      logOutSuccess: true,
      user: null,
      userSuccess: null,
    });

    expect(authReducer(undefined, {
      type: 'auth/logOut/fulfilled',
    })).toEqual({
      ...authInitialState,
      logOutPending: false,
      logOutSuccess: true,
      user: null,
      userSuccess: null,
    });
  });

  test('Testing logOut, rejected', () => {
    expect(authReducer(authInitialState, {
      type: 'auth/logOut/rejected',
      payload: testErrorExtra
    })).toEqual({
      ...authInitialState,
      logOutPending: false,
      logOutSuccess: false,
      error:  testErrorExtra,
    });

    expect(authReducer(undefined, {
      type: 'auth/logOut/rejected',
      payload: testErrorExtra
    })).toEqual({
      ...authInitialState,
      logOutPending: false,
      logOutSuccess: false,
      error:  testErrorExtra,
    });
  });
});
