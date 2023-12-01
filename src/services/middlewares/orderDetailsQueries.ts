import { createAsyncThunk } from "@reduxjs/toolkit";
import { config, handleResponse } from "../../utils/api/api";
import { TRequestPostOrder, TResponseGetOrder, TResponsePostOrder } from "../../utils/api/types";

const responseSone = {
  "success": true,
  "orders": [
      {
          "_id": "6569be077fd657001ba0560c",
          "ingredients": [
              "643d69a5c3f7b9001cfa0949",
              "643d69a5c3f7b9001cfa0943",
              "643d69a5c3f7b9001cfa093e",
              "643d69a5c3f7b9001cfa0943",
              "643d69a5c3f7b9001cfa0946",
              "643d69a5c3f7b9001cfa093c",
              "643d69a5c3f7b9001cfa093c"
          ],
          "owner": "65525706c2cc61001b3d79b2",
          "status": "done",
          "name": "Экзо-плантаго space краторный минеральный люминесцентный бургер",
          "createdAt": "2023-12-01T11:05:43.364Z",
          "updatedAt": "2023-12-01T11:05:43.629Z",
          "number": 27836,
          "__v": 0
      }
  ]
};

export const postOrder = createAsyncThunk(
  'order/post',
  (payload: TRequestPostOrder) => {
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
      .then(handleResponse<TResponsePostOrder>);
  }
);

export const getOrder = createAsyncThunk(
  'order/get',
  (orderNumber: number | string) => {
    return fetch(`${config.baseUrl}/orders/${orderNumber}`)
      .then(handleResponse<TResponseGetOrder>)
  }
);
