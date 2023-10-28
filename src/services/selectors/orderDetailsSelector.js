export const getOrderName = (state) => state.orderDetails.name;
export const getOrderNumber = (state) => state.orderDetails.order.number;
export const getOrderSuccess = (state) => state.orderDetails.success;
export const getOrderIsLoading = (state) => state.orderDetails.isLoading;
export const getOrderErrorMessage = (state) => state.orderDetails.error;
export const getOrderDetailsNeeding = (state) => state.orderDetails.needDetails;
