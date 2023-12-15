import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getOrder, postOrder } from "../middlewares/orderDetailsQueries";
import { TOrder } from "../../utils/api/types";

type TStateOrderDetail = {
  order: TOrder;
  success: boolean | undefined;
  isLoading: boolean | null;
  error: unknown;
  needDetails: boolean;
};

export const initialState: TStateOrderDetail = {
  success: undefined,

  order: {
    _id: '',
    ingredients: [],
    owner: 'my_Id_In_Matrix',
    status: null,
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0,
    __v: 0,
  },

  isLoading: null,
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
    builder.addCase(getOrder.pending, (state) => {
      state.success = undefined;
      state.isLoading = true;
      state.error = '';
    })
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.order = action.payload.orders[0];
      state.isLoading = false;
      state.error = '';
    })
    builder.addCase(getOrder.rejected, (state, action) => {
      state.success = false;
      state.isLoading = false;
      state.error = action.payload;
    })
  },
});

export const { setNeedingDetails, resetOrderNumber } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
