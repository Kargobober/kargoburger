import { WebsocketStatus } from '../../types/ordersWS';
import { TResponseGetOrders } from "../../../utils/api/types";
import { createReducer } from '@reduxjs/toolkit'
import { wsOpen, wsClose, wsMessage, wsError, wsConnecting } from "./actions";

export type OrdersWSStore = {
  status: WebsocketStatus,
  connectionError: string,
  data: TResponseGetOrders
}

export const ordersWSInitialState: OrdersWSStore = {
  status: WebsocketStatus.OFFLINE,
  connectionError: '',
  data: {
    success: null,
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

export const ordersWSReducer = createReducer(ordersWSInitialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = '';
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.data = action.payload;
    })
});

/*
коммент автора лайв-таблицы: createSlice не выводит экшены с type литерального типа и
совсем строгую типизацию так не получить

см. оригинальный код мидлвары для WS
*/
