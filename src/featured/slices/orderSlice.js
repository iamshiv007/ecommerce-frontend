import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name: "Order",
    initialState: {
        orderDeleted: false,
        orderUpdated: false,
        orderCreated: false,
        loading: false,
        error: null,
    },
    reducers: {
        newOrderRequest: (state) => ({ ...state, loading: true }),
        deleteOrderRequest: (state) => ({ ...state, loading: true }),
        updateOrderRequest: (state) => ({ ...state, loading: true }),

        newOrderSuccess: (state, action) => ({ ...state, loading: false, orderCreated: action.payload.success }),
        deleteOrderSuccess: (state, action) => ({ ...state, loading: false, orderDeleted: action.payload.success }),
        updateOrderSuccess: (state, action) => ({ ...state, loading: false, orderUpdated: action.payload.success }),

        newOrderFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        deleteOrderFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        updateOrderFailed: (state, action) => ({ ...state, loading: false, error: action.payload, }),

        newOrderReset: (state) => ({ ...state, userDeleted: false }),
        deleteOrderReset: (state) => ({ ...state, userDeleted: false }),
        updateOrderReset: (state) => ({ ...state, userUpdated: false }),

        clear_errors: (state) => ({ ...state, error: null }),
    }
})

export const {
    newOrderRequest,
    newOrderSuccess,
    newOrderFailed,
    newOrderReset,
    deleteOrderRequest,
    deleteOrderSuccess,
    deleteOrderFailed,
    deleteOrderReset,
    updateOrderRequest,
    updateOrderSuccess,
    updateOrderFailed,
    updateOrderReset,
    clear_errors,
} = orderSlice.actions;

export default orderSlice.reducer;
