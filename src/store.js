import { configureStore } from "@reduxjs/toolkit";
import ThunkMiddleware from "redux-thunk";
import userReducer from './featured/slices/userSlices'

export const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: [ThunkMiddleware]
})