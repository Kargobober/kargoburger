import { store } from '../store';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, combineReducers } from 'redux';
import ingredientsReducer from "../slices/ingredientsSlice";
import burgerConstructorReducer from '../slices/burgerConstructorSlice';
import ingredientDetailsReducer from '../slices/ingredientDetailsSlice';
import orderDetailsReducer from '../slices/orderDetailsSlice';
import authReducer from '../slices/authSlice';
import { ordersWSReducer } from '../reducers/ordersWS/reducer';
import adaptabilityReducer from '../slices/adaptability';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  auth: authReducer,
  ordersWS: ordersWSReducer,
  adaptability: adaptabilityReducer,
});

/**
 * Типизация всего хранилища
 */
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
