import { TResponseGetOrders } from '../../../utils/api/types';
import {
  OrdersWSActionType,
  OrdersWSActions,
} from '../../types/ordersWS';

export const ordersWSFakeUpdate = (prevData: TResponseGetOrders, actions: OrdersWSActions): TResponseGetOrders => {
  let data = prevData;
  actions.forEach((action) => {
    switch (action.type) {
      case OrdersWSActionType.DATA:
        data = action.data;
        break;
    }
  });

  return data;
};
