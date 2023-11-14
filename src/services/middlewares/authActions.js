import { config, fetchWithRefresh, handleResponse, tokenCatcher } from "../../utils/api";
import { handleError } from "../../utils/utils";
import { clearError, setAuthPending, setError, setRegisterPending, setRegisterSuccess, setUser, setUserSuccess } from "../slices/authSlice";


export function registerUser(user) {
  console.log('передаваемый объект:', user);
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
        console.log('ответ сервера, связанный с регистрацией:', res);
        return handleResponse(res);
      })
      .then(data => {
        console.log('дата, связанная с регистрацией:', data);
        dispatch(clearError());
        dispatch(setUser(data.user));
        dispatch(setRegisterSuccess(data.success));
        console.log('установка токенов из кода регистрации');
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      })
      .catch(err => {
        console.log('ошибка при регистрации:', err);
        dispatch(setError(err.message));
        handleError('Ошибка регистрации: ', err.message);
      })
      .finally(() => {
        dispatch(setRegisterPending(false));
      });
  };
}

export function getUser() {
  console.log('getUser');
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
        console.log('getUser, блок then получил след. дату:', data);
        dispatch(clearError());
        dispatch(setUser(data.user));
        dispatch(setUserSuccess(true));
      });
      // нет catch, т.к. он есть в checkUserAuth
  };
}

export function login(email, password) {

  return (dispatch) => {
    dispatch(setAuthPending(true));

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
        console.log('Попытка входа, data из ответа сервера:');
        console.log(data);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        dispatch(setUser(data.user));
      })
      .catch(err => {
        handleError('Ошибка при попытке входа в аккаунт: ', err.message)
      })
      .finally(() => {
        dispatch(setAuthPending(false));
      });
  }
}

// вызывается при монтировании App
export function checkUserAuth() {
  return (dispatch) => {
    console.log('checkUserAuth');
    dispatch(setAuthPending(true));
    if (localStorage.getItem('accessToken')) {
      console.log('в хранилище имеется токен');
      dispatch(getUser())
        .catch(err => {
          console.log('удаление токенов');
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
      console.log('токен не найден');
      dispatch(setAuthPending(false));
      dispatch(setUser(null));
    }
  };
};

