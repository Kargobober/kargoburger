import { RootState } from "../types";

export const getOrderNumber = (state: RootState) => state.orderDetails.order.number;
export const getOrderSuccess = (state: RootState) => state.orderDetails.success;
export const getOrderIsLoading = (state: RootState) => state.orderDetails.isLoading;
export const getOrderError = (state: RootState) => state.orderDetails.error;
export const getOrderDetailsNeeding = (state: RootState) => state.orderDetails.needDetails;

export const getOrderFromState = (state: RootState) => state.orderDetails.order;
