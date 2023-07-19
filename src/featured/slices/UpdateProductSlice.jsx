import { createSlice } from "@reduxjs/toolkit";


const updateProductSlice = createSlice({
    name: "updateProduct",
    initialState: {
        productUpdated: false,
        loading: false,
        error: null,
    },
    reducers: {
        updateProductRequest: (state) => ({ ...state, loading: true }),
        updateProductSuccess: (state, action) => ({ ...state, loading: false, productUpdated: action.payload.success }),
        updateProductFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        updateProductReset: (state) => ({ ...state, productUpdated: false }),
        clear_errors: (state) => ({ ...state, error: null })
    }
})

export const {
    updateProductRequest,
    updateProductSuccess,
    updateProductFailed,
    updateProductReset,
    clear_errors
} = updateProductSlice.actions;

export default updateProductSlice.reducer;
