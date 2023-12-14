import { StatusKind, TResponseGetOrder, TResponsePostOrder } from '../../utils/api/types';
import { testError } from '../../utils/test';
import orderDetailsReducer, { initialState, resetOrderNumber, setNeedingDetails } from './orderDetailsSlice';

const postOrderResponse: TResponsePostOrder = {
  name: 'qwerty',
  order: {
    number: 1492,
  },
  success: true,
};

const order = {
  _id: '123abc',
  ingredients: ['111', '222', '333'],
  owner: 'Kargobober',
  status: StatusKind.DONE,
  name: 'Безукоризненный бессмертный космобургер',
  createdAt: '11.11.1444 17:00',
  updatedAt: '11.11.1444 17:01',
  number: 25001,
  __v: 0,
};

// открытие заказа пользователя в модалке
const getOrderResponse: TResponseGetOrder = {
  success: true,
  orders: [order],
  total: 25000,
  totalToday: 55,
};

describe('Testing orderDetailsSlice', () => {
  test('The "needDetails" key should accept the passed value', () => {
    expect(orderDetailsReducer(initialState, setNeedingDetails(true))).toEqual({
      ...initialState,
      needDetails: true,
    });

    expect(orderDetailsReducer(undefined, setNeedingDetails(true))).toEqual({
      ...initialState,
      needDetails: true,
    });
  });


  test('The order number should resetting to initial value', () => {
    expect(orderDetailsReducer({
      ...initialState,
      order: { ...initialState.order, number: 123456 }
    }, resetOrderNumber()))
      .toEqual(initialState);

    expect(orderDetailsReducer(undefined, resetOrderNumber())).toEqual(initialState);
  });



  test('Testing the postOrder pending proccess', () => {
    expect(orderDetailsReducer(initialState, {
      type: 'order/post/pending'
    })).toEqual({ ...initialState, isLoading: true });

    expect(orderDetailsReducer(undefined, {
      type: 'order/post/pending'
    })).toEqual({ ...initialState, isLoading: true });
  });


  test('Testing the postOrder fulfilled response', () => {
    expect(orderDetailsReducer(initialState, {
      type: 'order/post/fulfilled',
      payload: postOrderResponse
    })).toEqual({
      success: true,
      order: { ...initialState.order, number: postOrderResponse.order.number },
      isLoading: false,
      error: initialState.error,
      needDetails: initialState.needDetails,
    });

    expect(orderDetailsReducer(undefined, {
      type: 'order/post/fulfilled',
      payload: postOrderResponse
    })).toEqual({
      success: true,
      order: { ...initialState.order, number: postOrderResponse.order.number },
      isLoading: false,
      error: initialState.error,
      needDetails: initialState.needDetails,
    });
  });


  test('Testing the postOrder rejected response', () => {
    expect(orderDetailsReducer(initialState, {
      type: 'order/post/rejected',
      payload: testError
    })).toEqual({
      success: false,
      order: { ...initialState.order },
      isLoading: false,
      error: testError,
      needDetails: initialState.needDetails,
    });

    expect(orderDetailsReducer(undefined, {
      type: 'order/post/rejected',
      payload: testError
    })).toEqual({
      success: false,
      order: { ...initialState.order },
      isLoading: false,
      error: testError,
      needDetails: initialState.needDetails,
    });
  });



  test('Testing the getOrder pending proccess', () => {
    expect(orderDetailsReducer(initialState, {
      type: 'order/get/pending'
    })).toEqual({ ...initialState, isLoading: true });

    expect(orderDetailsReducer(undefined, {
      type: 'order/get/pending'
    })).toEqual({ ...initialState, isLoading: true });
  });


  test('Testing the getOrder fulfilled response', () => {
    expect(orderDetailsReducer(initialState, {
      type: 'order/get/fulfilled',
      payload: getOrderResponse
    })).toEqual({
      success: true,
      order: order,
      isLoading: false,
      error: initialState.error,
      needDetails: initialState.needDetails,
    });

    expect(orderDetailsReducer(undefined, {
      type: 'order/get/fulfilled',
      payload: getOrderResponse
    })).toEqual({
      success: true,
      order: order,
      isLoading: false,
      error: initialState.error,
      needDetails: initialState.needDetails,
    });
  });



  test('Testing the getOrder rejected response', () => {
    expect(orderDetailsReducer(initialState, {
      type: 'order/get/rejected',
      payload: testError
    })).toEqual({
      success: false,
      order: initialState.order,
      isLoading: false,
      error: testError,
      needDetails: initialState.needDetails,
    });

    expect(orderDetailsReducer(undefined, {
      type: 'order/get/rejected',
      payload: testError
    })).toEqual({
      success: false,
      order: initialState.order,
      isLoading: false,
      error: testError,
      needDetails: initialState.needDetails,
    });
  });
});
