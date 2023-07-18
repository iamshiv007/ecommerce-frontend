import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
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
  clear_errors,
} = productSlice.actions;

export default productSlice.reducer;
