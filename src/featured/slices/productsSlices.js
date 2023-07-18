import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {
        allProductsRequest: (state) => ({ ...state, loading: true }),
        adminProductsRequest: (state) => ({ ...state, loading: true }),
        allProductsSuccess: (state, action) => ({ ...state, loading: false, products: action.payload.products, resultPerPage: action.payload.resultPerPage, productsCount: action.payload.productsCount, filteredProductsCount: action.payload.filteredProductsCount }),
        adminProductsSuccess: (state, action) => ({ ...state, loading: false, products: action.payload.products }),
        AllProductsFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        adminProductsFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        clear_errors: (state) => ({ ...state, error: null })
    }
})

export const {
    allProductsRequest,
    adminProductsRequest,
    allProductsSuccess,
    adminProductsSuccess,
    AllProductsFailed,
    adminProductsFailed,
    clear_errors
} = productsSlice.actions;

export default productsSlice.reducer;
