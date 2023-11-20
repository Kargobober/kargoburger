type TError = {
  readonly success: boolean;
  readonly message: string;
};

type TUser = {
  readonly email: string;
  readonly name: string;
};

type TResponseRefreshToken = {
  readonly success: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
};

type THeadersWithAuth = {                        // делаем заголовки обязательными
  headers: {
    [K in keyof HeadersInit]?: HeadersInit[K]; // а внутри заголовков все ключи необязательные
  } & {
    authorization: string;                    // кроме добавочного поля авторизации
  }
};

type TRequestWithAuthorization = Omit<RequestInit, 'headers'> & THeadersWithAuth;

type TCatcher<T, U> = (url: string, options: U, err: any) => Promise<T>;



export const config = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json',
  }
};



export async function handleResponse<T>(response: Response) {
  const data: Promise<T> = await response.json();
  if (response.ok) return data;
  return Promise.reject(data);
}

export async function fetchWithRefresh<T, U = RequestInit>(url: string, options: U, catcher: TCatcher<T, U>) {
  try {
    const res = await fetch(url, options as unknown as RequestInit);
    const data = await handleResponse<T>(res);
    return data;
  } catch (err: any) {
    // кэтчер (у меня это tokenCatcher) асинхронная функция, потому надо ждать её ответа
    const data = await catcher(url, options, err);
    return data;
  }
}

export async function tokenCatcher(url: string, options: TRequestWithAuthorization, err: TError) {
  if (err.message === 'jwt expired') {
    const refreshData = await refreshToken<TResponseRefreshToken>();

    if (!refreshData.success) {
      return Promise.reject(refreshData);
    }

    localStorage.setItem("accessToken", refreshData.accessToken);
    localStorage.setItem("refreshToken", refreshData.refreshToken);
    options.headers.authorization = refreshData.accessToken;
    // я не менял тип объекта настроек (options), лишь добавил обязательное поле authorization
    const res = await fetch(url, options as unknown as RequestInit);
    const data = await handleResponse<TResponseRefreshToken>(res);
    return data;
  } else {
    return Promise.reject(err);
  }
}

export async function refreshToken<T>(): Promise<T> {
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
    .then(handleResponse<T>);
}
