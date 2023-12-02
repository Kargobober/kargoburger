import { OrdersWSActions } from '../../types/ordersWS';
import { createAction } from '@reduxjs/toolkit';

export const connect = createAction<string, 'ORDERS_WS_CONNECT'>('ORDERS_WS_CONNECT');
export const disconnect = createAction('ORDERS_WS_DISCONNECT');
export const wsConnecting = createAction('ORDERS_WS_CONNECTING');
export const wsOpen = createAction('ORDERS_WS_OPEN');
export const wsClose = createAction('ORDERS_WS_CLOSE');
export const wsMessage = createAction<OrdersWSActions, 'ORDERS_WS_MESSAGE'>('ORDERS_WS_MESSAGE');
export const wsError = createAction<string, 'ORDERS_WS_ERROR'>('ORDERS_WS_ERROR');

export type TOrdersWSActions = ReturnType<typeof connect>
                                | ReturnType<typeof disconnect>
                                | ReturnType<typeof wsConnecting>
                                | ReturnType<typeof wsOpen>
                                | ReturnType<typeof wsClose>
                                | ReturnType<typeof wsMessage>
                                | ReturnType<typeof wsError>;
