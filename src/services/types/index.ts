import { store } from '../store';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';


/**
 * Типизация всего хранилища
 */
export type RootState = ReturnType<typeof store.getState>;



export type AppDispatch = typeof store.dispatch;
