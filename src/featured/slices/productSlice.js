import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: "Product",
    initialState: {
        productDeleted: false,
        productCreated: false,
        productUpdated: false,
        loading: false,
        error: null,
    },
    reducers: {
        deleteProductRequest: (state) => ({ ...state, loading: true }),
        newProductRequest: (state) => ({ ...state, loading: true }),
        updateProductRequest: (state) => ({ ...state, loading: true }),
        deleteProductSuccess: (state, action) => ({ ...state, loading: false, productDeleted: action.payload.success }),
        newProductSuccess: (state, action) => ({ ...state, loading: false, productCreated: action.payload.success }),
        updateProductSuccess: (state, action) => ({ ...state, loading: false, productUpdated: action.payload.success }),
        deleteProductFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        newProductFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        updateProductFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        deleteProductReset: (state, action) => ({ ...state, productDeleted: false }),
        newProductReset: (state, action) => ({ ...state, productCreated: false }),
        updateProductReset: (state) => ({ ...state, productUpdated: false }),
        clear_errors: (state) => ({ ...state, error: null })
    }
})

export const {
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFailed,
    deleteProductReset,
    newProductRequest,
    newProductSuccess,
    newProductFailed,
    newProductReset,
    updateProductRequest,
    updateProductSuccess,
    updateProductFailed,
    updateProductReset,
    clear_errors,
} = productSlice.actions;

export default productSlice.reducer;
