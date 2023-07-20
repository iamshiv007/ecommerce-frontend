import { createSlice } from "@reduxjs/toolkit";


const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        loading: false,
        error: null,
    },
    reducers: {

        myOrdersRequest: (state) => ({ ...state, loading: true }),
        allOrdersRequest: (state) => ({ ...state, loading: true }),
        myOrdersSuccess: (state, action) => ({ ...state, loading: false, orders: action.payload.orders }),
        allOrdersSuccess: (state, action) => ({ ...state, loading: false, orders: action.payload.orders }),
        myOrdersFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        AllOrdersFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        clear_errors: (state) => ({ ...state, error: null })
    }
})

export const {
    myOrdersRequest,
    allOrdersRequest,
    myOrdersFailed,
    myOrdersSuccess,
    allOrdersSuccess,
    AllOrdersFailed,
    clear_errors
} = ordersSlice.actions;

export default ordersSlice.reducer;
