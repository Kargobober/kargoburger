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

export async function fetchWithRefresh (url, options, catcher) {
  try {
    const res = await fetch(url, options);
    return await handleResponse(res, 'success');
  } catch (err) {
    catcher(url, options, err);
  }
}

export async function tokenCatcher(url, options, err) {
    if (err.message === 'jwt expired') {
    const refreshData = await refreshToken();
    if (!refreshData.success) {
      return Promise.reject(refreshData);
    }
    localStorage.setItem("accessToken", refreshData.accessToken);
    localStorage.setItem("refreshToken", refreshData.refreshToken);
    options.headers.authorization = refreshData.accessToken;
    const res = await fetch(url, options);
    return await handleResponse(res);
  } else {
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
