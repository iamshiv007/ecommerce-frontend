import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    shippingInfo: {},
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToCartRequest: (state) => ({ ...state, loading: true }),
    addToCartSuccess: (state, action) => {
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          loading: false,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          loading: false,
          cartItems: [...state.cartItems, item],
        };
      }
    },
    addToCartFailed: (state, action) => ({ ...state, error: action.payload }),
    removeToCartSuccess: (state, action) => ({
      ...state,
      cartItems: state.cartItems.filter((i) => i.product !== action.payload),
    }),
    saveShippingInfoSuccess: (state, action) => ({ ...state, shippingInfo: action.payload })
  },
});

export const { addToCartRequest, addToCartSuccess, addToCartFailed, removeToCartSuccess, saveShippingInfoSuccess } =
  cartSlice.actions;

export default cartSlice.reducer;
