export const config = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json',
  }
}

/*function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    // Из негативного ответа сервера асинхронно извлекаем объект err с данными о запросе. Поле message передаем в отклоненный промис, который отдаст это в catch.
    return response.json()
    .then(err => Promise.reject(err.message));
  }
}*/
