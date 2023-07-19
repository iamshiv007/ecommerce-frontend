import { createSlice } from "@reduxjs/toolkit";


const deleteProductSlice = createSlice({
    name: "deleteProduct",
    initialState: {
        productDeleted: false,
        loading: false,
        error: null,
    },
    reducers: {
        deleteProductRequest: (state) => ({ ...state, loading: true }),
        deleteProductSuccess: (state, action) => ({ ...state, loading: false, productDeleted: action.payload.success }),
        deleteProductFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        deleteProductReset: (state, action) => ({ ...state, productDeleted: false }),
        clear_errors: (state) => ({ ...state, error: null })
    }
})

export const {
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFailed,
    deleteProductReset,
    clear_errors
} = deleteProductSlice.actions;

export default deleteProductSlice.reducer;
