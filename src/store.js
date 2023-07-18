import { configureStore } from "@reduxjs/toolkit";
import ThunkMiddleware from "redux-thunk";
import userReducer from './featured/slices/userSlices'
import productsSlices from "./featured/slices/productsSlices";

export const store = configureStore({
    reducer: {
        user: userReducer,
        products:productsSlices
    },
    middleware: [ThunkMiddleware]
})