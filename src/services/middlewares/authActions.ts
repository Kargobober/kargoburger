import { config, fetchWithRefresh, handleResponse, tokenCatcher } from "../../utils/api/api";
import { TRequestRegistration, TResponseGetUser, TResponseLogin, TResponseRegistration } from "../../utils/api/types";
import { handleError } from "../../utils/utils";
import { clearError, setAuthPending, setError, setRegisterPending, setRegisterSuccess, setUser, setUserPending, setUserSuccess } from "../slices/authSlice";
import { AppDispatch } from "../types";


export function registerUser(user: TRequestRegistration) {
  return (dispatch: AppDispatch) => {
    dispatch(setRegisterPending(true));

    return fetch(
      `${config.baseUrl}/auth/register`,
      {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify(user),
      }
    )
      .then(res => {
        return handleResponse<TResponseRegistration>(res);
      })
      .then(data => {
        dispatch(clearError());
        dispatch(setUser(data.user));
        dispatch(setRegisterSuccess(data.success));
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      })
      .catch(err => {
        dispatch(setError(err));
        handleError('Ошибка регистрации: ', err);
      })
      .finally(() => {
        dispatch(setRegisterPending(false));
      });
  };
}

export function getUser() {
  return (dispatch: AppDispatch) => {
    return fetchWithRefresh<TResponseGetUser>(
      `${config.baseUrl}/auth/user`,
      {
        method: 'GET',
        headers: {
        //'Content-Type': 'application/json', - так ругается
        ...config.headers,
        authorization: localStorage.getItem('accessToken')!,
        }
      },
      tokenCatcher
    )
      // проверка ответа (handleResponse) проводится в самом fetchWithRefresh
      // потому сразу работаем с data
      .then(data => {
        dispatch(clearError());
        dispatch(setUser(data.user));
        dispatch(setUserSuccess(true));
      });
      // нет catch, т.к. он есть в checkUserAuth
  };
}

export function login(email: string, password: string) {

  return (dispatch: AppDispatch) => {
    dispatch(setUserPending(true));

    return fetch(
      `${config.baseUrl}/auth/login`,
      {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      }
    )
      .then(handleResponse<TResponseLogin>)
      .then(data => {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        dispatch(setUser(data.user));
        dispatch(setUserSuccess(true));
      })
      .catch(err => {
        dispatch(setUserSuccess(false));
        handleError('Ошибка при попытке входа в аккаунт: ', err)
      })
      .finally(() => {
        dispatch(setUserPending(false));
        /* зануляю, чтобы при повторных попытках ввести неверный пароль
          происходила изменение статуса успешности юзера, которое вызовет useEffect с тостом(уведомление)
          При этом тостик с ошибкой вылезает именно когда false, а не null */
        dispatch(setUserSuccess(null));
      });
  }
}

// вызывается при монтировании App
export function checkUserAuth() {
  return (dispatch: AppDispatch) => {
    dispatch(setAuthPending(true));
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser())
        .catch(err => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch(setUser(null));
          dispatch(setUserSuccess(false));
          handleError('Ошибка авторизации: ', err);
        })
        .finally(() => {
          dispatch( setAuthPending(false) )
        });
    } else {
      dispatch(setAuthPending(false));
      dispatch(setUser(null));
    }
  };
}
