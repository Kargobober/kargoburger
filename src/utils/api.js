export const config = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json',
  }
};

export function handleResponse(response, statusName = 'ok') {
  if (response[statusName]) {
    return response.json();
  } else {
    // Из негативного ответа сервера асинхронно извлекаем объект err с данными о запросе. Поле message передаем в отклоненный промис, который отдаст это в catch.
    return response.json()
      .then(err => Promise.reject(err));
  }
}

export async function fetchWithRefresh(url, options, catcher) {
  try {
    const res = await fetch(url, options);
    const data = await handleResponse(res);
    console.log('fetchWithRefresh, обработанный ответ:', data);
    return data;
  } catch (err) {
    // кэтчер (у меня это tokenCatcher) асинхронная функция, потому надо ждать её ответа
    const data = await catcher(url, options, err);
    return data;
  }
}

export async function tokenCatcher(url, options, err) {
  console.log('tokenCatcher');
  if (err.message === 'jwt expired') {
    console.log('jwt expired');
    const refreshData = await refreshToken();

    if (!refreshData.success) {
      console.log('я в 2ом условии кэтчера, т.к. при передаче рефреш-токена сервер ответил с ошибкой');
      return Promise.reject(refreshData);
    }

    console.log('кетчер, установка новых токенов');
    localStorage.setItem("accessToken", refreshData.accessToken);
    localStorage.setItem("refreshToken", refreshData.refreshToken);
    options.headers.authorization = refreshData.accessToken;
    const res = await fetch(url, options);
    console.log('tokenCatcher, jwt expired, ответ повтороного фетча:', res);
    const data = await handleResponse(res);
    console.log('tokenCatcher, jwt expired, дата повтороного фетча:', data);
    return data;
  } else {
    console.log('кэтчер отклоняет промис, т.к. ошибка связана не с истеканием срока годности токена');
    console.log(err);
    return Promise.reject(err);
  }
}

export async function refreshToken() {
  // передаём свой refreshToken, чтобы получить новый accessToken
  return fetch(
    `${config.baseUrl}/auth/token`,
    {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      })
    }
  )
    .then(handleResponse);
}
