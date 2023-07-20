import { createSlice } from "@reduxjs/toolkit";

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {
    orderDetailsRequest: (state) => ({ ...state, loading: true }),
    orderDetailsSuccess: (state, action) => ({
      ...state,
      loading: false,
      order: action.payload.order,
    }),
    orderDetailsFailed: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    orderDetailsReset: (state) => ({
      ...state,
      order: null
    }),
    clear_errors: (state) => ({
      ...state,
      error: null,
    }),
  },
});

export const {
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFailed,
  orderDetailsReset,
  clear_errors,
} = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
