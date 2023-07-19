import { configureStore } from "@reduxjs/toolkit";
import ThunkMiddleware from "redux-thunk";
import userReducer from './featured/slices/userSlices'
import productsSlices from "./featured/slices/productsSlices";
import ReviewSlices from "./featured/slices/reviewSlices";
import cartSlices from "./featured/slices/cartSlices";
import ordersSlice from "./featured/slices/ordersSlice";
import usersSlice from "./featured/slices/usersSlice";
import productDetailsSlices from "./featured/slices/productDetailsSlices";
import NewProductSlice from "./featured/slices/NewProductSlice";
import deleteProductSlice from "./featured/slices/DeleteProductSlice";
import ReviewsSlice from "./featured/slices/reviewsSlice";
import UpdateProductSlice from "./featured/slices/UpdateProductSlice";
import updateUserSlice from "./featured/slices/UpdateUserSlice";
import deleteUserSlice from "./featured/slices/deleteUserSlice";
import getUserSlice from "./featured/slices/getUserSlice";

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
        users: usersSlice,
        products: productsSlices,
        productDetails: productDetailsSlices,
        review: ReviewSlices,
        cart: cartSlices,
        orders: ordersSlice,
        newProduct: NewProductSlice,
        deleteProduct: deleteProductSlice,
        productReviews: ReviewsSlice,
        updateProduct: UpdateProductSlice,
        updateUser: updateUserSlice,
        deleteUser: deleteUserSlice,
        getUser: getUserSlice
    },
    preloadedState,
    middleware: [ThunkMiddleware]
})