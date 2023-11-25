import { createAsyncThunk } from "@reduxjs/toolkit";
import { config, handleResponse } from "../../utils/api/api";
import { TRequestOrder, TResponseOrder } from "../../utils/api/types";



export const postOrder = createAsyncThunk(
  'order/post',
  (payload: TRequestOrder) => {
    return fetch(
      `${config.baseUrl}/orders`,
      {
        headers: {
          ...config.headers,
          // токен будет, т.к. мы проверяем его наличие до отправки заказа
          authorization: localStorage.getItem('accessToken')!,
        },
        method: 'POST',
        body: JSON.stringify(payload),
      }
    )
      .then(handleResponse<TResponseOrder>);
  }
);
