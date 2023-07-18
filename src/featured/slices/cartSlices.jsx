import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
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
  },
});

export const { addToCartRequest, addToCartSuccess, addToCartFailed } =
  cartSlice.actions;

export default cartSlice.reducer;
