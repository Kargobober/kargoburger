import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { postOrder } from "../middlewares/orderDetailsQueries";

type TStateOrderDetail = {
  name: string;
  order: {
    number: number;
  };
  success: boolean | undefined;
  isLoading: boolean;
  error: unknown;
  needDetails: boolean;
};

const initialState: TStateOrderDetail = {
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
    setNeedingDetails: (state, action: PayloadAction<boolean>) => {
      state.needDetails = action.payload;
    },
    resetOrderNumber: (state) => {
      state.order.number = initialState.order.number;
    }
  },
  extraReducers: builder => {
    builder.addCase(postOrder.pending, (state) => {
      state.success = undefined;
      state.isLoading = true;
      state.error = '';
    })
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.order.number = action.payload.order.number;
      state.success = action.payload.success;
      state.isLoading = false;
      state.error = '';
    })
    builder.addCase(postOrder.rejected, (state, action) => {
      state.success = false;
      state.isLoading = false;
      state.error = action.payload;
    })
  },
});

export const { setNeedingDetails, resetOrderNumber } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
