import { config, fetchWithRefresh, handleResponse, tokenCatcher } from "../../utils/api";
import { handleError } from "../../utils/utils";
import { clearError, setAuthPending, setError, setRegisterPending, setRegisterSuccess, setUser, setUserPending, setUserSuccess } from "../slices/authSlice";


export function registerUser(user) {
  return (dispatch) => {
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
        return handleResponse(res);
      })
      .then(data => {
        dispatch(clearError());
        dispatch(setUser(data.user));
        dispatch(setRegisterSuccess(data.success));
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      })
      .catch(err => {
        dispatch(setError(err.message));
        handleError('Ошибка регистрации: ', err.message);
      })
      .finally(() => {
        dispatch(setRegisterPending(false));
      });
  };
}

export function getUser() {
  return (dispatch) => {
    return fetchWithRefresh(
      `${config.baseUrl}/auth/user`,
      {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
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

export function login(email, password) {

  return (dispatch) => {
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
      .then(handleResponse)
      .then(data => {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        dispatch(setUser(data.user));
      })
      .catch(err => {
        dispatch(setUserSuccess(false));
        handleError('Ошибка при попытке входа в аккаунт: ', err.message)
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
  return (dispatch) => {
    dispatch(setAuthPending(true));
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser())
        .catch(err => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch(setUser(null));
          dispatch(setUserSuccess(false));
          handleError('Ошибка авторизации: ', err.message);
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
