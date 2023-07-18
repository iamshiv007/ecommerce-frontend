import { configureStore } from "@reduxjs/toolkit";
import ThunkMiddleware from "redux-thunk";
import userReducer from './featured/slices/userSlices'
import productsSlices from "./featured/slices/productsSlices";
import productSlices from "./featured/slices/productSlices";
import ReviewSlices from "./featured/slices/reviewSlices";
import cartSlices from "./featured/slices/cartSlices";

export const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsSlices,
        productDetails: productSlices,
        review: ReviewSlices,
        cart: cartSlices
    },
    middleware: [ThunkMiddleware]
})