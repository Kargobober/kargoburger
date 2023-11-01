import { createSlice } from "@reduxjs/toolkit";
import { postOrder } from "../middlewares/orderDetailsQueries";


const initialState = {
  name: '',
  order: {
    number: 0,
  },
  success: undefined,
  isLoading: false,
  error: '',
  needDetails: false,
};

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    setNeedingDetails: (state, action) => {
      state.needDetails = action.payload;
    },
    resetOrderNumber: (state) => {
      state.order.number = 0;
    }
  },
  extraReducers: {
    [postOrder.pending.type]: (state) => {
      state.success = undefined;
      state.isLoading = true;
      state.error = '';
    },
    [postOrder.fulfilled.type]: (state, action) => {
      state.name = action.payload.name;
      state.order.number = action.payload.order.number;
      state.success = action.payload.success;
      state.isLoading = false;
      state.error = '';
    },
    [postOrder.rejected.type]: (state, action) => {
      state.success = false;
      state.isLoading = false;
      state.error = action.error;
    },
  }
});

export const { setNeedingDetails, resetOrderNumber } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
