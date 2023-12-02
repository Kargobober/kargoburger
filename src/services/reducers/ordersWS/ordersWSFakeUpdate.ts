import { TResponseGetOrders } from '../../../utils/api/types';
import { Data } from '../../types/ordersWS';
// так и не понял как что и зачем
export const ordersWSFakeUpdate = (prevdata: TResponseGetOrders, action: Data): TResponseGetOrders => {
  let data = prevdata;
  data = action.data;
  return data;
};
