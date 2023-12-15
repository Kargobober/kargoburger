import { testObj } from '../../../utils/test';
import { WebsocketStatus } from '../../types/ordersWS';
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './actions';
import { ordersWSReducer, ordersWSInitialState } from './reducer';

describe('Testing ordersWSReducer', () => {
  test('Testing wsConnecting', () => {
    expect(ordersWSReducer(ordersWSInitialState, {
      type: wsConnecting.type
    })).toEqual({
      ...ordersWSInitialState,
      status: WebsocketStatus.CONNECTING,
    });

    expect(ordersWSReducer(undefined, {
      type: wsConnecting.type
    })).toEqual({
      ...ordersWSInitialState,
      status: WebsocketStatus.CONNECTING,
    });
  });


  test('Testing wsOpen', () => {
    expect(ordersWSReducer(ordersWSInitialState, {
      type: wsOpen.type
    })).toEqual({
      ...ordersWSInitialState,
      status: WebsocketStatus.ONLINE,
    });

    expect(ordersWSReducer(undefined, {
      type: wsOpen.type
    })).toEqual({
      ...ordersWSInitialState,
      status: WebsocketStatus.ONLINE,
    });
  });


  test('Testing wsClose', () => {
    expect(ordersWSReducer(ordersWSInitialState, {
      type: wsClose.type
    })).toEqual({
      ...ordersWSInitialState,
      status: WebsocketStatus.OFFLINE,
    });

    expect(ordersWSReducer(undefined, {
      type: wsClose.type
    })).toEqual({
      ...ordersWSInitialState,
      status: WebsocketStatus.OFFLINE,
    });
  });


  test('Testing wsError', () => {
    expect(ordersWSReducer(ordersWSInitialState, {
      type: wsError.type,
      payload: testObj
    })).toEqual({
      ...ordersWSInitialState,
      connectionError: testObj,
    });

    expect(ordersWSReducer(undefined, {
      type: wsError.type,
      payload: testObj
    })).toEqual({
      ...ordersWSInitialState,
      connectionError: testObj,
    });
  });


  test('Testing wsMessage', () => {
    expect(ordersWSReducer(ordersWSInitialState, {
      type: wsMessage.type,
      payload: testObj
    })).toEqual({
      ...ordersWSInitialState,
      data: testObj,
    });

    expect(ordersWSReducer(undefined, {
      type: wsMessage.type,
      payload: testObj
    })).toEqual({
      ...ordersWSInitialState,
      data: testObj,
    });
  });
});
