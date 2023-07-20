import { configureStore } from "@reduxjs/toolkit";
import ThunkMiddleware from "redux-thunk";
import productsSlices from "./featured/slices/productsSlice";
import ReviewSlices from "./featured/slices/reviewSlice";
import cartSlices from "./featured/slices/cartSlice";
import ordersSlice from "./featured/slices/ordersSlice";
import usersSlice from "./featured/slices/usersSlice";
import productDetailsSlices from "./featured/slices/productDetailsSlice";
import ReviewsSlice from "./featured/slices/reviewsSlice";
import getUserSlice from "./featured/slices/getUserSlice";
import ProductSlice from "./featured/slices/productSlice";
import authSlices from "./featured/slices/authSlice";
import userSlice from "./featured/slices/userSlice";
import orderSlice from "./featured/slices/orderSlice";

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
        auth: authSlices,
        users: usersSlice,
        products: productsSlices,
        productDetails: productDetailsSlices,
        review: ReviewSlices,
        cart: cartSlices,
        orders: ordersSlice,
        product: ProductSlice,
        productReviews: ReviewsSlice,
        getUser: getUserSlice,
        user: userSlice,
        order: orderSlice
    },
    preloadedState,
    middleware: [ThunkMiddleware]
})