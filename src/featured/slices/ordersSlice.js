import { createSlice } from "@reduxjs/toolkit";


const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        loading: false,
        error: null,
    },
    reducers: {
        allOrdersRequest: (state) => ({ ...state, loading: true }),
        allOrdersSuccess: (state, action) => ({ ...state, loading: false, orders: action.payload.orders }),
        AllOrdersFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        clear_errors: (state) => ({ ...state, error: null })
    }
})

export const {
    allOrdersRequest,
    allOrdersSuccess,
    AllOrdersFailed,
    clear_errors
} = ordersSlice.actions;

export default ordersSlice.reducer;
