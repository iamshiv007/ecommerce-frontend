import { createSlice } from "@reduxjs/toolkit";


const newProductSlice = createSlice({
    name: "newProduct",
    initialState: {
        productCreated: false,
        loading: false,
        error: null,
    },
    reducers: {
        newProductRequest: (state) => ({ ...state, loading: true }),
        newProductSuccess: (state, action) => ({ ...state, loading: false, productCreated: action.payload.success }),
        newProductFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        newProductReset: (state, action) => ({ ...state, productCreated: false }),
        clear_errors: (state) => ({ ...state, error: null })
    }
})

export const {
    newProductRequest,
    newProductSuccess,
    newProductFailed,
    newProductReset,
    clear_errors
} = newProductSlice.actions;

export default newProductSlice.reducer;
