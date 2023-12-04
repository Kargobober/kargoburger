import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./middlewares/socket-middleware";
import {
  connect as OrdersWsConnect,
  disconnect as OrdersWsDisconnect,
  wsConnecting as OrdersWsConnecting,
  wsOpen as OrdersWsOpen,
  wsClose as OrdersWsClose,
  wsMessage as OrdersWsNessage,
  wsError as OrdersWsError
} from "./reducers/ordersWS/actions";
import { rootReducer } from "./types";

const wsActions = {
  wsConnect: OrdersWsConnect,
  wsDisconnect: OrdersWsDisconnect,
  wsConnecting: OrdersWsConnecting,
  onOpen: OrdersWsOpen,
  onClose: OrdersWsClose,
  onError: OrdersWsError,
  onMessage: OrdersWsNessage,
};

const ordersWSMiddleware = socketMiddleware(wsActions);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(ordersWSMiddleware)
  }
});
