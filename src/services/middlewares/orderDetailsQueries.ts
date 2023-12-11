import { createAsyncThunk } from "@reduxjs/toolkit";
import { config, fetchWithRefresh, handleResponse, tokenCatcher } from "../../utils/api/api";
import { TRequestPostOrder, TResponseGetOrder, TResponsePostOrder } from "../../utils/api/types";

export const postOrder = createAsyncThunk(
  'order/post',
  (payload: TRequestPostOrder) => {
    return fetchWithRefresh<TResponsePostOrder>(
      `${config.baseUrl}/orders`,
      {
        headers: {
          ...config.headers,
          // токен будет, т.к. мы проверяем его наличие до отправки заказа
          authorization: localStorage.getItem('accessToken')!,
        },
        method: 'POST',
        body: JSON.stringify(payload),
      },
      tokenCatcher
    )
  }
);

export const getOrder = createAsyncThunk(
  'order/get',
  (orderNumber: number | string) => {
    return fetch(`${config.baseUrl}/orders/${orderNumber}`)
      .then(handleResponse<TResponseGetOrder>)
  }
);
