import { TResponseGetOrders } from "../../utils/api/types";

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum OrdersWSActionType {
  DATA = 'data',
}

export type Data = {
  type: OrdersWSActionType.DATA,
  data: TResponseGetOrders
};

export type OrdersWSAction = Data;

export type OrdersWSActions = Array<OrdersWSAction>;
