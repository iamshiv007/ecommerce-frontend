import { configureStore } from "@reduxjs/toolkit";
import ThunkMiddleware from "redux-thunk";
import userReducer from './featured/slices/userSlices'
import productsSlices from "./featured/slices/productsSlices";
import productSlices from "./featured/slices/productSlices";
import ReviewSlices from "./featured/slices/reviewSlices";
import cartSlices from "./featured/slices/cartSlices";

let preloadedState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {}
    }
}

export const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsSlices,
        productDetails: productSlices,
        review: ReviewSlices,
        cart: cartSlices
    },
    preloadedState,
    middleware: [ThunkMiddleware]
})