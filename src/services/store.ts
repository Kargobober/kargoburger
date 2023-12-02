import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./middlewares/socket-middleware";
import {
  connect as LiveTableWsConnect,
  disconnect as LiveTableWsDisconnect,
  wsConnecting as LiveTableWsConnecting,
  wsOpen as LiveTableWsOpen,
  wsClose as LiveTableWsClose,
  wsMessage as LiveTableWsNessage,
  wsError as LiveTableWsError
} from "./reducers/ordersWS/actions";
import { rootReducer } from "./types";

const wsActions = {
  wsConnect: LiveTableWsConnect,
  wsDisconnect: LiveTableWsDisconnect,
  wsConnecting: LiveTableWsConnecting,
  onOpen: LiveTableWsOpen,
  onClose: LiveTableWsClose,
  onError: LiveTableWsError,
  onMessage: LiveTableWsNessage,
};

const ordersWSMiddleware = socketMiddleware(wsActions);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(ordersWSMiddleware)
  }
});
