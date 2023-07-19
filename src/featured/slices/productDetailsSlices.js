import { createSlice } from "@reduxjs/toolkit";

const productDetailsSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    loading: false,
    error: null,
  },
  reducers: {
    productDetailsRequest: (state) => ({ ...state, loading: true }),
    productDetailsSuccess: (state, action) => ({
      ...state,
      loading: false,
      product: action.payload.product,
    }),
    productDetailsFailed: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    productDetailsReset: (state, action) => ({
      ...state,
      product: null
    }),
    clear_errors: (state) => ({
      ...state,
      error: null,
    }),
  },
});

export const {
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFailed,
  productDetailsReset,
  clear_errors,
} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
